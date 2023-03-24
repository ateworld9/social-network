import {Server} from 'http';
import {Server as IoServer, Socket} from 'socket.io';

import ChatsUseCases from './DomainLayer/chats.use-cases';
import TokenUseCases from './DomainLayer/tokens.use-cases';

import knexdb from './config/database';
import MessagesUseCases from './DomainLayer/messages.use-cases';

interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  userConnected: (userId: UserId) => void;
  GET_CHATS_ON_CONNECTION: (res: any) => void;
  GET_NEW_CHATS_PAGE: (res: any) => void;
  GET_CHAT_MESSAGES: (res: {data: Message[]}) => void;
  ON_MESSAGE: (res: {data: Message[]}) => void;
}

interface ClientToServerEvents {
  // hello: () => void;
  GET_MORE_CHATS: (limit: number, offset: number) => void;
  ON_MESSAGE: (message: CreateRequestMessage, mediaIds: number[]) => void;
  GET_CHAT_MESSAGES: ({filter, page}: ReqQuery<Message>) => void;
  DISCONNECT: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  user: UserTokenPayload;
  accessToken: string;
}

const tokensUseCases = new TokenUseCases();
const chatUseCases = new ChatsUseCases();

const messagesUseCases = new MessagesUseCases();

export default async (httpServer: Server) => {
  const whitelist = [
    undefined,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://ateworld.site',
    'http://www.ateworld.site',
    'https://ateworld.site',
    'https://www.ateworld.site',
  ];
  const io = new IoServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: function (origin, cb) {
        if (whitelist.indexOf(origin as string) !== -1) {
          cb(null, true);
        } else {
          cb(new Error('Not allowed by CORS'));
        }
      },
    },
  });

  io.use((socket, next) => {
    const accessToken = socket.handshake.auth.accessToken;
    if (!accessToken) {
      return next(new Error('no accessToken'));
    }

    const userData = tokensUseCases.validateAccessToken(accessToken);
    if (!userData) {
      return next(new Error('unAuthorized'));
    }
    socket.data.user = userData;
    socket.data.accessToken = accessToken;
    next();
  });

  const getChatsForUserId = async (socket: Socket, userId: number) => {
    const {chats, relationships, count} = await chatUseCases.findChatsForUserId(
      userId,
      {
        filter: {},
        page: {limit: 10, offset: 0},
      },
    );

    socket.emit('GET_CHATS_ON_CONNECTION', {
      data: chats,
      relationships,
      meta: {
        count: count,
      },
    });
  };

  io.on('connection', async (socket) => {
    if (socket.data.user) {
      const {userId} = socket.data.user;
      socket.broadcast.emit('userConnected', userId);

      const chatsIds = await knexdb('chats')
        .pluck('chats.chatId')
        .join('chats2users', 'chats2users.chatId', '=', 'chats.chatId')
        .where('chats2users.userId', '=', userId);

      chatsIds.forEach((chatId: number) => socket.join(String(chatId)));

      socket.on('GET_CHAT_MESSAGES', async ({filter, page}) => {
        const {messages, count} = await messagesUseCases.getMessages({
          filter,
          page: page ?? {limit: 100, offset: 0},
        });

        const response = {
          data: messages,
          meta: {count},
        };
        socket.emit('GET_CHAT_MESSAGES', response);
      });

      socket.on('ON_MESSAGE', async (reqMessage, mediaIds) => {
        //TODO: validate message
        const {messages, count} = await messagesUseCases.createMessage(
          reqMessage,
          mediaIds,
        );
        const res = {
          data: messages,
          meta: {count},
        };
        socket.to(String(reqMessage.chatId)).emit('ON_MESSAGE', res);
        socket.emit('ON_MESSAGE', res);
      });

      getChatsForUserId(socket, userId);

      socket.on('GET_MORE_CHATS', async (limit, offset) => {
        const {chats, relationships, count} =
          await chatUseCases.findChatsForUserId(userId, {
            filter: {},
            page: {limit, offset},
          });

        socket.emit('GET_NEW_CHATS_PAGE', {
          data: chats,
          relationships,
          meta: {
            count: count,
          },
        });
      });

      socket.on('DISCONNECT', async () => {
        console.log('disconnect');
      });
    }
  });
};

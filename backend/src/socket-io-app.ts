import {Server} from 'http';
import {Server as IoServer, Socket} from 'socket.io';

import {CLIENT_URL} from './config';
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
  GET_CHAT_MESSAGES: (res: {
    data: Message[];
    relationships: {media: Media[]};
  }) => void;
  ON_MESSAGE: (res: {data: Message[]; relationships: {media: Media[]}}) => void;
}

interface ClientToServerEvents {
  // hello: () => void;
  GET_MORE_CHATS: (limit: number, offset: number) => void;
  ON_MESSAGE: (message: CreateRequestMessage, mediaIds: number[]) => void;
  GET_CHAT_MESSAGES: (chatId: number, page: Page) => void;
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

//TODO: turn to
const messagesUseCases = new MessagesUseCases();

export default async (httpServer: Server) => {
  const io = new IoServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: CLIENT_URL,
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

      socket.on('GET_CHAT_MESSAGES', async (chatId, page) => {
        const {messages, media} = await messagesUseCases.getMessagesByQuery({
          filter: {chatId},
          page: page ?? {limit: 100, offset: 0},
        });
        const response = {
          data: messages,
          relationships: {
            media,
          },
        };
        socket.emit('GET_CHAT_MESSAGES', response);
      });

      socket.on('ON_MESSAGE', async (reqMessage, mediaIds) => {
        //TODO: validate messssage
        const {messages, media} = await messagesUseCases.createMessage(
          reqMessage,
          mediaIds,
        );
        const res = {
          data: messages,
          relationships: {
            media,
          },
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

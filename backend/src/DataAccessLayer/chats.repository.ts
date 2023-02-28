import knexdb from '../config/database';
import {AppError} from '../utils/app-errors';

import {TABLES} from './constants';

const DEFAULT_CHAT_SELECT = [
  `${TABLES.CHATS}.chatId as chatId `,
  `${TABLES.CHATS}.chatName as chatName `,
  `${TABLES.CHATS}.type as type `,
  `${TABLES.CHATS}.createdAt as createdAt `,
  `${TABLES.CHATS}.updatedAt as updatedAt `,
];

const DEFAULT_MEMBERS_SELECT = [
  `${TABLES.CHATS2USERS}.userId as userId `,
  `${TABLES.CHATS2USERS}.role as role `,
];

const LAST_MESSAGE_SELECT = [
  `${TABLES.MESSAGES}.messageId`,
  `${TABLES.MESSAGES}.text`,
  `${TABLES.MESSAGES}.fromUserId`,
  `${TABLES.MESSAGES}.status`,
  `${TABLES.MESSAGES}.createdAt as messageCreatedAt`,
  `${TABLES.MESSAGES}.updatedAt as messageUpdatedAt`,
];

type ChatsFilter = any;

type FindChatsRow = Chat &
  Message & {messageCreatedAt: Date | string; messageUpdatedAt: Date | string};

const chatsSerializer = (chatRows: FindChatsRow[]) => {
  return chatRows.map(
    ({
      chatId,
      messageId,
      fromUserId,
      text,
      status,
      messageCreatedAt,
      messageUpdatedAt,
      ...chat
    }) => ({
      chatId,
      ...chat,
      lastMessage: {
        messageId,
        chatId,
        text,
        status,
        fromUserId,
        createdAt: messageCreatedAt,
        updatedAt: messageUpdatedAt,
      },
    }),
  );
};

class ChatsRepository {
  async createChat(
    chatAttrs: Pick<Chat, 'chatName' | 'type'>,
    users: Array<{userId: UserId; role: string}>,
  ) {
    try {
      return await knexdb.transaction(async (trx) => {
        const chats = await trx(TABLES.CHATS).insert(chatAttrs).returning('*');

        const newMembers = users.map((el) => ({
          chatId: chats[0].chatId,
          ...el,
        }));
        const members = await trx(TABLES.CHATS2USERS)
          .insert(newMembers)
          .returning('*');
        return {chats, members};
      });
    } catch (error) {
      throw AppError.Conflict('Conflict while creating chat', [error]);
    }
  }

  async checkIsDialogExists(userId1: UserId, userId2: UserId) {
    const members = await knexdb(TABLES.CHATS)
      .select(DEFAULT_CHAT_SELECT)
      .join(
        `${TABLES.CHATS2USERS} as c2u1`,
        `${TABLES.CHATS}.chatId`,
        '=',
        `c2u1.chatId`,
      )
      .join(
        `${TABLES.CHATS2USERS} as c2u2`,
        `${TABLES.CHATS}.chatId`,
        '=',
        `c2u2.chatId`,
      )
      .where(`${TABLES.CHATS}.type`, 'dialog')
      .andWhere('c2u1.userId', userId1)
      .andWhere('c2u2.userId', userId2);
    return members;
  }

  async findChatsForUserId(
    userId: UserId,
    filter: ChatsFilter,
    {limit = 10, offset = 0}: Page,
  ) {
    const chats: FindChatsRow[] = await knexdb(TABLES.CHATS)
      .select(DEFAULT_CHAT_SELECT.concat(LAST_MESSAGE_SELECT))
      .join(
        TABLES.CHATS2USERS,
        `${TABLES.CHATS2USERS}.chatId`,
        '=',
        `${TABLES.CHATS}.chatId`,
      )
      .where(`${TABLES.CHATS2USERS}.userId`, userId)
      .leftJoin(
        knexdb(TABLES.MESSAGES)
          .distinctOn('chatId')
          .select('*')
          .orderBy([
            {column: `${TABLES.MESSAGES}.chatId`},
            {column: `${TABLES.MESSAGES}.createdAt`, order: 'desc'},
          ])
          .as(TABLES.MESSAGES),
        `${TABLES.MESSAGES}.chatId`,
        `${TABLES.CHATS}.chatId`,
      )
      .orderBy(`${TABLES.MESSAGES}.createdAt`, 'desc', 'last')
      .modify(function (queryBuilder) {
        if (filter) {
          queryBuilder.where(filter);
        }
        if (limit) {
          queryBuilder.limit(+limit);
        }
        if (offset) {
          queryBuilder.offset(+offset);
        }
      });

    return chatsSerializer(chats);
  }

  async getChatsMembers(chatIds: ChatId[]) {
    const members = await knexdb(TABLES.CHATS2USERS)
      .select(
        DEFAULT_MEMBERS_SELECT.concat([
          `${TABLES.CHATS2USERS}.chatId as chatId `,
        ]),
      )
      .whereIn(`${TABLES.CHATS2USERS}.chatId`, chatIds);

    return members;
  }

  async getCount(filter: ChatsFilter) {
    const rows = await knexdb(TABLES.CHATS)
      .count(`${TABLES.CHATS}.chatId`)
      .modify(function (queryBuilder) {
        if (filter) {
          queryBuilder.where(filter);
          if (filter.userId)
            queryBuilder.join(TABLES.CHATS2USERS, function () {
              this.on(
                `${TABLES.CHATS2USERS}.chatId`,
                '=',
                `${TABLES.CHATS}.chatId`,
              );
            });
        }
      });

    return rows[0].count;
  }
}

export default ChatsRepository;

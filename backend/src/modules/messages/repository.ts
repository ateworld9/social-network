import knexdb from '../../config/database';
import {TABLES} from '../../constants';

import {parseSort} from '../../utils';

const DEFAULT_MESSAGES_SELECT = [
  `${TABLES.MESSAGES}.messageId as messageId `,
  `${TABLES.MESSAGES}.chatId as chatId `,
  `${TABLES.MESSAGES}.fromUserId as fromUserId `,
  `${TABLES.MESSAGES}.text as text `,
  `${TABLES.MESSAGES}.postId as postId `,
  `${TABLES.MESSAGES}.status as status `,
  `${TABLES.MESSAGES}.createdAt as createdAt `,
  `${TABLES.MESSAGES}.updatedAt as updatedAt `,
];

class MessagesRepository {
  async createMessage(message: CreateRequestMessage) {
    const newMessage: Message[] = await knexdb(TABLES.MESSAGES)
      .insert(message)
      .returning(DEFAULT_MESSAGES_SELECT);
    return newMessage[0];
  }

  async findMessagesByChatId(chatId: ChatId, page: Page) {
    const {limit, offset} = page;
    const messages = await knexdb(TABLES.MESSAGES)
      .select(DEFAULT_MESSAGES_SELECT)
      .where('chatId', chatId)
      .orderBy('createdAt', 'asc', 'last')
      .modify(function (queryBuilder) {
        if (limit) {
          queryBuilder.limit(+limit);
        }
        if (offset) {
          queryBuilder.offset(+offset);
        }
      });
    return messages;
  }

  async findMessagesByQuery({
    filter,
    page,
    sort,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Message>;
  }) {
    const messages: Message[] = await knexdb(TABLES.MESSAGES)
      .select(DEFAULT_MESSAGES_SELECT)
      .orderBy('messageId', 'desc', 'last')
      .modify(function (queryBuilder) {
        if (sort) {
          queryBuilder.clear('order');
          queryBuilder.orderBy(parseSort(sort));
        }
        queryBuilder.limit(Number(page?.limit ?? 100));
        if (page?.offset) {
          queryBuilder.offset(+page.offset);
        }
        if (filter) {
          if (filter instanceof Array) {
            filter.forEach((el) => {
              queryBuilder.orWhere(el.columnName, el.operator, el.value);
            });
          } else {
            queryBuilder.where(filter);
          }
        }
      });
    return messages;
  }
  async getCount(filter?: Filter<Message>) {
    const count = knexdb(TABLES.MESSAGES)
      .count('messageId')
      .modify(function (queryBuilder) {
        if (filter) {
          if (filter instanceof Array) {
            filter.forEach((el) => {
              queryBuilder.orWhere(el.columnName, el.operator, el.value);
            });
          } else {
            queryBuilder.where(filter);
          }
        }
      });

    return count;
  }
}

export default MessagesRepository;

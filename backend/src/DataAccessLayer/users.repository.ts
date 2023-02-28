import knexdb from '../config/database';
import logger from '../utils/logger';

import {TABLES} from './constants';
import {parseSort} from './utils';

const DEFAULT_USER_SELECT = [
  `${TABLES.USERS}.userId as userId `,
  `${TABLES.USERS}.email as email `,
  `${TABLES.USERS}.phone as phone `,
  `${TABLES.USERS}.name as name `,
  `${TABLES.USERS}.surname as surname `,
  `${TABLES.USERS}.username as username `,
  `${TABLES.USERS}.createdAt as createdAt `,
  `${TABLES.USERS}.updatedAt as updatedAt `,
  // TODO: DELETE IT
  `${TABLES.MEDIA}.mediaId as mediaId `,
  `${TABLES.MEDIA}.filepath as filepath `,
  `${TABLES.MEDIA}.filename as filename `,
  `${TABLES.MEDIA}.mimetype as mimetype `,
  `${TABLES.MEDIA}.size as size `,
  `${TABLES.MEDIA}.postId as postId `,
  `${TABLES.MEDIA}.commentId as commentId `,
  `${TABLES.MEDIA}.messageId as messageId `,
];

class UsersRepository {
  async createUser(fields: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>) {
    const result = await knexdb(TABLES.USERS).insert(fields).returning('*');
    return result[0];
  }

  async findUser({
    filter,
    withPassword,
  }: {
    filter: Partial<User> | undefined;
    withPassword?: boolean;
  }) {
    if (withPassword)
      DEFAULT_USER_SELECT.push(`${TABLES.USERS}.password as password`);

    const user: User & Media = await knexdb(TABLES.USERS)
      .first(DEFAULT_USER_SELECT)
      .leftJoin(
        TABLES.MEDIA,
        `${TABLES.USERS}.profilePic`,
        '=',
        `${TABLES.MEDIA}.mediaId`,
      )
      .modify(function (queryBuilder) {
        if (filter) {
          queryBuilder.where(filter);
        }
      });

    return user;
  }

  async findUsers({
    sort,
    page,
    filter,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<User>;
  }) {
    const users: Array<User & Media> = await knexdb(TABLES.USERS)
      .select(DEFAULT_USER_SELECT)
      .leftJoin(
        TABLES.MEDIA,
        `${TABLES.USERS}.profilePic`,
        '=',
        `${TABLES.MEDIA}.mediaId`,
      )
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

    return users;
  }

  async getCount(filter?: Filter) {
    const count = knexdb(TABLES.USERS)
      .count('userId')
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

  // TODO: users.repository.updateUser
  async updateUser(
    userId: UserId,
    fields: Partial<Omit<User, 'userId' | 'createdAt'>>,
  ) {
    try {
      const result = await knexdb(TABLES.USERS)
        .where({userId})
        .update({...fields, updatedAt: new Date()})
        .returning('*');
      logger.info(JSON.stringify(result[0]));

      const updatedUser = await knexdb(TABLES.USERS)
        .select(
          'users.userId',
          'users.email',
          'users.password',
          'users.phone',
          'users.name',
          'users.surname',
          'media.filepath as profilePic',
          'users.username',
          'users.createdAt',
          'users.updatedAt',
        )
        .leftJoin('media', 'users.profilePic', '=', 'media.mediaId')
        .where({userId});
      return updatedUser[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async findContactsByUserId(userId: UserId) {
    const contacts: Array<User & Media> = await knexdb(TABLES.CONTACTS)
      .select(
        'users.userId',
        'users.email',
        'users.password',
        'users.phone',
        'users.name',
        'users.surname',
        'users.username',
        'users.createdAt',
        'users.updatedAt',
        `${TABLES.MEDIA}.mediaId as mediaId `,
        `${TABLES.MEDIA}.filepath as filepath `,
        `${TABLES.MEDIA}.filename as filename `,
        `${TABLES.MEDIA}.mimetype as mimetype `,
        `${TABLES.MEDIA}.size as size `,
        `${TABLES.MEDIA}.postId as postId `,
        `${TABLES.MEDIA}.commentId as commentId `,
        `${TABLES.MEDIA}.messageId as messageId `,
      )
      .leftJoin(
        TABLES.USERS,
        `${TABLES.USERS}.userId`,
        '=',
        `${TABLES.CONTACTS}.userId2`,
      )
      .leftJoin('media', `${TABLES.USERS}.profilePic`, '=', 'media.mediaId')
      .where({userId1: String(userId)});

    return contacts;
  }

  async addNewContact(userId1: number, userId2: number, status?: string) {
    await knexdb(TABLES.CONTACTS).insert([
      {
        userId1,
        userId2,
        status,
      },
    ]);
  }
}

export default UsersRepository;

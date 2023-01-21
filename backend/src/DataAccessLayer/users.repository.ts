import type {Page} from '../@types/types';
import type {Media} from '../@types/media';
import type {User, UserId} from '../@types/user';

import knexdb from '../config/database';
import logger from '../utils/logger';

const USERS_TABLE = 'users';
const MEDIA_TABLE = 'media';
const CONTACTS_TABLE = 'contacts';

const DEFAULT_USER_SELECT = [
  `${USERS_TABLE}.userId as userId `,
  `${USERS_TABLE}.email as email `,
  `${USERS_TABLE}.phone as phone `,
  `${USERS_TABLE}.name as name `,
  `${USERS_TABLE}.surname as surname `,
  `${USERS_TABLE}.username as username `,
  `${USERS_TABLE}.createdAt as createdAt `,
  `${USERS_TABLE}.updatedAt as updatedAt `,
  `${MEDIA_TABLE}.mediaId as mediaId `,
  `${MEDIA_TABLE}.filepath as filepath `,
  `${MEDIA_TABLE}.filename as filename `,
  `${MEDIA_TABLE}.mimetype as mimetype `,
  `${MEDIA_TABLE}.size as size `,
  `${MEDIA_TABLE}.postId as postId `,
  `${MEDIA_TABLE}.commentId as commentId `,
  `${MEDIA_TABLE}.messageId as messageId `,
];

class UsersRepository {
  async createUser(fields: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>) {
    const result = await knexdb(USERS_TABLE).insert(fields).returning('*');
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
      DEFAULT_USER_SELECT.push(`${USERS_TABLE}.password as password`);

    const user: User & Media = await knexdb(USERS_TABLE)
      .first(DEFAULT_USER_SELECT)
      .leftJoin(
        MEDIA_TABLE,
        `${USERS_TABLE}.profilePic`,
        '=',
        `${MEDIA_TABLE}.mediaId`,
      )
      .modify(function (queryBuilder) {
        if (filter) {
          queryBuilder.where(filter);
        }
      });

    return user;
  }

  async findUsers(
    filter: Partial<User> | undefined,
    {limit = 10, offset = 0}: Page,
  ) {
    const users: Array<User & Media> = await knexdb(USERS_TABLE)
      .select(DEFAULT_USER_SELECT)
      .leftJoin(
        MEDIA_TABLE,
        `${USERS_TABLE}.profilePic`,
        '=',
        `${MEDIA_TABLE}.mediaId`,
      )
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

    return users;
  }

  async getCount(filter: Partial<User> | undefined) {
    const count = knexdb(USERS_TABLE)
      .count('userId')
      .modify(function (queryBuilder) {
        if (filter) {
          queryBuilder.where(filter);
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
      const result = await knexdb(USERS_TABLE)
        .where({userId})
        .update({...fields, updatedAt: new Date()})
        .returning('*');
      logger.info(JSON.stringify(result[0]));

      const updatedUser = await knexdb(USERS_TABLE)
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
    try {
      const contacts: User[] = await knexdb(CONTACTS_TABLE)
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
        .leftJoin(
          USERS_TABLE,
          `${USERS_TABLE}.userId`,
          '=',
          `${CONTACTS_TABLE}.userId2`,
        )
        .leftJoin('media', `${USERS_TABLE}.profilePic`, '=', 'media.mediaId')
        .where({userId1: String(userId)});

      return contacts;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async addNewContact(userId1: number, userId2: number, status?: string) {
    try {
      await knexdb(CONTACTS_TABLE).insert([
        {
          userId1,
          userId2,
          status,
        },
      ]);
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
}

export default UsersRepository;

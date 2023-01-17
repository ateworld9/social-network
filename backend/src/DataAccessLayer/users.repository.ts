import logger from '..//utils/logger';
import {User} from '../@types/user';
import knexdb from '../config/database';

const USERS = 'users';
const CONTACTS = 'contacts';

class UsersRepository {
  async findUsers(
    fields: Partial<User> | null,
    limit?: number,
    offset?: number,
  ) {
    try {
      const users: User[] = await knexdb(USERS)
        .select(
          'users.userId',
          'users.email',
          'users.phone',
          'users.name',
          'users.surname',
          'media.filepath as profilePic',
          'users.username',
          'users.createdAt',
          'users.updatedAt',
        )
        .leftJoin('media', 'users.profilePic', '=', 'media.mediaId')
        .modify(function (queryBuilder) {
          if (fields) {
            queryBuilder.where(fields);
          }
          if (limit) {
            queryBuilder.where(limit);
          }
          if (offset) {
            queryBuilder.where(offset);
          }
        });

      return users;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async findUser(fields: Partial<User>) {
    try {
      const users: User[] = await knexdb(USERS)
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
        .where(fields);
      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async findUserById(userId: number) {
    try {
      const users: User[] = await knexdb(USERS)
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
        .where({userId})
        .leftJoin('media', 'users.profilePic', '=', 'media.mediaId');

      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
  async findUserByEmail(email: string) {
    try {
      const users: User[] = await knexdb(USERS)
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
        .where({email})
        .leftJoin('media', 'users.profilePic', '=', 'media.mediaId');
      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async findUserByUsername(username: string) {
    try {
      const users: User[] = await knexdb(USERS)
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
        .where({username})
        .leftJoin('media', 'users.profilePic', '=', 'media.mediaId');
      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async createUser(fields: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>) {
    try {
      const result = await knexdb(USERS).insert(fields).returning('*');
      return result[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async updateUser(
    userId: number,
    fields: Partial<Omit<User, 'userId' | 'createdAt'>>,
  ) {
    try {
      const result = await knexdb(USERS)
        .where({userId})
        .update({...fields, updatedAt: new Date()})
        .returning('*');
      logger.info(JSON.stringify(result[0]));

      const updatedUser = await knexdb(USERS)
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

  async findContactsByUserId(userId: number) {
    try {
      const contacts: User[] = await knexdb(CONTACTS)
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
        .leftJoin(USERS, `${USERS}.userId`, '=', `${CONTACTS}.userId2`)
        .leftJoin('media', `${USERS}.profilePic`, '=', 'media.mediaId')
        .where({userId1: String(userId)});

      return contacts;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async addNewContact(userId1: number, userId2: number, status?: string) {
    try {
      await knexdb(CONTACTS).insert([
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

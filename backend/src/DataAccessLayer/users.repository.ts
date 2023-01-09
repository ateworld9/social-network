import logger from '..//utils/logger';
import {User} from '../@types/user';
import knexdb from '../config/database';

const USERS_TABLE = 'users';
// const USER2USERS_TABLE = 'user2users';

class UsersRepository {
  async findUsers(fields: Partial<User>, limit?: number, offset?: number) {
    try {
      const users: User[] = await knexdb(USERS_TABLE)
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
        .where(fields)
        .limit(limit ?? 10)
        .offset(offset ?? 0);
      return users;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async findUser(fields: Partial<User>) {
    try {
      const users: User[] = await knexdb(USERS_TABLE)
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
      const users: User[] = await knexdb(USERS_TABLE)
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
      const users: User[] = await knexdb(USERS_TABLE)
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
      const users: User[] = await knexdb(USERS_TABLE)
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
      const result = await knexdb(USERS_TABLE).insert(fields).returning('*');
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
      logger.info(JSON.stringify(updatedUser[0]));
      return updatedUser[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
}

export default UsersRepository;

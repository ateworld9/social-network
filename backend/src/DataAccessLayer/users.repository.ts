import logger from '..//utils/logger';
import {User} from '../@types/user';
import knexdb from '../config/database';

const USERS_TABLE = 'users';
// const USER2USERS_TABLE = 'user2users';

class UsersRepository {
  async findAllUsers() {
    try {
      const users = await knexdb(USERS_TABLE);
      return users;
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async findUsers(fields: Partial<User>) {
    try {
      const users = await knexdb(USERS_TABLE).where(fields);
      return users;
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async findUser(fields: Partial<User>) {
    try {
      const users = await knexdb(USERS_TABLE).where(fields);
      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async findUserById(userId: number) {
    try {
      const users = await knexdb(USERS_TABLE).where({userId});

      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }
  async findUserByEmail(email: string) {
    try {
      const users = await knexdb(USERS_TABLE).where({email});
      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async findUserByLogin(login: string) {
    try {
      const users = await knexdb(USERS_TABLE).where({login});
      return users[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async createUser(fields: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>) {
    try {
      const result = await knexdb(USERS_TABLE).insert(fields).returning('*');
      return result[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
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

      const updatedUser = await knexdb(USERS_TABLE).where({userId});
      logger.info(JSON.stringify(updatedUser[0]));
      return updatedUser[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }
}

export default UsersRepository;

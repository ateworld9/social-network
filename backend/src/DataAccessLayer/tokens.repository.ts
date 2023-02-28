import knexdb from '../config/database';
import logger from '../utils/logger';

import {TABLES} from './constants';

class TokenRepository {
  async createToken(fields: Token) {
    try {
      const tokens = await knexdb(TABLES.TOKENS).insert(fields).returning('*');
      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateToken(userId: UserId, refreshToken: string) {
    try {
      const tokens = await knexdb(TABLES.TOKENS)
        .where({userId})
        .update({refreshToken})
        .returning('*');

      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findTokenByUserId(userId: UserId) {
    try {
      const tokens = await knexdb(TABLES.TOKENS).where({userId});
      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findTokenByRefreshToken(refreshToken: string) {
    try {
      const tokens = await knexdb(TABLES.TOKENS).where({refreshToken});
      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteToken(refreshToken: string) {
    try {
      const response = await knexdb(TABLES.TOKENS).where({refreshToken}).del();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default TokenRepository;

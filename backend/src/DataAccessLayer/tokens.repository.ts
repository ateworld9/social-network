import knexdb from '../config/database';
import logger from '../utils/logger';

import {Token} from '../@types/token';
import {UserId} from '../@types/user';

import {TOKENS_TABLE} from './constants';

class TokenRepository {
  async createToken(fields: Token) {
    try {
      const tokens = await knexdb(TOKENS_TABLE).insert(fields).returning('*');
      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateToken(userId: UserId, refreshToken: string) {
    try {
      const tokens = await knexdb(TOKENS_TABLE)
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
      const tokens = await knexdb(TOKENS_TABLE).where({userId});
      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findTokenByRefreshToken(refreshToken: string) {
    try {
      const tokens = await knexdb(TOKENS_TABLE).where({refreshToken});
      console.log('>>>>>>>>>>>>>>>>>>>>TOKENs', tokens);

      return tokens[0];
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteToken(refreshToken: string) {
    try {
      const response = await knexdb(TOKENS_TABLE).where({refreshToken}).del();
      console.log(
        'DELETE TOKEN RESPONSE==========================================',
        response,
      );
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default TokenRepository;

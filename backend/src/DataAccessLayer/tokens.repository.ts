import knexdb from '../config/database';
import logger from '../utils/logger';
import {Token} from '../@types/token';

const TOKENS_TABLE = 'tokens';

class TokenRepository {
  async createToken(fields: Token) {
    try {
      const tokens = await knexdb(TOKENS_TABLE).insert(fields).returning('*');
      return tokens[0];
    } catch (e) {
      logger.error(e);
    }
  }

  async updateToken(userId: number, refreshToken: string) {
    try {
      const tokens = await knexdb(TOKENS_TABLE)
        .where({userId})
        .update({refreshToken})
        .returning('*');

      return tokens[0];
    } catch (e) {
      logger.error(e);
    }
  }

  async findTokenByUserId(userId: number) {
    try {
      const tokens = await knexdb(TOKENS_TABLE).where({userId});
      return tokens[0];
    } catch (e) {
      logger.error(e);
    }
  }

  async findTokenByRefreshToken(refreshToken: string) {
    try {
      const tokens = await knexdb(TOKENS_TABLE).where({refreshToken});
      console.log('>>>>>>>>>>>>>>>>>>>>TOKENs', tokens);

      return tokens[0];
    } catch (e) {
      logger.error(e);
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
    }
  }
}

export default TokenRepository;
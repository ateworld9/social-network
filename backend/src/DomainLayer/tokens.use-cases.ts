import jwt from 'jsonwebtoken';
import TokenRepository from '../DataAccessLayer/tokens.repository';
import {APP_ACCESS_SECRET, APP_REFRESH_SECRET} from '../config';
import {AppError} from '../utils/app-errors';
import {UserTokenPayload} from '../@types/user';

const tokenRepository = new TokenRepository();
class TokenUseCases {
  generateTokens(payload: UserTokenPayload) {
    try {
      const accessToken = jwt.sign(payload, APP_ACCESS_SECRET as string, {
        expiresIn: '12h',
      });
      const refreshToken = jwt.sign(payload, APP_REFRESH_SECRET as string, {
        expiresIn: '30d',
      });

      return {accessToken, refreshToken};
    } catch (e) {
      throw AppError.InternalError('TOKEN generateTokens Use Case Error', [e]);
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, APP_ACCESS_SECRET as string);
      return userData as UserTokenPayload;
    } catch (e) {
      throw AppError.InternalError('TOKEN validateAccessToken Use Case Error', [
        e,
      ]);
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, APP_REFRESH_SECRET as string);
      return userData as UserTokenPayload;
    } catch (e) {
      throw AppError.InternalError(
        'TOKEN validateRefreshToken Use Case Error',
        [e],
      );
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    try {
      const userToken = await tokenRepository.findTokenByUserId(userId);

      if (userToken) {
        const newToken = await tokenRepository.updateToken(
          userId,
          refreshToken,
        );
        if (!newToken) {
          throw AppError.InternalError('db error, on token update');
        }
        return newToken;
      }

      const newToken = await tokenRepository.createToken({
        userId,
        refreshToken,
      });
      if (!newToken) {
        throw AppError.InternalError('db error, on token insert');
      }
      return newToken;
    } catch (e) {
      throw AppError.InternalError('TOKEN saveToken Use Case Error', [e]);
    }
  }

  async removeToken(refreshToken: string) {
    try {
      await tokenRepository.deleteToken(refreshToken);
    } catch (e) {
      throw AppError.InternalError('TOKEN removeToken Use Case Error', [e]);
    }
  }

  async getTokenByRefreshToken(refreshToken: string) {
    try {
      const token = await tokenRepository.findTokenByRefreshToken(refreshToken);
      if (!token) {
        throw AppError.NotFound('Not Found token by refreshToken');
      }
      return token;
    } catch (e) {
      throw AppError.InternalError(
        'TOKEN getTokenByRefreshToken Use Case Error',
        [e],
      );
    }
  }
}

export default TokenUseCases;

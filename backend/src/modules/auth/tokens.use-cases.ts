import jwt from 'jsonwebtoken';
import TokenRepository from './tokens.repository';
import config from '../../config';
import {AppError} from '../../app-errors';

const tokenRepository = new TokenRepository();
class TokenUseCases {
  generateTokens(payload: UserTokenPayload) {
    try {
      const accessToken = jwt.sign(
        payload,
        config.APP_ACCESS_SECRET as string,
        {
          expiresIn: '15m',
        },
      );
      const refreshToken = jwt.sign(
        payload,
        config.APP_REFRESH_SECRET as string,
        {
          expiresIn: '30d',
        },
      );

      return {accessToken, refreshToken};
    } catch (e) {
      throw AppError.InternalError('TOKEN generateTokens Use Case Error', [e]);
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, config.APP_ACCESS_SECRET as string);
      return userData as UserTokenPayload;
    } catch (e) {
      throw AppError.InternalError('TOKEN validateAccessToken Use Case Error', [
        e,
      ]);
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, config.APP_REFRESH_SECRET as string);
      return userData as UserTokenPayload;
    } catch (e) {
      throw AppError.InternalError(
        'TOKEN validateRefreshToken Use Case Error',
        [e],
      );
    }
  }

  async saveToken(userId: UserId, refreshToken: string) {
    try {
      const userToken = await tokenRepository.findTokenByUserId(userId);

      if (userToken) {
        const updatedToken = await tokenRepository.updateToken(
          userId,
          refreshToken,
        );

        if (!updatedToken) {
          throw AppError.InternalError('db error, on token update');
        }

        return updatedToken;
      }
    } catch (e) {
      throw AppError.InternalError(
        'TOKEN saveToken>updateToken Use Case Error',
        [e],
      );
    }

    try {
      const newToken = await tokenRepository.createToken({
        userId,
        refreshToken,
      });
      if (!newToken) {
        throw AppError.InternalError('db error, on token insert');
      }
      return newToken;
    } catch (e) {
      throw AppError.InternalError(
        'TOKEN saveToken>createToken Use Case Error',
        [e],
      );
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
    const token = await tokenRepository.findTokenByRefreshToken(refreshToken);
    if (!token) {
      throw AppError.NotFound('Not Found token by refreshToken');
    }
    return token;
  }
}

export default TokenUseCases;

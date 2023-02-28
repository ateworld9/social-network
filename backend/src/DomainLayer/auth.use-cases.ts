import bcrypt from 'bcrypt';
import {AppError} from '../utils/app-errors';

import UsersUseCases from './users.use-cases';
import TokensUseCases from './tokens.use-cases';

const usersUseCases = new UsersUseCases();
const tokensUseCases = new TokensUseCases();

class AuthUseCases {
  async registration(email: string, password: string, username?: string) {
    const hashPassword = await bcrypt.hash(password, 3);

    // const activationLink = uuid.v4()

    const user = await usersUseCases.createUser(email, hashPassword, username);

    // await sendActivationMail(email, activationLink)

    const tokens = tokensUseCases.generateTokens({
      userId: user.userId,
      email: user.email,
      username: user.username,
    });

    let token: Token | undefined;

    try {
      token = await tokensUseCases.saveToken(user.userId, tokens.refreshToken);
    } catch (error) {
      throw AppError.InternalError('Token is not created, USER Case Error');
    }

    return {
      user,
      ...token,
    };
  }

  async login(password: string, email?: string, username?: string) {
    let user: User | undefined = undefined;
    if (email)
      user = await usersUseCases.findUserByQuery({
        filter: {email},
        withPassword: true,
      });
    if (username && !user)
      user = await usersUseCases.findUserByQuery({
        filter: {username},
        withPassword: true,
      });

    if (!user) {
      throw AppError.NotFound(
        `User with this ${username ? 'username' : 'email'} is not found`,
      );
    }

    if (!user.password) {
      throw AppError.BadRequest('Incorrect password in the database');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw AppError.BadRequest('Incorrect password');
    }

    const tokens = tokensUseCases.generateTokens({
      userId: user.userId,
      email: user.email,
      username: user.username,
    });

    const token = await tokensUseCases.saveToken(
      user.userId,
      tokens.refreshToken,
    );
    if (!token) {
      throw AppError.InternalError('Token is not created, USER Case Error');
    }
    return {
      user,
      ...tokens,
    };
  }

  async logout(refreshToken: string) {
    try {
      await tokensUseCases.removeToken(refreshToken);
    } catch (error) {
      throw AppError.InternalError('Oops :(( Can not logout', [error]);
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw AppError.UnAuthorized('Unauthorized refresh, no refreshToken');
    }
    const userData = tokensUseCases.validateRefreshToken(refreshToken);
    if (!userData) {
      throw AppError.UnAuthorized(
        'Unauthorized refresh, token data is not valid',
      );
    }

    const tokenFromDb = await tokensUseCases.getTokenByRefreshToken(
      refreshToken,
    );
    if (!tokenFromDb) {
      throw AppError.UnAuthorized(
        'Unauthorized refresh, Can`t find token in db',
      );
    }
    const user = await usersUseCases.findUserByQuery({
      filter: {userId: userData.userId},
    });

    if (!user) {
      throw AppError.BadRequest('User with this userId is not found');
    }
    const tokens = tokensUseCases.generateTokens({
      userId: user.userId,
      email: user.email,
      username: user.username,
    });

    const token = await tokensUseCases.saveToken(
      user.userId,
      tokens.refreshToken,
    );
    if (!token) {
      throw AppError.InternalError('Token is not created, USER Case Error');
    }
    return {
      user,
      ...tokens,
    };
  }
}

export default AuthUseCases;

import bcrypt from 'bcrypt';
import {AppError} from '../utils/app-errors';

import UsersRepository from '../DataAccessLayer/users.repository';
import TokensUseCases from './tokens.use-cases';
import {User} from '../@types/user';
import {Token} from '../@types/token';
import UsersUseCases from './users.use-cases';

// TODO: use usersUseCases
const userRepository = new UsersRepository();
const usersUseCases = new UsersUseCases();
const tokensUseCases = new TokensUseCases();

class AuthUseCases {
  async registration(email: string, password: string, username?: string) {
    let checkUser: User | undefined = undefined;
    let errorMessage = '';

    checkUser = await userRepository.findUserByEmail(email);

    if (checkUser) errorMessage = 'User with this email already exists!';

    username = username ?? `user${Math.floor(Math.random() * 10000) + 1}`;
    checkUser = await userRepository.findUserByUsername(username);

    if (checkUser) {
      errorMessage = 'User with this username already exists!';
      throw AppError.BadRequest(errorMessage);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    // const activationLink = uuid.v4()

    const user = await userRepository.createUser({
      email,
      password: hashPassword,
      username,
      phone: null,
      name: null,
      surname: null,
      profilePic: null,
      isActivated: false,
      activationLink: '',
    });

    if (!user) {
      throw AppError.InternalError('User is not created, USER Case Error');
    }
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
    if (email) user = await userRepository.findUserByEmail(email);
    if (username && !user)
      user = await userRepository.findUserByUsername(username);
    if (!user) {
      throw AppError.NotFound(
        `User with this ${username ? 'username' : 'email'} is not found`,
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw AppError.BadRequest('Un correct password');
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
    const user = await userRepository.findUserById(userData.userId);

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

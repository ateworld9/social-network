import {AppError} from '../utils/app-errors';

import UsersRepository from '../DataAccessLayer/users.repository';
import {User} from '../@types/user';

const userRepository = new UsersRepository();

class UsersUseCases {
  async getUserById(userId: number) {
    try {
      const user = await userRepository.findUserById(userId);
      return user;
    } catch (error) {
      throw AppError.InternalError('find user by id error');
    }
  }

  async createUser(email: string, password: string, username?: string) {
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

    const user = await userRepository.createUser({
      email,
      password,
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

    return {
      user,
    };
  }

  async getUserByEmail(email: string) {
    try {
      const user = await userRepository.findUserByEmail(email);
      return user;
    } catch (error) {
      throw AppError.InternalError('find user by email error');
    }
  }

  async getUsers(query: Partial<User>, limit?: number, offset?: number) {
    const users = await userRepository.findUsers(query, limit, offset);

    if (!users) {
      throw AppError.NotFound('Users is not found');
    }
    return users;
  }

  async getUser(query: Partial<User>) {
    const user = await userRepository.findUser(query);
    if (!user) {
      throw AppError.NotFound('User is not found');
    }
    return user;
  }

  async updateUser(userId: number, fields: Partial<User>) {
    const user = await userRepository.updateUser(userId, fields);
    if (!user) {
      throw AppError.InternalError('User is not updated, USER Case Error');
    }
  }
}

export default UsersUseCases;

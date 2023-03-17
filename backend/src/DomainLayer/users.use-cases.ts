import * as crypto from 'node:crypto';

import {AppError} from '../utils/app-errors';

import UsersRepository from '../DataAccessLayer/users.repository';
import MediaUseCases from './media.use-cases';

const userRepository = new UsersRepository();
const mediaUseCases = new MediaUseCases();

class UsersUseCases {
  async createUser(
    email: string,
    password: string,
    username?: string,
    name?: string,
    surname?: string,
  ) {
    let checkUser: User | undefined = undefined;
    let errorMessage = '';

    checkUser = await userRepository.findUser({filter: {email}});

    if (checkUser) errorMessage = 'User with this email already exists!';

    username = username ?? `user${crypto.randomBytes(8).toString('hex')}`;
    if (!errorMessage) {
      checkUser = await userRepository.findUser({filter: {username}});
      errorMessage = 'User with this username already exists!';
    }

    if (checkUser) {
      throw AppError.BadRequest(errorMessage);
    }

    const user = await userRepository.createUser({
      email,
      password,
      username,
      name: name ?? null,
      surname: surname ?? null,
    });

    if (!user) {
      throw AppError.InternalError('User is not created, USER Case Error');
    }

    return user;
  }

  async findUserByQuery({
    filter,
    withPassword,
  }: {
    filter: Partial<User> | undefined;
    withPassword?: boolean;
  }) {
    const user = await userRepository.findUser({filter, withPassword});
    if (!user) {
      throw AppError.NoContent('User is not found');
    }
    return user;
  }

  async findUsersByQuery({
    filter,
    sort,
    page,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<User>;
  }) {
    const users = await userRepository.findUsers({filter, sort, page});
    const count = await userRepository.getCount(filter);
    if (!users) {
      throw AppError.NoContent('findUsersByQuery No Content');
    }
    return {users, count};
  }

  async updateUser(
    userId: UserId,
    authUserId: UserId,
    fields?: Partial<User>,
    avatar?: MediaId,
    cover?: MediaId,
  ) {
    if (userId !== authUserId) {
      const authUser = await userRepository.findUser({
        filter: {userId: authUserId},
      });
      if (authUser.role === 'admin') {
      } else {
        throw AppError.Forbidden('updateUser Forbidden');
      }
    }

    if (fields) {
      const user = await userRepository.updateUser(userId, fields);
      if (!user) {
        throw AppError.InternalError('User is not updated, USER Case Error');
      }
    }
    if (avatar) {
      const media = await mediaUseCases.updateEntityMedias({avatar: userId}, [
        avatar,
      ]);
      if (!media) {
        throw AppError.InternalError(
          'can`t save message and medias relationships to database',
        );
      }
    }
    if (cover) {
      const media = await mediaUseCases.updateEntityMedias({cover: userId}, [
        cover,
      ]);
      if (!media) {
        throw AppError.InternalError(
          'can`t save message and medias relationships to database',
        );
      }
    }

    const user = await userRepository.findUser({
      filter: {userId},
    });
    return user;
  }

  async getUserContacts(userId: UserId) {
    const contacts = await userRepository.findContactsByUserId(userId);

    if (!contacts) {
      throw AppError.NoContent('Contacts is not found');
    }

    return contacts;
  }

  async addUserToContacts(currentUserId: UserId, addedUserId: UserId) {
    if (currentUserId === addedUserId) {
      throw AppError.BadRequest(`ids is equal`);
    }

    try {
      await userRepository.findUser({filter: {userId: currentUserId}});
    } catch (error) {
      throw AppError.BadRequest(
        `user with userId: ${currentUserId} is not exists`,
      );
    }

    try {
      await userRepository.findUser({filter: {userId: addedUserId}});
    } catch (error) {
      throw AppError.BadRequest(
        `user with userId: ${addedUserId} is not exists`,
      );
    }

    try {
      await userRepository.addNewContact(currentUserId, addedUserId);
    } catch (error) {
      throw AppError.BadRequest('Error while insert contact to database');
    }

    try {
      const contacts = await userRepository.findContactsByUserId(currentUserId);
      return contacts;
    } catch (error) {
      throw AppError.BadRequest('Error while insert contact to database');
    }
  }
}

export default UsersUseCases;

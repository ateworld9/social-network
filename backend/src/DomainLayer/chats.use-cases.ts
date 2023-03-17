import lodash from 'lodash';

import {AppError} from '../utils/app-errors';

import ChatsRepository from '../DataAccessLayer/chats.repository';
import UsersUseCases from './users.use-cases';

const chatsRepository = new ChatsRepository();
const usersUseCases = new UsersUseCases();

class ChatsUseCases {
  async createChat(
    chatAttrs: Pick<Chat, 'chatName' | 'type'>,
    usersMembers: Array<{userId: UserId; role: string}>,
  ) {
    if (chatAttrs.type === 'dialog') {
      const chats = await chatsRepository.checkIsDialogExists(
        usersMembers[1].userId,
        usersMembers[0].userId,
      );
      if (chats[0]) {
        const members = await chatsRepository.getChatsMembers([
          chats[0].chatId,
        ]);

        const usersIds = new Set();
        members.forEach((member) => usersIds.add(member.userId));

        const groupedMembers = lodash.groupBy(members, 'chatId');
        const chatsWithMembers = chats.map((chat) => {
          const sortedMembers = groupedMembers[chat.chatId].sort((a, b) => {
            if (+a.userId === +usersMembers[0].userId) return 1;
            if (+b.userId === +usersMembers[0].userId) return -1;
            return 0;
          });
          return {
            ...chat,
            members: sortedMembers,
          };
        });

        const {users} = await usersUseCases.findUsersByQuery({
          filter: [
            {
              columnName: 'userId',
              operator: 'in',
              value: Array.from(usersIds),
            },
          ],
          page: {limit: 1000},
        });
        return {
          data: chatsWithMembers,
          relationships: {users},
          meta: {
            message: 'chat already exists',
          },
        };
      }
    }

    const {chats, members} = await chatsRepository.createChat(
      chatAttrs,
      usersMembers,
    );

    const usersIds = new Set();
    members.forEach((member) => usersIds.add(member.userId));

    const groupedMembers = lodash.groupBy(members, 'chatId');
    const chatsWithMembers = chats.map((chat) => {
      const sortedMembers = groupedMembers[chat.chatId].sort((a, b) => {
        if (+a.userId === +usersMembers[0].userId) return 1;
        if (+b.userId === +usersMembers[0].userId) return -1;
        return 0;
      });
      return {
        ...chat,
        members: sortedMembers,
      };
    });

    const {users} = await usersUseCases.findUsersByQuery({
      filter: [
        {
          columnName: 'userId',
          operator: 'in',
          value: Array.from(usersIds),
        },
      ],
      page: {limit: 1000},
    });
    return {
      data: chatsWithMembers,
      relationships: {users},
      meta: {
        message: 'chat already exists',
      },
    };
  }

  async findChatsForUserId(
    userId: UserId,
    {filter, page}: {filter: Partial<Chat & User>; page: Page},
  ) {
    const chats = await chatsRepository.findChatsForUserId(
      userId,
      filter,
      page,
    );
    if (!chats) {
      throw AppError.NoContent('findChats No Content');
    }
    filter.userId = userId;
    // filter.push({columnName: 'userId', operator: '=', value: userId});
    const count = await chatsRepository.getCount(filter);

    const chatsIds = chats.map((chat) => chat.chatId);
    const members = await chatsRepository.getChatsMembers(chatsIds);

    if (!members) {
      throw AppError.NoContent('findChats Members Error');
    }

    const usersIds = new Set();
    members.forEach((member) => usersIds.add(member.userId));
    const groupedMembers = lodash.groupBy(members, 'chatId');
    const chatsWithMembers = chats.map((chat) => {
      const sortedMembers = groupedMembers[chat.chatId].sort((a, b) => {
        if (+a.userId === +userId) return 1;
        if (+b.userId === +userId) return -1;
        return 0;
      });
      return {
        ...chat,
        members: sortedMembers,
      };
    });

    const {users} = await usersUseCases.findUsersByQuery({
      filter: [
        {
          columnName: 'userId',
          operator: 'in',
          value: Array.from(usersIds),
        },
      ],
      page: {limit: 1000},
    });

    return {
      chats: chatsWithMembers,
      relationships: {
        // members,
        users,
      },
      count,
    };
  }
}

export default ChatsUseCases;

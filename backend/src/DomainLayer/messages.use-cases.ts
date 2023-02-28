import lodash from 'lodash';
import {AppError} from '../utils/app-errors';

import MessagesRepository from '../DataAccessLayer/messages.repository';

import UsersUseCases from './users.use-cases';
import MediaUseCases from './media.use-cases';

const messagesRepository = new MessagesRepository();

const usersUseCases = new UsersUseCases();
const mediaUseCases = new MediaUseCases();
class MessagesUseCases {
  async createMessage(message: CreateRequestMessage, mediaIds?: number[]) {
    const user = usersUseCases.findUserByQuery({
      filter: {userId: message.fromUserId},
    });
    if (!user)
      throw AppError.UnAuthorized('UnAuthorized: no user with this id');

    const newMessage = await messagesRepository.createMessage(message);
    if (!newMessage) {
      throw AppError.InternalError('can`t save message to database');
    }

    if (mediaIds?.length) {
      const media = await mediaUseCases.updateEntityMedias(
        {messageId: newMessage.messageId},
        mediaIds,
      );
      if (!media) {
        throw AppError.InternalError(
          'can`t save message and medias relationships to database',
        );
      }
    }

    const savedMessages = await this.getMessagesByQuery({
      filter: {messageId: newMessage.messageId},
    });
    if (!savedMessages) {
      throw AppError.InternalError('Internal Error, cannot find saved message');
    }

    return savedMessages;
  }

  async getMessagesByQuery({
    filter,
    page,
    sort,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Message>;
  }) {
    const messages = await messagesRepository.findMessagesByQuery({
      filter,
      page,
      sort,
    });
    if (!messages) {
      throw AppError.NoContent('No messages');
    }
    const messageIds = messages.map((el) => el.messageId);
    const media = await mediaUseCases.getImages({
      filter: [
        {columnName: 'media.messageId', operator: 'in', value: messageIds},
      ],
    });
    const messageMedias = lodash.groupBy(media, 'messageId');
    const messagesWithRefs = messages.map((message) => ({
      ...message,
      medias: messageMedias[message.messageId]?.map((media) => media.mediaId),
    }));

    return {messages: messagesWithRefs, media};
  }
}

export default MessagesUseCases;

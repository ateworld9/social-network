import {ChatId} from './chat';
import {UserId} from './user';

export type MessageId = number;

export enum MessageStatus {
  notSended = 'not-sended',
  sended = 'sended',
  readed = 'readed',
  edited = 'edited',
  invisible = 'invisible',
  deleted = 'deleted',
}

export interface ForwardedMessage {
  messageId: MessageId;
  forwardedMessageId: MessageId;
}
export interface Message {
  messageId: MessageId;
  chatId: ChatId;
  fromUserId: UserId;
  text: string | null;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;

  forwardedMessages?: ForwardedMessage[];
}

import {UserId} from './user';

export type ChatId = number;

export interface Member {
  chatId: ChatId;
  role: string;
  user: User;
}

export enum ChatType {
  dialog = 'dialog',
  conference = 'conference',
}
export interface Chat {
  chatId: ChatId;
  chatName: string;
  type: ChatType;

  members: Array<Member>;

  createdAt: Date | string;
  updatedAt: Date | string;
}
// export enum ChatMemberRole {}
export interface ChatMember {
  chatId: ChatId;
  userId: UserId;
  role: string;
}

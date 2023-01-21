import {Media, MediaId} from './media';

export type UserId = number;

export interface User {
  userId: UserId;
  email: string;
  password: string;
  phone: string | null;
  name: string | null;
  surname: string | null;
  profilePic: Media | MediaId | null;
  username: string;

  isActivated: boolean;
  activationLink: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}

export enum ContactStatus {
  friend = 'friend',
  blocked = 'blocked',
}
export interface Contact {
  userId1: UserId;
  userId2: UserId;
  status: ContactStatus;
}

export type UserTokenPayload = Pick<User, 'userId' | 'email' | 'username'>;

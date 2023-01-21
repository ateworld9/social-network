import {UserId} from './user';

export interface Token {
  userId: UserId;
  refreshToken: string;
}

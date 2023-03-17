declare interface User {
  userId: number;
  username: string;
  password?: string;
  role: 'user' | 'admin';

  email: string;
  phone: string | null;

  isActivated: boolean;
  activationLink: string;

  name: string | null;
  surname: string | null;
  avatar: Media | MediaId | null;
  cover: Media | MediaId | null;

  about: string | null;
  city: string | null;
  birthday: Date | string | null;

  createdAt: Date | string;
  updatedAt: Date | string;
}
declare type UserId = User['userId'];

// export enum ContactStatus {
//   friend = 'friend',
//   blocked = 'blocked',
// }
declare interface Contact {
  userId1: UserId;
  userId2: UserId;
  status: 'friend' | 'blocked';
}

declare type UserTokenPayload = Pick<User, 'userId' | 'email' | 'username'>;

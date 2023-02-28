declare interface User {
  userId: number;
  email: string;
  password?: string;
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

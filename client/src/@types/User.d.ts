export type UserId = number;

export interface User {
  userId: UserId;
  email: string;
  password: string;
  phone: string | null;
  name: string | null;
  surname: string | null;
  profilePic: Media | null;
  username: string;

  isActivated: boolean;
  activationLink: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}

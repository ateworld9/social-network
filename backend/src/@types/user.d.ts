export interface User {
  userId: number;
  email: string;
  password: string;
  phone: string | null;
  name: string | null;
  surname: string | null;
  profilePic: number | null;
  login: string;

  // isActivated: boolean;
  // activationLink: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}

export type UserTokenPayload = Pick<User, 'userId' | 'email' | 'login'>;

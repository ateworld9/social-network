export interface User {
  userId: number;
  email: string;
  password: string;
  phone: string | null;
  name: string | null;
  surname: string | null;
  profilePic: string | null;
  username: string;

  isActivated: boolean;
  activationLink: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}

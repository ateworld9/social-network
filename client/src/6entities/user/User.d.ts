// turn to shared api user

declare type User = {
  userId: number;
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
};

declare type UserId = User["userId"];

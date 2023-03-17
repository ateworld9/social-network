// turn to shared api user

declare type User = {
  userId: number;
  username: string;
  password: string;
  role: "user" | "admin";

  email: string;
  phone: string | null;

  isActivated: boolean;
  activationLink: string;

  name: string | null;
  surname: string | null;
  avatar: Media["filename"] | null;
  cover: Media["filename"] | null;
  about: string | null;
  city: string | null;
  birthday: Date | string | null;

  createdAt: Date | string;
  updatedAt: Date | string;
};

declare type UserId = User["userId"];

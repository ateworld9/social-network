declare interface Chat {
  chatId: number;
  chatName: string;
  type: "dialog" | "conference";

  lastMessage: Message;

  members: Member[];

  createdAt: Date | string;
  updatedAt: Date | string;
}

declare type ChatId = Chat["chatId"];

declare interface Member {
  chatId: ChatId;
  userId: UserId;
  role: string | "admin" | "member";
}

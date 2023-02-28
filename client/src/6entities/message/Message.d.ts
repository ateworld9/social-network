declare interface Message {
  messageId: number;
  chatId: ChatId;
  fromUserId: UserId;
  text: string | null;
  status:
    | "not-sended"
    | "sended"
    | "readed"
    | "edited"
    | "invisible"
    | "deleted";
  createdAt: string;
  updatedAt: string;

  forwardedMessages?: ForwardedMessage[];
  medias?: MediaId[];
}

declare type MessageId = Message["messageId"];

declare interface ForwardedMessage {
  messageId: MessageId;
  forwardedMessageId: MessageId;
}

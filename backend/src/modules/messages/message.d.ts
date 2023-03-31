declare interface Message {
  messageId: number;
  chatId: ChatId;
  fromUserId: UserId;
  text: string | null;
  postId: PostId | null;
  status:
    | 'not-sended'
    | 'sended'
    | 'readed'
    | 'edited'
    | 'invisible'
    | 'deleted';
  createdAt: string;
  updatedAt: string;

  forwardedMessages?: ForwardedMessage[];
}

declare type CreateRequestMessage = Pick<
  Message,
  'chatId' | 'fromUserId' | 'postId' | 'text' | 'forwardedMessages' | 'status'
>;

declare type MessageId = Message['messageId'];

declare interface ForwardedMessage {
  messageId: MessageId;
  forwardedMessageId: MessageId;
}

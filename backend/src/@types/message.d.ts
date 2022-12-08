export interface Message {
  messageId: number;
  fromUserId: number | null;
  toUserId: number | null;
  text: string;
  status:
    | 'not-sended'
    | 'sended'
    | 'readed'
    | 'edited'
    | 'invisible'
    | 'deleted';
  created_at: string;
  updated_at: string;
}

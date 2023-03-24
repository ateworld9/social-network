type ChatWidgetProps = { chatId: ChatId };

type MesssageResponse = {
  data: Message[];
  meta?: { count: number };
};

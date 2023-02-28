import { useParams } from "react-router-dom";

import { ChatWidget } from "../../4widgets/chat";

const ChatPage = () => {
  const chatId = useParams().chatId as string;
  return <ChatWidget chatId={+chatId} />;
};

export default ChatPage;

import { use } from "react";
import { ChatContext } from "../store/contexts";

const useChat = () => {
  const chatValue = use(ChatContext);
  return chatValue;
};

export default useChat;

import React from "react";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const { sendMessage, isMessageSending } = useChatStore;
  return <div></div>;
}

export default MessageInput;

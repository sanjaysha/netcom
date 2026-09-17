import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import { useAuthUser } from "../store/useAuthStore";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageInput from "./MessageInput";

function ChatContainer() {
  const {
    getMessagesByUserId,
    isMessagesLoading,
    messages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthUser();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    //clean up
    return () => unsubscribeFromMessages();
  }, [
    getMessagesByUserId,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <>
            {messages.map((msg) => (
              <div key={msg._id}>
                <div
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header text-slate-200">
                    <time className="text-xs opacity-50">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div
                    className={`chat-bubble ${msg.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-600 text-white"}`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                      />
                    )}
                    {msg.text && <p className="mt-2">{msg.text}</p>}
                  </div>
                  <div className="chat-footer opacity-50 text-slate-200">
                    {msg.senderId === authUser._id ? "Delivered" : ""}
                  </div>
                </div>
              </div>
            ))}
            {/* //Scroll target on new message */}
            <div ref={messageEndRef} />
          </>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
}

export default ChatContainer;

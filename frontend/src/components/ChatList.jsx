import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatList() {
  const { getChatPartners, isUserLoading, chats, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }
  if (chats.length === 0) {
    return <NoChatsFound />;
  }
  return (
    <>
      {chats.map((chat) => (
        <div
          className="bg-cyan-500/10 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
          key={chat._id}
        >
          <div className="flex items-center gap-3 p-2">
            {/* Make the online status dynamic with socket.io */}
            <div className={`avatar avatar-online`}>
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-400 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatList;

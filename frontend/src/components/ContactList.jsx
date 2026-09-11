import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatList() {
  const { getAllContacts, isUserLoading, allContacts, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }
  if (allContacts.length === 0) {
    return <NoChatsFound />;
  }
  return (
    <>
      {allContacts.map((contact) => (
        <div
          className="bg-cyan-500/10 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
          key={contact._id}
        >
          <div className="flex items-center gap-3 p-2">
            {/* Make the online status dynamic with socket.io */}
            <div className={`avatar avatar-online`}>
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-400 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatList;

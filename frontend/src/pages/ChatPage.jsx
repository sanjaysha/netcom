import ActiveTabSwitch from "../components/ActiveTabSwitch";
import AnimatedGradientBorder from "../components/AnimatedGradientBorder";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className=" w-full max-w-6xl h-[640px]">
        <AnimatedGradientBorder className="w-full h-full overflow-hidden rounded-2xl">
          {/* Ledt Side */}
          <div className="h-full flex flex-row">
            <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
              <ProfileHeader />
              <ActiveTabSwitch />
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatList /> : <ContactList />}
              </div>
            </div>
            {/* Right Side */}
            <div className="flex-1 flex-flex-col bg-slate-900/50 backdrop-blur-sm">
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </div>
        </AnimatedGradientBorder>
      </div>
    </div>
  );
}

export default ChatPage;

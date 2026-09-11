import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="flex justify-between tabs tabs-box bg-transparent shadow-none gap-8 p-2 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab rounded-lg px-4 py-2 ${activeTab === "chats" ? "tab-active [--tab-bg:#7838b8]" : "text-slate-400 outline outline-solid outline-gray-700 hover:bg-cyan-500/20 transition-colors "}`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab rounded-lg px-4 py-2 ${activeTab === "contacts" ? "tab-active [--tab-bg:#7838b8]" : "text-slate-400 outline outline-solid outline-gray-700 hover:bg-cyan-500/20 transition-colors"}`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;

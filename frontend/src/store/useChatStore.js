import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  activeTab: "chats",
  selectedUser: null,
  messages: [],
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    console.log("ACTIVE TAB", tab);
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data?.filteredUsers });
    } catch (error) {
      toast.error("Error getting All Contacts");
      console.log("Error in Getting all contacts", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error("Error getting Chat Partners");
      console.log("Error getting Chats partner", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error loading messages");
      console.log("Error loading messages:", error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // isMessageSending: false,
  // sendMessage: async (receiverId) => {
  //   await axiosInstance.post(`/messages/send/${receiverId}`)
  //   set({ isMessageSending: true });
  //   try {

  //   } catch (error) {
  //     toast.error("Error sending message. Try Again.");
  //     console.log("Error sending message:", error.response.data.message);
  //   } finally {
  //     set({ isMessageSending: false });
  //   }
  // },
}));

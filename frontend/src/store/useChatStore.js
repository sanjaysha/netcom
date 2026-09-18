import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthUser } from "./useAuthStore";

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
      if (get().selectedUser?._id === userId) {
        set({ messages: res.data });
      }
    } catch (error) {
      toast.error("Error loading messages");
      console.log(
        "Error loading messages:",
        error.response?.data?.message || error.message,
      );
    } finally {
      if (get().selectedUser?._id === userId) {
        set({ isMessagesLoading: false });
      }
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthUser.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic message (optional)
    };
    //immdiatly update the UI by adding message
    set((state) => ({ messages: [...state.messages, optimisticMessage] }));
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );
      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === tempId ? res.data : message,
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((message) => message._id !== tempId),
      }));
      toast.error(
        error.response?.data?.message || "Error sending message. Try Again.",
      );
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthUser.getState().socket;
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const { selectedUser: currentSelectedUser, isSoundEnabled } = get();
      const isMessageSentFromSelectedUser =
        newMessage.senderId === currentSelectedUser?._id;
      if (!isMessageSentFromSelectedUser) return;

      set((state) => ({ messages: [...state.messages, newMessage] }));

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((error) => {
          console.log("Audio Play Failed", error);
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthUser.getState().socket;
    socket?.off("newMessage");
  },
}));

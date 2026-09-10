import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthUser = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  isSigningUp: false,
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  isLoggingIn: false,
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  isLoggingOut: false,
  logout: () => {
    set({ isLoggingOut: true });
    try {
      const res = axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("logout error", error);
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));

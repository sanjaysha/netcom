import { create } from "zustand";

export const useAuthUser = create((set, get) => ({
  authUser: {
    _id: 123,
    name: "sanjay",
    age: 45,
  },
  isLoggedIn: false,
  isLoading: false,
  login: () => {
    console.log("Logging In");
    set({ isLoading: false, isLoggedIn: true });
    // console.log("Logged In");
    // set({ isLoading: false, isLoggedIn: true });
  },
}));

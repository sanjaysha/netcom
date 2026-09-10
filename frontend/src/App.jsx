import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import Background from "./components/Background";
import { useAuthUser } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthUser();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth) return <PageLoader />;
  return (
    <div className="relative min-h-screen flex items-center justify-center  overflow-hidden">
      <Background />
      <div className="relative z-10 w-full">
        <div>
          <Toaster />
        </div>
        <Routes>
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/"
            element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

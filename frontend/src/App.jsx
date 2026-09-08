import React from "react";
import { Route, Routes } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import Background from "./components/Background";

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

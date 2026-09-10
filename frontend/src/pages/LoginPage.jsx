import React, { useState } from "react";
import { useAuthUser } from "../store/useAuthStore";
import AnimatedGradientBorder from "../components/AnimatedGradientBorder";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { isLoggingIn, login } = useAuthUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-[720px]">
        <AnimatedGradientBorder className="w-full overflow-hidden rounded-2xl">
          <div className="w-full flex flex-col md:flex-row">
            {/* form column left side */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* Heading Text */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-3xl font-bold mb-6 text-slate-200">
                    Log in Now
                  </h2>
                  <p className="text-slate-400">Log in for starting chats</p>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        className="input"
                        placeholder="johndeo@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>
                {/* Login Link */}
                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>
            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start chat anytime, anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedGradientBorder>
      </div>
    </div>
  );
}

export default LoginPage;

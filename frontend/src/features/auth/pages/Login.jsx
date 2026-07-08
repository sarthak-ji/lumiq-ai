import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  MessageSquare,
  Sparkles,
  Brain,
} from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = {
      email,
      password,
    };

    try {
      await handleLogin(payload);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#111d3a] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] animate-blob"></div>
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] bg-violet-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.06] animate-blob" style={{ animationDelay: '4s' }}></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-10 px-8">
          {/* Lumiq AI Logo */}
          <div className="text-center space-y-5">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full blur-xl opacity-50 animate-pulse-glow"></div>
                <div className="relative bg-[#0f1629]/80 backdrop-blur-xl p-8 rounded-full border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
                  <Brain size={60} className="text-blue-400" />
                </div>
              </div>
            </div>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Lumiq AI
            </h2>
            <p className="text-slate-400 text-lg font-light tracking-wide">
              Intelligent Conversations
            </p>
          </div>

          {/* Chat Illustration */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent rounded-3xl"></div>
            <div className="relative bg-[#0f1629]/40 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-6 space-y-4">
              {/* Bot message */}
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-r from-blue-500/15 to-indigo-500/15 backdrop-blur-md border border-blue-400/20 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-slate-200 text-sm">
                    Hello! I'm Lumiq 🤖
                  </p>
                </div>
              </div>

              {/* User message */}
              <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-gradient-to-r from-indigo-500/25 to-violet-500/25 backdrop-blur-md border border-indigo-400/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-slate-200 text-sm">How can you help?</p>
                </div>
              </div>

              {/* Bot typing indicator */}
              <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="bg-gradient-to-r from-blue-500/15 to-indigo-500/15 backdrop-blur-md border border-blue-400/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[85%]">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>

              {/* Feature icons */}
              <div className="flex justify-around items-center pt-3">
                <div className="p-3 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer group">
                  <MessageSquare size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <div className="p-3 bg-indigo-500/10 backdrop-blur-sm border border-indigo-400/20 rounded-full hover:bg-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 cursor-pointer group">
                  <Sparkles size={18} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div className="p-3 bg-violet-500/10 backdrop-blur-sm border border-violet-400/20 rounded-full hover:bg-violet-500/20 hover:border-violet-400/40 transition-all duration-300 cursor-pointer group">
                  <Brain size={18} className="text-violet-400 group-hover:text-violet-300 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <div className="text-center space-y-3">
            <p className="text-slate-300 font-medium tracking-wide">
              Powered by Advanced AI
            </p>
            <div className="flex gap-6 justify-center text-sm text-slate-400">
              <span className="flex items-center gap-1.5">⚡ Fast</span>
              <span className="flex items-center gap-1.5">🔒 Secure</span>
              <span className="flex items-center gap-1.5">🧠 Smart</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          {/* Glassmorphism card */}
          <div className="relative">
            {/* Card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-violet-500/20 rounded-[28px] blur-xl opacity-50"></div>
            <div className="relative backdrop-blur-2xl bg-white/[0.03] rounded-3xl p-8 border border-indigo-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {/* Header */}
              <div className="text-center mb-8">
                {/* Mobile logo */}
                <div className="lg:hidden flex justify-center mb-4">
                  <div className="bg-[#0f1629]/80 p-4 rounded-full border border-indigo-500/30">
                    <Brain size={32} className="text-blue-400" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 mb-2">
                  Welcome Back
                </h1>
                <p className="text-slate-400">Sign in to your account</p>
              </div>

              {/* Form */}
              <form onSubmit={submitForm} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="email"
                      id="login-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-indigo-500/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white/[0.04] border border-indigo-500/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="login-submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:from-blue-400 hover:via-indigo-400 hover:to-violet-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center">
                <div className="flex-1 border-t border-indigo-500/15"></div>
                <span className="px-4 text-slate-500 text-sm">or</span>
                <div className="flex-1 border-t border-indigo-500/15"></div>
              </div>

              {/* Footer */}
              <p className="text-center text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

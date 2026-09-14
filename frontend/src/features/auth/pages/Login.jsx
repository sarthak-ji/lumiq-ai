import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Brain } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "../../../shared/components/ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await handleLogin({ email, password });
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  if (!loading && user) return <Navigate to="/" replace />;

  return (
    <main className="auth-shell auth-reference min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20"><ThemeToggle /></div>

      <section className="auth-phone-card !w-full !max-w-[900px] !p-0 flex flex-col md:flex-row mx-auto min-h-[500px]">
        {/* Left Panel */}
        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col relative border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex-1">
            <div className="auth-logo mb-8 flex items-center justify-center"><Brain size={28} /></div>
            <h1 className="!text-left !text-3xl font-bold mb-3">Welcome to<br />Lumiq AI</h1>
            <p className="auth-subtitle !text-left">Intelligent conversations, beautifully simple.</p>
          </div>

          <div className="mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              Next-gen conversational intelligence
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <form onSubmit={submitForm} className="auth-reference-form w-full !max-w-md mx-auto !m-0">
            <label htmlFor="login-email">Email</label>
            <div className="auth-field flex items-center gap-3 px-4">
              <Mail size={16} className="opacity-70" />
              <input className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-3" id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>

            <label htmlFor="login-password">Password</label>
            <div className="auth-field flex items-center gap-3 px-4">
              <Lock size={16} className="opacity-70" />
              <input className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-3" id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="auth-options flex items-center justify-between mt-4">
              <label className="auth-check flex items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> <span>Remember me</span></label>
              <a href="#forgot-password" className="text-sm">Forgot Password?</a>
            </div>

            <button className="auth-gradient-button w-full mt-6 font-medium" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Log In"}
            </button>

            <p className="auth-bottom-copy text-center w-full text-sm">Don't have an account? <Link to="/register">Sign Up</Link></p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "../../../shared/components/ThemeToggle";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    setIsLoading(true);
    try {
      await handleRegister(formData);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-shell auth-reference min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20"><ThemeToggle /></div>

      <section className="auth-phone-card auth-register-card !w-full !max-w-[900px] !p-0 flex flex-col md:flex-row mx-auto min-h-[500px]">
        {/* Left Panel */}
        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col relative border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex-1">
            <div className="auth-logo mb-8 flex items-center justify-center"><Brain size={28} /></div>
            <h1 className="!text-left !text-3xl font-bold mb-3">Sign up Account</h1>
            <p className="auth-subtitle !text-left">Create your space for better conversations.</p>
          </div>

          <div className="mt-12 hidden md:block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              Next-gen conversational intelligence
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <form onSubmit={handleSubmitForm} className="auth-reference-form w-full !max-w-md mx-auto !m-0">
            <label htmlFor="register-username">Username</label>
            <div className="auth-field flex items-center gap-3 px-4">
              <User size={16} className="opacity-70" />
              <input className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-3" id="register-username" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Choose a username" required />
            </div>

            <label htmlFor="register-email">Email</label>
            <div className="auth-field flex items-center gap-3 px-4">
              <Mail size={16} className="opacity-70" />
              <input className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-3" id="register-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>

            <label htmlFor="register-password">Password</label>
            <div className="auth-field flex items-center gap-3 px-4">
              <Lock size={16} className="opacity-70" />
              <input className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-3" id="register-password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Create a password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <label htmlFor="register-confirm-password">Confirm Password</label>
            <div className="auth-field flex items-center gap-3 px-4">
              <Lock size={16} className="opacity-70" />
              <input className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-3" id="register-confirm-password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle confirm password visibility">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {formData.confirmPassword && formData.password !== formData.confirmPassword && <p className="auth-error text-red-500 text-sm mt-1">Passwords do not match.</p>}

            <div className="mt-4">
              <label className="auth-check auth-terms flex items-center gap-2 text-sm"><input type="checkbox" required /> <span>Agree to Terms &amp; Privacy</span></label>
            </div>

            <button className="auth-gradient-button w-full mt-6 font-medium" type="submit" disabled={isLoading || formData.password !== formData.confirmPassword}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="auth-bottom-copy text-center w-full text-sm">Already have an account? <Link to="/login">Log In</Link></p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;

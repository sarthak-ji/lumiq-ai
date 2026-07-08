import React, { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff, Check, MessageSquare, Sparkles, Brain } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'password') {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    setPasswordStrength(strength)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await handleRegister(formData)
      navigate('/login')
    } catch (error) {
      console.error('Register error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500'
      case 2:
        return 'bg-amber-500'
      case 3:
        return 'bg-blue-500'
      case 4:
        return 'bg-indigo-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0: return 'Weak password'
      case 1: return 'Fair password'
      case 2: return 'Good password'
      case 3: return 'Strong password'
      case 4: return 'Very strong password'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#111d3a] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] animate-blob"></div>
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] bg-violet-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.06] animate-blob" style={{ animationDelay: '4s' }}></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-10 px-8">
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
            <p className="text-slate-400 text-lg font-light tracking-wide">Intelligent Conversations</p>
          </div>

          {/* Chat Illustration */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent rounded-3xl"></div>
            <div className="relative bg-[#0f1629]/40 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-6 space-y-4">
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-r from-blue-500/15 to-indigo-500/15 backdrop-blur-md border border-blue-400/20 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-slate-200 text-sm">Welcome to Lumiq! 🤖</p>
                </div>
              </div>
              <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-gradient-to-r from-indigo-500/25 to-violet-500/25 backdrop-blur-md border border-indigo-400/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-slate-200 text-sm">Tell me more</p>
                </div>
              </div>
              <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="bg-gradient-to-r from-blue-500/15 to-indigo-500/15 backdrop-blur-md border border-blue-400/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[85%]">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
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

          <div className="text-center space-y-3">
            <p className="text-slate-300 font-medium tracking-wide">Powered by Advanced AI</p>
            <div className="flex gap-6 justify-center text-sm text-slate-400">
              <span>⚡ Fast</span>
              <span>🔒 Secure</span>
              <span>🧠 Smart</span>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-violet-500/20 rounded-[28px] blur-xl opacity-50"></div>
            <div className="relative backdrop-blur-2xl bg-white/[0.03] rounded-3xl p-8 border border-indigo-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="lg:hidden flex justify-center mb-4">
                  <div className="bg-[#0f1629]/80 p-4 rounded-full border border-indigo-500/30">
                    <Brain size={32} className="text-blue-400" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 mb-2">
                  Create Account
                </h1>
                <p className="text-slate-400">Join us today and get started</p>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-5">
                {/* Username Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      name="username"
                      id="register-username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-indigo-500/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      id="register-email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-indigo-500/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="register-password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
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

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                              level <= passwordStrength
                                ? getPasswordStrengthColor()
                                : 'bg-white/[0.06]'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400">
                        {getPasswordStrengthLabel()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 bg-white/[0.06] border border-indigo-500/20 rounded cursor-pointer checked:bg-indigo-500 checked:border-indigo-400 accent-indigo-500"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      terms and conditions
                    </a>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="register-submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:from-blue-400 hover:via-indigo-400 hover:to-violet-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <>
                      <Check size={20} />
                      Create Account
                    </>
                  )}
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
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
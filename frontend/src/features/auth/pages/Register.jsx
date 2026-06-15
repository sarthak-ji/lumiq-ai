import React, { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff, Check, MessageSquare, Zap, Brain } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

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
      console.log('Register Data:', formData)
      setTimeout(() => {
        alert('Account created successfully for ' + formData.username)
        setFormData({ username: '', email: '', password: '' })
        setPasswordStrength(0)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Register error:', error)
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500'
      case 2:
        return 'bg-yellow-500'
      case 3:
        return 'bg-emerald-500'
      case 4:
        return 'bg-teal-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-emerald-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 px-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-full border border-emerald-500/50">
                  <Brain size={60} className="text-emerald-400" />
                </div>
              </div>
            </div>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Lumiq AI
            </h2>
            <p className="text-emerald-200 text-lg">Intelligent Conversations</p>
          </div>

          <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-3xl backdrop-blur-sm border border-emerald-500/30"></div>
            <div className="relative space-y-6 w-full px-8">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-md border border-emerald-400/50 rounded-2xl px-4 py-2 max-w-xs">
                    <p className="text-emerald-100 text-sm">Welcome to Lumiq! 🤖</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-teal-500/40 to-emerald-500/40 backdrop-blur-md border border-teal-400/50 rounded-2xl px-4 py-2 max-w-xs">
                    <p className="text-teal-100 text-sm">Tell me more</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-md border border-emerald-400/50 rounded-2xl px-4 py-3 max-w-xs">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce animation-delay-1000"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce animation-delay-2000"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-around items-center pt-4">
                <div className="p-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full hover:bg-emerald-500/40 transition">
                  <MessageSquare size={20} className="text-emerald-400" />
                </div>
                <div className="p-3 bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-full hover:bg-teal-500/40 transition">
                  <Zap size={20} className="text-teal-400" />
                </div>
                <div className="p-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full hover:bg-emerald-500/40 transition">
                  <Brain size={20} className="text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-emerald-300 font-semibold">Powered by Advanced AI</p>
            <div className="flex gap-4 justify-center text-sm text-emerald-200">
              <span>⚡ Fast</span>
              <span>🔒 Secure</span>
              <span>🧠 Smart</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-emerald-500/30 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                Create Account
              </h1>
              <p className="text-emerald-200">Join us today and get started</p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-5">
              <div className="relative">
                <label className="block text-sm font-semibold text-emerald-100 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-400 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-emerald-100 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-400 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-emerald-100 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-400 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition duration-300 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-teal-400 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition ${
                            level <= passwordStrength
                              ? getPasswordStrengthColor()
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-emerald-200">
                      {passwordStrength === 0 && 'Weak password'}
                      {passwordStrength === 1 && 'Fair password'}
                      {passwordStrength === 2 && 'Good password'}
                      {passwordStrength === 3 && 'Strong password'}
                      {passwordStrength === 4 && 'Very strong password'}
                    </p>
                  </div>
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 bg-white/10 border border-emerald-500/30 rounded cursor-pointer checked:bg-emerald-500 checked:border-emerald-400"
                />
                <span className="text-sm text-emerald-200 group-hover:text-emerald-100 transition">
                  I agree to the{' '}
                  <a href="#" className="text-teal-400 hover:text-teal-300 transition">
                    terms and conditions
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Creating account...' : (
                  <>
                    <Check size={20} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-emerald-500/30"></div>
              <span className="px-4 text-emerald-400 text-sm">or</span>
              <div className="flex-1 border-t border-emerald-500/30"></div>
            </div>

            <p className="text-center text-emerald-200">
              Already have an account?{' '}
              <a href="/login" className="text-teal-400 font-semibold hover:text-teal-300 transition">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 0.3s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Register
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useChat } from '../hooks/useChat';
import { setUser } from '../../auth/auth.slice';
import {
  Brain,
  Send,
  Plus,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Code,
  BookOpen,
  LogOut,
  Paperclip,
  MoreHorizontal,
  Search,
  Hash
} from 'lucide-react';

const Dashboard = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    const content = text || message.trim();
    if (!content) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const getAIResponse = (userMsg) => {
    const responses = [
      "That's a great question! I'd be happy to help you with that. Let me think through the best approach...",
      "I understand what you're looking for. Here's what I'd recommend based on my analysis...",
      "Interesting! Let me break this down for you step by step so it's easy to follow.",
      "I've analyzed your query and here's a comprehensive response that should address your needs.",
      "Great thinking! Here are some insights that might help you move forward with this."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestions = [
    { icon: <Code size={18} />, label: 'Write code', prompt: 'Help me write a function that...' },
    { icon: <BookOpen size={18} />, label: 'Explain concept', prompt: 'Explain the concept of...' },
    { icon: <Sparkles size={18} />, label: 'Creative ideas', prompt: 'Give me creative ideas for...' },
    { icon: <Zap size={18} />, label: 'Quick answer', prompt: 'What is the difference between...' },
  ];

  const chatHistory = [
    { id: 1, title: 'React component help', time: 'Today' },
    { id: 2, title: 'API integration guide', time: 'Today' },
    { id: 3, title: 'Database optimization', time: 'Yesterday' },
    { id: 4, title: 'Deploy to production', time: 'Yesterday' },
  ];

  return (
    <div className="h-screen flex bg-[#0a0e1a] overflow-hidden">
      {/* ─── Sidebar ─── */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden`}
      >
        <div className="w-72 h-full flex flex-col bg-[#0c1120]/80 backdrop-blur-xl border-r border-indigo-500/10">
          {/* Sidebar Header */}
          <div className="p-4 flex items-center gap-3 border-b border-indigo-500/10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur-md opacity-30"></div>
              <div className="relative bg-[#0f1629] p-2 rounded-lg border border-indigo-500/20">
                <Brain size={22} className="text-blue-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Lumiq AI
              </h1>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={() => { setMessages([]); setMessage(''); }}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-indigo-500/20 hover:border-indigo-400/40 rounded-xl text-slate-200 font-medium transition-all duration-300 group"
            >
              <Plus size={18} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Search */}
          <div className="px-3 pb-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-indigo-500/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/30 transition-all"
              />
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">Recent</p>
            <div className="space-y-1">
              {chatHistory.map((item) => (
                <button
                  key={item.id}
                  className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-200 group"
                >
                  <Hash size={14} className="text-slate-600 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                  <span className="truncate flex-1">{item.title}</span>
                  <span className="text-xs text-slate-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={14} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-3 border-t border-indigo-500/10">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{user?.username || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'user@email.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main Chat Area ─── */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Top Bar */}
        <header className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-indigo-500/10 bg-[#0a0e1a]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] rounded-lg transition-all"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              <span className="text-sm font-medium text-slate-300">Lumiq AI</span>
              <span className="text-xs text-slate-500 bg-white/[0.04] px-2 py-0.5 rounded-full">v1.0</span>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] rounded-lg transition-all">
            <Settings size={20} />
          </button>
        </header>

        {/* Messages Area */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            /* ─── Empty State ─── */
            <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
              {/* Hero */}
              <div className="text-center mb-10 animate-fade-in">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full blur-2xl opacity-30 animate-pulse-glow"></div>
                  <div className="relative bg-[#0f1629]/80 p-6 rounded-full border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.1)]">
                    <Brain size={48} className="text-blue-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 mb-3">
                  How can I help you today?
                </h2>
                <p className="text-slate-400 text-lg font-light max-w-md">
                  Ask me anything — from coding questions to creative ideas. I'm here to assist.
                </p>
              </div>

              {/* Suggestion Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(item.prompt)}
                    className="group flex items-center gap-3 p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-indigo-500/10 hover:border-indigo-400/25 rounded-xl text-left transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)]"
                  >
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-300 group-hover:text-slate-200 transition-colors">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{item.prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ─── Messages ─── */
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 animate-fade-in ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* AI Avatar */}
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg border border-indigo-500/20 flex items-center justify-center mt-1">
                      <Brain size={16} className="text-blue-400" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3.5 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-indigo-500/15 rounded-tr-sm'
                        : 'bg-white/[0.03] border border-indigo-500/10 rounded-tl-sm'
                    }`}
                  >
                    <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-indigo-400/50' : 'text-slate-600'}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>

                  {/* User Avatar */}
                  {msg.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold mt-1 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start animate-fade-in">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg border border-indigo-500/20 flex items-center justify-center mt-1">
                    <Brain size={16} className="text-blue-400" />
                  </div>
                  <div className="bg-white/[0.03] border border-indigo-500/10 rounded-2xl rounded-tl-sm px-5 py-4">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ─── Input Area ─── */}
        <div className="relative z-10 px-4 pb-4 pt-2">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 rounded-2xl blur-sm opacity-0 focus-within:opacity-100 transition-opacity duration-500" style={{ pointerEvents: 'none' }}></div>
              <div className="relative flex items-end gap-2 bg-[#0f1629]/60 backdrop-blur-xl border border-indigo-500/15 rounded-2xl p-2 focus-within:border-indigo-400/30 transition-all duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
                <button className="p-2.5 text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] rounded-xl transition-all flex-shrink-0">
                  <Paperclip size={20} />
                </button>
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Lumiq AI..."
                  rows={1}
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm resize-none focus:outline-none py-2.5 px-1 max-h-32 overflow-y-auto"
                  style={{ minHeight: '20px' }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim()}
                  className={`p-2.5 rounded-xl transition-all duration-300 flex-shrink-0 ${
                    message.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] active:scale-95'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-3">
              Lumiq AI may produce inaccurate responses. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
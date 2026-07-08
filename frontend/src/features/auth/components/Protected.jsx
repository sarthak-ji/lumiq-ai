import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Brain } from 'lucide-react'


const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#111d3a] flex flex-col items-center justify-center gap-6">
                {/* Pulsing logo */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full blur-xl opacity-40 animate-pulse-glow"></div>
                    <div className="relative bg-[#0f1629]/80 backdrop-blur-xl p-6 rounded-full border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
                        <Brain size={40} className="text-blue-400" />
                    </div>
                </div>
                {/* Brand text */}
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                    Lumiq AI
                </h2>
                {/* Loading dots */}
                <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    
    return children;
}

export default Protected;
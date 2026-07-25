import React, { useState } from 'react';
import { Rocket, ShieldCheck, Trophy, Sparkles, UserCheck, BookOpen, User, LogIn, UserPlus } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const { state, setView } = useGame();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (role: 'student' | 'admin' = 'student', mode: 'login' | 'signup' = 'login') => {
    setAuthRole(role);
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setView('landing')} 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl p-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Rocket className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                Startup<span className="text-orange-500">Sage</span>
              </span>
              <span className="block text-xs font-bold text-orange-600 tracking-wider uppercase">
                Dream • Build • Learn • Lead
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setView('landing')} 
              className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => setView('dashboard')} 
              className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              Dashboard
            </button>
            <button 
              onClick={() => setView('leaderboard')} 
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              Leaderboard
            </button>
            <button 
              onClick={() => setView('teacher')} 
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              Teachers & Schools
            </button>
            <button 
              onClick={() => setView('admin')} 
              className="text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Admin Portal
            </button>
          </nav>

          {/* User / Auth Action Buttons */}
          <div className="flex items-center gap-3">
            {state.isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView(state.studentProfile.role === 'admin' ? 'admin' : 'profile')}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-orange-50 hover:bg-orange-100 text-slate-900 font-bold text-sm border border-orange-200 transition-all shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xs">
                    {state.studentProfile.role === 'admin' ? '⚙️' : state.studentProfile.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black leading-none">{state.studentProfile.name}</span>
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      {state.studentProfile.role === 'admin' ? 'School Admin' : state.studentProfile.classGrade}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('student', 'login')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-slate-700 hover:text-orange-600 font-bold text-sm hover:bg-slate-100 transition-all"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => openAuth('student', 'signup')}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 flex items-center gap-2 transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Student & Admin Login</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Unified Auth Modal (Student & Admin Login / Signup) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
        initialMode={authMode}
      />
    </>
  );
};

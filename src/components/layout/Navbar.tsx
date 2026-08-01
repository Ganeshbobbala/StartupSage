import React, { useState } from 'react';
import { Rocket, ShieldCheck, Trophy, Sparkles, User, LogIn, UserPlus, LogOut, GraduationCap, Sun, Moon } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const { state, setView, logoutUser, toggleTheme } = useGame();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (role: 'student' | 'admin' = 'student', mode: 'login' | 'signup' = 'login') => {
    setAuthRole(role);
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const isAdmin = state.isLoggedIn && state.studentProfile.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setView('landing')} 
            className="flex items-center gap-2.5 focus:outline-none rounded-xl p-1 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-sm">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-xl font-black text-slate-900 dark:text-white font-display">
                Startup<span className="text-orange-500">Sage</span>
              </span>
              <span className="block text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                Virtual Startup Simulation
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setView('landing')} 
              className={`text-sm font-bold transition-colors cursor-pointer ${state.currentView === 'landing' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300 hover:text-orange-600'}`}
            >
              Home
            </button>

            {/* Role-Specific Portal Button */}
            <button 
              onClick={() => {
                if (state.isLoggedIn) {
                  setView(isAdmin ? 'admin' : 'dashboard');
                } else {
                  openAuth('student', 'login');
                }
              }} 
              className={`text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                (state.currentView === 'dashboard' || state.currentView === 'admin') 
                  ? 'text-orange-600 dark:text-orange-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-orange-600'
              }`}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Admin Portal</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>Founder Journey</span>
                </>
              )}
            </button>

            <button 
              onClick={() => setView('leaderboard')} 
              className={`text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${state.currentView === 'leaderboard' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300 hover:text-orange-600'}`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              Leaderboard
            </button>
          </nav>

          {/* Action Controls: Theme Toggle & Login / Logout Pill */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle Switcher */}
            <button
              onClick={toggleTheme}
              title={state.themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {state.themeMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {state.isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView(isAdmin ? 'admin' : 'dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-orange-200 dark:border-slate-700 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-extrabold text-xs">
                    {isAdmin ? '🛡️' : '🎓'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="block text-xs font-black leading-none">{state.studentProfile.name}</span>
                    <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                      {isAdmin ? 'Admin Director' : state.studentProfile.classGrade}
                    </span>
                  </div>
                </button>

                <button
                  onClick={logoutUser}
                  title="Log Out"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-700 dark:text-red-300 font-bold text-xs border border-red-200 dark:border-red-800 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('student', 'login')}
                  className="bpt-btn-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>Student Login</span>
                </button>

                <button
                  onClick={() => openAuth('admin', 'login')}
                  className="bpt-btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>Admin Login</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
        initialMode={authMode}
      />
    </>
  );
};

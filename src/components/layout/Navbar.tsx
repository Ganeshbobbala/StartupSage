import React, { useState } from 'react';
import { Rocket, ShieldCheck, Trophy, Sparkles, User, LogIn, UserPlus, LogOut, GraduationCap, Sun, Moon, Menu, X, Home } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const { state, setView, logoutUser, toggleTheme } = useGame();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openAuth = (role: 'student' | 'admin' = 'student', mode: 'login' | 'signup' = 'login') => {
    setAuthRole(role);
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
  };

  const isAdmin = state.isLoggedIn && state.studentProfile.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1 sm:gap-4">
          
          {/* Brand Logo - Compact on Mobile */}
          <button 
            onClick={() => setView('landing')} 
            className="flex items-center gap-2 focus:outline-none rounded-xl p-1 cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-sm">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-left">
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display">
                Startup<span className="text-orange-500">Sage</span>
              </span>
              <span className="hidden sm:block text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
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

          {/* Action Controls: Theme Toggle & Responsive Login Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Theme Toggle Switcher */}
            <button
              onClick={toggleTheme}
              title={state.themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 cursor-pointer shrink-0"
            >
              {state.themeMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {state.isLoggedIn ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setView(isAdmin ? 'admin' : 'dashboard')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-orange-200 dark:border-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center font-extrabold text-[11px]">
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
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-700 dark:text-red-300 font-bold text-xs border border-red-200 dark:border-red-800 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => openAuth('student', 'login')}
                  className="bpt-btn-secondary text-[11px] sm:text-xs py-1.5 px-2 sm:px-3.5 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                  <span>Student <span className="hidden xs:inline">Login</span></span>
                </button>

                <button
                  onClick={() => openAuth('admin', 'login')}
                  className="bpt-btn-secondary text-[11px] sm:text-xs py-1.5 px-2 sm:px-3 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                  <span>Admin <span className="hidden xs:inline">Login</span></span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer ml-1"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <button 
              onClick={() => { setView('landing'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left font-bold py-2 px-3 rounded-xl flex items-center gap-2 text-sm ${
                state.currentView === 'landing' ? 'bg-orange-50 dark:bg-slate-800 text-orange-600 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (state.isLoggedIn) {
                  setView(isAdmin ? 'admin' : 'dashboard');
                } else {
                  openAuth('student', 'login');
                }
              }}
              className={`w-full text-left font-bold py-2 px-3 rounded-xl flex items-center gap-2 text-sm ${
                (state.currentView === 'dashboard' || state.currentView === 'admin') ? 'bg-orange-50 dark:bg-slate-800 text-orange-600 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {isAdmin ? <ShieldCheck className="w-4 h-4 text-orange-600" /> : <Sparkles className="w-4 h-4 text-orange-500" />}
              <span>{isAdmin ? 'Admin Portal' : 'Founder Journey'}</span>
            </button>

            <button 
              onClick={() => { setView('leaderboard'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left font-bold py-2 px-3 rounded-xl flex items-center gap-2 text-sm ${
                state.currentView === 'leaderboard' ? 'bg-orange-50 dark:bg-slate-800 text-orange-600 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Leaderboard</span>
            </button>
          </div>
        )}
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

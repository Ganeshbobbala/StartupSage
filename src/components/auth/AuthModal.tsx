import React, { useState } from 'react';
import { 
  X, Rocket, ShieldCheck, User, Mail, Lock, School, Key, ArrowRight, CheckCircle2, Sparkles
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'student' | 'admin';
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  initialMode = 'login'
}) => {
  const { loginUser } = useGame();
  const [role, setRole] = useState<'student' | 'admin'>(initialRole);
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('Delhi Public School');
  const [grade, setGrade] = useState('Class 8');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (role === 'admin' && mode === 'signup' && adminCode && adminCode.trim().toUpperCase() !== 'SAGE-ADMIN-2026') {
      setError('Invalid School Admin Code. Use SAGE-ADMIN-2026 for demo access.');
      return;
    }

    const userName = name.trim() || (role === 'admin' ? 'Dr. Sunita Rao (School Admin)' : 'Aarav Sharma');
    const userEmail = email.trim() || (role === 'admin' ? 'admin@dps.edu.in' : 'aarav@student.edu');

    loginUser(userName, userEmail, role, school, grade);
    onClose();
  };

  const handleQuickStudentLogin = () => {
    loginUser('Aarav Sharma', 'aarav.student@school.edu', 'student', 'Delhi Public School', 'Class 8');
    onClose();
  };

  const handleQuickAdminLogin = () => {
    loginUser('Dr. Sunita Rao', 'admin@dps.edu.in', 'admin', 'Delhi Public School', 'Admin Portal');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              {role === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <Rocket className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-black font-display tracking-tight text-white">
                {mode === 'login' ? 'Welcome Back!' : 'Join StartupSage'}
              </h2>
              <p className="text-xs text-orange-400 font-bold tracking-wide uppercase">
                {role === 'admin' ? 'Educator & School Admin Portal' : 'Student Founder Learning Space'}
              </p>
            </div>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-6 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-700/50">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(null); }}
              className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                role === 'student'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student Founder</span>
            </button>

            <button
              type="button"
              onClick={() => { setRole('admin'); setError(null); }}
              className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                role === 'admin'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin / Teacher</span>
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Mode Switch Sub-header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {mode === 'login' ? 'Account Credentials' : 'Create New Account'}
            </span>
            <div className="flex gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`px-3 py-1 rounded-lg transition ${
                  mode === 'login' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`px-3 py-1 rounded-lg transition ${
                  mode === 'signup' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Name Field (Sign Up Only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {role === 'admin' ? 'Full Name & Academic Title' : 'Student Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder={role === 'admin' ? 'Dr. Sunita Rao' : 'Aarav Sharma'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {/* School Name Field */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School / Institution</label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Delhi Public School"
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {role === 'admin' ? 'Admin Role' : 'Grade / Class'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'admin' ? 'Coordinator' : 'Class 8-A'}
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {/* Admin Passcode (For Admin Signup) */}
          {role === 'admin' && mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                <span>School Admin Access Code</span>
                <span className="text-orange-600 font-mono text-[11px]">Demo: SAGE-ADMIN-2026</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-amber-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="SAGE-ADMIN-2026"
                  value={adminCode}
                  onChange={e => setAdminCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {role === 'admin' ? 'Institutional Email' : 'Student Email / ID'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder={role === 'admin' ? 'admin@school.edu.in' : 'student@school.edu'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 shadow-lg ${
              role === 'admin'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25'
            }`}
          >
            <span>{mode === 'login' ? `Login as ${role === 'admin' ? 'Admin' : 'Student'}` : `Create ${role === 'admin' ? 'Admin' : 'Student'} Account`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Instant Demo Login Links */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <span className="text-[11px] text-center font-bold text-slate-400 uppercase tracking-wider">Instant Demo Access</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickStudentLogin}
                className="py-2 px-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Demo Student</span>
              </button>

              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

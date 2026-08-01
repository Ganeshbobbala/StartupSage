import React, { useState, useEffect } from 'react';
import { 
  X, Rocket, ShieldCheck, User, Mail, Lock, Key, ArrowRight, Sparkles, GraduationCap, School 
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

  // Synchronize internal state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRole(initialRole);
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialRole, initialMode]);

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

  const handleQuickDemoLogin = () => {
    if (role === 'admin') {
      loginUser('Dr. Sunita Rao', 'admin@dps.edu.in', 'admin', 'Delhi Public School', 'Admin Director');
    } else {
      loginUser('Aarav Sharma', 'aarav.student@school.edu', 'student', 'Delhi Public School', 'Class 8');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              {role === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-black font-display tracking-tight text-white">
                {role === 'admin' ? 'Educator & Admin Portal' : 'Student Founder Portal'}
              </h2>
              <p className="text-xs text-orange-400 font-bold tracking-wide uppercase">
                {role === 'admin' ? 'School Admin & Teacher Access' : 'Student Learning Space'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Mode Switch Sub-header (Login vs Sign Up) */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {role === 'admin'
                ? (mode === 'login' ? 'Admin Login' : 'Admin Registration')
                : (mode === 'login' ? 'Student Login' : 'Student Registration')
              }
            </span>
            <div className="flex gap-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  mode === 'login'
                    ? 'bg-orange-500 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-orange-500 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Name Field (Sign Up Mode) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {role === 'admin' ? 'Educator Full Name' : 'Student Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder={role === 'admin' ? 'Dr. Sunita Rao' : 'Aarav Sharma'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {/* School Name & Details (Sign Up Mode) */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">School</label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Delhi Public School"
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {role === 'admin' ? 'Role Title' : 'Class / Grade'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'admin' ? 'Principal / Teacher' : 'Class 8-A'}
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {/* Admin Verification Code (Admin Sign Up Mode Only) */}
          {role === 'admin' && mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                School Access Code
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="SAGE-ADMIN-2026"
                  value={adminCode}
                  onChange={e => setAdminCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 uppercase"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Use demo code: SAGE-ADMIN-2026</span>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {role === 'admin' ? 'Institutional Email' : 'Student Email / ID'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder={role === 'admin' ? 'admin@school.edu.in' : 'student@school.edu'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-extrabold text-white bpt-btn-primary transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>
              {mode === 'login'
                ? `Login as ${role === 'admin' ? 'Admin' : 'Student'}`
                : `Register ${role === 'admin' ? 'Admin' : 'Student'} Account`
              }
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          {/* Quick Instant Demo Access */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <span className="text-[11px] text-center font-bold text-slate-400 uppercase tracking-wider">Instant Demo Access</span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 bg-orange-50 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-400 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 border border-orange-200 dark:border-slate-700 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Click for Instant Demo {role === 'admin' ? 'Admin' : 'Student'} Login</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

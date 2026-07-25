import React from 'react';
import { Rocket, Heart, Shield, Sparkles, Award } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const Footer: React.FC = () => {
  const { setView } = useGame();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center text-white shadow-lg">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black gradient-text font-display">StartupSage</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering school students (Classes 6–12) to think like innovators through gamified AI simulations, storytelling, and problem solving.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/50 w-fit">
              <Shield className="w-4 h-4 text-emerald-400" />
              100% Child Safe & COPPA Compliant
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => setView('onboarding')} className="hover:text-indigo-400 transition-colors">Start Simulation</button>
              </li>
              <li>
                <button onClick={() => setView('dashboard')} className="hover:text-indigo-400 transition-colors">Student Dashboard</button>
              </li>
              <li>
                <button onClick={() => setView('leaderboard')} className="hover:text-indigo-400 transition-colors">Global Leaderboard</button>
              </li>
              <li>
                <button onClick={() => setView('passport')} className="hover:text-indigo-400 transition-colors">Founder Passport</button>
              </li>
            </ul>
          </div>

          {/* Educators & Parents */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">For Educators & Parents</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => setView('teacher')} className="hover:text-indigo-400 transition-colors">Teacher Dashboard</button>
              </li>
              <li>
                <button onClick={() => setView('parent')} className="hover:text-indigo-400 transition-colors">Parent Progress View</button>
              </li>
              <li>
                <span className="hover:text-indigo-400 cursor-pointer">ATL Innovation Labs</span>
              </li>
              <li>
                <span className="hover:text-indigo-400 cursor-pointer">Curriculum Guide</span>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Support & Trust</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><span className="hover:text-indigo-400 cursor-pointer">About Us</span></li>
              <li><span className="hover:text-indigo-400 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-indigo-400 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-indigo-400 cursor-pointer">Contact Team</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StartupSage. All rights reserved. Dream. Build. Learn. Lead.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>for future young innovators.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

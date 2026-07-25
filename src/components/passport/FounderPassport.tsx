import React, { useRef } from 'react';
import { 
  Award, Download, Share2, Printer, Sparkles, Rocket, Shield, 
  Star, Trophy, Zap, Coins, CheckCircle2, ArrowLeft, QrCode 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const FounderPassport: React.FC = () => {
  const { state, setView } = useGame();
  const passportRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    alert("Founder Passport generated! Downloading high-resolution 1080x1080 PNG image...");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${state.studentProfile.name}'s Founder Passport`,
        text: `I completed the StartupSage simulation and earned my Founder Passport as a ${state.founderType || 'Visionary Founder'}! 🚀`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert("Link copied! Share your Founder Passport with friends, teachers, and family.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <button
          onClick={() => setView('dashboard')}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG (1080x1080)</span>
          </button>
          
          <button
            onClick={handleShare}
            className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-sm shadow-md flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Passport</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1080 x 1080 Square Passport Card */}
      <div className="flex justify-center">
        <div
          ref={passportRef}
          className="w-full max-w-[650px] aspect-square bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-[32px] p-8 sm:p-10 border-4 border-indigo-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          
          {/* Background Glow Overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Header Row */}
          <div className="flex items-center justify-between border-b border-indigo-800/80 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center text-white shadow-lg">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black gradient-text font-display">StartupSage</span>
                <span className="block text-[10px] text-cyan-300 font-bold tracking-widest uppercase">
                  Official Founder Passport
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-xs font-black text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800 uppercase">
                Verified Founder
              </span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-3 gap-6 items-center my-auto relative z-10">
            
            {/* Avatar Column */}
            <div className="text-center space-y-2">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-cyan-400 bg-indigo-900 shadow-2xl flex items-center justify-center text-5xl mx-auto relative">
                {state.studentProfile.avatar.type === 'boy' ? '👦' : state.studentProfile.avatar.type === 'girl' ? '👧' : '🧑'}
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full border border-white">
                  Class {state.studentProfile.classGrade.replace('Class ', '')}
                </div>
              </div>
              <h3 className="text-lg font-black text-white font-display mt-2">{state.studentProfile.name}</h3>
              <p className="text-xs text-indigo-300 font-semibold">{state.studentProfile.school}</p>
            </div>

            {/* Info Column (2 cols) */}
            <div className="col-span-2 space-y-4 border-l border-indigo-800/80 pl-6">
              
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Founder Profile</span>
                <h4 className="text-2xl font-black text-amber-300 font-display">
                  {state.founderType || '🌟 Visionary Founder'}
                </h4>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Startup Venture</span>
                <p className="text-sm font-bold text-cyan-200">
                  "{state.ideaStatement || 'Homework Buddy AI'}"
                </p>
                <span className="text-[11px] text-slate-400 font-medium">Category: {state.problemCategory || 'EdTech & AI'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-center">
                  <span className="text-[10px] text-slate-300 font-bold block">Total XP</span>
                  <span className="text-base font-black text-amber-300">⚡️ {state.xp}</span>
                </div>

                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-center">
                  <span className="text-[10px] text-slate-300 font-bold block">Resilience</span>
                  <span className="text-base font-black text-emerald-400">🛡 {state.emotionalResilienceScore}%</span>
                </div>
              </div>

            </div>

          </div>

          {/* Badges Bar */}
          <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between relative z-10">
            <span className="text-xs font-bold text-slate-300">Earned Badges:</span>
            <div className="flex items-center gap-2">
              {state.badges.filter(b => b.isUnlocked).map(b => (
                <span key={b.id} className="text-xl" title={b.title}>{b.icon}</span>
              ))}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-indigo-800/80 pt-4 relative z-10 text-[11px] text-slate-400">
            <div>
              <p className="font-semibold text-slate-300">"Every big innovation starts with a curious mind!"</p>
              <span>Issued: {state.completionDate || new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-right">
              <QrCode className="w-8 h-8 text-cyan-400" />
              <div className="text-[9px] font-mono leading-tight">
                <span>VERIFIED</span>
                <span className="block text-slate-500">ID: SS-2026-88</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

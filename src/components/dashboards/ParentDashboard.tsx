import React from 'react';
import { 
  ShieldCheck, Heart, Sparkles, Award, ArrowLeft, CheckCircle2, 
  Brain, Users, MessageCircle, Star 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ParentDashboard: React.FC = () => {
  const { state, setView } = useGame();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <button
          onClick={() => setView('dashboard')}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Parent Portal • Child Safe & Educational</span>
        </span>
      </div>

      {/* Child Overview Banner */}
      <div className="gradient-button rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-3xl border-2 border-white shadow-md">
            {state.studentProfile.avatar.type === 'boy' ? '👦' : state.studentProfile.avatar.type === 'girl' ? '👧' : '🧑'}
          </div>
          <div>
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">Child Progress View</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display">{state.studentProfile.name}'s Learning Journey</h2>
            <p className="text-indigo-100 text-xs mt-0.5">
              {state.studentProfile.classGrade} • {state.studentProfile.school}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-[10px] text-slate-200 font-bold block uppercase">Founder Profile</span>
            <span className="text-sm font-black text-amber-300">{state.founderType || '🌟 Visionary'}</span>
          </div>
        </div>
      </div>

      {/* Skills Developed Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900 font-display">Key Skills Developed in Simulation</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1">
            <span className="text-2xl">🧠</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Problem Solving</h4>
            <p className="text-xs text-slate-600">Discovered real-world pain points and built structured solutions.</p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-100 space-y-1">
            <span className="text-2xl">🤝</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Team Collaboration</h4>
            <p className="text-xs text-slate-600">Selected co-founders and assigned complementary roles.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
            <span className="text-2xl">🪙</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Budgeting & Math</h4>
            <p className="text-xs text-slate-600">Allocated ₹5,00,000 seed resources across product & marketing.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
            <span className="text-2xl">🛡</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Resilience</h4>
            <p className="text-xs text-slate-600">Overcame startup crises during "The Wall" with confidence.</p>
          </div>
        </div>
      </div>

      {/* Conversation Starters for Parents */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            Dinner Table Conversation Starters
          </h3>
        </div>
        <p className="text-xs text-slate-500">Ask your child these 3 fun questions to encourage critical thinking at home:</p>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 space-y-1 shadow-sm">
            <span className="text-indigo-600 font-bold block">Question 1:</span>
            <p>"What problem did your startup solve for {state.activePersona?.name || 'your target customer'}?"</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 space-y-1 shadow-sm">
            <span className="text-indigo-600 font-bold block">Question 2:</span>
            <p>"How did your team handle the crisis when the prototype broke during Stage 5?"</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 space-y-1 shadow-sm">
            <span className="text-indigo-600 font-bold block">Question 3:</span>
            <p>"What is the most important lesson you learned about spending your startup budget?"</p>
          </div>
        </div>
      </div>

      {/* View Passport & Certificate Shortcuts */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setView('passport')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span>View Child's Founder Passport</span>
        </button>

        <button
          onClick={() => setView('certificate')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span>View Official Certificate</span>
        </button>
      </div>

    </div>
  );
};

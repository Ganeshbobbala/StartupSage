import React, { useState } from 'react';
import { 
  Award, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  Trophy, Star, Heart, Flame, ShieldCheck, Download, Share2, Rocket 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { FounderType } from '../../types/game';

const FOUNDER_TYPES: { type: FounderType; desc: string; icon: string }[] = [
  { type: '🏗 Builder', desc: 'You excel at turning ideas into working prototypes and solving tech problems.', icon: '🏗' },
  { type: '🧠 Strategist', desc: 'You analyze options carefully, plan budgets wisely, and make calculated choices.', icon: '🧠' },
  { type: '🌟 Visionary', desc: 'You see big possibilities, inspire team members, and think ahead.', icon: '🌟' },
  { type: '🔥 Innovator', desc: 'You thrive on creativity, original ideas, and novel solutions.', icon: '🔥' },
  { type: '💪 Resilient Leader', desc: 'You stay calm during crisis stages, adapt quickly, and never give up.', icon: '💪' },
  { type: '🤝 Team Champion', desc: 'You bring people together, delegate roles respectfully, and build strong trust.', icon: '🤝' },
  { type: '🌍 Community Hero', desc: 'You focus deeply on real-world empathy, helping others and creating social impact.', icon: '🌍' }
];

export const Stage8Journey: React.FC = () => {
  const { state, completeSimulation, setView, triggerConfetti } = useGame();

  const [selectedFounderType, setSelectedFounderType] = useState<FounderType>('🌟 Visionary');
  const [prideChoice, setPrideChoice] = useState<string>('My perseverance');
  const [reflectionInput, setReflectionInput] = useState<string>('');
  const [isGraduated, setIsGraduated] = useState<boolean>(false);

  const handleGraduation = () => {
    setIsGraduated(true);
    completeSimulation(selectedFounderType, reflectionInput || prideChoice);
    triggerConfetti();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Handcrafted Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-dark rounded-3xl p-6 border border-amber-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg">
            🎓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                Stage 8 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Founder Legacy Vault</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-1">
              National Incubator Graduation & Passport
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-300 px-4 py-2 rounded-2xl border border-amber-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Reward: +500 XP • Graduate Badge</span>
        </div>
      </div>

      {/* Graduation Playbook Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-amber-500/30 shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold text-xl">
          🏆
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-amber-300">National Incubator Director Note:</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            "Congratulations, {state.studentProfile.name}! You have built a startup plan from initial spark to pitch deck. Your Founder Archetype and Official Certificate are ready for stamping!"
          </p>
        </div>
      </div>

      {/* Founder Personality Reveal */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
            1. Your AI Founder Personality Profile
          </h3>
          <p className="text-slate-500 text-xs">Based on your decisions across all 8 simulation stages.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOUNDER_TYPES.map(item => {
            const isSelected = selectedFounderType === item.type;

            return (
              <div
                key={item.type}
                onClick={() => setSelectedFounderType(item.type)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-600 to-cyan-600 text-white border-indigo-600 shadow-xl scale-105'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <h4 className="font-extrabold text-base font-display">{item.type}</h4>
                <p className={`text-xs ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Summary Grid */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 font-display mb-4">
          2. Your Adventure Summary Stats
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <span className="text-xs text-indigo-700 font-bold block">Total XP Earned</span>
            <span className="text-2xl font-black text-indigo-900">⚡️ {state.xp + 500}</span>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
            <span className="text-xs text-amber-700 font-bold block">Startup Coins</span>
            <span className="text-2xl font-black text-amber-900">🪙 {state.coins + 200}</span>
          </div>

          <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100">
            <span className="text-xs text-cyan-700 font-bold block">Stages Completed</span>
            <span className="text-2xl font-black text-cyan-900">🎯 8 / 8</span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-xs text-emerald-700 font-bold block">Resilience Score</span>
            <span className="text-2xl font-black text-emerald-900">🛡 {state.emotionalResilienceScore}%</span>
          </div>
        </div>
      </div>

      {/* Emotional Reflection */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
            3. Emotional Reflection: What are you most proud of?
          </h3>
          <p className="text-slate-500 text-xs">Choose the quality that helped you most during this adventure.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            'My idea',
            'My teamwork',
            'My creativity',
            'My leadership',
            'My perseverance'
          ].map(opt => (
            <button
              key={opt}
              onClick={() => setPrideChoice(opt)}
              className={`p-3 rounded-2xl font-bold text-xs border transition-all ${
                prideChoice === opt
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              ✨ {opt}
            </button>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Personal Reflection (Optional)
          </label>
          <textarea
            rows={2}
            value={reflectionInput}
            onChange={e => setReflectionInput(e.target.value)}
            placeholder="Write a message to your future self as an innovator..."
            className="w-full p-4 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
          />
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={handleGraduation}
            className="px-10 py-4 rounded-2xl gradient-button text-white font-extrabold text-base shadow-xl inline-flex items-center gap-3"
          >
            <Trophy className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>Complete Journey & Claim Graduation Rewards</span>
          </button>
        </div>
      </div>

      {/* Graduation Card & Navigation Shortcuts */}
      {isGraduated && (
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 space-y-6 shadow-2xl border border-indigo-700 animate-in fade-in zoom-in duration-300 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto text-4xl shadow-xl animate-bounce">
            🎓
          </div>

          <h3 className="text-3xl font-black font-display text-white">
            Congratulations, Founder {state.studentProfile.name}!
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            You are officially a StartupSage Graduate! View your personalized Founder Passport and Certificate below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setView('passport')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>View Founder Passport</span>
            </button>

            <button
              onClick={() => setView('certificate')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>View Certificate</span>
            </button>

            <button
              onClick={() => setView('dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2"
            >
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

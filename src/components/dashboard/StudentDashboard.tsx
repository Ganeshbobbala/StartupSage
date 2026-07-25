import React from 'react';
import { 
  Rocket, Sparkles, Trophy, Award, Zap, CheckCircle2, Lock, 
  ArrowRight, ShieldCheck, UserCheck, Flame, Coins, Star, Play 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

const STAGE_TITLES = [
  'Stage 0: The Spark',
  'Stage 1: The Idea',
  'Stage 2: Startup Plan',
  'Stage 3: Dream Team',
  'Stage 4: The Build',
  'Stage 5: The Wall',
  'Stage 6: Growth Grind',
  'Stage 7: Final Decision',
  'Stage 8: Founder Journey'
];

export const StudentDashboard: React.FC = () => {
  const { state, setStage, setView, completeDailyChallenge } = useGame();

  const completionPercentage = Math.round((state.completedStages.length / 9) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome & Level Banner */}
      <div className="gradient-button rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Avatar & Greeting */}
        <div className="flex items-center gap-5 z-10">
          <div className="w-20 h-20 rounded-full border-4 border-white/80 bg-cyan-500 shadow-xl flex items-center justify-center text-4xl relative">
            {state.studentProfile.avatar.type === 'boy' ? '👦' : state.studentProfile.avatar.type === 'girl' ? '👧' : '🧑'}
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full border border-white">
              Lvl {state.level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black font-display">{state.studentProfile.name}</h2>
              {state.studentProfile.isGuest && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Guest Mode
                </span>
              )}
            </div>
            <p className="text-indigo-100 text-sm font-medium">
              {state.studentProfile.classGrade} • {state.studentProfile.school}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                {state.streak} Day Streak
              </span>
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                Innovation: {state.innovationScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Gamification XP & Coins Stats */}
        <div className="flex items-center gap-4 z-10 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider block">Total XP</span>
            <span className="text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 fill-amber-300" />
              {state.xp}
            </span>
          </div>

          <div className="w-px h-10 bg-white/20"></div>

          <div className="text-center">
            <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider block">Startup Coins</span>
            <span className="text-2xl font-black text-yellow-300 flex items-center justify-center gap-1">
              <Coins className="w-5 h-5 fill-yellow-300" />
              {state.coins}
            </span>
          </div>
        </div>

      </div>

      {/* Main Grid: Progress & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Stage Progression Roadmap */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display">Simulation Roadmap</h3>
              <p className="text-slate-500 text-xs font-medium">Complete all 8 stages to earn your Founder Passport</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-indigo-600">{completionPercentage}%</span>
              <span className="text-xs text-slate-500 block">Completed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="h-full gradient-button rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Stage List Cards */}
          <div className="space-y-3">
            {STAGE_TITLES.map((title, idx) => {
              const isCompleted = state.completedStages.includes(idx);
              const isCurrent = state.currentStage === idx;
              const isLocked = idx > 4 && !state.hasUnlockedPremium && !isCompleted;

              return (
                <div
                  key={idx}
                  onClick={() => setStage(idx)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-50 border-indigo-300 shadow-md ring-2 ring-indigo-500/20'
                      : isCompleted
                      ? 'bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50'
                      : 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : isCurrent 
                        ? 'gradient-button text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {idx === 0 && 'Identify a real problem & AI target persona'}
                        {idx === 1 && 'Refine startup idea with 3-way chat simulation'}
                        {idx === 2 && 'Fill out 6-block Startup Planning Canvas'}
                        {idx === 3 && 'Pick 3 co-founders and assign team roles'}
                        {idx === 4 && 'Allocate ₹5,00,000 seed budget sliders'}
                        {idx === 5 && 'Overcome crisis during "The Wall" stage'}
                        {idx === 6 && 'Manage 6 months of startup growth timeline'}
                        {idx === 7 && 'Make the final crossroads decision'}
                        {idx === 8 && 'Generate Founder Passport & Certificate'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Done ✓
                      </span>
                    )}
                    {isCurrent && (
                      <button className="px-4 py-1.5 rounded-xl gradient-button text-white text-xs font-extrabold flex items-center gap-1">
                        <span>Play Now</span>
                        <Play className="w-3 h-3 fill-white" />
                      </button>
                    )}
                    {isLocked && (
                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Premium
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Col: Today's Challenge & Quick Actions */}
        <div className="space-y-6">
          
          {/* Today's Challenge Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Today's Mission
              </span>
              <span className="font-black text-amber-200 text-xs flex items-center gap-1">
                +50 XP • +20 Coins
              </span>
            </div>

            <h4 className="text-lg font-black font-display mb-2">
              "Identify 1 school problem solvable with tech!"
            </h4>
            <p className="text-amber-100 text-xs leading-relaxed mb-4">
              Look around your school or home. What daily hassle could a smart web app make easier?
            </p>

            <button
              onClick={completeDailyChallenge}
              disabled={state.dailyChallengeCompleted}
              className={`w-full py-3 rounded-2xl font-extrabold text-sm shadow-md transition-all ${
                state.dailyChallengeCompleted
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-white text-orange-600 hover:bg-slate-100'
              }`}
            >
              {state.dailyChallengeCompleted ? 'Mission Completed! ✓ (+50 XP)' : 'Complete Challenge'}
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg space-y-3">
            <h4 className="font-extrabold text-slate-900 text-base font-display">Quick Shortcuts</h4>

            <button
              onClick={() => setStage(state.currentStage)}
              className="w-full p-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm flex items-center justify-between shadow-md"
            >
              <span className="flex items-center gap-2">
                <Rocket className="w-4 h-4" /> Continue Simulation
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setView('passport')}
              className="w-full p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-between border border-indigo-200"
            >
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" /> View Founder Passport
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setView('leaderboard')}
              className="w-full p-3.5 rounded-2xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold text-sm flex items-center justify-between border border-cyan-200"
            >
              <span className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cyan-600" /> Global Leaderboard
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Badges Overview Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-base font-display">Earned Badges</h4>
              <span className="text-xs font-bold text-indigo-600">
                {state.badges.filter(b => b.isUnlocked).length} / {state.badges.length}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {state.badges.map(badge => (
                <div
                  key={badge.id}
                  title={`${badge.title}: ${badge.description}`}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-2xl border transition-all ${
                    badge.isUnlocked
                      ? 'bg-amber-50 border-amber-300 shadow-sm scale-105'
                      : 'bg-slate-100 border-slate-200 opacity-40 grayscale'
                  }`}
                >
                  <span>{badge.icon}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

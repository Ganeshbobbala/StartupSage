import React, { useState } from 'react';
import { 
  TrendingUp, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  Smile, Users, Star, Award, Calendar, ChevronRight 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

const MONTH_EVENTS = [
  {
    month: 1,
    title: 'Month 1: User Feedback Request',
    event: '50 students signed up! But they want an offline mode for studying without internet.',
    options: [
      { text: 'Ask students what features matter most first', outcome: 'Great customer empathy! +30 Happy Customers' },
      { text: 'Immediately start building offline mode', outcome: 'Building fast! +20 Customers' },
      { text: 'Ignore feedback and add flashy colors', outcome: 'Users prefer function over fluff.' }
    ]
  },
  {
    month: 2,
    title: 'Month 2: School Assembly Showcase',
    event: 'Your Principal invites your team to present at the main school assembly!',
    options: [
      { text: 'Practice pitch 3 times with your team first', outcome: 'Confident presentation! +15% Innovation Score' },
      { text: 'Present right away without prep', outcome: 'A bit nervous, but brave!' },
      { text: 'Ask Sara the Presenter to handle it solo', outcome: 'Sara shines on stage!' }
    ]
  },
  {
    month: 3,
    title: 'Month 3: Competition App Launches',
    event: 'Another school team launched a similar app. How do you respond?',
    options: [
      { text: 'Focus on improving your unique user experience', outcome: 'Continuous innovation! +20 Team Morale' },
      { text: 'Partner with them to combine ideas', outcome: 'Collaboration win!' },
      { text: 'Worry and stop working', outcome: 'Sage encourages you to keep going!' }
    ]
  },
  {
    month: 4,
    title: 'Month 4: Feature Prioritization',
    event: 'Your team wants to build 5 new things at once. What do you prioritize?',
    options: [
      { text: 'Pick 1 most requested feature and polish it', outcome: 'Smart focus! +40 Happy Customers' },
      { text: 'Try building all 5 features half-done', outcome: 'Quality suffers when rushed.' }
    ]
  },
  {
    month: 5,
    title: 'Month 5: Regional Innovation Fair',
    event: 'Your startup is selected for the District Innovation Fair!',
    options: [
      { text: 'Prepare poster, live demo, and team pitch', outcome: 'Judges love the preparation!' },
      { text: 'Only bring a poster', outcome: 'Demos leave a bigger impression!' }
    ]
  },
  {
    month: 6,
    title: 'Month 6: Final Showcase Debrief',
    event: 'You survived 6 months of startup growth! How do you evaluate your journey?',
    options: [
      { text: 'We learned to listen to users & pivot quickly!', outcome: 'True growth mindset! +500 XP Earned!' }
    ]
  }
];

export const Stage6Growth: React.FC = () => {
  const { setMonthlyDecision, completeStage, addXPCoins, unlockBadge, triggerConfetti } = useGame();

  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(0);
  const [selectedDecision, setSelectedDecision] = useState<number | null>(null);
  const [customers, setCustomers] = useState<number>(120);
  const [morale, setMorale] = useState<number>(90);
  const [innovation, setInnovation] = useState<number>(85);
  const [completedGrind, setCompletedGrind] = useState<boolean>(false);

  const activeMonth = MONTH_EVENTS[currentMonthIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedDecision(optIdx);
    setMonthlyDecision(activeMonth.month, activeMonth.options[optIdx].text);

    // Update stats
    setCustomers(prev => prev + 25);
    setMorale(prev => Math.min(100, prev + 5));
    setInnovation(prev => Math.min(100, prev + 5));
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < MONTH_EVENTS.length - 1) {
      setCurrentMonthIdx(prev => prev + 1);
      setSelectedDecision(null);
    } else {
      setCompletedGrind(true);
      addXPCoins(500, 200);
      unlockBadge('growth-champion');
      triggerConfetti();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg">
            📈
          </div>
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Stage 6 of 8
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-display mt-1">
              Grow Your Startup – 6-Month Timeline
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-2xl border border-amber-200 font-bold text-xs">
          <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Reward: +500 XP • +200 Coins • Badge Unlocked</span>
        </div>
      </div>

      {/* Stats Header Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Happy Users</span>
          <span className="text-2xl font-black text-indigo-600 flex items-center justify-center gap-1">
            😊 {customers}
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Team Morale</span>
          <span className="text-2xl font-black text-emerald-600 flex items-center justify-center gap-1">
            👥 {morale}%
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Innovation Score</span>
          <span className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
            ⭐ {innovation}
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Month Timeline</span>
          <span className="text-2xl font-black text-cyan-600 flex items-center justify-center gap-1">
            📅 {currentMonthIdx + 1} / 6
          </span>
        </div>
      </div>

      {/* Month Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
            Month {activeMonth.month} Event
          </span>
          <span className="text-xs text-slate-500 font-semibold">Simulated Growth Timeline</span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 font-display">{activeMonth.title}</h3>
        <p className="text-slate-700 text-sm leading-relaxed bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 font-medium">
          "{activeMonth.event}"
        </p>

        {/* Options */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Make Your Monthly Decision:
          </span>
          <div className="grid grid-cols-1 gap-3">
            {activeMonth.options.map((opt, idx) => {
              const isSelected = selectedDecision === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  <h5 className="font-extrabold text-sm">{opt.text}</h5>
                  {isSelected && (
                    <p className="text-xs text-cyan-200 pt-1 font-semibold">✓ Outcome: {opt.outcome}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDecision !== null && (
          <div className="flex justify-end pt-4">
            <button
              onClick={handleNextMonth}
              className="px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-lg flex items-center gap-2"
            >
              <span>{currentMonthIdx < 5 ? `Advance to Month ${currentMonthIdx + 2}` : 'Finish 6-Month Timeline'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Final 6-Month Complete Card */}
      {completedGrind && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl border border-indigo-700 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-black font-display text-white">6 Months of Growth Complete! 🎉</h4>
              <p className="text-cyan-300 text-xs mt-1">Unlocked Badge: "Growth Champion" (+500 XP • +200 Coins)</p>
            </div>
            <span className="text-4xl">📈</span>
          </div>

          <p className="text-slate-200 text-sm leading-relaxed">
            "Your startup grew from a small problem spark into an active solution used by {customers} happy students! You demonstrated adaptability, team leadership, and steady growth."
          </p>

          <div className="flex justify-end">
            <button
              onClick={() => completeStage(6)}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2"
            >
              <span>Continue to Stage 7: The Final Crossroads</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

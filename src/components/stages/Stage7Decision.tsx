import React, { useState } from 'react';
import { 
  Compass, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  Rocket, Trophy, Users, RefreshCw, Award 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

const FUTURE_PATHS = [
  {
    id: 'improve',
    title: 'Option 1 – Continuous Improvement',
    icon: '🏗',
    tagline: 'Keep building & helping more students',
    description: 'Focus on listening to user feedback, polishing your product features, and expanding your reach to nearby schools.',
    lesson: 'Continuous Learning & Product Excellence'
  },
  {
    id: 'compete',
    title: 'Option 2 – Enter National Competitions',
    icon: '🏆',
    tagline: 'Represent your school on stage',
    description: 'Pitch your startup at ATL Innovation marathons, state science fairs, and national entrepreneurship expos.',
    lesson: 'Public Speaking, Pitching & Confidence'
  },
  {
    id: 'partner',
    title: 'Option 3 – Partner with Another Team',
    icon: '🤝',
    tagline: 'Combine forces to create a bigger solution',
    description: 'Merge your app with a complementary student startup team to build a super-platform for education.',
    lesson: 'Strategic Collaboration & Partnerships'
  },
  {
    id: 'new_idea',
    title: 'Option 4 – Launch a New Innovation',
    icon: '💡',
    tagline: 'Start a fresh startup with newfound wisdom',
    description: 'Take everything you learned about problem solving, team building, and budgeting to start a brand new venture!',
    lesson: 'Serial Entrepreneurship & Resilience'
  }
];

export const Stage7Decision: React.FC = () => {
  const { setFuturePath, completeStage, addXPCoins, unlockBadge, triggerConfetti } = useGame();

  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [decisionSaved, setDecisionSaved] = useState<boolean>(false);

  const handleSelectPath = (pathId: string) => {
    setSelectedPath(pathId);
  };

  const handleConfirmDecision = () => {
    if (!selectedPath) return;

    setFuturePath(selectedPath);
    setDecisionSaved(true);
    addXPCoins(500, 250);
    unlockBadge('future-founder');
    triggerConfetti();
  };

  const chosenObject = FUTURE_PATHS.find(p => p.id === selectedPath);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Handcrafted Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-dark rounded-3xl p-6 border border-amber-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                Stage 7 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Boardroom & Pivot Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-1">
              Investor Pitch & Future Strategy Room
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-300 px-4 py-2 rounded-2xl border border-amber-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Reward: +500 XP • +250 Coins</span>
        </div>
      </div>

      {/* Boardroom Pitch Playbook Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-amber-500/30 shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold text-xl">
          📊
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-amber-300">Boardroom Decision Strategy Note:</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            "Instagram started as 'Burbn' (a bloated location app) before pivoting strictly to photos. YouTube started as a video dating site! Choose your next strategic direction wisely."
          </p>
        </div>
      </div>

      {/* 4 Future Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FUTURE_PATHS.map(path => {
          const isSelected = selectedPath === path.id;

          return (
            <div
              key={path.id}
              onClick={() => handleSelectPath(path.id)}
              className={`glass-card rounded-3xl p-6 border transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 space-y-4 ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-indigo-50/90 shadow-lg'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{path.icon}</span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                  {path.lesson}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900 font-display">{path.title}</h4>
                <p className="text-xs font-bold text-indigo-600 mt-1">{path.tagline}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{path.description}</p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                <span className={isSelected ? 'text-indigo-600' : 'text-slate-500'}>
                  {isSelected ? 'Path Selected ✓' : 'Select Path →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm Decision Button */}
      {selectedPath && !decisionSaved && (
        <div className="text-center pt-4">
          <button
            onClick={handleConfirmDecision}
            className="px-10 py-4 rounded-2xl gradient-button text-white font-extrabold text-base shadow-xl inline-flex items-center gap-3"
          >
            <Compass className="w-5 h-5" />
            <span>Confirm Choice & Unlock "Future Founder" Badge</span>
          </button>
        </div>
      )}

      {/* AI Path Reflection */}
      {decisionSaved && chosenObject && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl border border-indigo-700 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-black font-display text-white">Decision Confirmed! 🎉</h4>
              <p className="text-cyan-300 text-xs mt-1">Unlocked Badge: "Future Founder" (+500 XP • +250 Coins)</p>
            </div>
            <span className="text-4xl">{chosenObject.icon}</span>
          </div>

          <p className="text-slate-200 text-sm leading-relaxed">
            "Choosing <span className="font-bold text-cyan-300">{chosenObject.title}</span> reflects your vision! You are developing strategic foresight that real-world leaders use every day."
          </p>

          <div className="flex justify-end">
            <button
              onClick={() => completeStage(7)}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2"
            >
              <span>Proceed to Stage 8: Your Founder Journey & Passport</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

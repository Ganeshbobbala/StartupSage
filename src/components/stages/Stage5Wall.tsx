import React, { useState } from 'react';
import { 
  ShieldAlert, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  Volume2, Play, Pause, Heart, RefreshCw, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { FreemiumUpgradeModal } from '../common/FreemiumUpgradeModal';
import { FounderVoiceNotePlayer } from '../common/FounderVoiceNotePlayer';
import type { FounderVoiceNote } from '../../types/game';

const CRISES = [
  {
    id: 'prototype-broke',
    title: '📦 Prototype Bux Error!',
    description: 'Your app prototype crashed 15 minutes before student user testing begins in the computer lab!',
    icon: '⚡️',
    options: [
      { id: 'a', title: 'Option A: Stay Calm & Demo Paper Wireframes', detail: 'Explain the core idea clearly using poster drawings.' },
      { id: 'b', title: 'Option B: Ask Teacher Mentor for Debug Guidance', detail: 'Get guidance to fix the line of code quickly.' },
      { id: 'c', title: 'Option C: Simplify App to 1 Working Feature', detail: 'Remove complex parts and demo the single best feature.' }
    ]
  },
  {
    id: 'teammate-absent',
    title: '🎒 Key Teammate Absent!',
    description: 'Your lead presenter Sara got sick today right before the school innovation fair!',
    icon: '🤒',
    options: [
      { id: 'a', title: 'Option A: Step Up as Co-Presenter', detail: 'Take Sara’s notes and present with confidence.' },
      { id: 'b', title: 'Option B: Share Presentation Roles Together', detail: 'Each remaining co-founder presents 1 slide.' },
      { id: 'c', title: 'Option C: Play Sara’s Pre-recorded Voice Note', detail: 'Use technology to showcase Sara’s pitch.' }
    ]
  }
];

export const Stage5Wall: React.FC = () => {
  const { state, setCrisisResponse, completeStage, addXPCoins, unlockBadge, triggerConfetti } = useGame();

  const [activeCrisis] = useState(CRISES[0]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [stageFinished, setStageFinished] = useState<boolean>(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(!state.hasUnlockedPremium);

  const bptVoiceNote: FounderVoiceNote = {
    id: 'vn-1',
    founderName: 'Srushti Rao',
    founderRole: 'Co-Founder & Product Lead',
    avatar: '👩‍💼',
    topic: 'How I handled our CTO quitting 2 weeks before our major school launch',
    duration: '0:42',
    transcript: 'When our technical co-founder left 2 weeks before launch, we didn\'t panic. We stripped down the feature set to a simple working prototype, focused on our 1 core promise, and spoke directly with our first 50 student users. True founder resilience is staying focused under pressure!'
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleSubmitCrisisResponse = () => {
    if (!selectedOption) return;

    setCrisisResponse(activeCrisis, selectedOption, reflectionText);
    setStageFinished(true);
    addXPCoins(400, 150);
    unlockBadge('problem-solver');
    triggerConfetti();
  };

  return (
    <div className="bg-dark-gradient min-h-screen text-white p-4 sm:p-8 rounded-3xl space-y-8 relative overflow-hidden border border-slate-800">
      
      {/* Freemium Gate Modal */}
      <FreemiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSuccess={() => setIsUpgradeModalOpen(false)}
      />
      
      {/* Rain / Atmospheric Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Handcrafted Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-dark rounded-3xl p-6 border border-rose-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-600 text-white flex items-center justify-center text-3xl font-black shadow-lg">
            🚨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
                Stage 5 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Crisis Survival Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-1">
              The Wall of Reality – Crisis Management
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-rose-500/10 text-rose-300 px-4 py-2 rounded-2xl border border-rose-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 fill-rose-400 text-rose-400" />
          <span>Reward: +400 XP • +150 Coins</span>
        </div>
      </div>

      {/* Founder Resilience Playbook Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white rounded-3xl p-6 border border-rose-500/30 shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center flex-shrink-0 font-bold text-xl">
          🔥
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-rose-300">Founder Resilience Note:</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            "When Airbnb was nearly broke, the founders sold custom cereal boxes ($40/box) to stay alive. Obstacles will hit every company. True founders adapt quickly under pressure!"
          </p>
        </div>
      </div>

      {/* Crisis Event Card */}
      <div className="glass-dark rounded-3xl p-6 sm:p-8 border border-rose-900/60 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-400 animate-bounce" />
          <h3 className="text-2xl font-black text-white font-display">{activeCrisis.title}</h3>
        </div>

        <p className="text-slate-300 text-base leading-relaxed bg-rose-950/40 p-4 rounded-2xl border border-rose-900/40">
          "{activeCrisis.description}"
        </p>

        {/* 3 Response Options */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Choose Your Response Strategy:
          </span>
          <div className="grid grid-cols-1 gap-4">
            {activeCrisis.options.map(opt => {
              const isSelected = selectedOption === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-500 shadow-xl'
                      : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-rose-700'
                  }`}
                >
                  <div>
                    <h5 className="font-extrabold text-sm sm:text-base font-display">{opt.title}</h5>
                    <p className={`text-xs mt-1 ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                      {opt.detail}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-white bg-white text-rose-600' : 'border-slate-600'
                  }`}>
                    {isSelected && '✓'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real BPT Founder Voice Note Audio Player */}
      {selectedOption && (
        <FounderVoiceNotePlayer voiceNote={bptVoiceNote} />
      )}

      {/* Reflection & Submission */}
      {selectedOption && (
        <div className="glass-dark rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 animate-in fade-in zoom-in duration-300">
          <h4 className="font-extrabold text-white text-base font-display">
            Reflection: What did this challenge teach you?
          </h4>

          <textarea
            rows={2}
            value={reflectionText}
            onChange={e => setReflectionText(e.target.value)}
            placeholder="e.g. Staying calm under pressure helped us focus on the core value of our solution..."
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-medium text-white focus:ring-2 focus:ring-rose-500"
          />

          <button
            onClick={handleSubmitCrisisResponse}
            disabled={stageFinished}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-base shadow-xl flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{stageFinished ? 'Crisis Solved! ✓' : 'Submit Crisis Solution (+400 XP • +150 Coins)'}</span>
          </button>

          {stageFinished && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => completeStage(5)}
                className="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl flex items-center gap-2"
              >
                <span>Continue to Stage 6: 6-Month Growth Grind</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

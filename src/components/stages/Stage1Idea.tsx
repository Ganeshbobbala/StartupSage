import React, { useState } from 'react';
import { 
  Sparkles, Brain, CheckCircle2, ArrowRight, MessageSquare, Star, 
  Zap, Send, Lock, UserCheck, RefreshCw 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MilestonePath } from '../common/MilestonePath';
import { WhatsAppChatSimulator } from '../common/WhatsAppChatSimulator';
import { MilestoneStampModal } from '../common/MilestoneStampModal';
import { AuthModal } from '../auth/AuthModal';

export const Stage1Idea: React.FC = () => {
  const { state, setIdeaData, completeStage, addXPCoins, triggerConfetti } = useGame();

  const [chatsDone, setChatsDone] = useState(false);
  const [ideaStatement, setIdeaStatement] = useState<string>(
    state.ideaStatement || 'An app pairing students in 5-minute study & wellness challenge streaks with friends.'
  );
  const [showScorecard, setShowScorecard] = useState<boolean>(false);
  const [showStampModal, setShowStampModal] = useState<boolean>(false);
  const [showLoginWall, setShowLoginWall] = useState<boolean>(false);

  const handleEvaluateIdea = () => {
    if (!ideaStatement.trim()) return;

    setShowScorecard(true);
    addXPCoins(150, 30);
    triggerConfetti();
    setIdeaData(
      ideaStatement,
      { creativity: 5, clarity: 5, innovation: 4, impact: 5 }
    );
  };

  const handleFinishStage1 = () => {
    setShowStampModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Milestone Journey Node Bar */}
      <MilestonePath currentStage={1} />

      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-white flex items-center justify-center text-3xl shadow-lg">
            💡
          </div>
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Stage 1 of 8
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-display mt-1">
              The Idea – Customer Validation Chats
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-2xl border border-amber-200 font-bold text-xs">
          <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Reward: +150 XP • +30 Coins</span>
        </div>
      </div>

      {/* 1. WhatsApp Customer Interview Simulator */}
      <WhatsAppChatSimulator onChatsReviewed={() => setChatsDone(true)} />

      {/* 2. Define 1-Line Startup Idea */}
      {chatsDone && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">Decision Point</span>
            <h3 className="text-xl font-extrabold text-slate-900 font-display mt-0.5">
              2. Define your startup idea in ONE clear line:
            </h3>
            <p className="text-slate-600 text-xs mt-1">
              Based on your WhatsApp interviews with Riya, Dr. Mehta, and Kabir, how would you pitch your solution?
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              rows={3}
              value={ideaStatement}
              onChange={(e) => setIdeaStatement(e.target.value)}
              placeholder="e.g. A peer-to-peer study streak app that pairs students in 5-minute daily challenges..."
              className="w-full p-4 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500 bg-white"
            />

            <button
              onClick={handleEvaluateIdea}
              className="bpt-btn-primary px-8 py-3.5 text-xs font-extrabold rounded-2xl flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              <span>Validate 1-Line Idea (+150 XP • +30 Coins)</span>
            </button>
          </div>
        </div>
      )}

      {/* Scorecard Results */}
      {showScorecard && (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-700 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-indigo-800 pb-4">
            <div>
              <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">Idea Validation Scorecard</span>
              <h4 className="text-2xl font-black font-display text-white mt-1">Validation Rating: 95/100</h4>
            </div>
            <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-2xl border border-emerald-500/40">
              ✓ Ready for 6-Block Lean Canvas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-slate-300 block">Creativity</span>
              <span className="text-lg font-black text-amber-300">⭐️⭐️⭐️⭐️⭐️ (5/5)</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-slate-300 block">Clarity</span>
              <span className="text-lg font-black text-amber-300">⭐️⭐️⭐️⭐️⭐️ (5/5)</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-slate-300 block">Innovation</span>
              <span className="text-lg font-black text-amber-300">⭐️⭐️⭐️⭐️ (4/5)</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-slate-300 block">User Impact</span>
              <span className="text-lg font-black text-amber-300">⭐️⭐️⭐️⭐️⭐️ (5/5)</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleFinishStage1}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2"
            >
              <span>Claim Stamp & Proceed to Stage 2</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* Milestone Stamp Modal */}
      <MilestoneStampModal
        isOpen={showStampModal}
        stageNumber={1}
        stageTitle="The Idea – Customer Validation"
        xpReward={150}
        coinReward={30}
        onContinue={() => {
          setShowStampModal(false);
          completeStage(1);
          if (state.studentProfile.isGuest) {
            setShowLoginWall(true);
          }
        }}
      />

      {/* Stage 2 Guest Preview Hard Login Wall */}
      {showLoginWall && (
        <AuthModal
          isOpen={showLoginWall}
          onClose={() => setShowLoginWall(false)}
          initialRole="student"
          initialMode="signup"
        />
      )}

    </div>
  );
};

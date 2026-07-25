import React from 'react';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MilestoneStampModalProps {
  isOpen: boolean;
  stageNumber: number;
  stageTitle: string;
  xpReward: number;
  coinReward: number;
  onContinue: () => void;
}

export const MilestoneStampModal: React.FC<MilestoneStampModalProps> = ({
  isOpen,
  stageNumber,
  stageTitle,
  xpReward,
  coinReward,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-6">
        
        {/* Physical Wax Seal Stamp Animation */}
        <div className="flex justify-center pt-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 border-4 border-orange-700 text-white flex flex-col items-center justify-center shadow-xl milestone-stamp relative">
            <Award className="w-10 h-10 stroke-[2.5]" />
            <span className="text-[9px] font-black tracking-widest uppercase mt-0.5">VERIFIED</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Milestone Stamp Earned
          </span>
          <h3 className="text-2xl font-black font-display text-slate-900 mt-2">
            Stage {stageNumber} Approved!
          </h3>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            "{stageTitle}" complete. Your founder journey grows stronger!
          </p>
        </div>

        {/* Reward Badges */}
        <div className="flex items-center justify-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 font-extrabold text-xs text-orange-600 bg-orange-100/60 px-3 py-1.5 rounded-xl">
            <span>⚡</span>
            <span>+{xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1.5 font-extrabold text-xs text-amber-600 bg-amber-100/60 px-3 py-1.5 rounded-xl">
            <span>🪙</span>
            <span>+{coinReward} Founder Coins</span>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="bpt-btn-primary w-full text-sm font-extrabold py-3.5"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

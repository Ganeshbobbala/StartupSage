import React from 'react';
import { Lock, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface FreemiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const FreemiumUpgradeModal: React.FC<FreemiumUpgradeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { unlockPremium } = useGame();

  if (!isOpen) return null;

  const handleUnlock = () => {
    unlockPremium();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-orange-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon Header */}
        <div className="flex flex-col items-center text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 border-2 border-orange-400 text-white flex items-center justify-center shadow-xl">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-xs font-black text-orange-400 uppercase tracking-widest bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
            Phase 1 Premium Pass Required
          </span>
          <h3 className="text-2xl font-black font-display text-white mt-1">
            Unlock Stages 5 – 8 & Founder Passport
          </h3>
          <p className="text-xs text-slate-300 max-w-sm">
            You completed the Free Prototype Tier (Stages 0–4)! Upgrade to unlock Stage 5: The Wall, 6-Month Grind, and earn your official Founder Passport.
          </p>
        </div>

        {/* Feature List */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-3 text-xs">
          <div className="flex items-center gap-3 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span><strong>Stage 5 • The Wall</strong>: Face 1 of 8 major startup crises</span>
          </div>
          <div className="flex items-center gap-3 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span><strong>Real BPT Founder Voice Notes</strong>: 30–45s founder audio clips</span>
          </div>
          <div className="flex items-center gap-3 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span><strong>Stage 6 & 7</strong>: 6-Month Grind & Investor Crossroads</span>
          </div>
          <div className="flex items-center gap-3 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span><strong>1080x1080 Founder Passport Card</strong> & Resilience Score</span>
          </div>
        </div>

        {/* Pricing Badge & Unlock Button */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between bg-orange-500/10 border border-orange-500/30 p-3.5 rounded-2xl">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">One-Time Founder Pass</span>
              <span className="text-xl font-black text-amber-400">₹299 <span className="text-xs text-slate-400 font-medium line-through">₹999</span></span>
            </div>
            <span className="text-[11px] font-bold text-orange-400 bg-orange-500/20 px-2.5 py-1 rounded-full border border-orange-500/30">
              70% OFF Phase 1 Special
            </span>
          </div>

          <button
            onClick={handleUnlock}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 btn-tactile"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Unlock Full Simulation (₹299)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

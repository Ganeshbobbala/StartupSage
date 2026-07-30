import React from 'react';
import { Lock, Sparkles, CheckCircle2, Award, Zap, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface FreemiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export const FreemiumUpgradeModal: React.FC<FreemiumUpgradeModalProps> = ({
  isOpen,
  onClose,
  onUnlocked,
}) => {
  const { unlockPremium } = useGame();

  if (!isOpen) return null;

  const handleUnlockDemo = () => {
    unlockPremium();
    onUnlocked();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/40 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="flex justify-center pt-2">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-orange-500/20 border-2 border-amber-400">
            <Lock className="w-10 h-10" />
          </div>
        </div>

        <div>
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            Phase 1 Premium Unlock
          </span>
          <h3 className="text-2xl font-black font-display text-white mt-2">
            Unlock Stages 5 – 8 & Founder Passport
          </h3>
          <p className="text-sm text-slate-300 font-medium mt-1">
            You've completed the Free Stages (0–4)! Upgrade to experience "The Wall", "The Grind", and earn your official Founder Passport.
          </p>
        </div>

        {/* Premium Value Props */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left space-y-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Stage 5: The Wall</strong> — Face 1 of 8 major startup crises</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Real BPT Founder Voice Notes</strong> — Audio clips from real founders</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Stage 6: The 6-Month Grind</strong> — Monthly revenue & decision engine</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Stage 8: Founder Passport</strong> — 1080x1080px shareable badge + Certificate</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-center gap-2 text-2xl font-black font-display text-amber-400">
            <span>₹299</span>
            <span className="text-xs text-slate-400 line-through font-normal">₹999</span>
            <span className="text-xs font-extrabold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
              70% OFF Phase 1 Pass
            </span>
          </div>

          <button
            onClick={handleUnlockDemo}
            className="bpt-btn-primary w-full py-4 text-sm font-black flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500"
          >
            <Sparkles className="w-4 h-4" />
            <span>Unlock Premium Access (Demo Unlock)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

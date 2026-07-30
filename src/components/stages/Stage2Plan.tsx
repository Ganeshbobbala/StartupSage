import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, Zap, 
  RefreshCw, Pin, StickyNote, Award, Lightbulb, TrendingUp
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { CanvasPlan } from '../../types/game';
import { MilestonePath } from '../common/MilestonePath';
import { MilestoneStampModal } from '../common/MilestoneStampModal';

export const Stage2Plan: React.FC = () => {
  const { state, setCanvasPlan, completeStage, addXPCoins, unlockBadge, triggerConfetti } = useGame();

  const [showStampModal, setShowStampModal] = useState<boolean>(false);
  const [plan, setPlan] = useState<CanvasPlan>({
    problem: state.problemStatement || 'Students lose track of homework deadlines across 5 different physical notebooks.',
    solution: state.ideaStatement || 'A fun animated study app with daily streak badges and automated assignment reminders.',
    users: 'Class 6 to 12 students & homework coordinator teachers',
    features: 'Automated notification streaks, digital binder, peer study rooms',
    promotion: 'School morning assembly pitches, posters, student WhatsApp groups',
    rewards: 'Freemium monthly sub ($2/mo) & local tutoring center sponsorships'
  });

  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<string | null>(null);

  const handleFieldChange = (field: keyof CanvasPlan, value: string) => {
    setPlan(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (presetType: 'solar' | 'cafeteria' | 'bookswap') => {
    if (presetType === 'solar') {
      setPlan({
        problem: 'Rural students lack reliable electricity for evening study sessions.',
        solution: 'Solar-powered backpack with integrated LED study lamp & phone charger.',
        users: 'Rural & suburban school students (Classes 6-12).',
        features: 'Lightweight solar panel, 10,000mAh battery, detachable LED lamp.',
        promotion: 'NGO partnerships, rural school demo camps, local news.',
        rewards: 'Direct sales to school boards & CSR corporate grants.'
      });
    } else if (presetType === 'cafeteria') {
      setPlan({
        problem: 'School cafeterias waste 40 kg of food daily, raising disposal costs.',
        solution: 'Compact organic waste digester converting scraps to rich campus fertilizer.',
        users: 'School cafeteria managers & student eco-clubs.',
        features: 'Odorless digestion chamber, nutrient level sensor, eco dashboard.',
        promotion: 'Green school competitions & principal council showcases.',
        rewards: 'Sell organic fertilizer to local gardens & school sustainability budget.'
      });
    } else {
      setPlan({
        problem: 'Students spend too much buying expensive new fiction & textbook editions.',
        solution: 'Peer-to-peer campus book exchange app with reading streak rewards.',
        users: 'Avid student readers & parents saving textbook costs.',
        features: 'Barcode scanner, credit swap system, reading leaderboard.',
        promotion: 'Library posters, English teacher recommendations.',
        rewards: 'Small transaction fee ($0.50) & bookstore discount coupons.'
      });
    }
  };

  const handleEvaluatePlan = () => {
    setIsReviewing(true);

    setTimeout(() => {
      setCanvasPlan(plan);
      const feedback = "Your 6-Block Lean Canvas is rock-solid! You have mapped a clear line from real user pain points to your solution and revenue stream. You're ready to build your dream team!";
      setReviewResult(feedback);
      setIsReviewing(false);
      
      addXPCoins(200, 50);
      unlockBadge('idea-planner');
      triggerConfetti();
    }, 1200);
  };

  const filledCount = Object.values(plan).filter(val => val.trim().length > 5).length;
  const completionPct = Math.round((filledCount / 6) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 corkboard-pattern min-h-screen rounded-3xl p-6 border border-slate-800">
      
      {/* Milestone Journey Node Bar */}
      <MilestonePath currentStage={2} />

      {/* Handcrafted Stage Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-dark rounded-3xl p-6 border border-amber-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg">
            📋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                Stage 2 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Founder Blueprint Board</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-1">
              6-Block Digital Canvas
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
            <span className="block text-[10px] text-slate-400 uppercase font-bold">Canvas Completion</span>
            <span className="text-lg font-black text-amber-400">{completionPct}% ({filledCount}/6 Blocks)</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-300 px-4 py-2.5 rounded-2xl border border-amber-500/30 font-bold text-xs">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>+200 XP • +50 Coins</span>
          </div>
        </div>
      </div>

      {/* Human Founder Playbook Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/90 text-white rounded-3xl p-6 border border-amber-500/30 shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-amber-300">Founder's Playbook Note:</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            "Airbnb, Dropbox, and Uber all started as simple 1-page napkin notes. Don't write 50-page business reports! Fill out these 6 colored sticky notes to map your startup."
          </p>
          <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Try Sample Presets:</span>
            <button onClick={() => handleApplyPreset('solar')} className="bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-700 font-medium transition">
              ☀️ Solar Backpack
            </button>
            <button onClick={() => handleApplyPreset('cafeteria')} className="bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2.5 py-1 rounded-lg border border-slate-700 font-medium transition">
              ♻️ Eco Digester
            </button>
            <button onClick={() => handleApplyPreset('bookswap')} className="bg-slate-800 hover:bg-slate-700 text-pink-300 px-2.5 py-1 rounded-lg border border-slate-700 font-medium transition">
              📚 Book Swap
            </button>
          </div>
        </div>
      </div>

      {/* 6-Block Sticky Note Corkboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Block 1: Problem */}
        <div className="sticky-note-pink rounded-2xl p-6 relative shadow-2xl space-y-3 min-h-[220px]">
          <div className="tape-header"></div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">❓</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-900 bg-white/60 px-2.5 py-0.5 rounded-full">
              Block 1
            </span>
          </div>
          <h4 className="font-extrabold text-pink-950 text-base font-display">1. Target Problem</h4>
          <p className="text-xs text-pink-900/80 font-medium">What specific frustration are you eliminating?</p>
          <textarea
            rows={4}
            value={plan.problem}
            onChange={e => handleFieldChange('problem', e.target.value)}
            className="w-full p-3 rounded-xl border border-pink-300/80 text-xs font-semibold text-pink-950 bg-white/80 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Block 2: Solution */}
        <div className="sticky-note-yellow rounded-2xl p-6 relative shadow-2xl space-y-3 min-h-[220px]">
          <div className="tape-header"></div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">💡</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-white/60 px-2.5 py-0.5 rounded-full">
              Block 2
            </span>
          </div>
          <h4 className="font-extrabold text-amber-950 text-base font-display">2. Solution Concept</h4>
          <p className="text-xs text-amber-900/80 font-medium">How does your idea solve this simply?</p>
          <textarea
            rows={4}
            value={plan.solution}
            onChange={e => handleFieldChange('solution', e.target.value)}
            className="w-full p-3 rounded-xl border border-amber-300/80 text-xs font-semibold text-amber-950 bg-white/80 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Block 3: Target Users */}
        <div className="sticky-note-cyan rounded-2xl p-6 relative shadow-2xl space-y-3 min-h-[220px]">
          <div className="tape-header"></div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">👥</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-900 bg-white/60 px-2.5 py-0.5 rounded-full">
              Block 3
            </span>
          </div>
          <h4 className="font-extrabold text-cyan-950 text-base font-display">3. Target Audience</h4>
          <p className="text-xs text-cyan-900/80 font-medium">Who is the primary buyer or active user?</p>
          <textarea
            rows={4}
            value={plan.users}
            onChange={e => handleFieldChange('users', e.target.value)}
            className="w-full p-3 rounded-xl border border-cyan-300/80 text-xs font-semibold text-cyan-950 bg-white/80 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Block 4: Key Features */}
        <div className="sticky-note-green rounded-2xl p-6 relative shadow-2xl space-y-3 min-h-[220px]">
          <div className="tape-header"></div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">⚡</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-white/60 px-2.5 py-0.5 rounded-full">
              Block 4
            </span>
          </div>
          <h4 className="font-extrabold text-emerald-950 text-base font-display">4. Core Features</h4>
          <p className="text-xs text-emerald-900/80 font-medium">What key modules or perks make it unique?</p>
          <textarea
            rows={4}
            value={plan.features}
            onChange={e => handleFieldChange('features', e.target.value)}
            className="w-full p-3 rounded-xl border border-emerald-300/80 text-xs font-semibold text-emerald-950 bg-white/80 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Block 5: Promotion & Channels */}
        <div className="sticky-note-yellow rounded-2xl p-6 relative shadow-2xl space-y-3 min-h-[220px]">
          <div className="tape-header"></div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">📢</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-white/60 px-2.5 py-0.5 rounded-full">
              Block 5
            </span>
          </div>
          <h4 className="font-extrabold text-amber-950 text-base font-display">5. Marketing Channels</h4>
          <p className="text-xs text-amber-900/80 font-medium">How will you reach your first 100 users?</p>
          <textarea
            rows={4}
            value={plan.promotion}
            onChange={e => handleFieldChange('promotion', e.target.value)}
            className="w-full p-3 rounded-xl border border-amber-300/80 text-xs font-semibold text-amber-950 bg-white/80 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Block 6: Value & Revenue */}
        <div className="sticky-note-pink rounded-2xl p-6 relative shadow-2xl space-y-3 min-h-[220px]">
          <div className="tape-header"></div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">💎</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-900 bg-white/60 px-2.5 py-0.5 rounded-full">
              Block 6
            </span>
          </div>
          <h4 className="font-extrabold text-pink-950 text-base font-display">6. Revenue Model</h4>
          <p className="text-xs text-pink-900/80 font-medium">How will the project sustain itself financially?</p>
          <textarea
            rows={4}
            value={plan.rewards}
            onChange={e => handleFieldChange('rewards', e.target.value)}
            className="w-full p-3 rounded-xl border border-pink-300/80 text-xs font-semibold text-pink-950 bg-white/80 focus:bg-white focus:outline-none"
          />
        </div>

      </div>

      {/* Action Button */}
      <div className="text-center pt-6">
        <button
          onClick={handleEvaluatePlan}
          disabled={isReviewing}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-base shadow-2xl flex items-center justify-center gap-3 mx-auto transition transform hover:-translate-y-1"
        >
          {isReviewing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Validating Canvas Blocks...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Submit Founder Canvas & Unlock Stage 3</span>
            </>
          )}
        </button>
      </div>

      {/* Evaluation Results Modal / Banner */}
      {reviewResult && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-8 text-white space-y-6 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-3xl shadow-lg">
                🎖️
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-white font-display">Canvas Approved!</h4>
                <p className="text-amber-400 text-xs font-semibold">Unlocked Badge: "Idea Planner" 💡</p>
              </div>
            </div>
            <div className="bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-2xl font-bold text-sm">
              +200 XP • +50 Founder Coins
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-medium bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
            "{reviewResult}"
          </p>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowStampModal(true)}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition"
            >
              <span>Claim Stamp & Proceed to Stage 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Milestone Stamp Modal */}
      <MilestoneStampModal
        isOpen={showStampModal}
        stageNumber={2}
        stageTitle="The Plan – 6-Block Lean Canvas"
        xpReward={200}
        coinReward={50}
        onContinue={() => {
          setShowStampModal(false);
          completeStage(2);
        }}
      />

    </div>
  );
};


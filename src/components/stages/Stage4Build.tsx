import React, { useState } from 'react';
import { 
  Rocket, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  PieChart, Sliders, ShieldCheck, Lock, Star, Play, Gift 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const Stage4Build: React.FC = () => {
  const { state, setBudgetAllocation, completeStage, addXPCoins, unlockBadge, unlockPremium, triggerConfetti } = useGame();

  const [allocation, setAllocation] = useState({
    product: 40,
    marketing: 20,
    team: 15,
    tools: 15,
    learning: 10
  });

  const totalSpent = allocation.product + allocation.marketing + allocation.team + allocation.tools + allocation.learning;

  const [surpriseCardClaimed, setSurpriseCardClaimed] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [buildFinished, setBuildFinished] = useState<boolean>(false);
  const [showPremiumGate, setShowPremiumGate] = useState<boolean>(false);

  const handleSliderChange = (cat: keyof typeof allocation, val: number) => {
    setAllocation(prev => ({ ...prev, [cat]: val }));
  };

  const handleClaimSurprise = () => {
    setSurpriseCardClaimed(true);
    addXPCoins(50, 10);
    triggerConfetti();
  };

  const handleFinishBuild = () => {
    setBudgetAllocation(allocation);
    setBuildFinished(true);
    addXPCoins(300, 100);
    unlockBadge('startup-builder');
    triggerConfetti();
  };

  const handleProceedToWall = () => {
    completeStage(4);
    if (!state.hasUnlockedPremium) {
      setShowPremiumGate(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Handcrafted Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-dark rounded-3xl p-6 border border-emerald-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg">
            🛠️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                Stage 4 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Financial & Product Workbench</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-1">
              Resource & Seed Budget Allocation
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-300 px-4 py-2 rounded-2xl border border-emerald-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
          <span>Reward: +300 XP • +100 Coins</span>
        </div>
      </div>

      {/* Financial Playbook Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-emerald-500/30 shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center flex-shrink-0 font-bold text-xl">
          💰
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-emerald-300">Financial Runway Strategy Note:</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            "You have 🪙 100 Founder Capital Coins (₹5,00,000 seed budget). High-performing startups spend at least 40% on core product engineering and keep 10% in emergency cash reserve!"
          </p>
        </div>
      </div>

      {/* Budget Sliders & Dynamic Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Sliders */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 font-display">Budget Sliders</h3>
            <span className={`text-xs font-black px-3 py-1 rounded-full ${
              totalSpent === 100 
                ? 'bg-emerald-100 text-emerald-800' 
                : totalSpent > 100 
                ? 'bg-rose-100 text-rose-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              Total Allocated: 🪙 {totalSpent} / 100 Coins
            </span>
          </div>

          <div className="space-y-5">
            {/* Product Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>🏗 Build Product & Tech</span>
                <span className="text-indigo-600">🪙 {allocation.product} Coins</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={allocation.product}
                onChange={e => handleSliderChange('product', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Marketing Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>📢 Tell People & Marketing</span>
                <span className="text-cyan-600">🪙 {allocation.marketing} Coins</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={allocation.marketing}
                onChange={e => handleSliderChange('marketing', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Team Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>👥 Co-Founder Stipends</span>
                <span className="text-amber-600">🪙 {allocation.team} Coins</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={allocation.team}
                onChange={e => handleSliderChange('team', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            {/* Tools Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>🛠 Software & Cloud Tools</span>
                <span className="text-purple-600">🪙 {allocation.tools} Coins</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={allocation.tools}
                onChange={e => handleSliderChange('tools', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Learning Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>📚 Learning & Mentorship</span>
                <span className="text-emerald-600">🪙 {allocation.learning} Coins</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={allocation.learning}
                onChange={e => handleSliderChange('learning', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Live Pie Visualizer & Surprise Card */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg space-y-4 text-center">
            <h4 className="font-extrabold text-slate-900 text-sm font-display">Live Allocation Preview</h4>
            
            {/* Visual Bar Breakdown */}
            <div className="w-full h-6 rounded-xl overflow-hidden flex shadow-inner border border-slate-200">
              <div style={{ width: `${allocation.product}%` }} className="bg-indigo-600 h-full" title="Product"></div>
              <div style={{ width: `${allocation.marketing}%` }} className="bg-cyan-500 h-full" title="Marketing"></div>
              <div style={{ width: `${allocation.team}%` }} className="bg-amber-500 h-full" title="Team"></div>
              <div style={{ width: `${allocation.tools}%` }} className="bg-purple-500 h-full" title="Tools"></div>
              <div style={{ width: `${allocation.learning}%` }} className="bg-emerald-500 h-full" title="Learning"></div>
            </div>

            <div className="text-left space-y-1 text-xs text-slate-600 pt-2">
              <p>• Product: {allocation.product}%</p>
              <p>• Marketing: {allocation.marketing}%</p>
              <p>• Team: {allocation.team}%</p>
              <p>• Tools: {allocation.tools}%</p>
              <p>• Learning: {allocation.learning}%</p>
            </div>
          </div>

          {/* Surprise Card */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 rounded-3xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
              <Gift className="w-4 h-4" /> Surprise Event Card
            </div>
            <h4 className="font-black text-base font-display">⭐ Teacher Mentor Bonus!</h4>
            <p className="text-xs font-semibold text-slate-900">
              Your computer teacher offers free cloud hosting and internet access for your school startup project!
            </p>
            <button
              onClick={handleClaimSurprise}
              disabled={surpriseCardClaimed}
              className={`w-full py-2.5 rounded-xl font-black text-xs shadow-md ${
                surpriseCardClaimed
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-slate-950 text-white hover:bg-slate-900'
              }`}
            >
              {surpriseCardClaimed ? 'Claimed (+50 XP • +10 Coins)' : 'Claim Free Bonus!'}
            </button>
          </div>
        </div>

      </div>

      {/* Mini Quiz & Launch Ceremony */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
            Resource Planning Mini-Quiz
          </h3>
          <p className="text-slate-600 text-xs">Why should startups save some coins instead of spending everything at once?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setQuizAnswer('a')}
            className={`p-4 rounded-2xl border text-left font-bold text-xs ${
              quizAnswer === 'a' ? 'bg-rose-100 border-rose-300 text-rose-900' : 'bg-white border-slate-200'
            }`}
          >
            A) Spend all 100 coins immediately on shiny gadgets.
          </button>
          <button
            onClick={() => setQuizAnswer('b')}
            className={`p-4 rounded-2xl border text-left font-bold text-xs ${
              quizAnswer === 'b' ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200'
            }`}
          >
            B) Reserve a buffer for unexpected future challenges & crises! (Correct)
          </button>
        </div>

        {quizAnswer === 'b' && (
          <div className="pt-4 border-t border-slate-200 text-center">
            <button
              onClick={handleFinishBuild}
              disabled={buildFinished}
              className="px-10 py-4 rounded-2xl gradient-button text-white font-extrabold text-base shadow-xl inline-flex items-center gap-3"
            >
              <Rocket className="w-5 h-5 animate-bounce" />
              <span>Launch Prototype & Claim Badge</span>
            </button>
          </div>
        )}

        {buildFinished && (
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in duration-300 shadow-xl border border-indigo-700">
            <div>
              <h4 className="text-xl font-black font-display text-white">Prototype Ready for Launch! 🚀</h4>
              <p className="text-slate-300 text-xs mt-1">Unlocked Badge: "Startup Builder" (+300 XP • +100 Coins)</p>
            </div>
            <button
              onClick={handleProceedToWall}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2"
            >
              <span>Face Stage 5: The Wall Crisis</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}
      </div>

      {/* Premium Unlock Gate Modal */}
      {showPremiumGate && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-xl w-full p-8 bg-white border border-slate-200 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-200">
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto text-4xl shadow-xl animate-bounce">
              🎉
            </div>

            <div>
              <span className="bg-indigo-100 text-indigo-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Full Simulation Access
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-2">
                You've Built Your Startup!
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Now the real adventure begins. Unlock Stages 5 to 8!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left text-xs font-bold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">⭐ Stage 5: The Wall Crisis</div>
              <div className="flex items-center gap-2">⭐ Founder Voice Notes</div>
              <div className="flex items-center gap-2">⭐ Stage 6: 6-Month Grind</div>
              <div className="flex items-center gap-2">⭐ Official Founder Passport</div>
              <div className="flex items-center gap-2">⭐ Verifiable Digital Certificate</div>
              <div className="flex items-center gap-2">⭐ 8+ Rare Badges & Rewards</div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  unlockPremium();
                  setShowPremiumGate(false);
                }}
                className="w-full py-4 rounded-2xl gradient-button text-white font-extrabold text-base shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Unlock Full Adventure (Demo Pass)</span>
              </button>

              <button
                onClick={() => setShowPremiumGate(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200"
              >
                Continue Exploring Free Stages
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

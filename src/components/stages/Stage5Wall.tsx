import React, { useState } from 'react';
import { 
  ShieldAlert, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  Volume2, Play, Pause, Heart, RefreshCw, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MilestonePath } from '../common/MilestonePath';
import { MilestoneStampModal } from '../common/MilestoneStampModal';
import { FounderVoiceNotePlayer } from '../common/FounderVoiceNotePlayer';
import { FreemiumUpgradeModal } from '../common/FreemiumUpgradeModal';

const CRISES = [
  {
    id: 'cto-quits',
    title: '🚨 Crisis Alert: Lead CTO Quits 2 Weeks Before Launch!',
    description: 'Your co-founder lead developer got overwhelmed with final exams and quit the team, leaving you with incomplete code 14 days before launch!',
    icon: '⚡️',
    options: [
      { id: 'a', title: 'Option A: Simplify Product to No-Code MVP', detail: 'Cut non-essential features and launch a lightweight version.' },
      { id: 'b', title: 'Option B: Recruit Computer Science Teacher', detail: 'Ask your CS teacher mentor for guidance to patch the code.' },
      { id: 'c', title: 'Option C: Postpone Launch 2 Weeks', detail: 'Take time to recruit a new co-founder developer from Class 10.' }
    ]
  },
  {
    id: 'competitor-launches',
    title: '⚡️ Competitor Launches Copycat App!',
    description: 'A well-funded rival team in Class 10 just copied your exact core feature and launched aggressive posters!',
    icon: '🥊',
    options: [
      { id: 'a', title: 'Option A: Double Down on Superior User Support', detail: 'Win customer loyalty with personalized peer onboarding.' },
      { id: 'b', title: 'Option B: Pivot to Niche Market', detail: 'Focus exclusively on middle school students where competitors have zero reach.' },
      { id: 'c', title: 'Option C: Form Strategic Partnership', detail: 'Propose a merger to build a combined powerhouse team.' }
    ]
  }
];

export const Stage5Wall: React.FC = () => {
  const { state, setCrisisResponse, completeStage, addXPCoins, unlockBadge, triggerConfetti } = useGame();

  const [activeCrisis] = useState(CRISES[0]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [stageFinished, setStageFinished] = useState<boolean>(false);

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(prev => !prev);
  };

  const handleSubmitCrisisResponse = () => {
    if (!selectedOption) return;

    setCrisisResponse(activeCrisis, selectedOption, reflectionText);
    setStageFinished(true);
    addXPCoins(400, 150);
    unlockBadge('problem-solver');
    triggerConfetti();
  };

  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(!state.hasUnlockedPremium);
  const [showStampModal, setShowStampModal] = useState<boolean>(false);

  return (
    <div className="bg-dark-gradient min-h-screen text-white p-4 sm:p-8 rounded-3xl space-y-8 relative overflow-hidden border border-slate-800">
      
      {/* Milestone Journey Node Bar */}
      <MilestonePath currentStage={5} />

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
              The Wall of Reality – Something Has Gone Wrong!
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-rose-500/10 text-rose-300 px-4 py-2 rounded-2xl border border-rose-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 fill-rose-400 text-rose-400" />
          <span>Reward: +400 XP • +150 Coins</span>
        </div>
      </div>

      {/* Embedded Real BPT Founder Voice Note Player */}
      <FounderVoiceNotePlayer
        founderName="Srushti (BPT Founder & CEO)"
        founderRole="BPT Founder Voice"
        avatarEmoji="👩‍💼"
        title="When Our Lead Developer Quit 2 Weeks Before Launch"
        durationSeconds={42}
        transcriptText="When our lead developer quit right before our deadline, panic set in. But we took a deep breath, simplified our core MVP to just 1 feature, and launched on schedule. The lesson? A simple working product beats a complex broken one every single time!"
      />

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

      {/* Real Founder Voice Note Component */}
      {selectedOption && (
        <div className="glass-dark rounded-3xl p-6 border border-slate-800 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-cyan-400" />
              <h4 className="font-bold text-white text-sm font-display">Real Founder Voice Note</h4>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              0:35 Audio Lesson
            </span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
            <button
              onClick={handleToggleAudio}
              className="w-12 h-12 rounded-2xl bg-cyan-500 text-slate-950 font-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              {isPlayingAudio ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950" />}
            </button>
            <div className="flex-1">
              <h5 className="font-bold text-white text-xs">Real Founder Insights</h5>
              <p className="text-slate-400 text-[11px] italic">
                "{isPlayingAudio ? 'Playing voice clip...' : 'Click play to hear how real founders handle product failures.'}"
              </p>
            </div>
          </div>
        </div>
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
                onClick={() => setShowStampModal(true)}
                className="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl flex items-center gap-2"
              >
                <span>Claim Stamp & Proceed to Stage 6</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Freemium Upgrade Modal (Stage 5 Gate ₹299) */}
      <FreemiumUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUnlocked={() => setShowUpgradeModal(false)}
      />

      {/* Milestone Stamp Modal */}
      <MilestoneStampModal
        isOpen={showStampModal}
        stageNumber={5}
        stageTitle="The Wall of Reality – Crisis Solved!"
        xpReward={400}
        coinReward={150}
        onContinue={() => {
          setShowStampModal(false);
          completeStage(5);
        }}
      />

    </div>
  );
};

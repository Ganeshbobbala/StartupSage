import React, { useState } from 'react';
import { 
  Rocket, Sparkles, Brain, Award, ArrowRight, ArrowLeft, Check, 
  User, Palette, Sparkle, Shield, Smile 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { GenderAvatar } from '../../types/game';

export const OnboardingFlow: React.FC = () => {
  const { state, updateProfile, setStage, setView, triggerConfetti } = useGame();
  const [screen, setScreen] = useState<number>(1);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Local state for avatar customization
  const [name, setName] = useState(state.studentProfile?.name || 'Student Founder');
  const [classGrade, setClassGrade] = useState(state.studentProfile?.classGrade || 'Class 8');
  const [school, setSchool] = useState(state.studentProfile?.school || 'Delhi Public School');
  const [avatarType, setAvatarType] = useState<GenderAvatar>(state.studentProfile?.avatar?.type || 'boy');
  const [hairColor, setHairColor] = useState(state.studentProfile?.avatar?.hairColor || '#4F46E5');
  const [skinTone, setSkinTone] = useState(state.studentProfile?.avatar?.skinTone || '#FCD34D');
  const [outfitColor, setOutfitColor] = useState(state.studentProfile?.avatar?.outfitColor || '#06B6D4');
  const [accessory, setAccessory] = useState(state.studentProfile?.avatar?.accessory || 'Glasses');

  const handleNext = () => {
    if (screen < 5) {
      setScreen(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (screen > 1) {
      setScreen(prev => prev - 1);
    }
  };

  const handleSaveAndLaunch = () => {
    updateProfile({
      name,
      classGrade,
      school,
      avatar: {
        type: avatarType,
        hairColor,
        skinTone,
        outfitColor,
        accessory
      }
    });

    setCountdown(3);
    triggerConfetti();

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          setStage(0);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  return (
    <div className="min-h-[90vh] bg-hero-gradient flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/80 shadow-2xl relative overflow-hidden">
        
        {/* Top Stepper Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(stepNum => (
              <div
                key={stepNum}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  stepNum === screen
                    ? 'w-10 bg-indigo-600'
                    : stepNum < screen
                    ? 'w-4 bg-indigo-300'
                    : 'w-4 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Step {screen} of 5
          </span>
        </div>

        {/* SCREEN 1: Welcome */}
        {screen === 1 && (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 rounded-3xl gradient-button text-white flex items-center justify-center mx-auto mb-6 shadow-xl text-4xl animate-bounce">
              🚀
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display mb-4">
              Welcome to <span className="gradient-text">StartupSage!</span>
            </h2>
            <p className="text-slate-600 text-base max-w-lg mx-auto mb-8 leading-relaxed font-medium">
              You're about to step into the shoes of a founder! Build ideas, work with a dream team, solve crises, and earn your Founder Passport.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleNext}
                className="px-8 py-4 rounded-2xl gradient-button text-white font-extrabold text-lg shadow-xl flex items-center gap-3"
              >
                <span>Let's Begin</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: Meet AI Mentor Sage */}
        {screen === 2 && (
          <div className="py-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 rounded-3xl bg-cyan-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl text-4xl animate-pulse-glow">
              🤖
            </div>
            <h2 className="text-3xl font-black text-slate-900 font-display mb-3">
              Meet Your AI Mentor <span className="gradient-text font-black">"Sage"</span>
            </h2>
            <div className="bg-indigo-900 text-white rounded-2xl p-6 max-w-lg mx-auto mb-8 text-left shadow-lg border border-indigo-700/50 relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <h4 className="font-bold text-cyan-300 font-display">Sage's Promise:</h4>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                "I'm here to guide you through every stage! I'll explain big ideas simply, give helpful hints, celebrate your wins, and help you learn from mistakes."
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button onClick={handleBack} className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm">
                Back
              </button>
              <button onClick={handleNext} className="px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm flex items-center gap-2">
                <span>Meet Sage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: How You'll Learn */}
        {screen === 3 && (
          <div className="py-4 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-slate-900 font-display mb-2">How You'll Learn</h2>
              <p className="text-slate-600 text-sm">Learning entrepreneurship by building, deciding, and achieving!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center gap-4">
                <span className="text-3xl">🧠</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Think</h4>
                  <p className="text-xs text-slate-600">Discover real problems people care about.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50/80 border border-cyan-100 flex items-center gap-4">
                <span className="text-3xl">🏗</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Build</h4>
                  <p className="text-xs text-slate-600">Assemble co-founders & budget resources.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100 flex items-center gap-4">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Decide</h4>
                  <p className="text-xs text-slate-600">Make choices during surprise startup crises.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-4">
                <span className="text-3xl">🏆</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Earn Rewards</h4>
                  <p className="text-xs text-slate-600">Unlock Badges, XP, and Founder Passport!</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button onClick={handleBack} className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm">
                Back
              </button>
              <button onClick={handleNext} className="px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm flex items-center gap-2">
                <span>Create Avatar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: Choose Your Avatar & Details */}
        {screen === 4 && (
          <div className="py-2 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-1">
                Customize Your <span className="gradient-text">Founder Profile</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">Personalize your avatar for your Founder Passport!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Left Column: Form Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-bold text-sm text-slate-800"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Class / Grade</label>
                    <select
                      value={classGrade}
                      onChange={e => setClassGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-bold text-xs text-slate-800 bg-white"
                    >
                      {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">School</label>
                    <input
                      type="text"
                      value={school}
                      onChange={e => setSchool(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-bold text-xs text-slate-800"
                      placeholder="School name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Avatar Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'boy', label: '👦 Boy' },
                      { id: 'girl', label: '👧 Girl' },
                      { id: 'neutral', label: '🧑 Neutral' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAvatarType(item.id as GenderAvatar)}
                        className={`py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center transition-all ${
                          avatarType === item.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Accessory</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Glasses', 'Cap', 'Headphones', 'Star Badge', 'Crown', 'None'].map(acc => (
                      <button
                        key={acc}
                        type="button"
                        onClick={() => setAccessory(acc)}
                        className={`py-1.5 px-2 rounded-lg border font-semibold text-[11px] ${
                          accessory === acc
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {acc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Avatar Preview */}
              <div className="bg-gradient-to-b from-indigo-50 to-cyan-50 rounded-2xl p-6 border border-indigo-100 flex flex-col items-center justify-center text-center">
                <div 
                  className="w-28 h-28 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl mb-4 relative"
                  style={{ backgroundColor: outfitColor }}
                >
                  {avatarType === 'boy' ? '👦' : avatarType === 'girl' ? '👧' : '🧑'}
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full border border-white shadow">
                    {accessory}
                  </div>
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg">{name || 'Young Founder'}</h4>
                <p className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full mt-1">
                  {classGrade} • {school}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs text-slate-500 font-medium">Outfit Theme:</span>
                  {['#06B6D4', '#4F46E5', '#F97316', '#22C55E', '#EC4899'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setOutfitColor(c)}
                      className={`w-6 h-6 rounded-full border-2 border-white shadow-sm ${outfitColor === c ? 'scale-125 ring-2 ring-indigo-500' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-2">
              <button onClick={handleBack} className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm">
                Back
              </button>
              <button onClick={handleNext} className="px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm flex items-center gap-2">
                <span>Save Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: Ready Rocket Launch */}
        {screen === 5 && (
          <div className="py-8 text-center animate-in fade-in zoom-in duration-300">
            {countdown !== null ? (
              <div className="py-12 space-y-4">
                <div className="text-7xl font-black gradient-text font-display animate-ping">
                  {countdown}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Launching Stage 0 – The Spark!</h3>
              </div>
            ) : (
              <>
                <div className="w-28 h-28 rounded-full gradient-button text-white flex items-center justify-center mx-auto mb-6 shadow-2xl text-5xl animate-bounce">
                  🚀
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display mb-3">
                  You're Ready to Launch, <span className="gradient-text">{name}!</span>
                </h2>
                <p className="text-slate-600 text-base max-w-md mx-auto mb-8 font-medium">
                  Your adventure begins in Stage 0: Discovering a real-world problem you care about!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleSaveAndLaunch}
                    className="w-full sm:w-auto px-10 py-4 rounded-2xl gradient-button text-white font-extrabold text-lg shadow-xl flex items-center justify-center gap-3"
                  >
                    <Rocket className="w-6 h-6" />
                    <span>Start Adventure Now</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

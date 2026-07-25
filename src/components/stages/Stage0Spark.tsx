import React, { useState } from 'react';
import { 
  Sparkles, Brain, CheckCircle2, ArrowRight, Lightbulb, Zap, Coins, 
  HelpCircle, ThumbsUp, RefreshCw, Send, Mic 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Persona } from '../../types/game';
import { MilestonePath } from '../common/MilestonePath';
import { CustomerReactionWidget } from '../common/CustomerReactionWidget';
import { MilestoneStampModal } from '../common/MilestoneStampModal';

interface CategoryOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Explorer';
  persona: Persona;
  suggestions: string[];
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'healthtech',
    name: 'HealthTech',
    icon: '🏥',
    description: 'Improve student posture, mental well-being, and daily active habits.',
    difficulty: 'Easy',
    persona: {
      name: 'Ananya',
      age: 14,
      avatar: '👧',
      challenge: 'I spend 4 hours on screens after school and suffer from posture fatigue and poor sleep.',
      goals: 'Balance screen time, stay active with friends, and track hydration.',
      likes: ['Dance', 'Yoga', 'Art']
    },
    suggestions: [
      'Students spend hours slouching over screens with bad posture.',
      'Teenagers struggle with exam stress and sleep deprivation.',
      'School canteens serve junk food because healthy options are inconvenient.'
    ]
  },
  {
    id: 'edtech',
    name: 'EdTech',
    icon: '📚',
    description: 'Transform homework, study habits, and classroom collaboration.',
    difficulty: 'Easy',
    persona: {
      name: 'Aarav',
      age: 13,
      avatar: '👦',
      challenge: 'I forget assignment deadlines because homework is scattered across 5 notebooks.',
      goals: 'Finish homework early, study efficiently, and earn sports time.',
      likes: ['Coding', 'Basketball', 'Robotics']
    },
    suggestions: [
      'Students struggle to remember assignments across multiple classes.',
      'Teachers spend hours grading repetitive practice worksheets manually.',
      'Parents do not know where their child needs extra learning support.'
    ]
  },
  {
    id: 'fintech',
    name: 'FinTech',
    icon: '💳',
    description: 'Teach financial literacy, pocket money management, and smart saving.',
    difficulty: 'Medium',
    persona: {
      name: 'Rohan',
      age: 15,
      avatar: '🧑',
      challenge: 'I spend all my pocket money in the first week and have no savings for project gear.',
      goals: 'Learn to budget, track expenses, and save for personal goals.',
      likes: ['Gaming', 'Math', 'Chess']
    },
    suggestions: [
      'Students run out of allowance quickly without understanding budgeting.',
      'Kids struggle to save money for long-term personal goals or equipment.',
      'School clubs find it difficult to collect and track event fees transparently.'
    ]
  },
  {
    id: 'agritech',
    name: 'AgriTech',
    icon: '🚜',
    description: 'Help community gardens and local farms monitor soil and reduce crop waste.',
    difficulty: 'Explorer',
    persona: {
      name: 'Ramesh K.',
      age: 15,
      avatar: '🧑‍🌾',
      challenge: 'Unpredictable weather and water scarcity make it hard to protect community crops.',
      goals: 'Irrigate efficiently, detect crop pests early, and connect directly to buyers.',
      likes: ['Nature', 'Drones', 'Weather Tech']
    },
    suggestions: [
      'Local growers lose crops because they cannot detect soil moisture drops early.',
      'School organic gardens waste water due to manual unmetered watering.',
      'Fresh produce spoils before reaching local neighborhood buyers.'
    ]
  },
  {
    id: 'd2c',
    name: 'D2C (Direct to Consumer)',
    icon: '🛍️',
    description: 'Create custom handcrafted products, eco-merch, and student brands.',
    difficulty: 'Easy',
    persona: {
      name: 'Priya',
      age: 14,
      avatar: '👧',
      challenge: 'I create handmade eco-notebooks but have no easy way to showcase them to buyers.',
      goals: 'Build a brand, sell directly to eco-conscious buyers, and manage orders.',
      likes: ['Crafts', 'Design', 'Branding']
    },
    suggestions: [
      'Student creators have great handcrafted items but lack a trusted store channel.',
      'Eco-friendly school supplies are expensive and hard to find locally.',
      'Custom school spirit merchandise takes weeks to produce and ship.'
    ]
  },
  {
    id: 'saas',
    name: 'SaaS (Software as a Service)',
    icon: '⚙️',
    description: 'Build digital productivity tools for school clubs, events, and teams.',
    difficulty: 'Medium',
    persona: {
      name: 'Meera',
      age: 16,
      avatar: '👩',
      challenge: 'Managing our school annual fest requires 20 spreadsheets and constant messaging.',
      goals: 'Organize team tasks, automate volunteer shifts, and track RSVPs.',
      likes: ['Event Planning', 'Debate', 'Photography']
    },
    suggestions: [
      'School clubs waste hours manually tracking volunteer shifts on paper.',
      'Event organizers struggle to collect participant feedback efficiently.',
      'Campus libraries lack a simple digital reservation tool for study rooms.'
    ]
  },
  {
    id: 'ai_tech',
    name: 'AI / Technology',
    icon: '🤖',
    description: 'Leverage smart automation, vision AI, and bite-sized tech helpers.',
    difficulty: 'Medium',
    persona: {
      name: 'Kabir',
      age: 16,
      avatar: '👦',
      challenge: 'Learning advanced technology feels intimidating without practical mini-projects.',
      goals: 'Master AI concepts, build helpful smart bots, and showcase projects.',
      likes: ['3D Graphics', 'Robotics', 'AI']
    },
    suggestions: [
      'Students find technical coding concepts dry without instant visual feedback.',
      'Campus cafeterias cannot predict daily meal demand leading to food waste.',
      'Visually impaired campus visitors struggle to navigate unfamiliar buildings.'
    ]
  }
];

export const Stage0Spark: React.FC = () => {
  const { setProblemData, completeStage, addXPCoins } = useGame();

  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [problemInput, setProblemInput] = useState<string>('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showStampModal, setShowStampModal] = useState<boolean>(false);

  const handleSelectCategory = (cat: CategoryOption) => {
    setSelectedCategory(cat);
    setProblemInput('');
    setAiFeedback(null);
  };

  const handleApplySuggestion = (sug: string) => {
    setProblemInput(sug);
  };

  const handleSubmitProblem = () => {
    if (!problemInput.trim() || !selectedCategory) return;

    setIsEvaluating(true);

    setTimeout(() => {
      const feedbackMessage = `Outstanding problem statement! By tackling "${problemInput}" for ${selectedCategory.persona.name}, you've identified a genuine everyday frustration. Great startups are born from authentic empathy!`;
      
      setAiFeedback(feedbackMessage);
      setIsEvaluating(false);
      
      addXPCoins(100, 20);

      setProblemData(selectedCategory.name, selectedCategory.persona, problemInput, feedbackMessage);
    }, 1000);
  };

  const handleAdvanceStage = () => {
    setShowStampModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Handcrafted Milestone Journey Path Node Bar */}
      <MilestonePath currentStage={0} />

      {/* Handcrafted Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-dark rounded-3xl p-6 border border-amber-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                Stage 0 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Problem Discovery</span>
            </div>
            <h2 className="text-2xl font-black text-white font-display mt-1">
              The Spark – Uncovering Real User Problems
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-300 px-4 py-2 rounded-2xl border border-amber-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Reward: +100 XP • +20 Founder Coins</span>
        </div>
      </div>

      {/* Founder Inspiration Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex items-start gap-4 border border-amber-500/30">
        <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg font-black">
          💡
        </div>
        <div>
          <h4 className="text-lg font-bold text-amber-300 font-display mb-1">Young Founder Inspiration Note:</h4>
          <p className="text-slate-200 text-sm leading-relaxed max-w-3xl">
            "At age 16, Boyan Slat noticed more plastic bags than fish while diving in Greece and founded The Ocean Cleanup. Gitanjali Rao invented Tethys at 11 to detect lead in drinking water. Every great startup begins by noticing a real problem!"
          </p>
        </div>
      </div>

      {/* STEP 1: Select Category */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <span>1. Pick a Problem Category</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory?.id === cat.id;
            const isAnySelected = selectedCategory !== null;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                style={{ animationDelay: `${idx * 80}ms` }}
                className={`glass-card rounded-3xl p-6 border transition-all cursor-pointer stagger-card btn-tactile ${
                  isSelected
                    ? 'card-focused border-orange-500 ring-2 ring-orange-500/30 bg-orange-50/90 shadow-xl'
                    : isAnySelected
                    ? 'card-softened border-slate-200 hover:border-orange-300'
                    : 'border-slate-200 hover:border-orange-400 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl inline-block transition-transform duration-300 icon-anim-${cat.id}`}>
                    {cat.icon}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    cat.difficulty === 'Easy' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : cat.difficulty === 'Medium' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {cat.difficulty}
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 mb-1 font-display">{cat.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{cat.description}</p>

                <div className="flex items-center justify-between text-xs font-bold text-orange-600 pt-2 border-t border-slate-200/60">
                  <span>Persona: {cat.persona.name} ({cat.persona.age})</span>
                  <span>{isSelected ? 'Selected ✓' : 'Choose →'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 2: AI Persona & Problem Definition */}
      {selectedCategory && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Generated Persona Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-3xl p-6 border border-indigo-200 shadow-md flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-indigo-300 shadow-lg flex items-center justify-center text-4xl flex-shrink-0">
              {selectedCategory.persona.avatar}
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h4 className="text-xl font-black text-slate-900 font-display">{selectedCategory.persona.name}</h4>
                <span className="bg-indigo-600 text-white text-xs font-extrabold px-3 py-0.5 rounded-full">
                  Age {selectedCategory.persona.age}
                </span>
              </div>
              <p className="text-sm font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                💬 Challenge: "{selectedCategory.persona.challenge}"
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="font-bold">Goals:</span> {selectedCategory.persona.goals}
              </div>
            </div>
          </div>

            {/* Customer Reaction Widget */}
            <CustomerReactionWidget initialState="thinking" />

            {/* Problem Input & Suggestions */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
                2. What problem would you like to solve for {selectedCategory.persona.name}?
              </h3>
              <p className="text-slate-500 text-xs">
                Write your own idea or click one of our AI-generated suggestions below.
              </p>
            </div>

            {/* AI Suggestions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Suggested Ideas:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCategory.suggestions.map((sug, i) => {
                  const isChosen = problemInput === sug;
                  const isAnyChosen = problemInput.trim().length > 0;
                  return (
                    <button
                      key={i}
                      onClick={() => handleApplySuggestion(sug)}
                      style={{ animationDelay: `${i * 120}ms` }}
                      className={`p-3.5 rounded-2xl text-left text-xs font-semibold shadow-sm transition-all stagger-card btn-tactile ${
                        isChosen
                          ? 'card-focused bg-orange-500 text-white border-orange-600 font-bold'
                          : isAnyChosen
                          ? 'card-softened bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                          : 'bg-white hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      💡 {sug}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Box */}
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  value={problemInput}
                  onChange={e => setProblemInput(e.target.value)}
                  placeholder={`Describe how your startup idea will solve ${selectedCategory.persona.name}'s problem...`}
                  className="w-full p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-medium text-sm text-slate-800 bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleApplySuggestion(selectedCategory.suggestions[0])}
                  className="absolute bottom-3 right-3 text-xs text-indigo-600 font-bold bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200"
                >
                  Auto-fill Example
                </button>
              </div>

              <button
                onClick={handleSubmitProblem}
                disabled={!problemInput.trim() || isEvaluating}
                className="w-full py-4 rounded-2xl gradient-button text-white font-extrabold text-base shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>AI Mentor Sage is reviewing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Problem & Get AI Review</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Review Result */}
            {aiFeedback && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-4 milestone-stamp">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold milestone-stamp">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Stage 0 Milestone Stamp Unlocked!</h4>
                    <span className="text-xs font-bold text-emerald-700">+100 XP • +20 Coins Earned ✓</span>
                  </div>
                </div>

                <p className="text-slate-800 text-sm leading-relaxed font-medium bg-white p-4 rounded-2xl border border-emerald-100">
                  "{aiFeedback}"
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleAdvanceStage}
                    className="px-8 py-3.5 rounded-2xl bpt-btn-primary text-white font-extrabold text-sm shadow-lg flex items-center gap-2"
                  >
                    <span>Claim Stamp & Proceed</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Physical Milestone Stamp Completion Overlay */}
      <MilestoneStampModal
        isOpen={showStampModal}
        stageNumber={0}
        stageTitle="The Spark – Problem Discovery"
        xpReward={100}
        coinReward={20}
        onContinue={() => {
          setShowStampModal(false);
          completeStage(0);
        }}
      />

    </div>
  );
};

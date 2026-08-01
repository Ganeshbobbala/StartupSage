import React, { useState } from 'react';
import { 
  Sparkles, Brain, CheckCircle2, ArrowRight, Lightbulb, Zap, Coins, 
  HelpCircle, ThumbsUp, RefreshCw, Send, Mic, Stethoscope, BookOpen, 
  CreditCard, Sprout, ShoppingBag, Cpu, Bot, UserCheck, Heart, Award 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Persona } from '../../types/game';
import { MilestonePath } from '../common/MilestonePath';
import { CustomerReactionWidget } from '../common/CustomerReactionWidget';
import { MilestoneStampModal } from '../common/MilestoneStampModal';

interface CategoryOption {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Explorer';
  persona: Persona;
  suggestions: string[];
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'healthtech',
    name: 'HealthTech',
    icon: Stethoscope,
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
    icon: BookOpen,
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
    icon: CreditCard,
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
    icon: Sprout,
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
    icon: ShoppingBag,
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
    icon: Cpu,
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
    icon: Bot,
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
      
      {/* Milestone Journey Path Node Bar */}
      <MilestonePath currentStage={0} />

      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 academy-card p-6 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-100 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                Mission 1 of 8
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight mt-1">
              Spark Discovery Lab
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-orange-100 dark:bg-slate-800 text-orange-800 dark:text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200 dark:border-slate-700 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500" /> Reward: +100 XP
          </span>
        </div>
      </div>

      {/* STEP 1: Select Problem Category */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span>1. Pick a Problem Category</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory?.id === cat.id;
            const IconComp = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className={`academy-card p-6 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/30 bg-orange-50/90 dark:bg-orange-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 flex items-center justify-center border border-orange-200 dark:border-slate-700 shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    cat.difficulty === 'Easy' 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                      : cat.difficulty === 'Medium' 
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' 
                      : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                  }`}>
                    {cat.difficulty}
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1 font-display">{cat.name}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{cat.description}</p>

                <div className="flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
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
          
          {/* Persona Info Card */}
          <div className="academy-card p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
              <UserCheck className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h4 className="text-xl font-black text-slate-900 dark:text-white font-display">{selectedCategory.persona.name}</h4>
                <span className="bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-xs font-extrabold px-3 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                  Age {selectedCategory.persona.age}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-orange-800 dark:text-orange-200 bg-orange-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-orange-200 dark:border-slate-800">
                Challenge: "{selectedCategory.persona.challenge}"
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white">Goals:</span> {selectedCategory.persona.goals}
              </div>
            </div>
          </div>

          {/* Customer Reaction Widget (SVG Vector Icons, No Emoji Boxes) */}
          <CustomerReactionWidget initialState="thinking" />

          {/* Problem Input & Suggestions */}
          <div className="academy-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-1">
                2. What problem would you like to solve for {selectedCategory.persona.name}?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Write your own idea or click one of our AI-generated suggestions below.
              </p>
            </div>

            {/* AI Suggestions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Suggested Ideas:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCategory.suggestions.map((sug, i) => {
                  const isChosen = problemInput === sug;
                  return (
                    <button
                      key={i}
                      onClick={() => handleApplySuggestion(sug)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                        isChosen
                          ? 'bg-orange-500 text-white border-orange-600 font-bold shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-orange-300'
                      }`}
                    >
                      "{sug}"
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Problem Input Box */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Your Problem Statement:
              </label>
              <textarea
                rows={3}
                placeholder="Describe the real-world problem you want to solve..."
                value={problemInput}
                onChange={e => setProblemInput(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Submit Problem Statement Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmitProblem}
                disabled={!problemInput.trim() || isEvaluating}
                className={`bpt-btn-primary px-6 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 ${
                  !problemInput.trim() || isEvaluating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing Problem...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Problem Statement</span>
                    <Send className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Feedback Box */}
          {aiFeedback && (
            <div className="academy-card p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-3xl space-y-4 animate-in fade-in">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-extrabold text-emerald-950 dark:text-emerald-100 font-display">
                    Virtual Mentor Validation Passed!
                  </h4>
                  <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium mt-1">
                    {aiFeedback}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-emerald-200 dark:border-emerald-800">
                <button
                  onClick={handleAdvanceStage}
                  className="bpt-btn-primary px-6 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer"
                >
                  <span>Advance to Mission 2: Customer Validation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Stamp Completion Modal */}
      <MilestoneStampModal
        isOpen={showStampModal}
        stageNumber={0}
        stageTitle="Spark Discovery Lab"
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

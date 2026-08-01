import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { GameState, ViewState, StudentProfile, Badge, FounderType, ThemeMode } from '../types/game';

const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Began your StartupSage adventure!',
    icon: '🌟',
    category: 'Discovery',
    xpReward: 50,
    isUnlocked: true,
    earnedDate: 'Today'
  },
  {
    id: 'idea-planner',
    title: 'Idea Planner',
    description: 'Created a simple 6-block startup plan.',
    icon: '💡',
    category: 'Strategy',
    xpReward: 100,
    isUnlocked: false
  },
  {
    id: 'team-builder',
    title: 'Team Builder',
    description: 'Assembled a dream team of co-founders.',
    icon: '🤝',
    category: 'Leadership',
    xpReward: 150,
    isUnlocked: false
  },
  {
    id: 'startup-builder',
    title: 'Startup Builder',
    description: 'Allocated resources and launched the prototype.',
    icon: '🚀',
    category: 'Execution',
    xpReward: 200,
    isUnlocked: false
  },
  {
    id: 'problem-solver',
    title: 'Problem Solver',
    description: 'Overcame a major crisis with resilience.',
    icon: '🛡',
    category: 'Resilience',
    xpReward: 250,
    isUnlocked: false
  },
  {
    id: 'growth-champion',
    title: 'Growth Champion',
    description: 'Guided your startup through 6 months of growth.',
    icon: '📈',
    category: 'Management',
    xpReward: 300,
    isUnlocked: false
  },
  {
    id: 'future-founder',
    title: 'Future Founder',
    description: 'Made strategic choices for the startup future.',
    icon: '🏆',
    category: 'Vision',
    xpReward: 350,
    isUnlocked: false
  },
  {
    id: 'startup-graduate',
    title: 'Startup Graduate',
    description: 'Completed all 8 simulation stages and earned Passport!',
    icon: '🎓',
    category: 'Mastery',
    xpReward: 500,
    isUnlocked: false
  }
];

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Rohan Sharma',
  classGrade: 'Class 8',
  school: 'Delhi Public School',
  avatar: {
    type: 'boy',
    hairColor: '#4F46E5',
    skinTone: '#FCD34D',
    outfitColor: '#06B6D4',
    accessory: 'Glasses'
  },
  isGuest: true,
  role: 'student'
};

const DEFAULT_STATE: GameState = {
  themeMode: 'light',
  currentView: 'landing',
  studentProfile: DEFAULT_PROFILE,
  isLoggedIn: false,
  hasUnlockedPremium: false,
  currentStage: 0,
  completedStages: [],
  xp: 150,
  coins: 50,
  level: 1,
  streak: 3,
  innovationScore: 85,
  emotionalResilienceScore: 88,
  happyCustomers: 120,
  teamMorale: 90,
  problemCategory: null,
  activePersona: null,
  problemStatement: '',
  stage0Feedback: '',
  ideaStatement: '',
  ideaScorecard: null,
  stage1Reflections: '',
  canvasPlan: {
    problem: '',
    solution: '',
    users: '',
    features: '',
    promotion: '',
    rewards: ''
  },
  planReviewFeedback: '',
  selectedTeammates: [],
  teamConfidence: '',
  equitySplitPercent: 60,
  budgetAllocation: {
    product: 40,
    marketing: 20,
    team: 15,
    tools: 15,
    learning: 10
  },
  totalBudget: 100,
  activeCrisis: null,
  crisisResponse: null,
  crisisReflection: '',
  unlockedVoiceNotes: [],
  currentMonth: 1,
  monthlyDecisions: {},
  futurePath: null,
  founderType: null,
  finalPrideReflection: '',
  completionDate: null,
  badges: INITIAL_BADGES,
  dailyChallengeCompleted: false
};

interface GameContextType {
  state: GameState;
  toggleTheme: () => void;
  setView: (view: ViewState) => void;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  addXPCoins: (xp: number, coins: number) => void;
  unlockBadge: (badgeId: string) => void;
  setStage: (stage: number) => void;
  completeStage: (stageNum: number) => void;
  setProblemData: (category: string, persona: any, problem: string, feedback: string) => void;
  setIdeaData: (idea: string, scorecard: any) => void;
  setCanvasPlan: (plan: Partial<GameState['canvasPlan']>) => void;
  setSelectedTeammates: (teammates: any[]) => void;
  setBudgetAllocation: (allocation: GameState['budgetAllocation']) => void;
  setCrisisResponse: (crisis: any, response: string, reflection: string) => void;
  setMonthlyDecision: (month: number, decision: string) => void;
  setFuturePath: (path: string) => void;
  completeSimulation: (founderType: FounderType, reflection: string) => void;
  triggerConfetti: () => void;
  unlockPremium: () => void;
  loginUser: (name?: string, email?: string, role?: 'student' | 'admin', school?: string, grade?: string) => void;
  logoutUser: () => void;
  completeDailyChallenge: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('startupsage_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
      return DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('startupsage_state', JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save game state', err);
    }

    // Apply dark / light class to root element
    if (state.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      themeMode: prev.themeMode === 'light' ? 'dark' : 'light'
    }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  };

  const setView = (view: ViewState) => {
    setState(prev => ({ ...prev, currentView: view }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProfile = (profileUpdate: Partial<StudentProfile>) => {
    setState(prev => ({
      ...prev,
      studentProfile: { ...prev.studentProfile, ...profileUpdate }
    }));
  };

  const addXPCoins = (earnedXP: number, earnedCoins: number) => {
    setState(prev => {
      const newXP = prev.xp + earnedXP;
      const newCoins = prev.coins + earnedCoins;
      const newLevel = Math.floor(newXP / 200) + 1;
      return {
        ...prev,
        xp: newXP,
        coins: newCoins,
        level: Math.max(prev.level, newLevel)
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setState(prev => {
      let newlyUnlockedXP = 0;
      const updatedBadges = prev.badges.map(badge => {
        if (badge.id === badgeId && !badge.isUnlocked) {
          newlyUnlockedXP = badge.xpReward;
          return { ...badge, isUnlocked: true, earnedDate: new Date().toLocaleDateString() };
        }
        return badge;
      });

      if (newlyUnlockedXP > 0) {
        triggerConfetti();
      }

      return {
        ...prev,
        badges: updatedBadges,
        xp: prev.xp + newlyUnlockedXP
      };
    });
  };

  const setStage = (stage: number) => {
    setState(prev => ({
      ...prev,
      currentStage: stage,
      currentView: 'stage'
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeStage = (stageNum: number) => {
    setState(prev => {
      const completed = Array.from(new Set([...prev.completedStages, stageNum]));
      const nextStage = stageNum + 1 <= 8 ? stageNum + 1 : 8;
      return {
        ...prev,
        completedStages: completed,
        currentStage: nextStage
      };
    });
    triggerConfetti();
  };

  const setProblemData = (category: string, persona: any, problem: string, feedback: string) => {
    setState(prev => ({
      ...prev,
      problemCategory: category,
      activePersona: persona,
      problemStatement: problem,
      stage0Feedback: feedback
    }));
  };

  const setIdeaData = (idea: string, scorecard: any) => {
    setState(prev => ({
      ...prev,
      ideaStatement: idea,
      ideaScorecard: scorecard
    }));
  };

  const setCanvasPlan = (planUpdate: Partial<GameState['canvasPlan']>) => {
    setState(prev => ({
      ...prev,
      canvasPlan: { ...prev.canvasPlan, ...planUpdate }
    }));
  };

  const setSelectedTeammates = (teammates: any[]) => {
    setState(prev => ({
      ...prev,
      selectedTeammates: teammates
    }));
  };

  const setBudgetAllocation = (allocation: GameState['budgetAllocation']) => {
    setState(prev => ({
      ...prev,
      budgetAllocation: allocation
    }));
  };

  const setCrisisResponse = (crisis: any, response: string, reflection: string) => {
    setState(prev => ({
      ...prev,
      activeCrisis: crisis,
      crisisResponse: response,
      crisisReflection: reflection
    }));
  };

  const setMonthlyDecision = (month: number, decision: string) => {
    setState(prev => ({
      ...prev,
      monthlyDecisions: { ...prev.monthlyDecisions, [month]: decision }
    }));
  };

  const setFuturePath = (path: string) => {
    setState(prev => ({
      ...prev,
      futurePath: path
    }));
  };

  const completeSimulation = (founderType: FounderType, reflection: string) => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setState(prev => ({
      ...prev,
      founderType,
      finalPrideReflection: reflection,
      completionDate: today,
      completedStages: Array.from(new Set([...prev.completedStages, 8]))
    }));
    unlockBadge('startup-graduate');
    triggerConfetti();
  };

  const unlockPremium = () => {
    setState(prev => ({ ...prev, hasUnlockedPremium: true }));
    triggerConfetti();
  };

  const loginUser = (name?: string, email?: string, role: 'student' | 'admin' = 'student', school?: string, grade?: string) => {
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentView: role === 'admin' ? 'admin' : 'dashboard',
      studentProfile: {
        ...prev.studentProfile,
        name: name || (role === 'admin' ? 'Dr. Sunita Rao (Admin)' : prev.studentProfile.name),
        email: email || (role === 'admin' ? 'admin@startupsage.edu' : 'student@school.edu'),
        school: school || prev.studentProfile.school,
        classGrade: grade || prev.studentProfile.classGrade,
        role: role,
        isGuest: false
      }
    }));
    triggerConfetti();
  };

  const logoutUser = () => {
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      currentView: 'landing',
      studentProfile: DEFAULT_PROFILE
    }));
  };

  const completeDailyChallenge = () => {
    if (!state.dailyChallengeCompleted) {
      setState(prev => ({
        ...prev,
        dailyChallengeCompleted: true,
        xp: prev.xp + 50,
        coins: prev.coins + 20,
        streak: prev.streak + 1
      }));
      triggerConfetti();
    }
  };

  const resetGame = () => {
    localStorage.removeItem('startupsage_state');
    setState(DEFAULT_STATE);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        toggleTheme,
        setView,
        updateProfile,
        addXPCoins,
        unlockBadge,
        setStage,
        completeStage,
        setProblemData,
        setIdeaData,
        setCanvasPlan,
        setSelectedTeammates,
        setBudgetAllocation,
        setCrisisResponse,
        setMonthlyDecision,
        setFuturePath,
        completeSimulation,
        triggerConfetti,
        unlockPremium,
        loginUser,
        logoutUser,
        completeDailyChallenge,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

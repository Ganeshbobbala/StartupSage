export type ViewState =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'stage'
  | 'passport'
  | 'certificate'
  | 'leaderboard'
  | 'teacher'
  | 'parent'
  | 'profile'
  | 'admin';

export type ThemeMode = 'light' | 'dark';

export interface StageSubmission {
  id: string;
  studentName: string;
  grade: string;
  stageNumber: number;
  stageTitle: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'needs_revision';
  score: number;
  feedback?: string;
  contentSummary: string;
}

export interface AdminCohort {
  id: string;
  schoolName: string;
  grade: string;
  totalStudents: number;
  avgStageCompleted: number;
  teacherInCharge: string;
  status: 'Active' | 'Completed' | 'Pending Setup';
}

export type GenderAvatar = 'boy' | 'girl' | 'neutral';

export interface AvatarCustomization {
  type: GenderAvatar;
  hairColor: string;
  skinTone: string;
  outfitColor: string;
  accessory: string;
}

export interface StudentProfile {
  name: string;
  classGrade: string; // e.g., "Class 8"
  school: string;
  avatar: AvatarCustomization;
  isGuest: boolean;
  email?: string;
  role: 'student' | 'admin';
}

export interface Persona {
  name: string;
  age: number;
  avatar: string;
  challenge: string;
  goals: string;
  likes: string[];
}

export interface Scorecard {
  creativity: number; // 1-5
  clarity: number; // 1-5
  innovation: number; // 1-5
  impact: number; // 1-5
}

export interface Teammate {
  id: string;
  name: string;
  avatar: string;
  hobby: string;
  superSkill: string;
  funFact: string;
  assignedRole?: string;
}

export interface CanvasPlan {
  problem: string;
  solution: string;
  users: string;
  features: string;
  promotion: string;
  rewards: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  earnedDate?: string;
  xpReward: number;
  isUnlocked: boolean;
}

export type FounderType =
  | '🏗 Builder'
  | '🧠 Strategist'
  | '🌟 Visionary'
  | '🔥 Innovator'
  | '💪 Resilient Leader'
  | '🤝 Team Champion'
  | '🌍 Community Hero';

export interface GameState {
  // Theme State
  themeMode: ThemeMode;

  // Navigation & User Status
  currentView: ViewState;
  studentProfile: StudentProfile;
  isLoggedIn: boolean;
  hasUnlockedPremium: boolean;
  
  // Progression & Gamification
  currentStage: number; // 0 to 8
  completedStages: number[];
  xp: number;
  coins: number;
  level: number;
  streak: number;
  innovationScore: number;
  emotionalResilienceScore: number;
  happyCustomers: number;
  teamMorale: number;
  
  // Stage 0
  problemCategory: string | null;
  activePersona: Persona | null;
  problemStatement: string;
  stage0Feedback: string;

  // Stage 1
  ideaStatement: string;
  ideaScorecard: Scorecard | null;
  stage1Reflections: string;

  // Stage 2
  canvasPlan: CanvasPlan;
  planReviewFeedback: string;
  cacVsPricingAnalysis?: {
    cac: number;
    price: number;
    isViable: boolean;
    feedback: string;
  };

  // Stage 3
  selectedTeammates: Teammate[];
  teamConfidence: string;
  equitySplitPercent: number; // Founder % (e.g. 60)
  emotionalCheckIn1?: string;

  // Stage 4
  budgetAllocation: {
    product: number;
    marketing: number;
    team: number;
    tools: number;
    learning: number;
  };
  totalBudget: number;

  // Stage 5
  activeCrisis: {
    title: string;
    description: string;
    icon: string;
  } | null;
  crisisResponse: string | null;
  crisisReflection: string;
  emotionalCheckIn2?: string;
  unlockedVoiceNotes: string[];

  // Stage 6
  currentMonth: number; // 1 to 6
  monthlyDecisions: Record<number, string>;

  // Stage 7
  futurePath: string | null;

  // Stage 8
  founderType: FounderType | null;
  finalPrideReflection: string;
  completionDate: string | null;

  // Badges
  badges: Badge[];

  // Daily Challenge
  dailyChallengeCompleted: boolean;
}

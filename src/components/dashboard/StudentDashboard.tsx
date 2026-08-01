import React, { useState } from 'react';
import { 
  Rocket, Sparkles, Trophy, Award, Zap, CheckCircle2, Lock, 
  ArrowRight, Flame, Coins, Star, Play, Heart, Users, LogOut, GraduationCap, ShieldCheck, Compass, Radio 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MentorCard } from '../common/MentorCard';
import { JourneyTimeline, MISSIONS_LIST } from '../common/JourneyTimeline';
import { MissionCard } from '../common/MissionCard';
import { AuthModal } from '../auth/AuthModal';

export const StudentDashboard: React.FC = () => {
  const { state, setStage, setView, completeDailyChallenge, logoutUser } = useGame();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');

  const openAuth = (role: 'student' | 'admin') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Auth Guard 1: If user is not logged in, prompt for student login
  if (!state.isLoggedIn) {
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="academy-card p-8 sm:p-12 space-y-6 border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-xs">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
                Student Login Required
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Founder Journey is an interactive virtual startup simulation built exclusively for student founders. Please log in with your student credentials.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => openAuth('student')}
                className="bpt-btn-secondary py-3 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Student Login / Sign Up</span>
              </button>

              <button
                onClick={() => setView('landing')}
                className="bpt-btn-secondary py-3 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialRole="student"
          initialMode="login"
        />
      </>
    );
  }

  // Auth Guard 2: If logged in as Admin, direct them to Admin Dashboard
  if (state.studentProfile.role === 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="academy-card p-8 sm:p-12 space-y-6 border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
              Founder Journey is Exclusively for Students
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              You are currently logged in as a School Admin ({state.studentProfile.name}). To review student progress, cohort analytics, and stage submissions, open your Admin Dashboard.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setView('admin')}
              className="bpt-btn-secondary py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Go to Admin Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = Math.round((state.completedStages.length / 9) * 100);
  const activeMissionIndex = Math.min(Math.max(state.currentStage, 0), 8);
  const currentMissionMeta = MISSIONS_LIST[activeMissionIndex] || MISSIONS_LIST[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Virtual Simulation Atmosphere HUD Pill */}
      <div className="flex items-center justify-between gap-3 bg-slate-900 text-white px-4 py-2 rounded-2xl text-xs border border-slate-800 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2 font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-orange-400 font-extrabold uppercase tracking-wider text-[11px]">Virtual Simulation Mode</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-200">Founder Avatar Active</span>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-medium text-slate-300">
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Virtual Decision Engine</span>
          </span>
          <span className="bg-slate-800 text-orange-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-slate-700">
            Room {activeMissionIndex}: {currentMissionMeta.room}
          </span>
        </div>
      </div>

      {/* High-Contrast Student Founder Profile Banner */}
      <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md border border-orange-400/40">
        
        {/* Left: Founder Profile & Info */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 text-white flex items-center justify-center text-3xl shrink-0 font-bold border border-white/30">
              {state.studentProfile.avatar.type === 'boy' ? '👦' : state.studentProfile.avatar.type === 'girl' ? '👧' : '🧑'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white font-display tracking-tight">{state.studentProfile.name}</h2>
                <span className="bg-white/25 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/30">
                  Level {state.level}
                </span>
              </div>
              <p className="text-orange-100 font-bold text-xs mt-0.5">
                {state.studentProfile.classGrade} • {state.studentProfile.school}
              </p>
            </div>
          </div>

          {/* Mobile Logout Button */}
          <button
            onClick={logoutUser}
            className="md:hidden px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1 border border-white/30"
          >
            <LogOut className="w-3.5 h-3.5 text-white" />
            <span>Logout</span>
          </button>
        </div>

        {/* Right: Gamification Stats & Desktop Logout */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-4 bg-black/25 px-4 py-2.5 rounded-xl text-center text-xs border border-white/10">
            <div>
              <span className="text-[10px] text-orange-100 block uppercase font-bold tracking-wider">XP</span>
              <span className="font-black text-amber-300 flex items-center justify-center gap-0.5 text-sm">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> {state.xp}
              </span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div>
              <span className="text-[10px] text-orange-100 block uppercase font-bold tracking-wider">Happy Users</span>
              <span className="font-black text-rose-200 flex items-center justify-center gap-0.5 text-sm">
                <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" /> {state.happyCustomers}
              </span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div>
              <span className="text-[10px] text-orange-100 block uppercase font-bold tracking-wider">Team</span>
              <span className="font-black text-emerald-200 flex items-center justify-center gap-0.5 text-sm">
                <Users className="w-3.5 h-3.5 text-emerald-200" /> {state.teamMorale}%
              </span>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-extrabold text-xs shadow-sm transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-orange-600" />
            <span>Log Out</span>
          </button>
        </div>

      </div>

      {/* Virtual Mentor Sage Guidance */}
      <MentorCard
        mentorName="Sage"
        role="Virtual Mentor"
        message={`Welcome to ${currentMissionMeta.room}, ${state.studentProfile.name}! Step inside to explore real-world problem scenarios, interact with virtual customers, and make strategic founder choices.`}
        actionText={`Enter ${currentMissionMeta.room}`}
        onAction={() => setStage(activeMissionIndex)}
        stageTitle={`Virtual Room ${activeMissionIndex}: ${currentMissionMeta.title}`}
      />

      {/* Founder Simulation World Map */}
      <JourneyTimeline
        completedStages={state.completedStages}
        currentStage={state.currentStage}
        onSelectStage={(stageIdx) => setStage(stageIdx)}
      />

      {/* Active Room Mission Highlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Compass className="w-5 h-5 text-orange-500" /> Active Virtual Room Mission
          </h3>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Simulation Progress: {completionPercentage}%</span>
        </div>

        <MissionCard
          stageIndex={activeMissionIndex}
          title={currentMissionMeta.title}
          roomName={currentMissionMeta.room}
          description={
            activeMissionIndex === 0 ? "Identify real-world problems in school/community and choose your domain in the Spark Discovery Lab." :
            activeMissionIndex === 1 ? "Talk to virtual customers in the Validation Lounge and analyze their real-world pain points." :
            activeMissionIndex === 2 ? "Build your simple 6-block startup canvas plan in the Strategy War Room." :
            activeMissionIndex === 3 ? "Select co-founders and assign team roles in the Talent HQ." :
            activeMissionIndex === 4 ? "Allocate budget and build your MVP in the Fabrication Studio." :
            activeMissionIndex === 5 ? "Solve customer crisis during 'The Wall' stage in the Crisis Arena." :
            activeMissionIndex === 6 ? "Run 6 months of startup growth experiments in the Growth Control Room." :
            activeMissionIndex === 7 ? "Make your strategic scale decision in the Founder Crossroads." :
            "Complete your journey and claim your digital Founder Passport in the Graduation Hall!"
          }
          isCompleted={state.completedStages.includes(activeMissionIndex)}
          isCurrent={true}
          onEnterMission={() => setStage(activeMissionIndex)}
        />
      </div>

      {/* Grid: All 8 Virtual Simulation Rooms & Side Goal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: All 8 Virtual Rooms */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">All 8 Virtual Academy Rooms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISSIONS_LIST.map((m, idx) => (
              <MissionCard
                key={idx}
                stageIndex={idx}
                title={m.title}
                roomName={m.room}
                description={m.room}
                isCompleted={state.completedStages.includes(idx)}
                isCurrent={state.currentStage === idx}
                onEnterMission={() => setStage(idx)}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Today's Goal & Badges */}
        <div className="space-y-6">
          
          {/* Today's Goal */}
          <div className="academy-card p-5 bg-orange-50 dark:bg-slate-800 border-orange-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-orange-700 dark:text-orange-400 tracking-wider">Today's Simulation Goal</span>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">+50 XP</span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm font-display">"Spot 1 real-world problem in school"</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Think like a virtual founder today and identify real hassles experienced by students or teachers.</p>
            <button
              onClick={completeDailyChallenge}
              disabled={state.dailyChallengeCompleted}
              className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                state.dailyChallengeCompleted
                  ? 'bg-emerald-500 text-white'
                  : 'bpt-btn-primary'
              }`}
            >
              {state.dailyChallengeCompleted ? 'Goal Completed ✓' : 'Complete Daily Challenge'}
            </button>
          </div>

          {/* Badges */}
          <div className="academy-card p-5 space-y-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm font-display">Virtual Founder Badges</h4>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                {state.badges.filter(b => b.isUnlocked).length} / {state.badges.length}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {state.badges.map(badge => (
                <div
                  key={badge.id}
                  title={`${badge.title}: ${badge.description}`}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xl border ${
                    badge.isUnlocked ? 'bg-orange-50 dark:bg-orange-950/80 border-orange-300 dark:border-orange-800' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-40'
                  }`}
                >
                  <span>{badge.icon}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

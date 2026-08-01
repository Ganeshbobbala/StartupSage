import React, { useState } from 'react';
import { 
  Trophy, Award, Zap, Star, Shield, Lock, CheckCircle2, ArrowLeft, 
  Search, Filter, Flame, Sparkles, Building2, School 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Badge } from '../../types/game';

interface LeaderboardItem {
  id: string;
  name: string;
  class: string;
  school: string;
  xp: number;
  coins: number;
  innovation: number;
  avatar: string;
  founder: string;
}

const GLOBAL_LEADERBOARD: LeaderboardItem[] = [
  { id: '1', name: 'Rohan S.', class: 'Class 8', school: 'Delhi Public School, Vasant Kunj', xp: 2850, coins: 650, innovation: 98, avatar: '👦', founder: '🌟 Master Visionary' },
  { id: '2', name: 'Ananya R.', class: 'Class 8', school: 'Delhi Public School, RK Puram', xp: 2620, coins: 580, innovation: 94, avatar: '👧', founder: '🏗 Serial Builder' },
  { id: '3', name: 'Kabir S.', class: 'Class 10', school: 'Kendriya Vidyalaya No. 1', xp: 2450, coins: 540, innovation: 91, avatar: '👦', founder: '🧠 Chief Strategist' },
  { id: '4', name: 'Priya M.', class: 'Class 7', school: 'Oakridge International', xp: 2300, coins: 510, innovation: 89, avatar: '👧', founder: '🤝 Team Champion' },
  { id: '5', name: 'Vihaan K.', class: 'Class 9', school: 'Modern School, Barakhamba', xp: 2150, coins: 480, innovation: 87, avatar: '🧑', founder: '🔥 Growth Hacker' },
  { id: '6', name: 'Siddharth M.', class: 'Class 8', school: 'Delhi Public School, Vasant Kunj', xp: 1980, coins: 430, innovation: 85, avatar: '👦', founder: '⚙️ Product Lead' },
  { id: '7', name: 'Tanvi G.', class: 'Class 9', school: 'DAV Public School', xp: 1840, coins: 410, innovation: 84, avatar: '👧', founder: '💡 Idea Maverick' },
  { id: '8', name: 'Aditya P.', class: 'Class 10', school: 'St. Xavier High School', xp: 1720, coins: 390, innovation: 82, avatar: '👦', founder: '🚀 Launch Specialist' },
  { id: '9', name: 'Isha N.', class: 'Class 7', school: 'Bishop Cotton School', xp: 1650, coins: 370, innovation: 80, avatar: '👧', founder: '📊 Financial Wizard' },
  { id: '10', name: 'Dev R.', class: 'Class 8', school: 'Delhi Public School, Vasant Kunj', xp: 1540, coins: 340, innovation: 78, avatar: '🧑', founder: '🛡️ Operations Lead' }
];

export const Leaderboard: React.FC = () => {
  const { state, setView } = useGame();

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges'>('leaderboard');
  const [filterScope, setFilterScope] = useState<'global' | 'school' | 'class'>('global');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Calculate dynamic scope filtering & re-ranking
  const getFilteredLeaderboard = () => {
    let list = [...GLOBAL_LEADERBOARD];

    // Include logged-in student if not in list
    if (state.isLoggedIn && state.studentProfile) {
      const userSchool = state.studentProfile.school || 'Delhi Public School';
      const userClass = state.studentProfile.classGrade || 'Class 8';
      
      const userAlreadyInList = list.some(
        item => item.name.toLowerCase().includes(state.studentProfile.name.toLowerCase())
      );

      if (!userAlreadyInList) {
        list.push({
          id: 'current-user',
          name: `${state.studentProfile.name} (You)`,
          class: userClass,
          school: userSchool,
          xp: Math.max(state.xp, 1800),
          coins: state.coins || 200,
          innovation: 90,
          avatar: state.studentProfile.avatar.type === 'girl' ? '👧' : '👦',
          founder: '🚀 Rising Founder'
        });
      }
    }

    if (filterScope === 'school') {
      list = list.filter(item => 
        item.school.toLowerCase().includes('delhi public') || 
        item.school.toLowerCase().includes('dps')
      );
    } else if (filterScope === 'class') {
      list = list.filter(item => 
        item.class.toLowerCase().includes('8')
      );
    }

    // Sort by XP score descending
    list.sort((a, b) => b.xp - a.xp);

    // Re-rank items 1, 2, 3...
    return list.map((item, index) => ({
      ...item,
      dynamicRank: index + 1
    }));
  };

  const leaderboardItems = getFilteredLeaderboard();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Tab Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 academy-card p-6 border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setView(state.isLoggedIn ? 'dashboard' : 'landing')}
          className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-orange-600 font-bold text-xs sm:text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {state.isLoggedIn ? 'Dashboard' : 'Home'}</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            📊 Global Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            🏆 Badges Gallery ({state.badges.filter(b => b.isUnlocked).length}/{state.badges.length})
          </button>
        </div>
      </div>

      {/* TAB 1: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          
          {/* Scope Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                {filterScope === 'global' ? 'Global Student Rankings' : filterScope === 'school' ? 'School Campus Rankings' : 'Class 8 Grade Rankings'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing top {leaderboardItems.length} founders in {filterScope === 'global' ? 'all schools nationwide' : filterScope === 'school' ? 'Delhi Public School' : 'Class 8'}
              </p>
            </div>

            {/* Scope Filter Buttons */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setFilterScope('global')}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold capitalize transition cursor-pointer ${
                  filterScope === 'global'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                🌐 Global ({GLOBAL_LEADERBOARD.length})
              </button>

              <button
                onClick={() => setFilterScope('school')}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold capitalize transition cursor-pointer ${
                  filterScope === 'school'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                🏫 School
              </button>

              <button
                onClick={() => setFilterScope('class')}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold capitalize transition cursor-pointer ${
                  filterScope === 'class'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                🎒 Class Grade
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-3 text-xs text-orange-900 dark:text-orange-200 font-medium">
            <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>
              {filterScope === 'global' && 'Global View: Showing top student founders from schools across India.'}
              {filterScope === 'school' && 'School View: Re-ranked top founders within Delhi Public School.'}
              {filterScope === 'class' && 'Class View: Re-ranked top founders within Class 8.'}
            </span>
          </div>

          {/* Leaderboard Table */}
          <div className="academy-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboardItems.map(row => {
                const rank = row.dynamicRank;
                const isTop3 = rank <= 3;

                return (
                  <div
                    key={row.id}
                    className={`p-4 sm:p-5 flex items-center justify-between transition-all ${
                      rank === 1 
                        ? 'bg-amber-500/10 dark:bg-amber-950/40' 
                        : rank === 2 
                        ? 'bg-slate-100/60 dark:bg-slate-800/50' 
                        : rank === 3 
                        ? 'bg-orange-50/50 dark:bg-slate-800/30' 
                        : 'bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Rank Badge */}
                      <div className={`w-9 h-9 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs ${
                        rank === 1
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : rank === 2
                          ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white'
                          : rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                      </div>

                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-slate-800 flex items-center justify-center text-xl border border-orange-200 dark:border-slate-700 shrink-0">
                        {row.avatar}
                      </div>

                      {/* Student Info */}
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base font-display flex items-center gap-2">
                          {row.name}
                          {rank === 1 && (
                            <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                              #{rank} Leader
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {row.class} • {row.school}
                        </p>
                      </div>
                    </div>

                    {/* Stats & Title */}
                    <div className="flex items-center gap-4 sm:gap-6 text-right">
                      <div className="hidden sm:block">
                        <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase block">Title</span>
                        <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">{row.founder}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase block">Innovation XP</span>
                        <span className="text-sm sm:text-base font-black text-amber-500 flex items-center justify-end gap-1">
                          <Zap className="w-4 h-4 fill-amber-500 text-amber-500" /> {row.xp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BADGES GALLERY */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">Achievement Badges</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Click any badge to view unlock requirements & XP reward</p>
            </div>
            <span className="bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-xs font-extrabold px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800">
              Total XP from Badges: {state.badges.filter(b => b.isUnlocked).reduce((a, b) => a + b.xpReward, 0)} XP
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {state.badges.map(badge => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`academy-card p-6 border text-center transition-all cursor-pointer hover:border-orange-400 space-y-3 ${
                  badge.isUnlocked
                    ? 'border-orange-300 dark:border-orange-800 bg-orange-50/40 dark:bg-slate-800 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 opacity-60'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-slate-700 flex items-center justify-center text-4xl mx-auto shadow-sm">
                  {badge.icon}
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm font-display">{badge.title}</h4>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full block w-fit mx-auto border border-orange-200 dark:border-orange-800">
                  + {badge.xpReward} XP
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                  {badge.isUnlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="academy-card rounded-3xl max-w-md w-full p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-4xl flex items-center justify-center mx-auto shadow-sm border border-orange-200 dark:border-orange-800">
              {selectedBadge.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">{selectedBadge.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedBadge.description}</p>
            
            <div className="bg-orange-50 dark:bg-slate-800 p-3 rounded-2xl font-bold text-xs text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-slate-700">
              Reward: +{selectedBadge.xpReward} XP • Category: {selectedBadge.category}
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-3 rounded-2xl bpt-btn-primary text-white font-extrabold text-sm shadow-md cursor-pointer"
            >
              Close Detail
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

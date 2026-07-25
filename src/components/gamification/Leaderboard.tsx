import React, { useState } from 'react';
import { 
  Trophy, Award, Zap, Star, Shield, Lock, CheckCircle2, ArrowLeft, 
  Search, Filter, Flame 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Badge } from '../../types/game';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Rohan S.', class: 'Class 8', school: 'Delhi Public School, Vasant Kunj', xp: 2850, coins: 650, innovation: 98, avatar: '👦', founder: '🌟 Master Visionary' },
  { rank: 2, name: 'Ananya R.', class: 'Class 8', school: 'DPS RK Puram', xp: 2620, coins: 580, innovation: 94, avatar: '👧', founder: '🏗 Serial Builder' },
  { rank: 3, name: 'Kabir S.', class: 'Class 10', school: 'Kendriya Vidyalaya No. 1', xp: 2450, coins: 540, innovation: 91, avatar: '👦', founder: '🧠 Chief Strategist' },
  { rank: 4, name: 'Priya M.', class: 'Class 7', school: 'Oakridge International', xp: 2300, coins: 510, innovation: 89, avatar: '👧', founder: '🤝 Team Champion' },
  { rank: 5, name: 'Vihaan K.', class: 'Class 9', school: 'Modern School, Barakhamba', xp: 2150, coins: 480, innovation: 87, avatar: '🧑', founder: '🔥 Growth Hacker' },
  { rank: 6, name: 'Siddharth M.', class: 'Class 8', school: 'National Public School', xp: 1980, coins: 430, innovation: 85, avatar: '👦', founder: '⚙️ Product Lead' },
  { rank: 7, name: 'Tanvi G.', class: 'Class 9', school: 'DAV Public School', xp: 1840, coins: 410, innovation: 84, avatar: '👧', founder: '💡 Idea Maverick' },
  { rank: 8, name: 'Aditya P.', class: 'Class 10', school: 'St. Xavier High School', xp: 1720, coins: 390, innovation: 82, avatar: '👦', founder: '🚀 Launch Specialist' },
  { rank: 9, name: 'Isha N.', class: 'Class 7', school: 'Bishop Cotton School', xp: 1650, coins: 370, innovation: 80, avatar: '👧', founder: '📊 Financial Wizard' },
  { rank: 10, name: 'Dev R.', class: 'Class 8', school: 'Sainik School', xp: 1540, coins: 340, innovation: 78, avatar: '🧑', founder: '🛡️ Operations Lead' }
];

export const Leaderboard: React.FC = () => {
  const { state, setView } = useGame();

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges'>('leaderboard');
  const [filterScope, setFilterScope] = useState<'school' | 'class' | 'global'>('global');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <button
          onClick={() => setView('dashboard')}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 Global Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 font-display">Student Founder Rankings</h3>
            <div className="flex items-center gap-2">
              {['global', 'school', 'class'].map(scope => (
                <button
                  key={scope}
                  onClick={() => setFilterScope(scope as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                    filterScope === scope
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3 text-xs text-indigo-900 font-medium">
            <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <span>Privacy Protection Active: Only first names, school grades, and avatars are displayed.</span>
          </div>

          {/* Leaderboard Table */}
          <div className="glass-card rounded-3xl overflow-hidden border border-white/80 shadow-lg">
            <div className="divide-y divide-slate-100">
              {MOCK_LEADERBOARD.map(row => {
                const isTop3 = row.rank <= 3;

                return (
                  <div
                    key={row.rank}
                    className={`p-4 sm:p-6 flex items-center justify-between transition-all ${
                      row.rank === 1 ? 'bg-amber-50/60' : row.rank === 2 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full font-black text-sm flex items-center justify-center ${
                        row.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : row.rank === 2
                          ? 'bg-slate-300 text-slate-900'
                          : row.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : row.rank}
                      </div>

                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl border border-indigo-200">
                        {row.avatar}
                      </div>

                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base font-display">{row.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {row.class} • {row.school}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase block">Profile</span>
                        <span className="text-xs font-bold text-indigo-600">{row.founder}</span>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase block">XP Score</span>
                        <span className="text-base font-black text-amber-500 flex items-center gap-1">
                          <Zap className="w-4 h-4 fill-amber-500" /> {row.xp}
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
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 font-display">Achievement Badges</h3>
              <p className="text-xs text-slate-500">Click any badge to view unlock requirements & XP reward</p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200">
              Total XP from Badges: {state.badges.filter(b => b.isUnlocked).reduce((a, b) => a + b.xpReward, 0)} XP
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {state.badges.map(badge => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`glass-card rounded-3xl p-6 border text-center transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 space-y-3 ${
                  badge.isUnlocked
                    ? 'border-amber-300 bg-amber-50/60 shadow-md'
                    : 'border-slate-200 bg-slate-100 opacity-60 grayscale'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-200 flex items-center justify-center text-4xl mx-auto shadow-md">
                  {badge.icon}
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm font-display">{badge.title}</h4>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full block w-fit mx-auto">
                  + {badge.xpReward} XP
                </span>
                <span className="text-xs font-bold text-slate-500 block">
                  {badge.isUnlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-md w-full p-8 bg-white border border-slate-200 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 rounded-2xl bg-amber-100 text-4xl flex items-center justify-center mx-auto shadow-lg">
              {selectedBadge.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-display">{selectedBadge.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedBadge.description}</p>
            
            <div className="bg-indigo-50 p-3 rounded-2xl font-bold text-xs text-indigo-700">
              Reward: +{selectedBadge.xpReward} XP • Category: {selectedBadge.category}
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-3 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md"
            >
              Close Detail
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

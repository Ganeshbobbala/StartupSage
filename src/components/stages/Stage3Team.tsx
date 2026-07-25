import React, { useState } from 'react';
import { 
  Users, Sparkles, Brain, CheckCircle2, ArrowRight, Zap, Coins, 
  Smile, ShieldCheck, Heart, UserPlus, Award 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Teammate } from '../../types/game';

const COFOUNDER_OPTIONS: Teammate[] = [
  {
    id: 'maya',
    name: 'Maya',
    avatar: '🎨',
    hobby: 'Drawing & Painting',
    superSkill: 'Creative Designer',
    funFact: 'Designed the winning poster for school annual fest!'
  },
  {
    id: 'arjun',
    name: 'Arjun',
    avatar: '💻',
    hobby: 'Robotics & Gaming',
    superSkill: 'App Builder',
    funFact: 'Built a mini Python calculator when he was 11!'
  },
  {
    id: 'sara',
    name: 'Sara',
    avatar: '🎤',
    hobby: 'Debates & Music',
    superSkill: 'Presenter',
    funFact: 'School debate champion 2 years in a row!'
  },
  {
    id: 'rahul',
    name: 'Rahul',
    avatar: '📢',
    hobby: 'Social Media & Photography',
    superSkill: 'Marketing Specialist',
    funFact: 'Runs the school photography club Instagram page!'
  },
  {
    id: 'neha',
    name: 'Neha',
    avatar: '📊',
    hobby: 'Math & Chess',
    superSkill: 'Financial Planner',
    funFact: 'Chess team captain and mental math wizard!'
  }
];

const ROLES = ['👨‍💻 Builder', '🎨 Designer', '📢 Presenter', '📊 Planner', '🤝 Team Leader'];

export const Stage3Team: React.FC = () => {
  const { setSelectedTeammates, completeStage, addXPCoins, unlockBadge, triggerConfetti } = useGame();

  const [selected, setSelected] = useState<Teammate[]>([]);
  const [roleAssignments, setRoleAssignments] = useState<Record<string, string>>({});
  const [challengeChoice, setChallengeChoice] = useState<string | null>(null);
  const [emotionalState, setEmotionalState] = useState<string | null>(null);

  const toggleSelectTeammate = (person: Teammate) => {
    if (selected.some(p => p.id === person.id)) {
      setSelected(prev => prev.filter(p => p.id !== person.id));
    } else {
      if (selected.length < 3) {
        setSelected(prev => [...prev, person]);
      }
    }
  };

  const handleRoleChange = (memberId: string, role: string) => {
    setRoleAssignments(prev => ({ ...prev, [memberId]: role }));
  };

  const handleCompleteTeamBuilding = () => {
    const finalTeam = selected.map(m => ({
      ...m,
      assignedRole: roleAssignments[m.id] || 'Team Member'
    }));

    setSelectedTeammates(finalTeam);
    addXPCoins(250, 50);
    unlockBadge('team-builder');
    triggerConfetti();
    completeStage(3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Handcrafted Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-dark rounded-3xl p-6 border border-indigo-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white flex items-center justify-center text-3xl font-black shadow-lg">
            🤝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
                Stage 3 of 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Team Chemistry Board</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-1">
              Assemble Your Founding Trio
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-2xl border border-indigo-500/30 font-bold text-xs">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          <span>Reward: +250 XP • +50 Founder Coins</span>
        </div>
      </div>

      {/* Human Co-Founder Playbook Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-indigo-500/30 shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-cyan-300 flex items-center justify-center flex-shrink-0 font-bold text-xl">
          ⚡
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-cyan-300">Co-Founder Chemistry Note:</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            "Apple had Jobs & Wozniak. Google had Page & Brin. Great startups combine the **Hacker** (App Builder), the **Hipster** (Designer), and the **Hustler** (Presenter & Marketer). Pick your founding team below!"
          </p>
        </div>
      </div>

      {/* 1. Pick 3 Co-Founders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            1. Select 3 Co-Founders ({selected.length} / 3 selected)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COFOUNDER_OPTIONS.map(person => {
            const isSelected = selected.some(p => p.id === person.id);

            return (
              <div
                key={person.id}
                onClick={() => toggleSelectTeammate(person)}
                className={`glass-card rounded-3xl p-6 border transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 relative ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-indigo-50/90 shadow-lg'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-indigo-200 text-3xl flex items-center justify-center shadow">
                    {person.avatar}
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                    {person.superSkill}
                  </span>
                </div>

                <h4 className="text-xl font-extrabold text-slate-900 font-display">{person.name}</h4>
                <p className="text-xs text-slate-600 font-medium mt-1">🎨 Hobby: {person.hobby}</p>
                <p className="text-xs text-slate-500 italic mt-2">✨ {person.funFact}</p>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-indigo-600' : 'text-slate-500'}>
                    {isSelected ? 'Teammate Added ✓' : 'Click to Add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Assign Roles */}
      {selected.length === 3 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
              2. Assign Roles to Your Co-Founders
            </h3>
            <p className="text-slate-500 text-xs">Giving clear responsibilities empowers every teammate!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {selected.map(member => (
              <div key={member.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{member.avatar}</span>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">{member.name}</h5>
                    <span className="text-[11px] text-slate-500">{member.superSkill}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Assign Role</label>
                  <select
                    value={roleAssignments[member.id] || ''}
                    onChange={e => handleRoleChange(member.id, e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-slate-50"
                  >
                    <option value="">Select Role...</option>
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Teamwork Challenge */}
      {selected.length === 3 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
              3. Teamwork Mini-Challenge
            </h3>
            <p className="text-slate-600 text-xs">
              "Your team has only 1 laptop available today. Who should use it first?"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'builder', text: 'Give it to the Builder to code prototype', exp: 'Great for technical progress!' },
              { id: 'turns', text: 'Work together in scheduled 20-minute turns', exp: 'Fair and highly collaborative!' },
              { id: 'presenter', text: 'Give it to the Presenter for pitch slides', exp: 'Great for story preparation!' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setChallengeChoice(opt.id)}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  challengeChoice === opt.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
                }`}
              >
                <h5 className="font-extrabold text-sm">{opt.text}</h5>
                <p className={`text-xs ${challengeChoice === opt.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {opt.exp}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Emotional Check-in #1 */}
      {challengeChoice && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-indigo-700 animate-in fade-in zoom-in duration-300">
          <div>
            <h4 className="text-xl font-black font-display text-white mb-1">Emotional Check-in #1</h4>
            <p className="text-slate-300 text-xs">How confident do you feel about your co-founder team?</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'very', label: '😁 Very Confident' },
              { id: 'excited', label: '🙂 Super Excited' },
              { id: 'unsure', label: '😐 A Bit Unsure' },
              { id: 'worried', label: '😟 Worried' }
            ].map(emo => (
              <button
                key={emo.id}
                onClick={() => setEmotionalState(emo.id)}
                className={`p-3 rounded-2xl font-bold text-xs border transition-all ${
                  emotionalState === emo.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md scale-105'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {emo.label}
              </button>
            ))}
          </div>

          {emotionalState && (
            <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-cyan-300 font-medium">
                Sage: "It's totally normal to feel that way! Diverse teams learn and grow strongest together."
              </p>
              <button
                onClick={handleCompleteTeamBuilding}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2"
              >
                <span>Continue to Stage 4: The Build</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

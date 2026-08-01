import React from 'react';
import { Play, CheckCircle2, Lock, Sparkles, Flag, Search, MessageSquare, ClipboardList, Users, Rocket, ShieldAlert, TrendingUp, Compass, GraduationCap } from 'lucide-react';

interface MissionCardProps {
  stageIndex: number;
  title: string;
  roomName: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked?: boolean;
  xpReward?: number;
  onEnterMission: () => void;
}

export const renderMissionIcon = (stageIndex: number) => {
  switch (stageIndex) {
    case 0: return <Search className="w-4 h-4" />;
    case 1: return <MessageSquare className="w-4 h-4" />;
    case 2: return <ClipboardList className="w-4 h-4" />;
    case 3: return <Users className="w-4 h-4" />;
    case 4: return <Rocket className="w-4 h-4" />;
    case 5: return <ShieldAlert className="w-4 h-4" />;
    case 6: return <TrendingUp className="w-4 h-4" />;
    case 7: return <Compass className="w-4 h-4" />;
    case 8: return <GraduationCap className="w-4 h-4" />;
    default: return <Flag className="w-4 h-4" />;
  }
};

export const MISSION_ROOMS = [
  { name: 'Spark Discovery Lab' },
  { name: 'Customer Validation Room' },
  { name: 'Canvas Strategy Room' },
  { name: 'Co-Founder HQ' },
  { name: 'MVP Launch Studio' },
  { name: 'Crisis Arena' },
  { name: 'Growth Engine Room' },
  { name: 'Founder Crossroads' },
  { name: 'Graduation Hall' }
];

export const MissionCard: React.FC<MissionCardProps> = ({
  stageIndex,
  title,
  roomName,
  description,
  isCompleted,
  isCurrent,
  isLocked,
  xpReward = 100,
  onEnterMission
}) => {
  const roomMeta = MISSION_ROOMS[stageIndex] || { name: roomName };

  return (
    <div
      onClick={onEnterMission}
      className={`academy-card p-5 cursor-pointer relative overflow-hidden transition-all ${
        isCurrent
          ? 'ring-2 ring-orange-500 border-orange-400 bg-orange-50/30 dark:bg-orange-950/30'
          : isCompleted
          ? 'border-emerald-200 dark:border-emerald-800'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs ${
            isCompleted
              ? 'bg-emerald-500 text-white'
              : isCurrent
              ? 'bg-orange-500 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> : renderMissionIcon(stageIndex)}
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
              Mission {stageIndex + 1} • {roomMeta.name}
            </span>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm font-display">{title}</h4>
          </div>
        </div>

        <div>
          {isCompleted ? (
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Done ✓
            </span>
          ) : isCurrent ? (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-white" /> Active
            </span>
          ) : (
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              Ready
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-3">
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" /> +{xpReward} XP
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEnterMission();
          }}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
            isCurrent ? 'bpt-btn-primary' : 'bpt-btn-secondary'
          }`}
        >
          <span>{isCurrent ? 'Enter Mission' : isCompleted ? 'Review' : 'Start'}</span>
          <Play className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, Circle, Lock, Play, MapPin, Search, MessageSquare, ClipboardList, Users, Rocket, ShieldAlert, TrendingUp, Compass, GraduationCap, Compass as WorldIcon, Sparkles } from 'lucide-react';

interface JourneyTimelineProps {
  completedStages: number[];
  currentStage: number;
  onSelectStage: (stageIndex: number) => void;
}

export const renderTimelineIcon = (stageIndex: number) => {
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
    default: return <MapPin className="w-4 h-4" />;
  }
};

export const MISSIONS_LIST = [
  { stage: 0, title: 'Find a Problem', room: 'Spark Discovery Lab', zone: 'Zone A • Discovery' },
  { stage: 1, title: 'Validate Your Idea', room: 'Customer Validation Booth', zone: 'Zone B • Research' },
  { stage: 2, title: 'Create Your Plan', room: 'Strategy War Room', zone: 'Zone C • Planning' },
  { stage: 3, title: 'Assemble Dream Team', room: 'Co-Founder Talent HQ', zone: 'Zone D • Team' },
  { stage: 4, title: 'Build Your MVP', room: 'MVP Fabrication Studio', zone: 'Zone E • Product' },
  { stage: 5, title: 'Launch & Handle Wall', room: 'Crisis Control Arena', zone: 'Zone F • Crisis' },
  { stage: 6, title: 'Grow Startup', room: 'Growth Control Center', zone: 'Zone G • Scaling' },
  { stage: 7, title: 'Scale or Pivot', room: 'Founder Crossroads Boardroom', zone: 'Zone H • Strategy' },
  { stage: 8, title: 'Become a Founder', room: 'Graduation Hall', zone: 'Zone I • Mastery' }
];

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  completedStages,
  currentStage,
  onSelectStage
}) => {
  return (
    <div className="academy-card p-6 border-slate-200 dark:border-slate-800 relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-wider bg-orange-100 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
              <Sparkles className="w-3 h-3 text-orange-500" /> Virtual World Academy Map
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white font-display mt-1">
            Founder Simulation World Map
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-black bg-orange-500 text-white px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5">
            <WorldIcon className="w-3.5 h-3.5" />
            <span>{completedStages.length} / {MISSIONS_LIST.length} Virtual Rooms Unlocked</span>
          </span>
        </div>
      </div>

      {/* Responsive Virtual World Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-3 relative">
        {MISSIONS_LIST.map((m, idx) => {
          const isDone = completedStages.includes(idx);
          const isCurrent = currentStage === idx;

          return (
            <div
              key={idx}
              onClick={() => onSelectStage(idx)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center relative ${
                isCurrent
                  ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-105 z-10'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-orange-400'
              }`}
            >
              {/* Node Room Icon */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black mb-2 shadow-xs ${
                isCurrent
                  ? 'bg-white text-orange-600'
                  : isDone
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : renderTimelineIcon(idx)}
              </div>

              <span className={`text-[9px] font-black uppercase tracking-wider mb-0.5 ${
                isCurrent ? 'text-orange-100' : 'text-slate-400 dark:text-slate-400'
              }`}>
                Room {idx}
              </span>

              <h5 className="font-extrabold text-xs leading-tight mb-1 font-display line-clamp-1">
                {m.title}
              </h5>

              <span className={`text-[10px] font-medium line-clamp-1 ${
                isCurrent ? 'text-orange-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                {m.room}
              </span>

              {isCurrent && (
                <span className="mt-2 bg-white text-orange-600 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs uppercase tracking-wider">
                  <MapPin className="w-2.5 h-2.5" /> Inside Room
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

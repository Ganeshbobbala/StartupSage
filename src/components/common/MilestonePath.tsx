import React from 'react';
import { Check, Rocket } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface MilestonePathProps {
  currentStage: number;
}

const STAGES = [
  { stage: 0, title: 'Spark', icon: '💡' },
  { stage: 1, title: 'Idea', icon: '📝' },
  { stage: 2, title: 'Plan', icon: '🗺️' },
  { stage: 3, title: 'Team', icon: '🤝' },
  { stage: 4, title: 'Build', icon: '🔨' },
  { stage: 5, title: 'Crisis', icon: '🧱' },
  { stage: 6, title: 'Growth', icon: '📈' },
  { stage: 7, title: 'Choice', icon: '🧭' },
  { stage: 8, title: 'Passport', icon: '🎓' },
];

export const MilestonePath: React.FC<MilestonePathProps> = ({ currentStage }) => {
  const { setStage } = useGame();

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
            <Rocket className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black font-display text-slate-900 leading-tight">Founder Journey Path</h4>
            <span className="text-[11px] font-semibold text-slate-500">Milestone Stage Progression</span>
          </div>
        </div>

        <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
          Stage {currentStage} of 8
        </span>
      </div>

      {/* Connected Milestone Nodes Path */}
      <div className="relative pt-2 pb-1 px-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[640px] relative">
          
          {/* Background Path Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0 rounded-full" />

          {/* Active Fill Path Line */}
          <div 
            className="absolute top-5 left-6 h-1 bg-orange-500 -z-0 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStage / 8) * 94}%` }}
          />

          {STAGES.map((s) => {
            const isCompleted = s.stage < currentStage;
            const isActive = s.stage === currentStage;
            const isUpcoming = s.stage > currentStage;

            return (
              <button
                key={s.stage}
                onClick={() => setStage(s.stage)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                {/* Milestone Node Badge */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md scale-95'
                      : isActive
                      ? 'bg-slate-900 text-white border-2 border-orange-500 shadow-lg scale-110 ring-4 ring-orange-500/20'
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : s.icon}
                </div>

                {/* Milestone Title */}
                <span className={`text-[11px] font-bold mt-2 transition-colors ${
                  isActive ? 'text-orange-600 font-extrabold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MessageSquare, AlertCircle, HelpCircle, ThumbsUp, Star, CheckCircle2 } from 'lucide-react';

interface CustomerReactionProps {
  initialState?: 'skeptical' | 'thinking' | 'interested' | 'smiling';
  onReactionChange?: (reaction: string) => void;
}

export const CustomerReactionWidget: React.FC<CustomerReactionProps> = ({
  initialState = 'thinking',
  onReactionChange,
}) => {
  const [reaction, setReaction] = useState<'skeptical' | 'thinking' | 'interested' | 'smiling'>(initialState);

  const reactions = [
    { id: 'skeptical', icon: AlertCircle, label: 'Skeptical', note: 'Not convinced yet... Why does this matter to me?' },
    { id: 'thinking', icon: HelpCircle, label: 'Thinking', note: 'Sounds interesting, but is it worth paying for?' },
    { id: 'interested', icon: ThumbsUp, label: 'Interested', note: 'This would save me so much time! I\'d try it out.' },
    { id: 'smiling', icon: Star, label: 'Super Fan!', note: 'I love this idea! Where can I sign up right now?' },
  ];

  const currentObj = reactions.find(r => r.id === reaction) || reactions[1];
  const CurrentIcon = currentObj.icon;

  const handleSelect = (id: 'skeptical' | 'thinking' | 'interested' | 'smiling') => {
    setReaction(id);
    if (onReactionChange) onReactionChange(id);
  };

  return (
    <div className="academy-card p-5 space-y-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Customer Reaction Simulation
          </span>
        </div>
        <span className="text-[10px] font-extrabold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800 uppercase tracking-wider">
          Live Feedback
        </span>
      </div>

      {/* Customer Reaction Sentiment Selector Buttons (Clean Icons, No Emojis) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {reactions.map(r => {
          const isSelected = reaction === r.id;
          const IconComp = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id as any)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-orange-500 text-white border-orange-600 shadow-sm font-bold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-orange-300'
              }`}
            >
              <IconComp className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
              <span className="block text-xs font-bold leading-none">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Customer Sentiment Response Box */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/80 flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-800">
          <CurrentIcon className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
            {currentObj.label} Customer Response:
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-0.5 leading-relaxed font-medium">
            "{currentObj.note}"
          </p>
        </div>
      </div>
    </div>
  );
};

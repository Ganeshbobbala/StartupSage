import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Sparkles } from 'lucide-react';

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
    { id: 'skeptical', emoji: '🧐', label: 'Skeptical', note: 'Not convinced yet... Why does this matter to me?' },
    { id: 'thinking', emoji: '🤔', label: 'Thinking', note: 'Sounds interesting, but is it worth paying for?' },
    { id: 'interested', emoji: '😊', label: 'Interested', note: 'This would save me so much time! I\'d try it out.' },
    { id: 'smiling', emoji: '😄', label: 'Super Fan!', note: 'I love this idea! Where can I sign up right now?' },
  ];

  const currentObj = reactions.find(r => r.id === reaction) || reactions[1];

  const handleSelect = (id: 'skeptical' | 'thinking' | 'interested' | 'smiling') => {
    setReaction(id);
    if (onReactionChange) onReactionChange(id);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Reaction Simulation</span>
        </div>
        <span className="text-xs font-bold text-orange-600 bg-orange-100/70 px-2.5 py-0.5 rounded-full">
          Live Feedback
        </span>
      </div>

      {/* Customer Reaction Sentiment Selector */}
      <div className="grid grid-cols-4 gap-2">
        {reactions.map(r => {
          const isSelected = reaction === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id as any)}
              className={`p-3 rounded-2xl border text-center transition-all btn-tactile ${
                isSelected
                  ? 'bg-white border-orange-500 text-slate-900 shadow-md scale-105 font-bold ring-2 ring-orange-500/20'
                  : 'bg-slate-100/70 border-slate-200 text-slate-500 hover:bg-white'
              }`}
            >
              <div className="text-2xl transition-transform duration-300 transform group-hover:scale-110">
                {r.emoji}
              </div>
              <span className="block text-[11px] font-bold mt-1 leading-none">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Customer Sentiment Note */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{currentObj.emoji}</div>
        <div>
          <span className="text-xs font-bold text-slate-900 block">{currentObj.label} Customer Response:</span>
          <p className="text-xs text-slate-600 italic mt-0.5">"{currentObj.note}"</p>
        </div>
      </div>
    </div>
  );
};

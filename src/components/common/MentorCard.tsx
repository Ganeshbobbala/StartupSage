import React from 'react';
import { Sparkles, Brain, MessageCircle, HeartHandshake, Award } from 'lucide-react';

interface MentorCardProps {
  mentorName?: string;
  role?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  mood?: 'welcoming' | 'encouraging' | 'celebrating' | 'challenging';
  stageTitle?: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentorName = 'Sage',
  role = 'Virtual Mentor & Academy Dean',
  message,
  actionText,
  onAction,
  mood = 'encouraging',
  stageTitle
}) => {
  return (
    <div className="academy-card p-6 border-orange-200 dark:border-slate-700 relative overflow-hidden">
      <div className="flex items-start gap-4">
        {/* Mentor Icon */}
        <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shrink-0 shadow-sm">
          <Brain className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2 font-display">
                {mentorName}
                <span className="bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                  {role}
                </span>
              </h4>
              {stageTitle && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Guide for {stageTitle}</span>
              )}
            </div>
          </div>

          <div className="speech-bubble speech-bubble-orange text-xs sm:text-sm font-medium leading-relaxed">
            "{message}"
          </div>

          {actionText && onAction && (
            <button
              onClick={onAction}
              className="bpt-btn-primary text-xs py-2 px-4 mt-2"
            >
              <span>{actionText}</span>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

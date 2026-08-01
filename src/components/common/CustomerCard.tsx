import React from 'react';
import { MessageSquare, Heart, AlertCircle, CheckCircle, UserCheck, GraduationCap, Stethoscope, Sprout, Store, Users } from 'lucide-react';

export type CustomerRole = 'Teacher' | 'Doctor' | 'Farmer' | 'Small Business Owner' | 'Student' | 'Parents';

interface CustomerCardProps {
  name: string;
  role: CustomerRole;
  avatar: string;
  problemStatement: string;
  desiredSolution?: string;
  reactionFeedback?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const renderCustomerIcon = (role: CustomerRole) => {
  switch (role) {
    case 'Teacher': return <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    case 'Doctor': return <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    case 'Farmer': return <Sprout className="w-5 h-5 text-lime-600 dark:text-lime-400" />;
    case 'Small Business Owner': return <Store className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    case 'Student': return <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    case 'Parents': return <Users className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
    default: return <UserCheck className="w-5 h-5 text-orange-500" />;
  }
};

export const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  role,
  problemStatement,
  desiredSolution,
  reactionFeedback,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`academy-card p-5 cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-orange-500 border-orange-400 bg-orange-50/40 dark:bg-orange-950/40'
          : 'hover:border-orange-300'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Customer Icon Box */}
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-orange-200 dark:border-slate-700">
          {renderCustomerIcon(role)}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base font-display">{name}</h4>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-slate-800 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-slate-700">
              {role}
            </span>
          </div>

          <div className="speech-bubble text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
              <span>Real World Problem:</span>
            </div>
            "{problemStatement}"
          </div>

          {desiredSolution && (
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium pt-1">
              <span className="font-bold text-slate-900 dark:text-white">Wants:</span> {desiredSolution}
            </p>
          )}

          {reactionFeedback && (
            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 text-xs text-emerald-900 dark:text-emerald-200 font-medium flex items-start gap-2 mt-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-emerald-950 dark:text-emerald-100">Customer Feedback:</span>
                "{reactionFeedback}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

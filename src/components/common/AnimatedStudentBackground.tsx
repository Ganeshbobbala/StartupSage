import React from 'react';

export const AnimatedStudentBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* 1. Subtle Architectural Dot-Grid Background Canvas */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* 2. Soft Ambient shifting Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* 3. Floating Student Founder Badges (Organic Drift Animations) */}
      <div className="absolute top-24 left-[8%] animate-float-slow opacity-80 shadow-md bg-white/90 border border-orange-200 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-orange-600">
        <span>💡</span>
        <span>Idea Spark</span>
      </div>

      <div className="absolute top-36 right-[10%] animate-float-medium opacity-80 shadow-md bg-white/90 border border-indigo-200 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-indigo-600">
        <span>🚀</span>
        <span>Launch Phase</span>
      </div>

      <div className="absolute top-1/2 left-[4%] animate-float-slow opacity-75 shadow-md bg-white/90 border border-emerald-200 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-emerald-600">
        <span>🪙</span>
        <span>+50 Coins</span>
      </div>

      <div className="absolute bottom-40 right-[6%] animate-float-medium opacity-80 shadow-md bg-white/90 border border-amber-200 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-amber-600">
        <span>🏆</span>
        <span>Milestone Unlocked</span>
      </div>

      <div className="absolute bottom-20 left-[12%] animate-float-slow opacity-75 shadow-md bg-white/90 border border-cyan-200 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-cyan-600">
        <span>⚡</span>
        <span>Resilience +100</span>
      </div>

    </div>
  );
};

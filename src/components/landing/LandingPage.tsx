import React from 'react';
import { 
  Rocket, Sparkles, Award, Brain, Users, Lightbulb, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Zap, ChevronRight, MessageSquare 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const LandingPage: React.FC = () => {
  const { setView, setStage } = useGame();

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center relative z-10">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 font-extrabold text-xs sm:text-sm mb-6 border border-orange-200 dark:border-orange-800">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>Designed for School Students • Classes 6 to 12</span>
          <span className="bg-orange-500 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">Virtual Academy</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-6 max-w-4xl mx-auto font-display">
          Turn Your Ideas Into <span className="text-orange-500">Amazing Startups!</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
          Learn entrepreneurship through an interactive virtual startup simulation. Solve real problems, make smart decisions, interact with virtual mentors & customers, and earn your Founder Passport!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setView('onboarding')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bpt-btn-primary text-white font-extrabold text-base shadow-lg flex items-center justify-center gap-2"
          >
            <Rocket className="w-5 h-5 text-white" />
            <span>Start Free Founder Journey</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Hero Interactive Showcase Card */}
        <div className="max-w-4xl mx-auto academy-card p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-left">
            
            <div className="space-y-3 z-10">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                <Brain className="w-4 h-4 text-orange-400" /> Virtual Mentor "Sage" Guidance
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">"Every big startup begins with one curious spark!"</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
                Choose a real-world challenge, build your co-founder team, allocate your seed budget, and test your decision making!
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="bg-slate-800 text-blue-300 text-xs px-3 py-1 rounded-full font-bold">📚 EdTech</span>
                <span className="bg-slate-800 text-lime-300 text-xs px-3 py-1 rounded-full font-bold">🌱 AgriTech</span>
                <span className="bg-slate-800 text-cyan-300 text-xs px-3 py-1 rounded-full font-bold">🏥 HealthTech</span>
                <span className="bg-slate-800 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold">💳 FinTech</span>
              </div>
            </div>

            <div className="z-10 shrink-0">
              <button
                onClick={() => setStage(0)}
                className="px-6 py-3 rounded-xl bpt-btn-primary text-white font-extrabold text-xs flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Jump into Stage 0</span>
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white font-display mb-3">
            Why Students & Schools <span className="text-orange-500">Love StartupSage</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Combining entrepreneurship education, decision-making scenarios, and virtual customer feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="academy-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">1. Virtual Mentor Sage</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Virtual Mentor "Sage" explains startup concepts, gives real-time feedback, and celebrates your progress.
            </p>
          </div>

          {/* Card 2 */}
          <div className="academy-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">2. Virtual Customers</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Interact with teachers, doctors, farmers, and students explaining their real-world problems.
            </p>
          </div>

          {/* Card 3 */}
          <div className="academy-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">3. Founder Passport</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Complete all 8 missions to receive your digital Founder Passport and graduation certificate.
            </p>
          </div>

        </div>
      </section>

      {/* High-Contrast Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="cta-banner-bg rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
              Ready to Build Your First Startup?
            </h2>
            <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Join thousands of school students exploring innovation, leadership, and creative problem solving.
            </p>
            <button
              onClick={() => setView('onboarding')}
              className="px-8 py-3.5 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-extrabold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <Rocket className="w-5 h-5 text-orange-600" />
              <span>Start Free Adventure Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

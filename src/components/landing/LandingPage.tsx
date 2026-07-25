import React from 'react';
import { 
  Rocket, Sparkles, Award, Brain, Users, Lightbulb, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Zap, ChevronRight, MessageSquare 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const LandingPage: React.FC = () => {
  const { setView, setStage } = useGame();

  return (
    <div className="bg-hero-gradient min-h-screen relative overflow-hidden">
      
      {/* Background Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-indigo-500/10 backdrop-blur-md flex items-center justify-center animate-float text-2xl shadow-lg border border-indigo-200/50">
        💡
      </div>
      <div className="absolute top-40 right-16 w-20 h-20 rounded-full bg-cyan-500/10 backdrop-blur-md flex items-center justify-center animate-float text-3xl shadow-lg border border-cyan-200/50" style={{ animationDelay: '1.5s' }}>
        🚀
      </div>
      <div className="absolute bottom-32 left-20 w-16 h-16 rounded-full bg-amber-500/10 backdrop-blur-md flex items-center justify-center animate-float text-2xl shadow-lg border border-amber-200/50" style={{ animationDelay: '2.5s' }}>
        🏆
      </div>
      <div className="absolute top-96 right-36 w-14 h-14 rounded-full bg-emerald-500/10 backdrop-blur-md flex items-center justify-center animate-float text-xl shadow-lg border border-emerald-200/50" style={{ animationDelay: '3s' }}>
        🧩
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center relative z-10">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-indigo-700 font-extrabold text-xs sm:text-sm shadow-md mb-8 border border-indigo-200/80 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Designed for School Students • Classes 6 to 12</span>
          <span className="bg-indigo-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">New AI Mentor</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-tight mb-6 max-w-5xl mx-auto font-display">
          Turn Your Ideas Into <span className="gradient-text">Amazing Startups!</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Learn entrepreneurship by playing an exciting AI-powered adventure. Solve real problems, make smart decisions, earn XP rewards, and earn your official Founder Passport!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setView('onboarding')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bpt-btn-primary btn-tactile text-white font-extrabold text-lg shadow-xl flex items-center justify-center gap-3 group"
          >
            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Start Free Founder Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Hero Interactive Showcase Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 text-left relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>

            <div className="space-y-3 z-10">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <Brain className="w-4 h-4" /> AI Mentor "Sage" is Live
              </div>
              <h3 className="text-2xl font-black font-display text-white">"Every big startup begins with one curious spark!"</h3>
              <p className="text-slate-300 text-sm max-w-lg">
                Choose a real-world challenge, build your co-founder team, allocate your ₹5,00,000 seed budget, and test your decision making!
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="bg-indigo-800/80 text-indigo-200 text-xs px-3 py-1 rounded-full font-semibold">📚 EdTech</span>
                <span className="bg-cyan-800/80 text-cyan-200 text-xs px-3 py-1 rounded-full font-semibold">🌱 AgriTech</span>
                <span className="bg-amber-800/80 text-amber-200 text-xs px-3 py-1 rounded-full font-semibold">🏥 HealthTech</span>
                <span className="bg-emerald-800/80 text-emerald-200 text-xs px-3 py-1 rounded-full font-semibold">🛍 D2C Brand</span>
              </div>
            </div>

            <div className="z-10 text-center sm:text-right flex-shrink-0">
              <button
                onClick={() => setStage(0)}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Jump into Stage 0</span>
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display mb-4">
            Why Students & Schools <span className="gradient-text">Love StartupSage</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Combining child psychology, gamification, and real-world innovation concepts into a fun, safe adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all border border-indigo-100/80 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              🤖
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">1. Friendly AI Mentor</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              AI mentor "Sage" explains complex startup terms simply, gives encouraging feedback, and helps you learn from every choice.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all border border-cyan-100/80 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              🚀
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">2. Startup Adventure</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Experience all 8 stages of starting a company—from problem spark to co-founders, budgeting, crisis management, and growth.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all border border-amber-100/80 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              📜
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">3. Founder Passport</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Earn your personalized 1080x1080 Founder Passport & verifiable digital certificate to showcase your entrepreneurial achievement!
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all border border-purple-100/80 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              🏆
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">4. Gamified Rewards</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Collect XP points, Startup Coins, Innovation Streaks, and unlock 8+ rare achievement badges as you level up.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all border border-emerald-100/80 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              🎮
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">5. Learn by Playing</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No boring lectures or textbooks! You learn decision making, leadership, customer empathy, and resilience by building.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all border border-rose-100/80 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              🛡
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">6. Safe for Students</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              100% student-safe content free of financial stress or harsh jargon. Ideal for school innovation clubs, ATL labs, and classrooms.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              4-Step Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white mt-4 mb-4">
              How StartupSage Works
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              From zero business experience to earning your Founder Passport in 4 interactive steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="glass-dark rounded-3xl p-6 relative border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full gradient-button text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Pick a Problem</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Explore real problems in Education, Health, Environment, or Tech for target personas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-dark rounded-3xl p-6 relative border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Build Your Startup</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Assemble co-founders, design a 6-block plan, and spend your ₹5,00,000 seed budget.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-dark rounded-3xl p-6 relative border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Overcome Crises</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Face "The Wall", solve surprise startup challenges, listen to founder voice notes & grow!
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-dark rounded-3xl p-6 relative border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                4
              </div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Earn Founder Passport</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Unlock your AI founder profile, claim your certificate, and share your success!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display mb-4">
            Hear From Our <span className="gradient-text">Young Founders</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Students across India are building confidence and leadership skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Student 1 */}
          <div className="glass-card rounded-3xl p-8 border border-indigo-100 shadow-md">
            <div className="flex items-center gap-1 text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
              "I never knew building a startup could be this fun! The AI mentor helped me organize my thoughts and make smart decisions for my EdTech app."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                A
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Ananya R.</h5>
                <p className="text-xs text-slate-500">Class 8 • Delhi Public School</p>
              </div>
            </div>
          </div>

          {/* Student 2 */}
          <div className="glass-card rounded-3xl p-8 border border-cyan-100 shadow-md">
            <div className="flex items-center gap-1 text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
              "The Wall crisis stage taught me how to handle stress when things go wrong. I loved unlocking my Founder Passport and showing my parents!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center">
                K
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Kabir S.</h5>
                <p className="text-xs text-slate-500">Class 10 • Kendriya Vidyalaya</p>
              </div>
            </div>
          </div>

          {/* Student 3 */}
          <div className="glass-card rounded-3xl p-8 border border-emerald-100 shadow-md">
            <div className="flex items-center gap-1 text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
              "Building our dream team with Arjun and Maya was super cool. The simulated budget pie chart made financial planning feel like a video game."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                P
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Priya M.</h5>
                <p className="text-xs text-slate-500">Class 7 • Oakridge International</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="gradient-button rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black font-display mb-4">
              Ready to Build Your First Startup?
            </h2>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-8">
              Join thousands of school students exploring innovation, leadership, and creative problem solving.
            </p>
            <button
              onClick={() => setView('onboarding')}
              className="px-10 py-4 rounded-2xl bg-white text-indigo-700 hover:bg-slate-100 font-extrabold text-lg shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <Rocket className="w-5 h-5" />
              <span>Start Free Adventure Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

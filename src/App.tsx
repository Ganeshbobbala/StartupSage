import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { Stage0Spark } from './components/stages/Stage0Spark';
import { Stage1Idea } from './components/stages/Stage1Idea';
import { Stage2Plan } from './components/stages/Stage2Plan';
import { Stage3Team } from './components/stages/Stage3Team';
import { Stage4Build } from './components/stages/Stage4Build';
import { Stage5Wall } from './components/stages/Stage5Wall';
import { Stage6Growth } from './components/stages/Stage6Growth';
import { Stage7Decision } from './components/stages/Stage7Decision';
import { Stage8Journey } from './components/stages/Stage8Journey';
import { FounderPassport } from './components/passport/FounderPassport';
import { DigitalCertificate } from './components/certificate/DigitalCertificate';
import { Leaderboard } from './components/gamification/Leaderboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { AnimatedStudentBackground } from './components/common/AnimatedStudentBackground';

const MainRouter: React.FC = () => {
  const { state } = useGame();

  const renderStage = () => {
    switch (state.currentStage) {
      case 0: return <Stage0Spark />;
      case 1: return <Stage1Idea />;
      case 2: return <Stage2Plan />;
      case 3: return <Stage3Team />;
      case 4: return <Stage4Build />;
      case 5: return <Stage5Wall />;
      case 6: return <Stage6Growth />;
      case 7: return <Stage7Decision />;
      case 8: return <Stage8Journey />;
      default: return <Stage0Spark />;
    }
  };

  const renderView = () => {
    switch (state.currentView) {
      case 'landing': return <LandingPage />;
      case 'onboarding': return <OnboardingFlow />;
      case 'dashboard': return <StudentDashboard />;
      case 'stage': return renderStage();
      case 'passport': return <FounderPassport />;
      case 'certificate': return <DigitalCertificate />;
      case 'leaderboard': return <Leaderboard />;
      case 'teacher': return <TeacherDashboard />;
      case 'parent': return <ParentDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'profile': return <OnboardingFlow />;
      default: return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased relative">
      <AnimatedStudentBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <MainRouter />
    </GameProvider>
  );
}

export default App;

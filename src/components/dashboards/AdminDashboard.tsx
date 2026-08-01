import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Users, BookOpen, Award, CheckCircle, XCircle, Clock, Zap, Shield, 
  Sliders, TrendingUp, School, Search, Filter, Eye, MessageSquare, Sparkles, PieChart, BarChart3, GraduationCap, LogOut, ShieldCheck 
} from 'lucide-react';
import { StageSubmission, AdminCohort } from '../../types/game';
import { MentorCard } from '../common/MentorCard';
import { AuthModal } from '../auth/AuthModal';

export const AdminDashboard: React.FC = () => {
  const { state, setView, logoutUser } = useGame();
  const [activeTab, setActiveTab] = useState<'funnel' | 'submissions' | 'cohorts' | 'domains'>('funnel');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<StageSubmission | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Auth Guard: Admin access requires being logged in with role === 'admin'
  if (!state.isLoggedIn || state.studentProfile.role !== 'admin') {
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="academy-card p-8 sm:p-12 space-y-6 border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
                Admin Login Required
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Access to the Academy Director Portal requires School Admin or Educator credentials. Please log in with your Admin details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bpt-btn-primary py-3 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Log in as Admin</span>
              </button>

              <button
                onClick={() => setView('landing')}
                className="bpt-btn-secondary py-3 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialRole="admin"
          initialMode="login"
        />
      </>
    );
  }

  // Stage Completion Funnel Data (8 Missions)
  const funnelData = [
    { stage: 'Mission 1: Find a Problem', count: 1420, rate: '100%' },
    { stage: 'Mission 2: Validate Idea', count: 1280, rate: '90%' },
    { stage: 'Mission 3: Create Plan', count: 1110, rate: '78%' },
    { stage: 'Mission 4: Build MVP', count: 940, rate: '66%' },
    { stage: 'Mission 5: Launch & Wall', count: 820, rate: '58%' },
    { stage: 'Mission 6: Grow Startup', count: 710, rate: '50%' },
    { stage: 'Mission 7: Scale Crossroads', count: 620, rate: '44%' },
    { stage: 'Mission 8: Founder Passport', count: 540, rate: '38%' }
  ];

  // Popular Startup Domains Stats
  const domainStats = [
    { name: 'EdTech', percent: 32, count: 454, color: 'bg-blue-500' },
    { name: 'HealthTech', percent: 24, count: 340, color: 'bg-cyan-500' },
    { name: 'AgriTech', percent: 18, count: 255, color: 'bg-lime-500' },
    { name: 'FinTech', percent: 14, count: 198, color: 'bg-emerald-500' },
    { name: 'D2C', percent: 8, count: 113, color: 'bg-pink-500' },
    { name: 'AI & SaaS', percent: 4, count: 60, color: 'bg-purple-500' }
  ];

  // Mock initial submissions data
  const [submissions, setSubmissions] = useState<StageSubmission[]>([
    {
      id: 'sub-1',
      studentName: 'Aarav Sharma',
      grade: 'Class 8-A',
      stageNumber: 2,
      stageTitle: 'Mission 3: Lean Canvas Strategy',
      submittedAt: '10 mins ago',
      status: 'pending',
      score: 85,
      contentSummary: 'Solar-powered backpack with built-in LED study light for rural students.'
    },
    {
      id: 'sub-2',
      studentName: 'Priya Patel',
      grade: 'Class 9-C',
      stageNumber: 4,
      stageTitle: 'Mission 5: Launch & Prototype Plan',
      submittedAt: '35 mins ago',
      status: 'pending',
      score: 92,
      contentSummary: 'Eco-friendly cafeteria waste digester turning food scraps into compost.'
    },
    {
      id: 'sub-3',
      studentName: 'Rohan Gupta',
      grade: 'Class 7-B',
      stageNumber: 1,
      stageTitle: 'Mission 2: Idea Validation',
      submittedAt: '2 hours ago',
      status: 'approved',
      score: 90,
      feedback: 'Excellent customer interview insights!',
      contentSummary: 'Smart water leakage alert badge for school water coolers.'
    }
  ]);

  const cohorts: AdminCohort[] = [
    {
      id: 'c-1',
      schoolName: 'Delhi Public School, Vasant Kunj',
      grade: 'Class 8 Cohort',
      totalStudents: 240,
      avgStageCompleted: 4.8,
      teacherInCharge: 'Sunita Narang',
      status: 'Active'
    },
    {
      id: 'c-2',
      schoolName: 'St. Xavier High School',
      grade: 'Class 9 Cohort',
      totalStudents: 210,
      avgStageCompleted: 5.8,
      teacherInCharge: 'Rajesh Malhotra',
      status: 'Active'
    },
    {
      id: 'c-3',
      schoolName: 'Kendriya Vidyalaya No. 1',
      grade: 'Class 7 Cohort',
      totalStudents: 195,
      avgStageCompleted: 3.4,
      teacherInCharge: 'Anil Kumar',
      status: 'Active'
    }
  ];

  const handleApprove = (subId: string) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'approved', feedback: 'Approved by Academy Director! Great work founder.' } : s));
    setSelectedSubmission(null);
  };

  const handleReject = (subId: string) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'needs_revision', feedback: 'Please refine your customer interview section.' } : s));
    setSelectedSubmission(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Story Admin Header */}
      <div className="academy-card p-6 bg-slate-900 text-white rounded-3xl border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-display text-white">Academy Director Portal</h2>
                <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  Simulation Analytics
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Overseeing 1,420 Student Founders in the Startup Academy Simulation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-orange-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>540 Passports Issued</span>
            </div>
            <button
              onClick={logoutUser}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Director Mentor Guidance */}
      <MentorCard
        mentorName="Sage"
        role="Academy Director"
        message="Director, here are your latest Academy analytics. Student founders are performing exceptionally well in EdTech and HealthTech missions!"
        mood="welcoming"
      />

      {/* Top Simulation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="academy-card p-5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Founders</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white font-display">1,420</h4>
            </div>
          </div>
        </div>

        <div className="academy-card p-5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Passports Issued</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white font-display">540</h4>
            </div>
          </div>
        </div>

        <div className="academy-card p-5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
              <School className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">School Cohorts</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white font-display">18 Schools</h4>
            </div>
          </div>
        </div>

        <div className="academy-card p-5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Avg Innovation XP</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white font-display">4,850 XP</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-extrabold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('funnel')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'funnel'
              ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Stage Completion Funnel</span>
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'domains'
              ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Popular Startup Domains</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'submissions'
              ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Mission Submissions ({submissions.filter(s => s.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cohorts')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'cohorts'
              ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <School className="w-4 h-4" />
          <span>School Cohorts</span>
        </button>
      </div>

      {/* TAB 1: Stage Funnel */}
      {activeTab === 'funnel' && (
        <div className="academy-card p-6 space-y-6 border-slate-200 dark:border-slate-800">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg font-display">Founder Academy Mission Funnel</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tracking student progression through all 8 Academy simulation rooms.</p>

          <div className="space-y-4">
            {funnelData.map((f, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">{f.stage}</span>
                  <span className="text-orange-600 dark:text-orange-400">{f.count} Founders ({f.rate})</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className="bg-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: f.rate }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Domains */}
      {activeTab === 'domains' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="academy-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg font-display">Domain Breakdown</h3>
            <div className="space-y-4">
              {domainStats.map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-900 dark:text-white">{d.name}</span>
                    <span className="text-slate-600 dark:text-slate-400">{d.count} Startups ({d.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className={`${d.color} h-full rounded-full`} style={{ width: `${d.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="academy-card p-6 bg-orange-50 dark:bg-slate-800 border-orange-200 dark:border-slate-700 space-y-3">
            <h4 className="font-extrabold text-orange-900 dark:text-orange-400 text-base font-display">Founder Insights</h4>
            <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed font-medium">
              • <strong>EdTech & HealthTech</strong> remain the top choice for student founders (56% of total ideas).
              <br />
              • 38% of enrolled students successfully earn their <strong>Founder Passport</strong> within 4 weeks.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Submissions */}
      {activeTab === 'submissions' && (
        <div className="academy-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg font-display">Student Mission Submissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Mission</th>
                  <th className="p-3">Summary</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
                {submissions.map(s => (
                  <tr key={s.id}>
                    <td className="p-3 font-bold">{s.studentName} ({s.grade})</td>
                    <td className="p-3 text-orange-600 dark:text-orange-400 font-bold">{s.stageTitle}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{s.contentSummary}</td>
                    <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{s.score}/100</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleApprove(s.id)}
                        className="bpt-btn-primary py-1 px-3 text-[11px]"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Cohorts */}
      {activeTab === 'cohorts' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cohorts.map(c => (
            <div key={c.id} className="academy-card p-5 space-y-3 border-slate-200 dark:border-slate-800">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-base font-display">{c.schoolName}</h4>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">{c.grade} • Teacher: {c.teacherInCharge}</p>
              <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Enrolled: {c.totalStudents} Founders | Avg Stage: {c.avgStageCompleted}/8
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

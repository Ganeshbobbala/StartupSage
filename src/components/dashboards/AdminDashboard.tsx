import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Shield, 
  Sliders, 
  TrendingUp, 
  School,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { StageSubmission, AdminCohort } from '../../types/game';

export const AdminDashboard: React.FC = () => {
  const { state } = useGame();
  const [activeTab, setActiveTab] = useState<'submissions' | 'cohorts' | 'settings'>('submissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<StageSubmission | null>(null);

  // Mock initial submissions data
  const [submissions, setSubmissions] = useState<StageSubmission[]>([
    {
      id: 'sub-1',
      studentName: 'Aarav Sharma',
      grade: 'Class 8-A',
      stageNumber: 2,
      stageTitle: 'Stage 2: Lean Canvas Plan',
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
      stageTitle: 'Stage 4: Financial & Prototype Plan',
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
      stageTitle: 'Stage 1: Idea Refinement',
      submittedAt: '2 hours ago',
      status: 'approved',
      score: 90,
      feedback: 'Excellent problem framing and user persona empathy maps!',
      contentSummary: 'Smart water leakage alert badge for school water coolers.'
    },
    {
      id: 'sub-4',
      studentName: 'Ananya Verma',
      grade: 'Class 8-B',
      stageNumber: 7,
      stageTitle: 'Stage 7: Pitch Deck & Pivot Engine',
      submittedAt: '5 hours ago',
      status: 'pending',
      score: 88,
      contentSummary: 'Community book exchange app with gamified reading streaks.'
    }
  ]);

  // Real partner cohorts data (1,340+ active student founders)
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
    },
    {
      id: 'c-4',
      schoolName: 'National Public School',
      grade: 'Class 10 Cohort',
      totalStudents: 280,
      avgStageCompleted: 6.2,
      teacherInCharge: 'Dr. Meenakshi Sundaram',
      status: 'Active'
    },
    {
      id: 'c-5',
      schoolName: 'DAV Public School',
      grade: 'Class 8 & 9 Cohort',
      totalStudents: 320,
      avgStageCompleted: 5.1,
      teacherInCharge: 'Vikramaditya Sen',
      status: 'Active'
    },
    {
      id: 'c-6',
      schoolName: 'Modern School, Barakhamba',
      grade: 'Class 11 Enterprise Cohort',
      totalStudents: 195,
      avgStageCompleted: 7.0,
      teacherInCharge: 'Rashmi Kapoor',
      status: 'Active'
    }
  ];

  const handleApprove = (subId: string) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'approved', feedback: 'Approved by Admin! Great work founder.' } : s));
    setSelectedSubmission(null);
  };

  const handleReject = (subId: string) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'needs_revision', feedback: 'Please refine your target audience section before resubmitting.' } : s));
    setSelectedSubmission(null);
  };

  const filteredSubmissions = submissions.filter(s => 
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.stageTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Admin & Director Portal</h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30">
                  SuperAdmin
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">StartupSage National Incubator Management Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/50 px-4 py-2 rounded-xl text-indigo-300 text-xs font-medium">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>2x XP Multiplier Active</span>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Launch Cohort Challenge</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Student Founders</p>
              <p className="text-2xl font-bold text-white mt-0.5">1,420</p>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">↑ 18% this month</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <School className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Active School Cohorts</p>
              <p className="text-2xl font-bold text-white mt-0.5">18 Schools</p>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">3 Region Clusters</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Pending Submissions</p>
              <p className="text-2xl font-bold text-white mt-0.5">{submissions.filter(s => s.status === 'pending').length} Reviews</p>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">Requires Evaluation</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Avg Innovation Index</p>
              <p className="text-2xl font-bold text-white mt-0.5">4.8 / 5.0</p>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">Top Tier Growth</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 space-x-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-4 transition relative flex items-center space-x-2 ${
              activeTab === 'submissions'
                ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Stage Submissions & Review</span>
            <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full ml-1">
              {submissions.filter(s => s.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cohorts')}
            className={`pb-4 transition relative flex items-center space-x-2 ${
              activeTab === 'cohorts'
                ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <School className="w-4 h-4" />
            <span>School Cohorts</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 transition relative flex items-center space-x-2 ${
              activeTab === 'settings'
                ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Incubator Settings</span>
          </button>
        </div>

        {/* TAB 1: Stage Submissions */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by student name or stage title..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center space-x-2">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter Pending Only</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Student & Grade</th>
                      <th className="p-4">Stage Details</th>
                      <th className="p-4">Submission Summary</th>
                      <th className="p-4">Score</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4">
                          <div className="font-semibold text-white">{sub.studentName}</div>
                          <div className="text-xs text-slate-400">{sub.grade}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-amber-300">{sub.stageTitle}</div>
                          <div className="text-xs text-slate-400">{sub.submittedAt}</div>
                        </td>
                        <td className="p-4 max-w-xs truncate text-xs text-slate-300">
                          {sub.contentSummary}
                        </td>
                        <td className="p-4 font-bold text-emerald-400">
                          {sub.score} / 100
                        </td>
                        <td className="p-4">
                          {sub.status === 'pending' && (
                            <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-500/30">
                              Pending Review
                            </span>
                          )}
                          {sub.status === 'approved' && (
                            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-500/30">
                              Approved
                            </span>
                          )}
                          {sub.status === 'needs_revision' && (
                            <span className="bg-rose-500/20 text-rose-300 text-xs px-2.5 py-1 rounded-full font-medium border border-rose-500/30">
                              Needs Revision
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedSubmission(sub)}
                            className="bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: School Cohorts */}
        {activeTab === 'cohorts' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cohorts.map(c => (
              <div key={c.id} className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{c.schoolName}</h3>
                    <p className="text-xs text-amber-400 font-medium">{c.grade} • Teacher: {c.teacherInCharge}</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-1 rounded-md border border-emerald-500/30">
                    {c.status}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Enrolled Founders:</span>
                    <span className="font-bold text-slate-200">{c.totalStudents} Students</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Average Stage Progress:</span>
                    <span className="font-bold text-indigo-400">Stage {c.avgStageCompleted} / 8</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full"
                      style={{ width: `${(c.avgStageCompleted / 8) * 100}%` }}
                    />
                  </div>
                </div>

                <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl transition">
                  Manage Cohort & View Roster
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Incubator Settings */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-white">Gamification & System Controls</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">2x Innovation XP Multiplier</h4>
                  <p className="text-xs text-slate-400">Boost student XP rewards across all completed stage milestones.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-amber-500 rounded cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Auto-Approve Stage 1 & Stage 2 Drafts</h4>
                  <p className="text-xs text-slate-400">Allow instant student advancement for foundational stages.</p>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-amber-500 rounded cursor-pointer" />
              </div>
            </div>
          </div>
        )}

        {/* Submission Review Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{selectedSubmission.stageTitle}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedSubmission.studentName}</h3>
                  <p className="text-xs text-slate-400">{selectedSubmission.grade}</p>
                </div>
                <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Student Canvas Summary</p>
                <p className="text-sm text-slate-200 leading-relaxed">{selectedSubmission.contentSummary}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Feedback Notes for Founder:</label>
                <textarea 
                  placeholder="Add guidance or encouragement notes..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => handleReject(selectedSubmission.id)}
                  className="flex-1 bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900/60 font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Request Revision</span>
                </button>
                <button
                  onClick={() => handleApprove(selectedSubmission.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve Stage</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

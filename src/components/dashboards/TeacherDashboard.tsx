import React from 'react';
import { 
  BookOpen, Users, Award, Download, ArrowLeft, CheckCircle2, 
  Sparkles, TrendingUp, ShieldCheck, PlusCircle 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

const STUDENT_ROSTER = [
  { id: '1', name: 'Rohan Sharma', class: 'Class 8-A', stage: 'Stage 8 (Graduated)', xp: 1850, passport: true, cert: true },
  { id: '2', name: 'Ananya Roy', class: 'Class 8-A', stage: 'Stage 7 (Crossroads)', xp: 1620, passport: true, cert: false },
  { id: '3', name: 'Kabir Singh', class: 'Class 8-B', stage: 'Stage 5 (The Wall)', xp: 1450, passport: false, cert: false },
  { id: '4', name: 'Priya Mehta', class: 'Class 8-A', stage: 'Stage 8 (Graduated)', xp: 1780, passport: true, cert: true },
  { id: '5', name: 'Vihaan Kumar', class: 'Class 8-B', stage: 'Stage 4 (The Build)', xp: 1150, passport: false, cert: false }
];

export const TeacherDashboard: React.FC = () => {
  const { setView } = useGame();

  const handleExportCertificates = () => {
    alert("Exporting batch certificates for all graduated Class 8 students as ZIP archive...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <button
          onClick={() => setView('dashboard')}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCertificates}
            className="px-5 py-2.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Batch Certificates</span>
          </button>
          
          <button
            onClick={() => alert("Simulation assigned to Class 8-A & 8-B!")}
            className="px-5 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm border border-indigo-200 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Assign Simulation</span>
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-700">
        <div>
          <span className="text-xs font-black text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full uppercase tracking-wider">
            Educator & ATL Innovation Lab Hub
          </span>
          <h2 className="text-3xl font-black font-display text-white mt-2">
            Teacher Class Progress Portal
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Monitor student simulation completion, track entrepreneurial skill growth, and download verified certificates for your school.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
          <div>
            <span className="text-xs text-slate-300 font-bold block">Class Completion</span>
            <span className="text-2xl font-black text-amber-300">78%</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <span className="text-xs text-slate-300 font-bold block">Total Enrolled</span>
            <span className="text-2xl font-black text-cyan-300">45</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Students</span>
          <span className="text-2xl font-black text-indigo-600">38 / 45</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Passports Issued</span>
          <span className="text-2xl font-black text-emerald-600">28 Passports</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Avg Class XP</span>
          <span className="text-2xl font-black text-amber-500">⚡️ 1,420 XP</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-100 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Top Category</span>
          <span className="text-2xl font-black text-cyan-600">📚 EdTech & AI</span>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/80 shadow-lg space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900 font-display">Student Simulation Roster</h3>
          <span className="text-xs text-slate-500 font-medium">Class 8 Innovation Section</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="pb-3 px-2">Student Name</th>
                <th className="pb-3 px-2">Section</th>
                <th className="pb-3 px-2">Current Simulation Stage</th>
                <th className="pb-3 px-2">Total XP</th>
                <th className="pb-3 px-2">Passport</th>
                <th className="pb-3 px-2">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
              {STUDENT_ROSTER.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-2 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3.5 px-2 text-slate-500">{s.class}</td>
                  <td className="py-3.5 px-2">
                    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold">
                      {s.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 font-black text-amber-600">⚡️ {s.xp}</td>
                  <td className="py-3.5 px-2">
                    {s.passport ? (
                      <span className="text-emerald-600 font-bold">Earned ✓</span>
                    ) : (
                      <span className="text-slate-400">In Progress</span>
                    )}
                  </td>
                  <td className="py-3.5 px-2">
                    {s.cert ? (
                      <button
                        onClick={() => setView('certificate')}
                        className="text-indigo-600 font-bold hover:underline"
                      >
                        View Cert 📜
                      </button>
                    ) : (
                      <span className="text-slate-400">Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

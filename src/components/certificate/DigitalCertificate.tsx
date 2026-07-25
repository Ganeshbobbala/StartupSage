import React from 'react';
import { 
  Award, Download, Printer, ArrowLeft, ShieldCheck, QrCode, 
  Sparkles, CheckCircle2 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const DigitalCertificate: React.FC = () => {
  const { state, setView } = useGame();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert("Downloading official PDF Certificate of Entrepreneurial Achievement...");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Actions */}
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
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Box */}
      <div className="bg-white rounded-[32px] p-8 sm:p-14 border-8 border-indigo-900 shadow-2xl relative overflow-hidden text-center space-y-8">
        
        {/* Certificate Ornamental Border Lines */}
        <div className="absolute inset-3 border-2 border-amber-400 rounded-[24px] pointer-events-none"></div>

        {/* Certificate Seal Badge */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto text-4xl shadow-xl relative z-10">
          🏆
        </div>

        {/* Title */}
        <div className="space-y-2 relative z-10">
          <span className="text-xs font-black tracking-widest uppercase text-indigo-600">
            StartupSage Entrepreneurship Academy
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
            Certificate of Achievement
          </h2>
          <p className="text-sm font-semibold text-slate-500 italic">
            This official certificate is proudly awarded to
          </p>
        </div>

        {/* Student Name */}
        <div className="py-2 border-b-2 border-indigo-600 max-w-xl mx-auto relative z-10">
          <h3 className="text-3xl sm:text-4xl font-black text-indigo-950 font-display">
            {state.studentProfile.name}
          </h3>
        </div>

        {/* Citation text */}
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed relative z-10 font-medium">
          For successfully completing all 8 stages of the StartupSage AI simulation. Demonstrating outstanding problem discovery, co-founder teamwork, resource budgeting, crisis resilience, and strategic decision making.
        </p>

        {/* Certificate Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 max-w-3xl mx-auto text-left relative z-10 text-xs">
          
          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Founder Profile</span>
            <span className="font-extrabold text-slate-900 text-sm">{state.founderType || '🌟 Visionary Founder'}</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">School & Grade</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {state.studentProfile.classGrade} • {state.studentProfile.school}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Issue Date</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {state.completionDate || new Date().toLocaleDateString()}
            </span>
          </div>

        </div>

        {/* Footer Verification Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200 max-w-3xl mx-auto relative z-10">
          
          <div className="text-left space-y-1">
            <span className="text-xs font-black text-indigo-600 font-display">StartupSage AI Council</span>
            <p className="text-[11px] text-slate-500">Authorized Educational AI Simulation</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left">
            <QrCode className="w-10 h-10 text-indigo-600" />
            <div className="text-[10px] font-mono text-slate-600">
              <span className="font-bold text-slate-900 block">QR VERIFIED</span>
              <span>CERT-SS-2026-98742</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

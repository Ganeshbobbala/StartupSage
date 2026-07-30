import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import type { FounderVoiceNote } from '../../types/game';

interface FounderVoiceNotePlayerProps {
  voiceNote: FounderVoiceNote;
}

export const FounderVoiceNotePlayer: React.FC<FounderVoiceNotePlayerProps> = ({ voiceNote }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [showTranscript, setShowTranscript] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-slate-900 border border-orange-500/40 rounded-3xl p-5 text-white shadow-xl space-y-4 relative overflow-hidden">
      
      {/* Top Header Label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-orange-400 uppercase tracking-widest">
            Real BPT Founder Audio Note
          </span>
        </div>
        <span className="text-[11px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full text-slate-300">
          {voiceNote.duration}
        </span>
      </div>

      {/* Founder Profile & Player Bar */}
      <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
        
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 border-2 border-orange-400 text-2xl flex items-center justify-center shadow-md flex-shrink-0">
          {voiceNote.avatar}
        </div>

        {/* Info & Audio Waveform */}
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-black font-display text-white truncate">{voiceNote.founderName}</h4>
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 fill-orange-400/20" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 block truncate">
              {voiceNote.founderRole} • BPT Alumni
            </span>
          </div>

          {/* Simulated Waveform Visualizer */}
          <div className="flex items-center gap-1 h-5">
            {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 50, 85, 40, 65, 90, 30, 75, 45].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  i < (progress / 100) * 20
                    ? 'bg-orange-500'
                    : 'bg-slate-600/60'
                } ${isPlaying ? 'animate-pulse' : ''}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 flex-shrink-0"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

      </div>

      {/* Topic Title & Transcript Toggle */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-200 italic">
          "{voiceNote.topic}"
        </p>

        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center gap-1 text-[11px] font-bold text-orange-400 hover:text-orange-300 transition-colors"
        >
          <span>{showTranscript ? 'Hide Transcript' : 'Read Full Transcript'}</span>
          {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showTranscript && (
          <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700 text-xs text-slate-300 leading-relaxed font-medium animate-fade-in">
            "{voiceNote.transcript}"
          </div>
        )}
      </div>

    </div>
  );
};

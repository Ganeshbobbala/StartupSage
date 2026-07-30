import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';

interface FounderVoiceNoteProps {
  founderName: string;
  founderRole: string;
  avatarEmoji: string;
  title: string;
  durationSeconds: number;
  transcriptText: string;
}

export const FounderVoiceNotePlayer: React.FC<FounderVoiceNoteProps> = ({
  founderName,
  founderRole,
  avatarEmoji,
  title,
  durationSeconds,
  transcriptText,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, durationSeconds]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const progressPercent = (currentTime / durationSeconds) * 100;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-2xl text-white space-y-4 relative overflow-hidden">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            BPT Real Founder Voice Note
          </span>
        </div>
        <span className="text-xs font-bold text-slate-400">{formatTime(durationSeconds - currentTime)} remaining</span>
      </div>

      {/* Founder Info & Player Row */}
      <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
        
        {/* Founder Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-3xl shadow-lg flex-shrink-0 relative">
          {avatarEmoji}
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-900" />
        </div>

        {/* Info & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-extrabold text-white truncate font-display">{founderName}</h4>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              {founderRole}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium truncate mt-0.5">"{title}"</p>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform flex-shrink-0"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </button>
      </div>

      {/* Waveform Visualization Bars */}
      <div className="flex items-center justify-between gap-1 px-1 h-8">
        {[40, 75, 25, 90, 60, 100, 45, 80, 30, 95, 70, 50, 85, 40, 90, 65, 30, 75, 55, 80, 40, 95, 60, 30, 85].map((h, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-amber-400 animate-pulse'
                : i < (progressPercent / 100) * 25
                ? 'bg-amber-500'
                : 'bg-slate-700'
            }`}
            style={{ height: `${isPlaying ? Math.max(20, (h * (Math.random() * 0.5 + 0.75))) : h}%` }}
          />
        ))}
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Transcript Toggle Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{showTranscript ? 'Hide Advice Transcript' : 'Read Founder Advice Transcript'}</span>
        </button>
        <span className="text-[10px] font-semibold text-slate-500">Verified BPT Founder Voice</span>
      </div>

      {/* Transcript Text Box */}
      {showTranscript && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/20 text-xs text-slate-300 leading-relaxed italic animate-fade-in">
          "{transcriptText}"
        </div>
      )}

    </div>
  );
};

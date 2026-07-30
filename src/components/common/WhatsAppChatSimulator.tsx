import React, { useState } from 'react';
import { Send, CheckCheck, User, MessageCircle, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  role: 'customer' | 'expert' | 'friend';
  text: string;
  time: string;
  isUser?: boolean;
}

interface WhatsAppChatSimulatorProps {
  onChatsReviewed: () => void;
}

export const WhatsAppChatSimulator: React.FC<WhatsAppChatSimulatorProps> = ({ onChatsReviewed }) => {
  const [activeChatIndex, setActiveChatIndex] = useState<number>(0);

  const chatThreads = [
    {
      role: 'customer' as const,
      name: 'Riya (Potential User)',
      avatar: '🧐',
      badge: 'Skeptical Customer',
      status: 'Online',
      messages: [
        { id: '1', sender: 'You', avatar: '🧑', text: 'Hey Riya! I\'m building a solution to help students stay active and manage study stress.', time: '10:14 AM', isUser: true },
        { id: '2', sender: 'Riya', avatar: '🧐', text: 'Honestly? There are so many free apps out there. Why should I care about yours?', time: '10:15 AM', isUser: false },
        { id: '3', sender: 'You', avatar: '🧑', text: 'Because ours pairs you with classmates in 5-minute daily challenges so you actually stick with it!', time: '10:16 AM', isUser: true },
        { id: '4', sender: 'Riya', avatar: '🧐', text: 'Hmm, classmate challenges sound fun! If my friends are on it, I\'d definitely try it.', time: '10:17 AM', isUser: false },
      ]
    },
    {
      role: 'expert' as const,
      name: 'Dr. Mehta (EdTech Advisor)',
      avatar: '🎓',
      badge: 'Domain Expert',
      status: 'Online',
      messages: [
        { id: '1', sender: 'You', avatar: '🧑', text: 'Dr. Mehta, what is the biggest mistake student founders make when launching EdTech platforms?', time: '11:02 AM', isUser: true },
        { id: '2', sender: 'Dr. Mehta', avatar: '🎓', text: 'Focusing on complex features before proving daily user retention. Keep it dead simple!', time: '11:04 AM', isUser: false },
        { id: '3', sender: 'You', avatar: '🧑', text: 'We are starting with a single core 1-line feature!', time: '11:05 AM', isUser: true },
        { id: '4', sender: 'Dr. Mehta', avatar: '🎓', text: 'Smart! If you nail user retention in Month 1, investors will take notice.', time: '11:06 AM', isUser: false },
      ]
    },
    {
      role: 'friend' as const,
      name: 'Kabir (Classmate)',
      avatar: '🤝',
      badge: 'Supportive Friend',
      status: 'Online',
      messages: [
        { id: '1', sender: 'Kabir', avatar: '🤝', text: 'Yo! Did you finish your startup idea draft yet?!', time: '11:30 AM', isUser: false },
        { id: '2', sender: 'You', avatar: '🧑', text: 'Just finished customer interviews! We are building a peer-to-peer streak tracker!', time: '11:31 AM', isUser: true },
        { id: '3', sender: 'Kabir', avatar: '🤝', text: 'OMG bro I need this right now for exams!! When can I test the prototype?! 🚀', time: '11:32 AM', isUser: false },
      ]
    }
  ];

  const currentThread = chatThreads[activeChatIndex];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0">
      
      {/* Top WhatsApp Header Bar */}
      <div className="bg-emerald-800 px-5 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700 text-xl flex items-center justify-center border border-white/20">
            {currentThread.avatar}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              {currentThread.name}
              <span className="text-[10px] font-extrabold bg-emerald-950/60 px-2 py-0.5 rounded-full text-emerald-300">
                {currentThread.badge}
              </span>
            </h4>
            <span className="text-[11px] text-emerald-200 block leading-none">{currentThread.status}</span>
          </div>
        </div>

        {/* Chat Thread Selector Pills */}
        <div className="flex items-center gap-1.5">
          {chatThreads.map((t, idx) => (
            <button
              key={t.role}
              onClick={() => setActiveChatIndex(idx)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activeChatIndex === idx
                  ? 'bg-white text-emerald-900 shadow-md scale-105'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              Chat {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Message Body */}
      <div 
        className="p-4 sm:p-6 space-y-3 min-h-[260px] max-h-[340px] overflow-y-auto"
        style={{
          backgroundColor: '#0B141A',
          backgroundImage: 'radial-gradient(#1F2C34 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        {currentThread.messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.isUser ? 'items-end' : 'items-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[82%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-md relative ${
                m.isUser
                  ? 'bg-emerald-700 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
              }`}
            >
              <p className="leading-relaxed font-medium">{m.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-75">
                <span>{m.time}</span>
                {m.isUser && <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between gap-4">
        <span className="text-xs text-slate-400 font-semibold">
          Reviewing Interview {activeChatIndex + 1} of 3
        </span>

        {activeChatIndex < 2 ? (
          <button
            onClick={() => setActiveChatIndex(activeChatIndex + 1)}
            className="bpt-btn-primary px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <span>Next Customer Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onChatsReviewed}
            className="bpt-btn-primary px-6 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500"
          >
            <span>Complete Customer Interviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Send, Check, CheckCheck, MessageSquare } from 'lucide-react';
import type { WhatsAppConversation } from '../../types/game';

interface WhatsAppChatSimulatorProps {
  conversations: WhatsAppConversation[];
  onComplete: () => void;
}

export const WhatsAppChatSimulator: React.FC<WhatsAppChatSimulatorProps> = ({
  conversations,
  onComplete,
}) => {
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const currentChat = conversations[activeChatIndex];

  const handleNextChat = () => {
    if (activeChatIndex < conversations.length - 1) {
      setActiveChatIndex(activeChatIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0">
      
      {/* WhatsApp Green Top Bar */}
      <div className="bg-emerald-700 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 text-xl flex items-center justify-center border border-white/30">
            {currentChat.contactAvatar}
          </div>
          <div>
            <h4 className="text-sm font-black font-display leading-tight">{currentChat.contactName}</h4>
            <span className="text-[11px] font-semibold text-emerald-200 block">{currentChat.contactRole} • Online</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-500/50">
            Chat {activeChatIndex + 1} of {conversations.length}
          </span>
        </div>
      </div>

      {/* Chat Thread Body */}
      <div className="p-4 sm:p-6 space-y-4 min-h-[220px] bg-slate-950/90 relative">
        <div className="text-center">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            TODAY • SIMULATED USER DISCOVERY INTERVIEW
          </span>
        </div>

        {currentChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-md ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-300">
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-cyan-300" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-400">
          Interview Insights Received
        </span>

        <button
          onClick={handleNextChat}
          className="bpt-btn-primary px-6 py-2.5 text-xs font-extrabold"
        >
          {activeChatIndex < conversations.length - 1 ? 'Next Chat Thread' : 'Complete Interviews'}
        </button>
      </div>

    </div>
  );
};

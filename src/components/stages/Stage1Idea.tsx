import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Brain, CheckCircle2, ArrowRight, MessageSquare, Star, 
  Zap, Send, Lock, UserCheck, CheckCheck, RefreshCw 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface ChatMessage {
  id: string;
  sender: 'Curious Student' | 'Teacher' | 'Supportive Friend' | 'You';
  avatar: string;
  text: string;
  time: string;
}

export const Stage1Idea: React.FC = () => {
  const { state, setIdeaData, completeStage, addXPCoins, loginUser, triggerConfetti } = useGame();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Curious Student',
      avatar: '👦',
      text: 'Hey! How will students use your idea when they are busy at school?',
      time: '10:02 AM'
    },
    {
      id: '2',
      sender: 'Teacher',
      avatar: '👩‍🏫',
      text: 'Make sure it stays super simple! Students should spend 1 minute or less updating it.',
      time: '10:03 AM'
    },
    {
      id: '3',
      sender: 'Supportive Friend',
      avatar: '👧',
      text: 'Add streak badges and fun stickers! That will make everyone want to use it every day! 🎉',
      time: '10:04 AM'
    }
  ]);

  const [userReply, setUserReply] = useState<string>('');
  const [ideaStatement, setIdeaStatement] = useState<string>(
    state.ideaStatement || 'My app reminds students about homework using fun animations and streak rewards.'
  );
  const [showScorecard, setShowScorecard] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [reflectionText, setReflectionText] = useState<string>('');

  // Login Wall state
  const [showLoginWall, setShowLoginWall] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!userReply.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: '🧑',
      text: userReply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setUserReply('');

    // Simulate supportive reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'Teacher',
          avatar: '👩‍🏫',
          text: 'Love that perspective! Now try summarizing your entire startup idea in one powerful sentence below.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const handleEvaluateIdea = () => {
    if (!ideaStatement.trim()) return;

    setShowScorecard(true);
    triggerConfetti();

    setIdeaData(ideaStatement, {
      creativity: 5,
      clarity: 4,
      innovation: 4,
      impact: 5
    });
  };

  const handleCompleteQuiz = () => {
    if (!quizAnswers.q1 || !quizAnswers.q2 || !quizAnswers.q3) return;

    setQuizSubmitted(true);
    addXPCoins(150, 30);
    triggerConfetti();
  };

  const handleFinishStage1 = () => {
    completeStage(1);
    if (state.studentProfile.isGuest) {
      setShowLoginWall(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-indigo-100 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-white flex items-center justify-center text-3xl shadow-lg">
            💡
          </div>
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Stage 1 of 8
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-display mt-1">
              The Idea – Refine & Validate
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-2xl border border-amber-200 font-bold text-xs">
          <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Reward: +150 XP • +30 Coins</span>
        </div>
      </div>

      {/* 1. WhatsApp / Chat Simulation */}
      <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-extrabold text-slate-900 font-display">
              1. Simulated Chat with Early Supporters
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Live Typing Simulation</span>
        </div>

        {/* Message Log */}
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 space-y-4 max-h-80 overflow-y-auto border border-slate-800">
          {chatMessages.map(msg => {
            const isMe = msg.sender === 'You';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-lg flex-shrink-0 shadow">
                  {msg.avatar}
                </div>
                <div className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                }`}>
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75">
                    <span className="font-bold">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-relaxed font-medium">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={userReply}
            onChange={e => setUserReply(e.target.value)}
            placeholder="Type your response to your friends..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 rounded-2xl gradient-button text-white font-extrabold text-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* 2. One Sentence Idea Statement */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
            2. Describe your startup idea in ONE sentence
          </h3>
          <p className="text-slate-500 text-xs">
            Clear ideas are easy for users, investors, and teammates to understand.
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            rows={2}
            value={ideaStatement}
            onChange={e => setIdeaStatement(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-slate-900 bg-white"
            placeholder="e.g. My app reminds students about homework using fun animations and streak rewards."
          />

          <button
            onClick={handleEvaluateIdea}
            className="px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Evaluate Idea Scorecard</span>
          </button>
        </div>

        {/* Scorecard Results */}
        {showScorecard && (
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-300 shadow-xl border border-indigo-700">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-extrabold font-display text-white">AI Idea Scorecard</h4>
              <span className="bg-cyan-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase">
                Validated
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 font-bold block">Creativity</span>
                <span className="text-2xl font-black text-amber-400">⭐⭐⭐⭐⭐</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 font-bold block">Clarity</span>
                <span className="text-2xl font-black text-amber-400">⭐⭐⭐⭐☆</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 font-bold block">Innovation</span>
                <span className="text-2xl font-black text-amber-400">⭐⭐⭐⭐☆</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 font-bold block">Impact</span>
                <span className="text-2xl font-black text-amber-400">⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              "Awesome job! Your 1-line statement clearly highlights who benefits and what makes it special."
            </p>
          </div>
        )}
      </div>

      {/* 3. Mini Validation Quiz */}
      {showScorecard && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
              3. Quick Idea Validation Quiz
            </h3>
            <p className="text-slate-500 text-xs">Answer 3 simple questions to double check your concept.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                1. Who will use your idea most?
              </label>
              <input
                type="text"
                value={quizAnswers.q1}
                onChange={e => setQuizAnswers(prev => ({ ...prev, q1: e.target.value }))}
                placeholder="e.g. School students from Class 6 to 10"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                2. What exact problem does it solve?
              </label>
              <input
                type="text"
                value={quizAnswers.q2}
                onChange={e => setQuizAnswers(prev => ({ ...prev, q2: e.target.value }))}
                placeholder="e.g. Forgetting homework deadlines and unorganized notes"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                3. Why will users choose your solution over traditional methods?
              </label>
              <input
                type="text"
                value={quizAnswers.q3}
                onChange={e => setQuizAnswers(prev => ({ ...prev, q3: e.target.value }))}
                placeholder="e.g. Because it uses gamification, streaks, and fun animations!"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleCompleteQuiz}
                disabled={!quizAnswers.q1 || !quizAnswers.q2 || !quizAnswers.q3}
                className="px-8 py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Quiz (+150 XP • +30 Coins)</span>
              </button>
            </div>
          </div>

          {quizSubmitted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Stage 1 Complete! 🎉</h4>
                <p className="text-xs text-slate-600">You earned +150 XP and +30 Startup Coins!</p>
              </div>

              <button
                onClick={handleFinishStage1}
                className="px-8 py-3 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-lg flex items-center gap-2"
              >
                <span>Proceed to Stage 2: Startup Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Guest Login Wall Modal */}
      {showLoginWall && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-lg w-full p-8 bg-white border border-slate-200 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-200">
            
            <div className="w-20 h-20 rounded-full gradient-button text-white flex items-center justify-center mx-auto text-4xl shadow-xl animate-bounce">
              🎉
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 font-display">Amazing Work!</h3>
              <p className="text-slate-600 text-sm mt-1">
                You've completed the free guest preview adventure!
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left text-xs text-indigo-900 space-y-2 font-medium">
              <p className="font-bold text-indigo-950">Create your free account to unlock:</p>
              <div className="flex items-center gap-2">✓ Stage 2 to Stage 8 full adventure</div>
              <div className="flex items-center gap-2">✓ Personal 1080x1080 Founder Passport</div>
              <div className="flex items-center gap-2">✓ Verifiable Digital Certificate</div>
              <div className="flex items-center gap-2">✓ XP Badges & Global Leaderboards</div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  loginUser();
                  setShowLoginWall(false);
                }}
                className="w-full py-3.5 rounded-2xl gradient-button text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continue with Google / Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  loginUser('Guest Student');
                  setShowLoginWall(false);
                }}
                className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Continue as Guest for now
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

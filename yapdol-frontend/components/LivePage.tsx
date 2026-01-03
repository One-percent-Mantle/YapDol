
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, MessageSquare, Gift, X, Heart, Star, Sparkles, Trophy, Mic2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User, SupportItem } from '../types';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  tier: 'gold' | 'silver' | 'none';
  avatar: string;
}

interface LivePageProps {
  user: User | null;
}

export const LivePage: React.FC<LivePageProps> = ({ user }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [viewers, setViewers] = useState(12420);
  const [totalHype, setTotalHype] = useState(842000);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const supportItems: SupportItem[] = [
    { id: '1', name: t.live.items.heart, price: 10, icon: '❤️', color: 'bg-mantle-pink' },
    { id: '2', name: t.live.items.light, price: 50, icon: '🕯️', color: 'bg-mantle-green' },
    { id: '3', name: t.live.items.star, price: 200, icon: '🌟', color: 'bg-blue-500' },
    { id: '4', name: t.live.items.diamond, price: 1000, icon: '💎', color: 'bg-purple-500' },
  ];

  // Initial messages
  useEffect(() => {
    setMessages([
      { id: '1', user: 'HypeKing', text: language === 'ko' ? '드디어 시작하네요!! 대박' : 'It is finally starting!! Amazing', tier: 'gold', avatar: 'https://i.pravatar.cc/150?u=hk' },
      { id: '2', user: 'MinjiStan', text: language === 'ko' ? '오늘 비주얼 미쳤다 ㅠㅠ' : 'Visual is insane today TT', tier: 'silver', avatar: 'https://i.pravatar.cc/150?u=ms' },
      { id: '3', user: 'GlobalFan_01', text: language === 'ko' ? 'Love from Japan ❤️' : 'Love from Japan ❤️', tier: 'none', avatar: 'https://i.pravatar.cc/150?u=gf' },
    ]);

    const interval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 20) - 5);
      setTotalHype(h => h + Math.floor(Math.random() * 100));
    }, 3000);

    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: user?.name || 'Guest_Yapper',
      text: chatInput,
      tier: user ? 'silver' : 'none',
      avatar: user?.profileImage || 'https://i.pravatar.cc/150?u=guest'
    };

    setMessages(prev => [...prev, newMessage]);
    setChatInput('');
  };

  const handleSendGift = (item: SupportItem) => {
    setTotalHype(prev => prev + (item.price * 10));
    const giftMessage: ChatMessage = {
      id: `gift-${Date.now()}`,
      user: user?.name || 'Guest_Yapper',
      text: `${item.icon} ${item.name} Sent! (+${item.price * 10} Hype)`,
      tier: 'gold',
      avatar: user?.profileImage || 'https://i.pravatar.cc/150?u=guest'
    };
    setMessages(prev => [...prev, giftMessage]);
    setIsGiftOpen(false);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-32 animate-[fadeIn_0.5s_ease-out] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 h-[calc(100vh-180px)]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded-none">
                 <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,1)]"></div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">{t.live.liveBadge}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
                 <Mic2 className="w-4 h-4" /> HAERIN: MANTLE STAGE PERFORMANCE
              </div>
           </div>

           <div className="flex items-center gap-10">
              <div className="flex flex-col items-end">
                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{t.live.viewers}</span>
                 <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-xl font-black italic text-white tracking-tighter">{viewers.toLocaleString()}</span>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{t.live.totalHype}</span>
                 <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-mantle-green animate-pulse" />
                    <span className="text-xl font-black italic text-mantle-green tracking-tighter">{totalHype.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
           
           {/* Main Player - Cinema Focus */}
           <div className="lg:col-span-8 relative bg-[#0a0a0a] border border-white/5 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <iframe 
                   src={`https://www.youtube.com/embed/T--Q5nBNv3Y?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=T--Q5nBNv3Y`}
                   className="w-full h-full scale-105 filter brightness-[0.7] grayscale-[10%]"
                   title="Live Stream"
                   frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 ></iframe>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              
              {/* On-player info Overlay */}
              <div className="absolute bottom-8 left-8 z-20 space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-mantle-green p-0.5">
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">HAERIN<span className="text-mantle-green">.</span></h3>
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 block">Official ADOR Live Studio</span>
                    </div>
                 </div>
              </div>

              {/* Fullscreen Button Placeholder */}
              <div className="absolute bottom-8 right-8 z-20">
                 <button className="p-3 bg-black/40 backdrop-blur-xl border border-white/10 text-white/50 hover:text-white transition-all">
                    <Trophy className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* Chat Panel - Premium Card UI */}
           <div className="lg:col-span-4 flex flex-col bg-zinc-950/40 border border-white/5 relative overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Hype Chat</span>
                 </div>
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full border border-black bg-zinc-800 flex items-center justify-center text-[8px] font-black overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} />
                       </div>
                    ))}
                 </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                 {messages.map((msg) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={msg.id} 
                      className={`p-4 bg-black/40 border transition-all duration-500 ${
                         msg.tier === 'gold' 
                            ? 'border-mantle-pink/40 shadow-[0_0_15px_rgba(255,0,122,0.1)]' 
                            : msg.tier === 'silver' 
                            ? 'border-mantle-green/20' 
                            : 'border-white/5'
                      }`}
                    >
                       <div className="flex items-start gap-4">
                          <img src={msg.avatar} className="w-8 h-8 rounded-none shrink-0" alt={msg.user} />
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${msg.tier === 'gold' ? 'text-mantle-pink' : 'text-gray-400'}`}>
                                   {msg.user}
                                </span>
                                {msg.tier !== 'none' && (
                                   <div className={`w-1.5 h-1.5 rounded-full ${msg.tier === 'gold' ? 'bg-mantle-pink' : 'bg-mantle-green'}`}></div>
                                )}
                             </div>
                             <p className="text-xs text-white/90 font-light leading-relaxed tracking-tight">{msg.text}</p>
                          </div>
                       </div>
                    </motion.div>
                 ))}
                 <div ref={chatEndRef} />
              </div>

              {/* Chat Input & Support Action */}
              <div className="p-6 border-t border-white/5 bg-black/40 space-y-4">
                 <form onSubmit={handleSendMessage} className="relative group">
                    <input 
                      type="text" 
                      placeholder={t.live.chatPlaceholder}
                      className="w-full bg-zinc-900 border border-white/10 px-6 py-4 text-xs text-white outline-none focus:border-mantle-green transition-all pr-12"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                       <Sparkles className="w-4 h-4" />
                    </button>
                 </form>

                 <button 
                   onClick={() => setIsGiftOpen(true)}
                   className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-mantle-pink hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl"
                 >
                    <Gift className="w-4 h-4" />
                    {t.live.sendGift}
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Support Items Modal */}
      <AnimatePresence>
        {isGiftOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsGiftOpen(false)}
               className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-10 shadow-2xl space-y-12"
             >
                <div className="text-center space-y-2">
                   <div className="inline-flex items-center gap-2 text-mantle-pink mb-4">
                      <Heart className="w-5 h-5 fill-mantle-pink" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em]">{t.live.topSupporter}</span>
                   </div>
                   <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Support the Stage</h3>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Boost live momentum with on-chain gifts.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {supportItems.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => handleSendGift(item)}
                        className="p-6 bg-black border border-white/5 flex flex-col items-center gap-4 hover:border-white transition-all group"
                      >
                         <div className={`w-14 h-14 ${item.color}/10 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                            {item.icon}
                         </div>
                         <div className="text-center">
                            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.name}</div>
                            <div className="text-xs font-mono font-bold text-mantle-green">{item.price} YAP</div>
                         </div>
                      </button>
                   ))}
                </div>

                <button 
                  onClick={() => setIsGiftOpen(false)}
                  className="w-full py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-all"
                >
                   Cancel
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marqueeVertical {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-marquee-vertical {
          animation: marqueeVertical 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

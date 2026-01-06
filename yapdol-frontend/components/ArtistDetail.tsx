
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  LayoutDashboard,
  Image as ImageIcon,
  Zap,
  Lock,
  Sparkles,
  ChevronRight,
  Trophy,
  CalendarDays,
  ShoppingBag,
  History,
  Wallet,
  X,
  ArrowRightLeft,
  Users,
  Play,
  MessageCircle,
  Heart,
  Video,
  Download,
  Maximize2,
  Gift,
  Mic2,
  CheckCircle2
} from 'lucide-react';
import { Artist, User, ViewType, SupportItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { YappingMissionModal } from './YappingMissionModal';

interface ArtistDetailProps {
  artist: Artist;
  onBack: () => void;
  user: User | null;
  onLoginClick: () => void;
  onNavigate?: (view: ViewType) => void;
}

type TabId = 'dashboard' | 'growth' | 'activity' | 'goods' | 'vault' | 'live';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  tier: 'gold' | 'silver' | 'none';
  avatar: string;
}

export const ArtistDetail: React.FC<ArtistDetailProps> = ({ artist, onBack, user, onLoginClick, onNavigate }) => {
  const { t, language } = useLanguage();
  const isFunding = artist.status === 'funding';
  const tokenSymbol = `$${artist.englishName}`;
  
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedHighlightVideo, setSelectedHighlightVideo] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Goods Market Purchase State
  const [purchasedItemIds, setPurchasedItemIds] = useState<number[]>([]);

  // Live Stats
  const [viewers, setViewers] = useState(12420);
  const [totalHype, setTotalHype] = useState(artist.hypePoints || 185000);
  
  // Local state for points management
  const [userHype, setUserHype] = useState(user?.hypeScore || 84200);
  const [artistTokens, setArtistTokens] = useState(842); // Initial points for demo

  const isYappingParticipant = user !== null && userHype > 0;
  const nextUnlockThreshold = 100000;
  const unlockProgress = Math.min(100, (userHype / nextUnlockThreshold) * 100);

  const campaignDurationPercent = 65; 
  const promotedContentTotal = 8888; 
  const dDayDisplay = isFunding ? `D-${artist.dDay}` : 'D-14';

  const displayName = language === 'ko' ? artist.name : artist.englishName;

  const tabs = isFunding ? [
    { id: 'dashboard', label: t.detail.overview },
    { id: 'growth', label: t.detail.growthLog },
    { id: 'vault', label: t.detail.visualVault },
    { id: 'live', label: 'LIVE' },
  ] : [
    { id: 'dashboard', label: t.detail.overview },
    { id: 'live', label: 'LIVE' },
    { id: 'activity', label: t.detail.activityLog },
    { id: 'goods', label: t.detail.goodsMarket },
    { id: 'vault', label: t.detail.visualVault },
  ];

  const supportItems: SupportItem[] = [
    { id: '1', name: t.live.items.heart, price: 10, icon: '❤️', color: 'bg-mantle-pink' },
    { id: '2', name: t.live.items.light, price: 50, icon: '🕯️', color: 'bg-mantle-green' },
    { id: '3', name: t.live.items.star, price: 200, icon: '🌟', color: 'bg-blue-500' },
    { id: '4', name: t.live.items.diamond, price: 1000, icon: '💎', color: 'bg-purple-500' },
  ];

  useEffect(() => {
    if (activeTab === 'live') {
      setMessages([
        { id: '1', user: 'HypeKing', text: language === 'ko' ? '드디어 시작하네요!! 대박' : 'It is finally starting!! Amazing', tier: 'gold', avatar: 'https://i.pravatar.cc/150?u=hk' },
        { id: '2', user: 'MinjiStan', text: language === 'ko' ? '오늘 비주얼 미쳤다 ㅠㅠ' : 'Visual is insane today TT', tier: 'silver', avatar: 'https://i.pravatar.cc/150?u=ms' },
        { id: '3', user: 'GlobalFan_01', text: 'Love from Japan', tier: 'none', avatar: './data/하니2.png' },
        { id: '3', user: 'GlobalFan_01', text: 'Love from Indonesia', tier: 'none', avatar: './data/해린2.png' },
        { id: '3', user: 'GlobalFan_01', text: 'Love from USA', tier: 'none', avatar: './data/민지3.png' },
        { id: '3', user: 'GlobalFan_01', text: 'Love from Africa ❤️', tier: 'none', avatar: 'https://i.pravatar.cc/150?u=gf' },
      ]);
      
      const interval = setInterval(() => {
        setViewers(v => v + Math.floor(Math.random() * 20) - 5);
        setTotalHype(h => h + Math.floor(Math.random() * 100));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab, language]);

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

  const handleBuyItem = (itemId: number, price: number) => {
    if (artistTokens >= price) {
      setArtistTokens(prev => prev - price);
      setPurchasedItemIds(prev => [...prev, itemId]);
    }
  };

  const handleYappingClick = () => {
    if (!user) {
      onLoginClick();
    } else {
      setIsMissionModalOpen(true);
    }
  };

  const handleSwapAll = () => {
    if (userHype > 0) {
      const rate = 100; 
      const newTokens = Math.floor(userHype / rate);
      setArtistTokens(prev => prev + newTokens);
      setUserHype(0);
      setIsSwapModalOpen(false);
    }
  };

  // Artist Specific Vault Content
  const vaultPhotos = artist.id === '1' ? [
    './data/민지1.png',
    './data/하니2.png',
    './data/민지3.png',
    './data/민지4.png',
    './data/민지5.png',
    './data/민지6.png',
  ] : artist.id === '4' ? [
    './data/카이1.png',
    './data/카이2.png',
    './data/카이3.png',
    './data/카이4.png',
    './data/카이5.png',
    './data/카이6.png',
  ] : artist.id === '6' ? [
    './data/설윤1.png',
    './data/설윤2.png',
    './data/설윤3.png',
    './data/설윤4.png',
    './data/설윤5.png',
    './data/설윤6.png',
  ] : [
    './data/제니1.png',
    './data/제니2.png',
    './data/제니3.png',
    './data/제니4.png',
    './data/제니5.png',
    './data/제니6.png',
  ];

  const goods = [
    { id: 1, name: 'Exclusive Digital PhotoSet', price: 50, img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Official Debut Album (Limited)', price: 200, img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'VIP Concert Pass Voucher', price: 1500, img: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=400' },
  ];

  const activityLog = [
    { date: '2025.01.12', event: 'Global Debut M/V Premiere', desc: 'Reached 10M views in 2 hours.' },
    { date: '2024.12.24', event: 'Pre-Debut Fan Meeting', desc: 'Sold out 5,000 tickets in 30 seconds.' },
    { date: '2024.11.15', event: 'Visual Archive Unlocked', desc: 'Exclusive access granted to Division 01 supporters.' },
    { date: '2024.10.02', event: 'Division 01 Incubation Start', desc: 'Joined the official roster.' },
  ];

  const cheers = [
    "Always supporting you!", "Your practice film was amazing 🔥", "Wait for your debut!", 
    "Alpha_Yapper sent 100 Hype!", "Best visual in Division 01", "Keep it up!",
    "Can't wait to see you on stage", "Mantle ecosystem supports you", "Global icon in making"
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] bg-black min-h-screen relative pb-32">
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={artist.imageUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover object-[50%_40%] filter brightness-[0.7] scale-100 animate-[slowZoom_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />
        </div>

        <div className="absolute top-10 left-6 sm:left-12 z-50">
           <button onClick={onBack} className="flex items-center gap-4 text-white/40 hover:text-white transition-all group">
              <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/30 transition-all bg-black/20 backdrop-blur-md">
                 <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black tracking-[0.4em] uppercase hidden sm:block">{t.detail.exitProfile}</span>
           </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 pb-20 z-20">
           <div className="max-w-[1600px] mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="max-w-4xl space-y-6"
              >
                 <div className="inline-block">
                    <span className={`px-3 py-1 text-[8px] font-black tracking-[0.3em] uppercase ${isFunding ? 'bg-mantle-green text-black' : 'bg-mantle-pink text-white'}`}>
                       {isFunding ? t.detail.archiveTitle : t.detail.portfolioTitle}
                    </span>
                 </div>

                 <h1 className="text-6xl sm:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl">
                    {displayName}<span className={`${isFunding ? 'text-mantle-green' : 'text-mantle-pink'}`}>.</span>
                 </h1>
                 
                 <div className="border-l border-white/20 pl-6 py-1 max-w-xl">
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed italic">
                       {isFunding 
                          ? t.detail.archiveDesc
                          : t.detail.portfolioDesc}
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
           <div className="flex justify-between items-center h-16">
              <div className="flex space-x-12 h-full">
                 {tabs.map((tab) => (
                    <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as TabId)}
                       className={`relative flex items-center gap-2 h-full text-[9px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-300'}`}
                    >
                       {tab.label}
                       {activeTab === tab.id && <motion.div layoutId="activeTabIndicator" className={`absolute bottom-0 left-0 w-full h-px ${isFunding ? 'bg-mantle-green' : 'bg-mantle-pink'}`} />}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className={`${activeTab === 'live' ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.4 }}
                >
                   {activeTab === 'dashboard' && (
                      <div className="space-y-24">
                         
                         {/* Intro Video Section */}
                         <div className="space-y-10">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 flex items-center gap-3">
                                  <Play className="w-4 h-4 text-mantle-green" /> {displayName}'s Vision Film
                               </h3>
                               <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest italic">Exclusive Access</span>
                            </div>
                            <div className="relative aspect-video w-full bg-zinc-900 border border-white/5 shadow-2xl overflow-hidden group">
                               {artist.youtubeId ? (
                                 <iframe 
                                   src={`https://www.youtube.com/embed/${artist.youtubeId}?autoplay=0&mute=0&controls=1&showinfo=0&rel=0`}
                                   className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                   title={`${displayName} Introduction`}
                                   frameBorder="0"
                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                   allowFullScreen
                                 ></iframe>
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-600 font-black uppercase tracking-widest text-[10px]">Video Content Coming Soon</p>
                                 </div>
                               )}
                            </div>
                         </div>

                         {/* Quick Stats Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 bg-white/5 border border-white/5 group hover:border-mantle-green/40 transition-all">
                               <div className="flex items-center gap-3 mb-10">
                                  <CalendarDays className="w-4 h-4 text-mantle-green" />
                                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                                     {isFunding ? t.detail.dday : 'MARKET STATUS'}
                                  </span>
                               </div>
                               <div className="text-6xl font-black text-white mb-6 italic">
                                  {isFunding ? `D-${artist.dDay}` : 'ACTIVE'}
                                  <span className="text-xs text-mantle-green ml-3 font-black uppercase tracking-widest not-italic">
                                     {isFunding ? t.detail.untilDebut : 'VERIFIED ICON'}
                                  </span>
                               </div>
                               <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed">
                                  {isFunding ? t.detail.incubation : 'Real-time performance distribution active.'}
                               </div>
                            </div>
                            
                            <div className="p-10 bg-white/5 border border-white/5 group hover:border-mantle-pink/40 transition-all">
                               <div className="flex items-center justify-between mb-10">
                                 <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4 text-white" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Active Yappers</span>
                                 </div>
                                 <div className="flex items-center gap-2 bg-mantle-pink/10 px-3 py-1 border border-mantle-pink/20">
                                   <Trophy className="w-3 h-3 text-mantle-pink" />
                                   <span className="text-[9px] font-black text-white uppercase tracking-widest">#128 RANK</span>
                                 </div>
                               </div>
                               <div className="text-6xl font-black text-white mb-6 italic">
                                  {artist.contributorCount?.toLocaleString()}
                                  <span className="text-xs text-gray-600 ml-3 font-black uppercase tracking-widest not-italic">Contributors</span>
                               </div>
                               <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                                  Verified Global Support Firepower.
                               </div>
                            </div>
                         </div>
                      </div>
                   )}

                   {activeTab === 'live' && (
                     <div className="space-y-10">
                        {/* Live Header Stats */}
                        <div className="flex items-center justify-between bg-zinc-950 p-6 border border-white/5">
                           <div className="flex items-center gap-8">
                              <div className="flex items-center gap-3">
                                 <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                 <span className="text-[11px] font-black text-white uppercase tracking-widest">LIVE STREAM</span>
                              </div>
                              <div className="flex items-center gap-3 text-gray-500">
                                 <Mic2 className="w-4 h-4" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">{displayName}: OFFICIAL STAGE</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="flex flex-col items-end leading-none">
                                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1.5">{t.live.viewers}</span>
                                 <div className="flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-white/40" />
                                    <span className="text-xl font-black italic text-white tracking-tighter">{viewers.toLocaleString()}</span>
                                 </div>
                              </div>
                              <div className="flex flex-col items-end leading-none">
                                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1.5">{t.live.totalHype}</span>
                                 <div className="flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5 text-mantle-green animate-pulse" />
                                    <span className="text-xl font-black italic text-mantle-green tracking-tighter">{totalHype.toLocaleString()}</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Cinema Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
                           {/* Player Area */}
                           <div className="lg:col-span-8 relative bg-black border border-white/5 overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,1)]">
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <iframe 
                                   src={`https://www.youtube.com/embed/${artist.youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${artist.youtubeId}`}
                                   className="w-full h-full scale-105 filter brightness-[0.7]"
                                   frameBorder="0"
                                   allow="autoplay; encrypted-media"
                                   allowFullScreen
                                 ></iframe>
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                              </div>
                              <div className="absolute bottom-8 left-8 z-20 flex items-center gap-5">
                                 <div className="w-16 h-16 rounded-full border-2 border-mantle-green p-0.5">
                                    <img src={artist.imageUrl} className="w-full h-full object-cover rounded-full" />
                                 </div>
                                 <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{displayName} LIVE</h3>
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">REAL-TIME PERFORMANCE MONITOR</span>
                                 </div>
                              </div>
                           </div>

                           {/* Card Based Chat Area */}
                           <div className="lg:col-span-4 flex flex-col bg-zinc-950/40 border border-white/5 relative overflow-hidden backdrop-blur-3xl">
                              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <MessageCircle className="w-4 h-4 text-white/20" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Global Hype Feed</span>
                                 </div>
                                 <div className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-gray-500">LIVE CHAT</div>
                              </div>

                              <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                                 {messages.map((msg) => (
                                    <motion.div 
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      key={msg.id} 
                                      className={`p-4 bg-black/40 border transition-all duration-500 ${
                                         msg.tier === 'gold' 
                                            ? 'border-mantle-pink/40 shadow-[0_0_15px_rgba(255,0,122,0.15)]' 
                                            : msg.tier === 'silver' 
                                            ? 'border-mantle-green/20' 
                                            : 'border-white/5'
                                      }`}
                                    >
                                       <div className="flex items-start gap-4">
                                          <img src={msg.avatar} className="w-8 h-8 rounded-none shrink-0" alt={msg.user} />
                                          <div className="space-y-1.5">
                                             <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${msg.tier === 'gold' ? 'text-mantle-pink' : 'text-gray-400'}`}>
                                                   {msg.user}
                                                </span>
                                                {msg.tier !== 'none' && (
                                                   <div className={`w-1.5 h-1.5 rounded-full ${msg.tier === 'gold' ? 'bg-mantle-pink shadow-[0_0_8px_rgba(255,0,122,1)]' : 'bg-mantle-green shadow-[0_0_8px_rgba(0,229,153,1)]'}`}></div>
                                                )}
                                             </div>
                                             <p className="text-xs text-white/80 font-light leading-relaxed tracking-tight">{msg.text}</p>
                                          </div>
                                       </div>
                                    </motion.div>
                                 ))}
                                 <div ref={chatEndRef} />
                              </div>

                              <div className="p-6 border-t border-white/5 bg-black/40 space-y-4">
                                 <form onSubmit={handleSendMessage} className="relative">
                                    <input 
                                      type="text" 
                                      placeholder={t.live.chatPlaceholder}
                                      className="w-full bg-zinc-900 border border-white/10 px-6 py-4 text-xs text-white outline-none focus:border-mantle-green transition-all pr-12"
                                      value={chatInput}
                                      onChange={(e) => setChatInput(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white">
                                       <ChevronRight className="w-5 h-5" />
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
                   )}

                   {activeTab === 'activity' && (
                      <div className="space-y-16">
                         <div className="border-b border-white/5 pb-10">
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-1 italic">{t.detail.activityLog}</h3>
                            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">The Official Icon Journey.</p>
                         </div>
                         <div className="space-y-0 relative">
                            <div className="absolute left-[13px] top-4 bottom-4 w-px bg-white/10" />
                            {activityLog.map((log, i) => (
                               <div key={i} className="flex gap-12 pb-16 relative">
                                  <div className="w-7 h-7 bg-black border-2 border-mantle-pink rounded-full z-10 shrink-0 mt-1 flex items-center justify-center">
                                     <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                  <div className="space-y-3">
                                     <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{log.date}</div>
                                     <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{log.event}</h4>
                                     <p className="text-sm text-gray-500 leading-relaxed max-w-lg">{log.desc}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {activeTab === 'goods' && (
                      <div className="space-y-12">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 border-b border-white/5 pb-10">
                            <div>
                               <h3 className="text-3xl font-black uppercase tracking-tighter mb-1 italic">{t.detail.goodsMarket}</h3>
                               <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Exclusive Digital & Physical Collectibles.</p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                               <button 
                                 onClick={() => setIsSwapModalOpen(true)}
                                 className="flex items-center gap-3 px-6 py-2 bg-mantle-pink text-white text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                               >
                                  <ArrowRightLeft className="w-3.5 h-3.5" />
                                  {t.detail.swapTitle}
                               </button>
                               <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-white/5">
                                  <Wallet className="w-4 h-4 text-mantle-pink" />
                                  <span className="text-xs font-mono font-bold text-white">{artistTokens} {tokenSymbol}</span>
                               </div>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {goods.map((item) => {
                               const isPurchased = purchasedItemIds.includes(item.id);
                               const canAfford = artistTokens >= item.price;
                               
                               return (
                                 <div key={item.id} className="p-6 bg-zinc-950 border border-white/5 group hover:border-mantle-pink/50 transition-all flex items-center gap-8">
                                    <div className="w-24 h-32 overflow-hidden border border-white/10">
                                       <img src={item.img} className={`w-full h-full object-cover transition-all duration-700 ${isPurchased ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} alt={item.name} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                       <div>
                                          <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">{item.name}</h4>
                                          <div className="text-sm font-mono font-bold text-mantle-pink">{item.price} {tokenSymbol}</div>
                                       </div>
                                       <button 
                                         disabled={isPurchased || !canAfford}
                                         onClick={() => handleBuyItem(item.id, item.price)}
                                         className={`px-6 py-2 border transition-all flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest ${
                                            isPurchased 
                                              ? 'border-mantle-green/50 text-mantle-green' 
                                              : !canAfford 
                                                ? 'border-white/5 text-gray-700 cursor-not-allowed' 
                                                : 'border-white/10 text-white hover:bg-white hover:text-black'
                                         }`}
                                       >
                                          {isPurchased ? (
                                            <>
                                              <CheckCircle2 className="w-3 h-3" />
                                              {t.detail.purchaseComplete}
                                            </>
                                          ) : canAfford ? (
                                            t.detail.buyNow
                                          ) : (
                                            t.detail.soldOut
                                          )}
                                       </button>
                                    </div>
                                 </div>
                               );
                            })}
                         </div>
                      </div>
                   )}

                   {activeTab === 'vault' && (
                      <div className="space-y-16">
                         <div className="space-y-6">
                            <div className="flex justify-between items-end">
                               <div className="space-y-1">
                                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Visual Vault Rewards</h3>
                                  <div className="text-3xl font-black text-white italic tracking-tighter">
                                     {userHype.toLocaleString()} <span className="text-xs not-italic text-gray-600">MY HYPE PTS</span>
                                  </div>
                               </div>
                               <div className="text-right space-y-1">
                                  <div className="text-[9px] font-black text-mantle-purple uppercase tracking-widest">Next Unlock</div>
                                  <div className="text-sm font-black text-white">{(nextUnlockThreshold - userHype).toLocaleString()} PTS Left</div>
                               </div>
                            </div>
                            <div className="h-2 w-full bg-white/5 border border-white/10 overflow-hidden relative">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${unlockProgress}%` }}
                                 className="h-full bg-gradient-to-r from-mantle-green via-mantle-purple to-mantle-pink shadow-[0_0_15px_rgba(0,229,153,0.3)]" 
                               />
                            </div>
                         </div>

                         <div className="relative">
                            <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ${!isYappingParticipant ? 'blur-2xl pointer-events-none' : ''}`}>
                               {vaultPhotos.map((photo, i) => (
                                 <motion.div 
                                   key={i}
                                   whileHover={{ scale: 1.02, y: -5 }}
                                   onClick={() => setSelectedPhoto(photo)}
                                   className="aspect-[3/4] bg-zinc-900 border border-white/5 overflow-hidden group cursor-pointer relative shadow-2xl"
                                 >
                                    <img src={photo} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center rounded-none opacity-0 group-hover:opacity-100 transition-all">
                                       <Maximize2 className="w-4 h-4 text-white" />
                                    </div>
                                 </motion.div>
                               ))}
                            </div>

                            {!isYappingParticipant && (
                               <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-12 text-center space-y-8 bg-black/40 backdrop-blur-sm">
                                  <div className="w-24 h-24 border border-mantle-purple/20 bg-mantle-purple/5 flex items-center justify-center rounded-none shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                                     <Lock className="w-10 h-10 text-mantle-purple" />
                                  </div>
                                  <div className="space-y-3">
                                     <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Vision Archive Locked</h3>
                                     <p className="text-gray-400 text-sm font-light leading-relaxed max-sm uppercase tracking-widest">
                                        Add hype via Yapping to see unreleased premium visual assets.
                                     </p>
                                  </div>
                                  <button 
                                    onClick={handleYappingClick}
                                    className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-mantle-purple hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                  >
                                     {t.detail.startYapping}
                                  </button>
                               </div>
                            )}
                         </div>
                      </div>
                   )}
                   
                   {activeTab === 'growth' && (
                      <div className="space-y-16">
                         <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-b border-white/5 pb-12">
                            <div className="space-y-4 text-center md:text-left">
                               <h3 className="text-3xl font-black uppercase tracking-tighter italic text-white flex items-center gap-4">
                                  <MessageCircle className="w-7 h-7 text-mantle-green" /> 
                                  Official Support Chat
                               </h3>
                               <p className="font-hand text-3xl text-mantle-green animate-pulse">
                                  {language === 'ko' ? "오늘도 야핑 덕분에 힘나요! ❤️" : "Your yapping gives me strength today! ❤️"}
                                </p>
                            </div>
                            <div className="flex items-center gap-6 bg-white/5 px-6 py-3 border border-white/10">
                               <div className="w-12 h-12 rounded-full border border-mantle-green p-0.5 overflow-hidden">
                                  <img src={artist.imageUrl} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                   <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Currently At</div>
                                   <div className="text-sm font-black text-white">{artist.agency} Practice Lab A</div>
                                </div>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                               <div className="relative p-8 bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-[0_0_50px_rgba(0,229,153,0.05)] overflow-hidden group">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-mantle-green/5 blur-3xl group-hover:bg-mantle-green/10 transition-all"></div>
                                  <div className="flex items-start gap-6">
                                     <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden border border-white/10">
                                        <img src={artist.imageUrl} className="w-full h-full object-cover grayscale-[30%]" />
                                     </div>
                                     <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-black text-white uppercase tracking-widest">{displayName}</span>
                                          <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">12:42 PM</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-r-2xl rounded-bl-2xl text-sm font-light text-gray-300 leading-relaxed shadow-xl">
                                          {language === 'ko' 
                                            ? "서포터 여러분! 오늘 댄스 연습 진짜 열심히 했어요. 이번 주 성장 리포트 꼭 확인해주세요. 항상 고마워요!" 
                                            : "Supporters! I practiced dance so hard today. Please check this week's growth report. Always thankful!"}
                                        </div>
                                        <div className="flex items-center gap-4 pt-2">
                                           <button className="flex items-center gap-2 text-[10px] font-black text-mantle-pink uppercase tracking-widest">
                                              <Heart className="w-3.5 h-3.5 fill-mantle-pink" /> 12,420
                                           </button>
                                           <button className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                              <MessageCircle className="w-3.5 h-3.5" /> 842
                                           </button>
                                        </div>
                                     </div>
                                  </div>
                               </div>

                               <div className="space-y-6">
                                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 mb-8">Performance Analytics</h4>
                                  {[
                                     { label: 'Dance Performance', status: 'Mastering Details', progress: 85, inc: '+12%', color: 'bg-mantle-green' },
                                     { label: 'Vocal Technique', status: 'Expanding Range', progress: 68, inc: '+5%', color: 'bg-blue-400' },
                                     { label: 'Visual Concept', status: 'Tuning Stage', progress: 92, inc: '+2%', color: 'bg-mantle-pink' }
                                  ].map((skill, i) => (
                                     <div 
                                       key={i} 
                                       onClick={() => setSelectedHighlightVideo(artist.youtubeId || '')}
                                       className="p-6 bg-white/5 border border-white/5 group hover:border-mantle-green transition-all cursor-pointer relative overflow-hidden"
                                     >
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all">
                                           <Video className="w-4 h-4 text-mantle-green" />
                                        </div>
                                        <div className="flex justify-between items-end mb-4">
                                           <div>
                                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{skill.label}</span>
                                              <div className="flex items-center gap-3 mt-1">
                                                 <span className="text-[8px] px-2 py-0.5 bg-white/5 text-gray-500 font-bold uppercase tracking-widest border border-white/10">{skill.status}</span>
                                                 <span className="text-[9px] font-black text-mantle-green italic">{skill.inc}</span>
                                              </div>
                                           </div>
                                           <span className="text-lg font-black italic text-white">{skill.progress}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 w-full"><div className={`h-full ${skill.color} shadow-[0_0_10px_rgba(0,229,153,0.2)]`} style={{ width: `${skill.progress}%` }}></div></div>
                                     </div>
                                  ))}
                               </div>
                            </div>

                            <div className="space-y-8 flex flex-col h-8 min-h-[500px]">
                               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Fan Cheering Feed</h4>
                               <div className="flex-1 bg-white/5 border border-white/10 relative overflow-hidden flex flex-col p-6">
                                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none"></div>
                                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                                  
                                  <div className="flex flex-col gap-6 animate-marquee-vertical">
                                     {[...cheers, ...cheers].map((cheer, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 group hover:border-mantle-green/40 transition-all">
                                           <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                              <UserCircleIcon className="w-4 h-4 text-gray-700" />
                                           </div>
                                           <div>
                                              <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Supporter_{i}</div>
                                              <p className="text-xs text-white/80 font-light">{cheer}</p>
                                           </div>
                                        </div>
                                     ))}
                                  </div>
                               </div>
                               
                               <div className="relative group">
                                  <input 
                                    type="text" 
                                    placeholder="Enter your support message..."
                                    className="w-full bg-black border border-white/10 px-6 py-5 text-sm outline-none focus:border-mantle-green transition-all"
                                  />
                                  <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-mantle-green text-black flex items-center justify-center hover:bg-white transition-all">
                                     <ArrowRightLeft className="w-4 h-4" />
                                  </button>
                               </div>
                            </div>
                         </div>
                      </div>
                   )}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          {activeTab !== 'live' && (
            <div className="lg:col-span-4">
               <div className="sticky top-28 space-y-8">
                  <div className="bg-white p-10 text-black relative shadow-2xl overflow-hidden">
                     <div className="space-y-10">
                        <div className="space-y-2">
                           <div className="text-[12px] font-bold text-gray-400 tracking-widest uppercase">
                             {t.detail.campaignPool}
                           </div>
                           <div className="text-6xl font-black tracking-tighter italic leading-none">
                             {(artist.hypePoints || 185000).toLocaleString()}
                             <span className="text-[10px] not-italic ml-2 font-black uppercase">Points</span>
                           </div>
                        </div>
                        
                        <div className="space-y-8">
                           <div className="space-y-4">
                              <div className="flex justify-between items-end text-[12px] font-black uppercase tracking-widest">
                                <span>{t.detail.campaignPeriod}</span>
                                <span className="text-sm font-black">{dDayDisplay}</span>
                              </div>
                              <div className="h-[2px] w-full bg-gray-100">
                                <div className="h-full bg-black transition-all duration-1000" style={{ width: `${campaignDurationPercent}%` }}></div>
                              </div>
                              
                              <div className="bg-gray-50 p-6 flex items-center justify-between border border-gray-100 mt-8">
                                <div className="flex items-center gap-3 text-black">
                                  <span className="text-[12px] font-black uppercase tracking-widest">
                                    {t.detail.promotedContent}
                                  </span>
                                </div>
                                <span className="text-2xl font-black italic tracking-tighter">
                                  {promotedContentTotal}
                                </span>
                              </div>
                           </div>

                           <button 
                             onClick={handleYappingClick}
                             className="w-full py-6 bg-black text-white font-black uppercase tracking-[0.4em] text-[12px] transition-all flex items-center justify-center gap-3 hover:bg-mantle-green hover:text-black shadow-xl"
                           >
                              {t.detail.startYapping}
                              <ChevronRight className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 border border-white/5 space-y-5 bg-white/5">
                     <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600">{t.detail.officialLabel}</h4>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-black text-lg italic">{artist.agency.substring(0,2)}</div>
                        <div className="space-y-0.5">
                          <div className="font-black text-white text-sm tracking-tight uppercase">{artist.agency} ENTERTAINMENT</div>
                          <div className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{t.detail.authorizedMgmt}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Gifting Modal */}
      <AnimatePresence>
        {isGiftOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsGiftOpen(false)}
               className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
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
                   <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Support {displayName}</h3>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Boost live momentum with premium digital items.</p>
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

      {/* Premium Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedPhoto(null)}
               className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-lg aspect-[3/4] bg-zinc-900 shadow-2xl overflow-hidden group"
             >
                <img src={selectedPhoto} className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 flex items-center gap-4 z-20">
                   <button className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Download className="w-5 h-5" />
                   </button>
                   <button onClick={() => setSelectedPhoto(null)} className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                   <div className="space-y-2">
                      <div className="text-[10px] font-black text-mantle-green uppercase tracking-[0.4em]">Official Digital Photocard</div>
                      <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{displayName} - Division 01</h3>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Highlight Video Modal */}
      <AnimatePresence>
        {selectedHighlightVideo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedHighlightVideo(null)}
               className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative w-full max-w-4xl aspect-video bg-black border border-white/10 shadow-2xl"
             >
                <button 
                  onClick={() => setSelectedHighlightVideo(null)}
                  className="absolute -top-12 right-0 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-mantle-green transition-colors"
                >
                   Close Highlight <X className="w-5 h-5" />
                </button>
                <iframe 
                   src={`https://www.youtube.com/embed/${selectedHighlightVideo}?autoplay=1`}
                   className="w-full h-full"
                   allow="autoplay; encrypted-media"
                   allowFullScreen
                ></iframe>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Token Swap Modal */}
      <AnimatePresence>
        {isSwapModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSwapModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-10 shadow-2xl space-y-10"
            >
               <button onClick={() => setIsSwapModalOpen(false)} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
               </button>
               
               <div className="space-y-2 text-center">
                  <div className="inline-flex items-center gap-3 bg-mantle-pink/10 px-4 py-1.5 border border-mantle-pink/20 mb-4">
                     <ArrowRightLeft className="w-3.5 h-3.5 text-mantle-pink" />
                     <span className="text-[10px] font-black text-mantle-pink uppercase tracking-widest">{t.detail.swapTitle}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{displayName} Protocol</h3>
                  <p className="text-gray-500 text-[11px] font-light leading-relaxed uppercase tracking-widest">
                     {t.detail.swapDesc}
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="p-6 bg-black border border-white/5 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{t.detail.availableHype}</span>
                        <span className="text-lg font-mono font-bold text-white">{userHype.toLocaleString()} Pts</span>
                     </div>
                     <div className="h-px bg-white/5 w-full"></div>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Rate</span>
                        <span className="text-xs font-mono font-bold text-gray-400">100 Hype = 1 {tokenSymbol}</span>
                     </div>
                  </div>

                  <div className="flex items-center justify-center py-4">
                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-zinc-900">
                        <ArrowRightLeft className="w-4 h-4 text-gray-600 rotate-90" />
                     </div>
                  </div>

                  <div className="p-6 bg-mantle-pink/5 border border-mantle-pink/20 space-y-2">
                     <div className="text-[9px] font-bold text-mantle-pink uppercase tracking-widest">Estimated Output</div>
                     <div className="text-3xl font-black text-white italic tracking-tighter">
                        +{Math.floor(userHype / 100)} <span className="text-lg not-italic text-mantle-pink ml-2">{tokenSymbol}</span>
                     </div>
                  </div>
               </div>

               <button 
                 disabled={userHype === 0}
                 onClick={handleSwapAll}
                 className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-mantle-pink hover:text-white transition-all disabled:opacity-20"
               >
                  {t.detail.swapButton} (Swap All)
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <YappingMissionModal 
        isOpen={isMissionModalOpen} 
        onClose={() => setIsMissionModalOpen(false)} 
        artistName={displayName}
        onNavigate={onNavigate}
      />

      <style>{`
        @keyframes slowZoom { 
          0%, 100% { transform: scale(1); } 
          50% { transform: scale(1.05); } 
        }
      `}</style>
    </div>
  );
};

const UserCircleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

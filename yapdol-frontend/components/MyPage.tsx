
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Star, ArrowRight, Youtube, Instagram, ChevronDown, ChevronUp, Link as LinkIcon, History, MessageCircle, Share2, Zap, Trophy, Repeat } from 'lucide-react';
import { User as UserType, Artist } from '../types';
import { MOCK_ARTISTS } from '../data/artists';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  fetchUser, 
  fetchPortfolio, 
  fetchPromotionCounts, 
  fetchPromotionHistory, 
  fetchActivity,
  UserData,
  PortfolioItem,
  PromotionCounts,
  PromotionHistory,
  ActivityItem
} from '../services/api';

// Custom X Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface MyPageProps {
  user: UserType;
  onArtistSelect: (artist: Artist) => void;
}

export const MyPage: React.FC<MyPageProps> = ({ user, onArtistSelect }) => {
  const { t, language } = useLanguage();
  const [expandedArtistId, setExpandedArtistId] = useState<string | null>(null);
  
  // 숫자에 콤마 포맷 적용
  const formatNumber = (num: number | string): string => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(n)) return String(num);
    return n.toLocaleString('en-US');
  };

  // DB 데이터 상태
  const [dbUser, setDbUser] = useState<UserData | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [promoCounts, setPromoCounts] = useState<Record<number, PromotionCounts>>({});
  const [promoHistory, setPromoHistory] = useState<Record<number, PromotionHistory[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  // 지갑 연결 시 DB 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      if (!user.walletAddress) return;
      
      setIsLoading(true);
      try {
        const [userData, portfolioData, activityData] = await Promise.all([
          fetchUser(user.walletAddress),
          fetchPortfolio(user.walletAddress),
          fetchActivity(user.walletAddress)
        ]);
        
        if (userData) setDbUser(userData);
        if (portfolioData.length > 0) setPortfolio(portfolioData);
        if (activityData.length > 0) setActivities(activityData);
        
        // 각 아티스트별 프로모션 카운트 로드
        const countsMap: Record<number, PromotionCounts> = {};
        for (const item of portfolioData) {
          const counts = await fetchPromotionCounts(user.walletAddress!, item.artist_id);
          countsMap[item.artist_id] = counts;
        }
        setPromoCounts(countsMap);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user.walletAddress]);

  // 포트폴리오를 Artist 형식으로 변환 (DB 데이터가 있으면 사용, 없으면 Mock)
  // 이미지는 MOCK_ARTISTS에서 가져옴 (하드코딩)
  const findMockArtist = (englishName: string) => 
    MOCK_ARTISTS.find(a => a.englishName.toUpperCase() === englishName.toUpperCase());

  const myInvestments: (Artist & { dbHoldings?: number; dbMyPoints?: number; dbArtistId?: number })[] = 
    portfolio.length > 0 
      ? portfolio.map(p => {
          const mockArtist = findMockArtist(p.english_name);
          return {
            id: String(p.artist_id),
            name: p.korean_name,
            englishName: p.english_name,
            agency: p.agency,
            status: p.status as 'funding' | 'market',
            hypePoints: p.hype_points,
            price: 0,
            currency: 'P',
            dDay: p.d_day || 0,
            imageUrl: mockArtist?.imageUrl || p.image_url,  // Mock 이미지 우선 사용
            isTrending: false,
            category: 'Trending' as const,
            dbHoldings: p.holdings,
            dbMyPoints: p.my_points,
            dbArtistId: p.artist_id
          };
        })
      : [MOCK_ARTISTS[0], MOCK_ARTISTS[5], MOCK_ARTISTS[1]];

  const toggleExpand = async (id: string, artistId?: number) => {
    setExpandedArtistId(expandedArtistId === id ? null : id);
    
    // 프로모션 히스토리 로드
    if (user.walletAddress && artistId && !promoHistory[artistId]) {
      const history = await fetchPromotionHistory(user.walletAddress, artistId);
      setPromoHistory(prev => ({ ...prev, [artistId]: history }));
    }
  };

  // 프로모션 히스토리 (DB 또는 Mock)
  const getPromotions = (artistId?: number) => {
    if (artistId && promoHistory[artistId]?.length > 0) {
      return promoHistory[artistId].map((p, i) => ({
        id: p.id,
        date: new Date(p.created_at).toLocaleDateString('ko-KR').replace(/\./g, '.').slice(0, -1),
        platform: p.platform.charAt(0).toUpperCase() + p.platform.slice(1),
        link: p.link,
        icon: p.platform === 'youtube' ? <Youtube className="w-3 h-3 text-red-500" /> :
              p.platform === 'x' ? <XIcon className="w-3 h-3 text-white" /> :
              <Instagram className="w-3 h-3 text-pink-500" />
      }));
    }
    return [
      { id: 1, date: '2024.12.20', platform: 'YouTube', link: '#', icon: <Youtube className="w-3 h-3 text-red-500" /> },
      { id: 2, date: '2024.12.18', platform: 'X', link: '#', icon: <XIcon className="w-3 h-3 text-white" /> },
      { id: 3, date: '2024.12.15', platform: 'Instagram', link: '#', icon: <Instagram className="w-3 h-3 text-pink-500" /> },
    ];
  };

  // 활동 내역 색상 매핑
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'SUPPORT': return 'text-blue-400 border border-blue-500';
      case 'REWARD': return 'text-mantle-pink border border-mantle-pink';
      case 'CAMPAIGN': return 'text-yellow-400 border border-yellow-400';
      case 'SWAP': return 'text-mantle-green border border-mantle-green';
      default: return 'text-gray-400 border border-gray-500';
    }
  };

  // 시간 포맷
  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'NOW';
    if (diffHours < 24) return `${diffHours}H AGO`;
    if (diffDays < 7) return `${diffDays}D AGO`;
    return `${Math.floor(diffDays / 7)}W AGO`;
  };

  // 활동 내역 (DB 또는 Mock)
  const ledgerActivities = activities.length > 0 
    ? activities.map(a => ({
        type: a.activity_type,
        artist: a.artist_name.toUpperCase(),
        amount: a.amount,
        date: formatTimeAgo(a.created_at),
        color: getActivityColor(a.activity_type)
      }))
    : [
        { type: 'SUPPORT', artist: 'MINJI', amount: '120 PTS', date: '2H AGO', color: 'text-blue-400 border border-blue-500' },
        { type: 'REWARD', artist: 'SULYOON', amount: '450 PTS', date: '5H AGO', color: 'text-mantle-pink border border-mantle-pink' },
        { type: 'SWAP', artist: 'JENNIE', amount: '1,000 PTS', date: '1D AGO', color: 'text-mantle-green border border-mantle-green' },
      ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-20 border-b border-white/5 pb-16">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 border border-white/10 p-1 grayscale hover:grayscale-0 transition-all">
              <img src={user.profileImage} className="w-full h-full object-cover" alt={user.name} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                 <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white">{dbUser ? dbUser.username : user.name}</h2>
                 <span className="px-2 py-0.5 bg-mantle-green/10 text-mantle-green text-[8px] font-black uppercase tracking-widest border border-mantle-green/20">{t.mypage.authorized}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-mono text-xs">
                <Wallet className="w-3.5 h-3.5" />
                <span>{user.walletAddress || 'Offline Mode'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-right">
             <div className="space-y-1">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">{t.mypage.totalValue}</div>
                <div className="text-3xl font-black text-white italic">{formatNumber(dbUser ? dbUser.total_points : 1245000)} <span className="text-sm font-bold not-italic text-mantle-green">P</span></div>
             </div>
             <div className="space-y-1">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">RANK CHANGE</div>
                <div className="text-3xl font-black text-mantle-pink flex items-center justify-end gap-2">
                   <span className="text-sm">▲</span> {dbUser ? dbUser.roi_percentage : 3}
                </div>
             </div>
             <div className="hidden sm:block space-y-1">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">{t.mypage.globalRank}</div>
                <div className="text-3xl font-black text-white">#{dbUser ? dbUser.global_rank : 1}</div>
             </div>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Portfolio List */}
          <div className="lg:col-span-8 space-y-10">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2 italic">
                   <Star className="w-5 h-5 text-mantle-green" /> {t.mypage.portfolio}
                </h3>
                <button className="text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">{t.mypage.export}</button>
             </div>

             <div className="space-y-4">
                {myInvestments.map((artist) => {
                   const artistName = language === 'ko' ? artist.name : artist.englishName;
                   const isDebuted = artist.status === 'market';
                   const isExpanded = expandedArtistId === artist.id;
                   
                   // DB 또는 Mock 프로모션 카운트
                   const artistPromoCounts = (artist as any).dbArtistId && promoCounts[(artist as any).dbArtistId]
                     ? promoCounts[(artist as any).dbArtistId]
                     : { x: 45, instagram: 23, youtube: 12, wechat: 5, weibo: 8 };

                   return (
                      <div 
                        key={artist.id}
                        className={`
                          group relative border transition-all duration-500 overflow-hidden 
                          ${isDebuted 
                            ? 'border-l-4 border-l-mantle-pink bg-gradient-to-r from-mantle-pink/5 to-transparent border-t-white/5 border-b-white/5 border-r-white/5' 
                            : 'border-white/5 bg-white/5 hover:border-white/10'
                          }
                          ${isExpanded ? 'bg-zinc-900/80 border-white/20' : ''}
                        `}
                      >
                         <div 
                           onClick={() => toggleExpand(artist.id, (artist as any).dbArtistId)}
                           className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center p-5 cursor-pointer relative z-10"
                         >
                            {/* Left: Artist Info & Holdings (4 Cols) */}
                            <div className="xl:col-span-4 flex items-center gap-5 w-full overflow-hidden">
                                <div className="relative w-14 h-16 bg-neutral-900 overflow-hidden shrink-0 border border-white/10">
                                    <img 
                                      src={artist.imageUrl} 
                                      className={`w-full h-full object-cover transition-all duration-500 ${isDebuted ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                                      alt={artistName} 
                                    />
                                    {/* Debut Ribbon */}
                                    {isDebuted && (
                                      <div className="absolute top-0 left-0 bg-mantle-pink text-white text-[7px] font-black px-1.5 py-0.5 z-20 shadow-lg tracking-widest">
                                        DEBUT
                                      </div>
                                    )}
                                </div>
                                <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                       <div className={`text-[8px] font-black uppercase tracking-widest leading-none ${isDebuted ? 'text-mantle-pink' : 'text-mantle-green'}`}>
                                          {artist.agency}
                                       </div>
                                    </div>
                                    <h4 className="text-lg font-black text-white uppercase italic tracking-tighter truncate">{artist.englishName}</h4>
                                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                                       <span className="text-gray-500">{t.mypage.holdings}:</span>
                                       <span className={isDebuted ? 'text-white' : 'text-gray-600'}>
                                          {formatNumber((artist as any).dbHoldings !== undefined ? (artist as any).dbHoldings : (isDebuted ? 1420 : 0))}
                                       </span>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: Social Stats (5 Cols) - Compact, No Extra Space, No Wrap */}
                            <div className="xl:col-span-5 flex items-center justify-start gap-1.5 overflow-x-auto hide-scrollbar w-full">
                               {/* X */}
                               <div className="flex items-center gap-2 px-2 py-1.5 bg-black/40 border border-white/10 hover:border-white/30 transition-all group/icon hover:scale-105 shrink-0 whitespace-nowrap">
                                  <XIcon className="w-3 h-3 text-gray-500 group-hover/icon:text-white transition-colors shrink-0" />
                                  <span className="text-[9px] font-bold text-gray-400 group-hover/icon:text-white">{artistPromoCounts.x}</span>
                               </div>
                               {/* Instagram */}
                               <div className="flex items-center gap-2 px-2 py-1.5 bg-black/40 border border-white/10 hover:border-mantle-pink/50 transition-all group/icon hover:scale-105 shrink-0 whitespace-nowrap">
                                  <Instagram className="w-3 h-3 text-gray-500 group-hover/icon:text-pink-500 transition-colors shrink-0" />
                                  <span className="text-[9px] font-bold text-gray-400 group-hover/icon:text-white">{artistPromoCounts.instagram}</span>
                               </div>
                               {/* Youtube */}
                               <div className="flex items-center gap-2 px-2 py-1.5 bg-black/40 border border-white/10 hover:border-red-500/50 transition-all group/icon hover:scale-105 shrink-0 whitespace-nowrap">
                                  <Youtube className="w-3 h-3 text-gray-500 group-hover/icon:text-red-500 transition-colors shrink-0" />
                                  <span className="text-[9px] font-bold text-gray-400 group-hover/icon:text-white">{artistPromoCounts.youtube}</span>
                               </div>
                               {/* WeChat */}
                               <div className="flex items-center gap-2 px-2 py-1.5 bg-black/40 border border-white/10 hover:border-green-500/50 transition-all group/icon hover:scale-105 shrink-0 whitespace-nowrap">
                                  <MessageCircle className="w-3 h-3 text-gray-500 group-hover/icon:text-green-500 transition-colors shrink-0" />
                                  <span className="text-[9px] font-bold text-gray-400 group-hover/icon:text-white">{artistPromoCounts.wechat}</span>
                               </div>
                               {/* Weibo */}
                               <div className="flex items-center gap-2 px-2 py-1.5 bg-black/40 border border-white/10 hover:border-yellow-500/50 transition-all group/icon hover:scale-105 shrink-0 whitespace-nowrap">
                                  <Share2 className="w-3 h-3 text-gray-500 group-hover/icon:text-yellow-500 transition-colors shrink-0" />
                                  <span className="text-[9px] font-bold text-gray-400 group-hover/icon:text-white">{artistPromoCounts.weibo}</span>
                               </div>
                            </div>

                            {/* Right: Points (3 Cols) - Right Aligned, Single Line */}
                            <div className="xl:col-span-3 flex items-center justify-end gap-4 w-full ml-auto">
                               <div className="text-right space-y-0.5 min-w-0">
                                  <div className={`text-base font-black italic leading-none whitespace-nowrap ${isDebuted ? 'text-mantle-pink' : 'text-white'}`}>
                                    {formatNumber((artist as any).dbMyPoints !== undefined ? (artist as any).dbMyPoints : 84200)} <span className="text-[10px] not-italic text-gray-500">P</span>
                                  </div>
                                  <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest text-right whitespace-nowrap truncate">My Points</div>
                               </div>
                               {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                            </div>
                         </div>

                         {/* Expanded Content: Promotion History */}
                         <AnimatePresence>
                            {isExpanded && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="border-t border-white/5 bg-black/40 relative z-10"
                               >
                                  <div className="p-6 space-y-4">
                                     <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                        <History className="w-3 h-3" /> {t.mypage.historyTitle}
                                     </h5>
                                     <div className="grid grid-cols-1 gap-2">
                                        {/* Header */}
                                        <div className="grid grid-cols-12 text-[9px] font-black text-gray-600 uppercase tracking-widest px-4 pb-2">
                                           <div className="col-span-3">{t.mypage.date}</div>
                                           <div className="col-span-4">{t.mypage.platform}</div>
                                           <div className="col-span-5 text-right">{t.mypage.link}</div>
                                        </div>
                                        {/* List */}
                                        {getPromotions((artist as any).dbArtistId).map((promo) => (
                                           <div key={promo.id} className="grid grid-cols-12 items-center px-4 py-3 bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all">
                                              <div className="col-span-3 text-xs font-mono text-gray-400">{promo.date}</div>
                                              <div className="col-span-4 flex items-center gap-2 text-xs font-bold text-white">
                                                 {promo.icon} {promo.platform === 'X' ? 'X' : promo.platform}
                                              </div>
                                              <div className="col-span-5 text-right flex justify-end">
                                                 <a href={promo.link} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-mantle-green hover:text-white transition-colors">
                                                    View Post <LinkIcon className="w-3 h-3" />
                                                 </a>
                                              </div>
                                           </div>
                                        ))}
                                     </div>
                                     <div className="pt-4 flex justify-center">
                                         <button 
                                           onClick={() => onArtistSelect(artist)}
                                           className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                                         >
                                            View Artist Profile <ArrowRight className="w-3 h-3" />
                                         </button>
                                     </div>
                                  </div>
                               </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                   );
                })}
             </div>
          </div>

          {/* Activity Sidebar - Updated Tag Style */}
          <div className="lg:col-span-4 space-y-10">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-500 italic">
                   {t.mypage.ledger}
                </h3>
                <History className="w-4 h-4 text-gray-700" />
             </div>

             <div className="space-y-0 border border-white/5 bg-white/5">
                {ledgerActivities.map((act, i) => (
                   <div key={i} className="flex justify-between items-center p-3 border-b border-white/5 hover:bg-white/5 transition-colors group">
                      {/* Left: Type Tag + Artist Name */}
                      <div className="flex items-center gap-3">
                         <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-transparent ${act.color}`}>
                            {act.type}
                         </span>
                         <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                            {act.artist}
                         </span>
                      </div>
                      
                      {/* Right: Amount + Date */}
                      <div className="text-right">
                         <div className={`text-xs font-mono font-bold ${act.type === 'SWAP' ? 'text-red-400' : 'text-mantle-green'}`}>
                            {act.type === 'SWAP' ? '-' : '+'}{act.amount}
                         </div>
                         <div className="text-[7px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{act.date}</div>
                      </div>
                   </div>
                ))}
             </div>
             
             {/* Simple Download Button */}
             <button className="w-full py-4 border border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-3">
                Download Full History <ArrowRight className="w-3 h-3" />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};


import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, ChevronRight, Crown, UserCircle, Star, Activity, BarChart3, Mic2 } from 'lucide-react';
import { MOCK_ARTISTS } from '../data/artists';
import { Artist, LeaderboardEntry, User, ViewType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface MarketPageProps {
  onArtistSelect: (artist: Artist) => void;
  onNavigate: (view: ViewType) => void;
  user: User | null;
}

export const MarketPage: React.FC<MarketPageProps> = ({ onArtistSelect, onNavigate, user }) => {
  const { t, language } = useLanguage();
  const [selectedTrainee, setSelectedTrainee] = useState<Artist>(MOCK_ARTISTS[0]);

  const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, nickname: 'Vocal_Lover_99', points: 142500, share: 0.85 },
    { rank: 2, nickname: 'Global_Stan_JP', points: 128900, share: 0.72 },
    { rank: 3, nickname: 'StarMaker_KR', points: 115000, share: 0.65 },
    { rank: 4, nickname: 'MusicHunter', points: 98000, share: 0.54 },
    { rank: 5, nickname: 'HypeMaster', points: 84200, share: 0.48 },
    { rank: 6, nickname: 'DanceDirect', points: 72000, share: 0.41 },
    { rank: 7, nickname: 'Aesthete_Fan', points: 65400, share: 0.38 },
  ];

  const risingIcons = MOCK_ARTISTS.filter(a => a.id !== selectedTrainee.id);

  const handleContextualArtistSelect = (artist: Artist) => {
    if (artist.status === 'funding') {
      onNavigate('funding');
    }
    onArtistSelect(artist);
  };

  const selectedDisplayName = language === 'ko' ? selectedTrainee.name : selectedTrainee.englishName;

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] min-h-screen pt-24 bg-black pb-40 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-mantle-pink/5 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-mantle-purple/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        <section className="mb-24 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 flex items-center gap-4">
              <Mic2 className="w-4 h-4 text-mantle-pink" /> 
              {t.ranking.performanceIndex}
            </h3>
            <div className="h-px flex-1 bg-white/5 mx-10 hidden md:block"></div>
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar">
            {MOCK_ARTISTS.map((artist) => {
              const isActive = selectedTrainee.id === artist.id;
              const artistName = language === 'ko' ? artist.name : artist.englishName;
              return (
                <button
                  key={artist.id}
                  onClick={() => setSelectedTrainee(artist)}
                  className={`relative group shrink-0 transition-all duration-700 ${isActive ? 'scale-105' : 'scale-95 opacity-30 hover:opacity-100 hover:scale-100'}`}
                >
                  <div className={`relative w-28 h-28 md:w-36 md:h-36 transition-all duration-700 overflow-hidden ${isActive ? 'shadow-[0_20px_60px_rgba(255,0,122,0.2)]' : ''}`}>
                    <img 
                      src={artist.imageUrl} 
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                      alt={artistName} 
                    />
                    <div className={`absolute inset-0 border transition-all duration-700 ${isActive ? 'border-mantle-pink/50' : 'border-white/5 group-hover:border-white/20'}`}></div>
                    {isActive && (
                      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-mantle-pink"></div>
                    )}
                  </div>
                  <div className="mt-5 text-center">
                    <div className={`text-[8px] font-black uppercase tracking-[0.3em] mb-1 transition-colors ${isActive ? 'text-mantle-pink' : 'text-gray-600'}`}>
                      {artist.agency}
                    </div>
                    <div className={`text-sm md:text-base font-black uppercase tracking-tighter italic transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {artistName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-white/10 pb-20 relative">
          <div className="space-y-10">
            <div className="flex items-center gap-5">
               <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white bg-white/5 border border-white/10 px-4 py-1.5">
                 {t.ranking.metricDivision} {selectedTrainee.status === 'funding' ? '01' : '02'}
               </span>
               <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.4em] uppercase text-gray-600">
                 <Activity className="w-3.5 h-3.5" />
                 {selectedTrainee.status === 'funding' ? t.ranking.incubationStats : t.ranking.globalStats}
               </div>
            </div>
            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8] italic">
              {selectedTrainee.englishName}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mantle-pink to-transparent opacity-80 not-italic">{t.ranking.rankingTitle}</span>
            </h2>
          </div>
          
          <div className="text-right mt-12 lg:mt-0 space-y-8">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">{t.ranking.popularityIndex}</div>
              <div className="text-6xl md:text-8xl font-black text-white tracking-tighter italic flex items-end justify-end leading-none">
                 {selectedTrainee.hypePoints?.toLocaleString() || '1.42B'}<span className="text-xs not-italic ml-3 font-black uppercase text-gray-600 mb-2 tracking-widest">{t.ranking.points}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] flex items-center justify-end gap-3">
                 <Star className="w-3.5 h-3.5 text-mantle-pink fill-mantle-pink" /> {t.ranking.verifiedData}
              </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 space-y-12">
             <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <h3 className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-5">
                   <Trophy className="w-6 h-6 text-mantle-pink" /> 
                   {t.ranking.topContributors}
                </h3>
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest italic flex items-center gap-2">
                  <BarChart3 className="w-3 h-3" /> {t.ranking.liveChart}
                </span>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
                         <th className="py-8 px-6">{t.ranking.rank}</th>
                         <th className="py-8 px-6">{t.ranking.supporter}</th>
                         <th className="py-8 px-6">{t.ranking.contribution}</th>
                         <th className="py-8 px-6 text-right">{t.ranking.milestoneShare}</th>
                      </tr>
                   </thead>
                   <tbody className="text-white">
                      {mockLeaderboard.map((entry) => (
                        <tr 
                          key={entry.rank} 
                          className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group cursor-default"
                        >
                           <td className="py-10 px-6">
                              <div className="flex items-center gap-5">
                                 {entry.rank <= 3 ? (
                                   <div className={`w-9 h-9 flex items-center justify-center font-black italic text-xs ${entry.rank === 1 ? 'bg-mantle-pink text-white shadow-[0_10px_30px_rgba(255,0,122,0.3)]' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                                      {entry.rank}
                                   </div>
                                 ) : (
                                   <span className="text-xs font-mono font-bold text-gray-600 ml-3">#{entry.rank}</span>
                                 )}
                              </div>
                           </td>
                           <td className="py-10 px-6">
                              <div className="flex items-center gap-5">
                                 <div className="w-9 h-9 bg-zinc-900 border border-white/5 flex items-center justify-center">
                                    <UserCircle className="w-5 h-5 text-gray-700 group-hover:text-mantle-pink transition-colors" />
                                 </div>
                                 <span className="text-sm font-black uppercase tracking-tight group-hover:text-white transition-colors">
                                    {entry.nickname}
                                 </span>
                                 {entry.rank === 1 && <Crown className="w-3.5 h-3.5 text-mantle-pink fill-mantle-pink/20" />}
                              </div>
                           </td>
                           <td className="py-10 px-6">
                              <div className="flex items-center gap-3">
                                 <TrendingUp className="w-3.5 h-3.5 text-mantle-pink" />
                                 <span className="text-sm font-mono font-bold text-gray-300">{entry.points.toLocaleString()}</span>
                              </div>
                           </td>
                           <td className="py-10 px-6 text-right">
                              <span className="text-sm font-mono font-bold text-mantle-pink">
                                 {(entry.share * (selectedTrainee.revenueShare || 1)).toFixed(2)}%
                              </span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             <button className="w-full py-8 border border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-[0.5em] hover:text-white hover:border-white/20 transition-all italic">
                {t.ranking.viewGlobalStandings}
             </button>
          </div>

          <div className="lg:col-span-4 space-y-20">
             <div className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                   <h3 className="text-xl font-black uppercase tracking-tight italic text-gray-500">{t.ranking.momentumRising}</h3>
                   <Activity className="w-4 h-4 text-mantle-pink" />
                </div>
                
                <div className="space-y-6">
                   {risingIcons.slice(0, 3).map((artist) => {
                      const artistDisplayName = language === 'ko' ? artist.name : artist.englishName;
                      return (
                        <div 
                          key={artist.id} 
                          onClick={() => handleContextualArtistSelect(artist)}
                          className="p-8 bg-white/5 border border-white/5 hover:border-mantle-pink/40 transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-8">
                              <div className="w-16 h-16 overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <img src={artist.imageUrl} className="w-full h-full object-cover" alt={artistDisplayName} />
                              </div>
                              <div>
                                <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.4em] mb-1">{artist.agency}</div>
                                <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{artist.englishName}</h4>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className="text-mantle-pink font-mono font-bold text-base">
                                {artist.status === 'funding' ? `D-${artist.dDay}` : `+${artist.growthRate}%`}
                              </div>
                              <div className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.3em] italic">
                                {artist.status === 'funding' ? t.ranking.launchSoon : t.ranking.chartMomentum}
                              </div>
                          </div>
                        </div>
                      );
                   })}
                </div>
             </div>

             <div className="p-10 bg-zinc-900 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-mantle-pink/10 blur-3xl rounded-full group-hover:bg-mantle-pink/20 transition-all duration-1000"></div>
                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-8">
                      <AwardIcon className="w-5 h-5 text-mantle-pink" />
                      <h4 className="text-xl font-black uppercase italic tracking-tight text-white">{t.ranking.milestoneRewards}</h4>
                   </div>
                   <p className="text-[11px] text-gray-400 leading-relaxed font-light mb-10">
                      {selectedTrainee.status === 'funding' 
                         ? (language === 'cn' ? '在出道前支持官方档案艺人的顶级支持者将获得出道专辑特别致谢及未公开练习视频。' : '데뷔 전 공식 아카이브 아티스트를 지원하는 톱 서포터즈에게는 데뷔 음반 특별 크레딧 기재 및 미공개 연습 비디오가 제공됩니다.')
                         : (language === 'cn' ? '全球活动收益将根据贡献度每日结算。顶级排名者将获得未来世界巡演 VIP 通道的优先购买权。' : '글로벌 활동 수익은 기여도에 따라 매일 정산됩니다. 상위 랭커에게는 향후 월드투어 VIP 패스 우선 구매권이 부여됩니다.')
                      }
                   </p>
                   <button className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-mantle-pink hover:text-white transition-all shadow-xl">
                      Reward System Detail
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {user && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-16 left-0 w-full z-40 bg-zinc-950/95 backdrop-blur-3xl border-t border-white/10 py-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-10">
               <div className="flex items-center gap-12">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 border border-white/10 p-1 bg-zinc-900">
                        <img src={user.profileImage} className="w-full h-full object-cover grayscale opacity-80" alt={user.name} />
                     </div>
                     <div>
                        <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-1.5 leading-none">Global Verified Supporter</div>
                        <div className="text-lg font-black text-white uppercase tracking-tight italic">{user.name}</div>
                     </div>
                  </div>
                  
                  <div className="h-12 w-px bg-white/5 hidden sm:block"></div>
                  
                  <div className="flex items-center gap-12">
                     <div className="space-y-1">
                        <div className="text-[9px] font-black text-mantle-pink uppercase tracking-[0.4em]">{t.ranking.personalRank}</div>
                        <div className="text-2xl font-black text-white italic tracking-tighter leading-none">#128<span className="text-[10px] not-italic ml-2 text-gray-600">{t.ranking.global}</span></div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[9px] font-black text-mantle-pink uppercase tracking-[0.4em]">{t.ranking.impact}</div>
                        <div className="text-2xl font-black text-white italic tracking-tighter leading-none">84,200<span className="text-[10px] not-italic ml-2 text-gray-600">{t.ranking.points}</span></div>
                     </div>
                  </div>
               </div>

               <div className="flex gap-5">
                 <button 
                  onClick={() => handleContextualArtistSelect(selectedTrainee)}
                  className="px-10 py-4 border border-white/5 text-white text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white/5 transition-all bg-white/5"
                 >
                   {t.ranking.profileView}
                 </button>
                 <button className="px-12 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-mantle-pink hover:text-white transition-all shadow-2xl">
                    {selectedTrainee.status === 'funding' ? t.ranking.supportBoost : t.ranking.claimRewards}
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AwardIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

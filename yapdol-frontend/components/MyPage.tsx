
import React from 'react';
import { motion } from 'framer-motion';
import { User, Wallet, TrendingUp, History, Star, ArrowRight } from 'lucide-react';
import { User as UserType, Artist } from '../types';
import { MOCK_ARTISTS } from '../data/artists';
import { useLanguage } from '../contexts/LanguageContext';

interface MyPageProps {
  user: UserType;
  onArtistSelect: (artist: Artist) => void;
}

export const MyPage: React.FC<MyPageProps> = ({ user, onArtistSelect }) => {
  const { t, language } = useLanguage();
  const myInvestments = MOCK_ARTISTS.slice(0, 3);

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
                 <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white">{user.name}</h2>
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
                <div className="text-3xl font-black text-white">$12,450<span className="text-xs ml-1 font-light opacity-50">USD</span></div>
             </div>
             <div className="space-y-1">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">{t.mypage.roi}</div>
                <div className="text-3xl font-black text-mantle-green">+4.2%</div>
             </div>
             <div className="hidden sm:block space-y-1">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">{t.mypage.globalRank}</div>
                <div className="text-3xl font-black text-white">#420</div>
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

             <div className="space-y-3">
                {myInvestments.map((artist) => {
                   const artistName = language === 'ko' ? artist.name : artist.englishName;
                   return (
                      <div 
                        key={artist.id}
                        onClick={() => onArtistSelect(artist)}
                        className="group cursor-pointer flex items-center justify-between p-6 bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                      >
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-20 bg-neutral-900 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img src={artist.imageUrl} className="w-full h-full object-cover" alt={artistName} />
                            </div>
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-mantle-green uppercase tracking-widest leading-none">{artist.agency}</div>
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{artist.englishName}</h4>
                                <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t.mypage.holdings}: 14.2 {artist.englishName}</div>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="text-lg font-mono font-bold text-white leading-none">$1,420</div>
                            <div className="text-[9px] font-black text-mantle-green uppercase tracking-widest">+12.4%</div>
                          </div>
                      </div>
                   );
                })}
             </div>
          </div>

          {/* Activity Sidebar */}
          <div className="lg:col-span-4 space-y-10">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-500 italic">
                   {t.mypage.ledger}
                </h3>
                <History className="w-4 h-4 text-gray-700" />
             </div>

             <div className="space-y-6">
                {[
                   { type: 'Support', artist: 'MINJI', amount: '120 USD', date: '2H AGO' },
                   { type: 'Dividend', artist: 'YIELD', amount: '12.4 USD', date: '5H AGO' },
                   { type: 'Campaign', artist: 'KAI', amount: '500 USD', date: '1D AGO' },
                ].map((act, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="space-y-0.5">
                         <div className={`text-[8px] font-black uppercase tracking-[0.2em] ${act.type === 'Support' ? 'text-blue-400' : 'text-mantle-pink'}`}>{act.type}</div>
                         <div className="text-sm font-black text-white uppercase tracking-tight">{act.artist}</div>
                      </div>
                      <div className="text-right space-y-0.5">
                         <div className="text-sm font-mono text-white">{act.amount}</div>
                         <div className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">{act.date}</div>
                      </div>
                   </div>
                ))}
             </div>

             <div className="p-8 border border-white/5 space-y-5 bg-gradient-to-br from-white/5 to-transparent">
                <h4 className="text-base font-black uppercase italic tracking-tight text-white">{t.mypage.stakingRewards}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-light">{t.mypage.stakingDesc}</p>
                <button className="w-full py-3.5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                   {t.mypage.withdraw}
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

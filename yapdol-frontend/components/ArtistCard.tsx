
import React from 'react';
import { Artist } from '../types';
import { Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArtistCardProps {
  artist: Artist;
  onClick?: () => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const { t, language } = useLanguage();
  const isTrainee = artist.status === 'funding';
  const displayName = language === 'ko' ? artist.name : artist.englishName;
  
  const hypeProgress = isTrainee 
    ? Math.floor(((artist.hypePoints || 0) / 200000) * 100) 
    : 100;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col relative overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[0_0_80px_rgba(0,229,153,0.15)]"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        
        {/* Main Background Image */}
        <div className="absolute inset-0">
          <img 
            src={artist.imageUrl} 
            alt={displayName}
            className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110 filter brightness-[0.8] grayscale-[10%] group-hover:grayscale-0 group-hover:brightness-100"
          />
          {/* Gradients for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />
        </div>
        
        {/* Top Badges (Persona Tags) */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
           {artist.nicknames?.slice(0, 2).map((nick, idx) => (
             <span key={idx} className="px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 text-[8px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-mantle-green rounded-full shadow-[0_0_8px_rgba(0,229,153,1)]"></div>
               {nick}
             </span>
           ))}
        </div>

        {/* Center Hover Label */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none transition-all duration-500">
           <div className="bg-white px-10 py-4 shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
              <span className="text-black font-black uppercase tracking-[0.4em] text-[10px]">
                 {t.hero.cta}
              </span>
           </div>
        </div>

        {/* Artist Name & Agency Branding */}
        <div className="absolute bottom-[35%] left-0 w-full px-8 z-20 space-y-2">
           <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white/20"></div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 group-hover:text-white/80 transition-colors">
                {artist.agency} ENTERTAINMENT
              </span>
           </div>
           
           <h3 className="text-6xl font-black text-white uppercase leading-none tracking-tighter italic drop-shadow-lg">
              {artist.englishName}<span className="text-mantle-green">.</span>
           </h3>
        </div>

        {/* Progress & Stats Bar Area */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-20 space-y-8 bg-gradient-to-t from-black to-transparent">
           
           {/* Progress Bar - Shows Campaign D-? for all artists */}
           <div className="space-y-3">
              <div className="flex justify-between items-end">
                 <span className="text-[10px] text-white/40 uppercase tracking-widest font-black group-hover:text-white transition-colors">
                    {t.card.debutGauge}
                 </span>
                 <span className="text-sm font-black italic text-white">
                    D-{artist.campaignDDay || 14}
                 </span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                 <div 
                   className="h-full bg-mantle-green shadow-[0_0_10px_rgba(0,229,153,0.5)] transition-all duration-1000 ease-out"
                   style={{ width: `${hypeProgress}%` }}
                 />
              </div>
           </div>
           
           {/* Bottom Metrics: Contributors & Specific Detail (Debut D-? or Available Goods) */}
           <div className="flex justify-between items-end pt-2">
              <div className="flex flex-col">
                 <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mb-2 group-hover:text-white transition-colors">
                    {t.card.contributors}
                 </span>
                 <span className="text-xl font-black italic text-white leading-none tracking-tighter">
                    {artist.contributorCount?.toLocaleString() || '8,888'}
                 </span>
              </div>
              
              <div className="flex flex-col items-end">
                 <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mb-2 group-hover:text-white transition-colors">
                    {isTrainee ? t.card.debutUntil : t.card.availableGoods}
                 </span>
                 <span className="text-xl font-black italic text-mantle-green leading-none tracking-tighter">
                    {isTrainee ? `D-${artist.dDay}` : (artist.availableGoodsCount || 0)}
                 </span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

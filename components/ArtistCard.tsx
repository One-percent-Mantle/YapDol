import React from 'react';
import { Artist } from '../types';
import { Mic2, Disc3, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArtistCardProps {
  artist: Artist;
  onClick?: () => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const { t, language } = useLanguage();
  const isFunding = artist.status === 'funding';
  const displayName = language === 'ko' ? artist.name : artist.englishName;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col relative"
    >
      {/* Visual Container - Changed to 2:3 aspect ratio (Photocard Standard) */}
      <div className="relative aspect-[2/3] overflow-hidden bg-agency-gray mb-4 shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:-translate-y-2">
        <img 
          src={artist.imageUrl} 
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
        />
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10 opacity-80 group-hover:opacity-60 transition-opacity" />
        
        {/* Noise Texture (Film Grain) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-0 left-0 p-4 w-full flex justify-between items-start z-10">
           <div className={`px-2 py-px text-[9px] font-bold tracking-[0.2em] uppercase border ${isFunding ? 'border-white text-white' : 'border-purple-400 text-purple-400'} backdrop-blur-md`}>
              {isFunding ? 'TRAINEE' : 'ARTIST'}
           </div>
           {/* Agency Watermark */}
           <div className="text-[8px] font-black text-white/30 uppercase tracking-widest rotate-90 origin-top-right translate-x-2">
              Official Licensed
           </div>
        </div>

        {/* Center Text (Appears on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
           <div className="bg-black/50 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
              <span className="text-xs font-bold text-white uppercase tracking-widest">View Profile</span>
           </div>
        </div>

        {/* Bottom Info - Magazine Style */}
        <div className="absolute bottom-0 left-0 p-5 w-full z-10">
           <div className="overflow-hidden">
             <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-mantle-green mb-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {artist.agency} Ent.
             </div>
           </div>
           
           <h3 className="text-3xl font-black text-white uppercase leading-[0.85] tracking-tighter mb-2 italic">
              {artist.englishName}
           </h3>
           
           <div className="h-px w-full bg-white/20 mb-3 group-hover:w-full transition-all duration-700 origin-left"></div>
           
           <div className="flex justify-between items-end">
              <div className="flex flex-col">
                 <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                    {isFunding ? 'Funding Price' : 'Current Price'}
                 </span>
                 <span className="text-lg font-mono font-bold text-white leading-none">
                    {artist.price.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">USDC</span>
                 </span>
              </div>
              
              {isFunding ? (
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Progress</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                           {Math.floor(((artist.currentFunding || 0) / (artist.fundingGoal || 1)) * 100)}%
                        </span>
                    </div>
                 </div>
              ) : (
                 <div className="text-right">
                    <span className="text-[9px] text-green-400 uppercase tracking-widest font-bold flex items-center gap-1">
                       <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
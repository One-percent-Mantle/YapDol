import React, { useState, useMemo } from 'react';
import { Disc3 } from 'lucide-react';
import { MOCK_ARTISTS } from '../data/artists';
import { ArtistCard } from './ArtistCard';
import { FilterBar } from './FilterBar';
import { Artist, FilterCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface MarketPageProps {
  onArtistSelect: (artist: Artist) => void;
}

export const MarketPage: React.FC<MarketPageProps> = ({ onArtistSelect }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('Trending');

  const marketArtists = useMemo(() => {
    let artists = MOCK_ARTISTS.filter(a => a.status === 'market');
    if (activeCategory !== 'Trending') {
      artists = artists.filter(a => a.category === activeCategory);
    }
    return artists;
  }, [activeCategory]);

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] min-h-screen pt-24 bg-black">
      <FilterBar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
      />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-purple-600 text-white rounded-full">
                  <Disc3 className="w-6 h-6" />
               </div>
               <span className="text-sm font-bold tracking-[0.3em] uppercase text-purple-400">Division 02</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Artist<br/>Market
            </h2>
          </div>
          
          <div className="hidden md:block text-right">
              <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">{t.hero.marketActivity}</div>
              <div className="text-3xl font-mono font-bold text-white">
                 $142,302,910 <span className="text-sm text-gray-500 font-sans">Vol.</span>
              </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {marketArtists.map((artist) => (
            <ArtistCard 
              key={artist.id} 
              artist={artist} 
              onClick={() => onArtistSelect(artist)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
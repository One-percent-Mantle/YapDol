import React, { useState, useMemo } from 'react';
import { Mic2 } from 'lucide-react';
import { MOCK_ARTISTS } from '../data/artists';
import { ArtistCard } from './ArtistCard';
import { FilterBar } from './FilterBar';
import { Artist, FilterCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FundingPageProps {
  onArtistSelect: (artist: Artist) => void;
}

export const FundingPage: React.FC<FundingPageProps> = ({ onArtistSelect }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('Trending');

  const fundingArtists = useMemo(() => {
    let artists = MOCK_ARTISTS.filter(a => a.status === 'funding');
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
               <div className="p-3 bg-white text-black rounded-full">
                  <Mic2 className="w-6 h-6" />
               </div>
               <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Division 01</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Trainee<br/>Roster
            </h2>
          </div>
          <p className="text-gray-400 font-light max-w-md text-right mt-6 md:mt-0">
             {t.hero.labDesc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {fundingArtists.map((artist) => (
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
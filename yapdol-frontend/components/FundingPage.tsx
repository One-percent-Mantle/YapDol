
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MOCK_ARTISTS } from '../data/artists';
import { ArtistCard } from './ArtistCard';
import { Artist } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FundingPageProps {
  onArtistSelect: (artist: Artist) => void;
}

export const FundingPage: React.FC<FundingPageProps> = ({ onArtistSelect }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');

  const filteredArtists = useMemo(() => {
    return MOCK_ARTISTS.filter(a => 
      activeTab === 'pre' ? a.status === 'funding' : a.status === 'market'
    );
  }, [activeTab]);

  const tabs = [
    { id: 'pre', label: t.funding.preDebut, division: '01' },
    { id: 'post', label: t.funding.postDebut, division: '02' },
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] min-h-screen pt-24 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12 border-b border-white/5 pb-20">
          <div className="space-y-10">
            <div className="flex items-center gap-6">
               <div className="px-4 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em]">
                 Division {activeTab === 'pre' ? '01' : '02'}
               </div>
               <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-600">
                  {activeTab === 'pre' ? t.funding.roster : 'Global Success Icons'}
               </span>
            </div>
            <div className="relative">
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8] italic">
                {activeTab === 'pre' ? 'Trainee' : 'Icon'}<br/>
                <span className="text-gray-800 not-italic">{t.funding.archive}</span>
              </h2>
            </div>
          </div>
          
          <div className="max-w-md md:mt-auto space-y-8">
             <div className="text-right">
                <p className="text-gray-500 text-[10px] font-black leading-relaxed uppercase tracking-[0.5em] mb-4">
                   {activeTab === 'pre' ? t.funding.incubationSystem : 'Global Talent Performance Analytics'}
                </p>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed italic opacity-90 border-r-2 border-mantle-green/40 pr-8">
                   {activeTab === 'pre' ? t.funding.desc : 'Excellence verified by global success. Direct value distribution for the fandom from debuted artists.'}
                </p>
             </div>
          </div>
        </div>

        {/* Tab Navigation - Based on User Design Reference */}
        <div className="flex space-x-12 mb-20 border-b border-white/5 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'pre' | 'post')}
                className={`
                  relative pb-6 text-xl font-black uppercase tracking-tighter italic transition-all duration-300
                  ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-400'}
                `}
              >
                <div className="flex items-baseline gap-2">
                   {tab.label}
                   <span className={`text-[9px] not-italic tracking-widest font-bold ${isActive ? 'text-mantle-green' : 'text-gray-700'}`}>
                     DIV-{tab.division}
                   </span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="archiveTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-mantle-green"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-24 pb-40">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <ArtistCard 
                key={artist.id} 
                artist={artist} 
                onClick={() => onArtistSelect(artist)}
              />
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
               <p className="text-gray-600 font-black uppercase tracking-[0.4em] text-xs">
                  No records found in this division.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

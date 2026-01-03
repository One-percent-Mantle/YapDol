
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight, User } from 'lucide-react';
import { MOCK_ARTISTS } from '../data/artists';
import { Artist } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onArtistSelect: (artist: Artist) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onArtistSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Artist[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = MOCK_ARTISTS.filter(a => 
      a.name.toLowerCase().includes(query.toLowerCase()) || 
      a.englishName.toLowerCase().includes(query.toLowerCase()) ||
      a.agency.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-6 md:p-20"
    >
      <button onClick={onClose} className="absolute top-10 right-10 text-white/50 hover:text-white">
        <X className="w-10 h-10" />
      </button>

      <div className="max-w-4xl mx-auto pt-20">
        <div className="relative border-b-2 border-white/10 focus-within:border-mantle-green transition-colors pb-4 flex items-center gap-6">
          <Search className="w-8 h-8 text-gray-500" />
          <input 
            autoFocus
            type="text"
            placeholder="Search artists, agencies, or status..."
            className="w-full bg-transparent text-4xl md:text-6xl font-black uppercase tracking-tighter outline-none placeholder:text-white/10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 max-h-[60vh] overflow-y-auto hide-scrollbar">
          {results.length > 0 ? (
            results.map(artist => (
              <div 
                key={artist.id}
                onClick={() => { onArtistSelect(artist); onClose(); }}
                className="group cursor-pointer flex items-center gap-6 p-4 border border-white/5 hover:border-white/20 transition-all bg-white/5"
              >
                <div className="w-20 h-20 bg-neutral-800 overflow-hidden shrink-0">
                  <img src={artist.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={artist.name} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-mantle-green uppercase tracking-widest">{artist.agency} ENT.</div>
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{artist.englishName}</h4>
                </div>
                <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </div>
            ))
          ) : query ? (
             <div className="text-gray-500 font-bold uppercase tracking-widest">No results found for "{query}"</div>
          ) : (
            <div className="space-y-8">
              <h5 className="text-xs font-black text-white/30 uppercase tracking-[0.4em]">Suggested Keywords</h5>
              <div className="flex flex-wrap gap-3">
                {['HYBE', 'SM', 'TRAINEE', 'MARKET', 'MINJI', 'TRENDING'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterBarProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onSelectCategory }) => {
  const { t } = useLanguage();

  const tabs: { id: FilterCategory; label: string }[] = [
    { id: 'Trending', label: t.filters.trending },
    { id: 'New Arrivals', label: t.filters.new },
    { id: 'Debut Soon', label: t.filters.debut },
  ];

  return (
    <div className="w-full bg-black/90 border-b border-white/10 sticky top-[72px] z-40 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Left Tabs - Editorial Style */}
          <div className="flex items-center space-x-10 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`
                    relative group flex items-center gap-2 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300
                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                  `}
                >
                  {isActive && <span className="w-1.5 h-1.5 bg-white rounded-none"></span>}
                  <span>{tab.label}</span>
                  {/* Subtle hover line */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-500"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Dropdown - Agency Selector */}
          <div className="relative group self-end sm:self-auto">
            <button className="flex items-center space-x-3 px-1 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors">
              <span>{t.filters.selectAgency}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            {/* Dropdown Content */}
            <div className="absolute right-0 mt-4 w-56 bg-black border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
               <div className="py-2">
                 {['HYBE', 'SM', 'JYP', 'YG', 'ADOR'].map(agency => (
                   <button 
                    key={agency} 
                    className="w-full text-left px-6 py-3 text-[10px] font-bold text-gray-500 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-colors"
                   >
                     {agency} Entertainment
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
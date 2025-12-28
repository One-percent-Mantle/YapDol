import React from 'react';
import { Flame, Sparkles, Diamond, ChevronDown } from 'lucide-react';
import { FilterCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterBarProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onSelectCategory }) => {
  const { t } = useLanguage();

  const tabs: { id: FilterCategory; icon: React.ReactNode; label: string }[] = [
    { id: 'Trending', icon: <Flame className="w-4 h-4" />, label: t.filters.trending },
    { id: 'New Arrivals', icon: <Sparkles className="w-4 h-4" />, label: t.filters.new },
    { id: 'Debut Soon', icon: <Diamond className="w-4 h-4" />, label: t.filters.debut },
  ];

  return (
    <div className="w-full bg-navy-900 border-b border-white/5 sticky top-20 z-40 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          
          {/* Left Tabs */}
          <div className="flex space-x-2 md:space-x-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`
                    relative flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-900/80 to-blue-900/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-500/50' 
                      : 'bg-navy-800/50 text-gray-400 hover:bg-navy-800 hover:text-gray-200 border border-transparent'
                    }
                  `}
                >
                  <span className={`${isActive ? 'text-purple-400' : ''}`}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 bg-navy-800 rounded-lg text-sm text-gray-300 border border-white/10 hover:border-purple-500/50 transition-colors">
              <span>{t.filters.selectAgency}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown Content (Mock) */}
            <div className="absolute right-0 mt-2 w-48 bg-navy-800 rounded-lg shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
               <div className="py-1">
                 {['HYBE', 'SM', 'JYP', 'YG', 'ADOR'].map(agency => (
                   <a key={agency} href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-purple-400">
                     {agency}
                   </a>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
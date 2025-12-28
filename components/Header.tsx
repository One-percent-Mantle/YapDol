import React, { useState, useEffect } from 'react';
import { Search, Menu, Globe, X } from 'lucide-react';
import { ViewType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex justify-between items-center">
          
          {/* Brand Logo */}
          <div 
            className="cursor-pointer z-50"
            onClick={() => onNavigate('home')}
          >
            <span className="text-3xl font-black text-white tracking-tighter italic">1%</span>
          </div>

          {/* Center Nav - Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
             <button 
                onClick={() => onNavigate('home')} 
                className={`text-xs font-bold uppercase tracking-[0.2em] hover:text-mantle-green transition-colors ${currentView === 'home' ? 'text-white' : 'text-gray-500'}`}
             >
                Home
             </button>
             <button 
                onClick={() => onNavigate('funding')} 
                className={`text-xs font-bold uppercase tracking-[0.2em] hover:text-mantle-green transition-colors ${currentView === 'funding' ? 'text-white' : 'text-gray-500'}`}
             >
                Roster
             </button>
             <button 
                onClick={() => onNavigate('market')} 
                className={`text-xs font-bold uppercase tracking-[0.2em] hover:text-mantle-green transition-colors ${currentView === 'market' ? 'text-white' : 'text-gray-500'}`}
             >
                Market
             </button>
          </nav>

          {/* Right Tools */}
          <div className="flex items-center space-x-6">
             <button className="hidden md:block text-white hover:text-mantle-green transition-colors">
                <Search className="w-5 h-5" />
             </button>
             
             <button 
                onClick={toggleLanguage}
                className="text-xs font-bold text-white uppercase border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all"
             >
                {language === 'en' ? 'EN' : 'KO'}
             </button>
             
             <button 
               className="md:hidden text-white"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
           <button 
             className="absolute top-6 right-6 text-white"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             <X className="w-8 h-8" />
           </button>
           <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-2xl font-black uppercase text-white">Home</button>
           <button onClick={() => { onNavigate('funding'); setIsMobileMenuOpen(false); }} className="text-2xl font-black uppercase text-white">Roster</button>
           <button onClick={() => { onNavigate('market'); setIsMobileMenuOpen(false); }} className="text-2xl font-black uppercase text-white">Market</button>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User as UserIcon, LogOut, Zap, LayoutGrid, Globe } from 'lucide-react';
import { ViewType, User, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user: User | null;
  onSearchClick: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, user, onSearchClick, onLoginClick, onLogout }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'funding', label: t.nav.funding },
    { id: 'market', label: t.nav.market },
    { id: 'mypage', label: t.nav.mypage },
    { id: 'agency', label: t.nav.agency },
  ];

  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'EN' },
    { id: 'cn', label: 'CN' },
    { id: 'ko', label: 'KO' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? 'bg-black/95 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex justify-between items-center">
          
          {/* Yapdol Logo */}
          <div 
            className="cursor-pointer z-50 flex items-center gap-2 group shrink-0"
            onClick={() => onNavigate('home')}
          >
            <span className="text-3xl font-black text-white tracking-tighter italic flex items-center">
              YAP<span className="text-mantle-green group-hover:text-mantle-pink transition-colors">DOL</span>
            </span>
            <div className="w-1.5 h-1.5 bg-mantle-green rounded-full animate-pulse"></div>
          </div>

          {/* Nav - Clean Editorial Style */}
          <nav className="hidden lg:flex items-center space-x-12">
             {navLinks.map((link) => (
               <button 
                  key={link.id}
                  onClick={() => onNavigate(link.id as ViewType)} 
                  className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:text-mantle-green ${currentView === link.id ? 'text-white border-b-2 border-white pb-1' : 'text-gray-500'}`}
               >
                  {link.label}
               </button>
             ))}
          </nav>

          {/* Right Tools */}
          <div className="flex items-center space-x-6">
             {/* Language Switcher */}
             <div className="hidden sm:flex items-center border border-white/10 bg-white/5 px-1 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`px-3 py-1 text-[9px] font-black tracking-widest transition-all ${
                      language === lang.id 
                        ? 'bg-white text-black' 
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
             </div>

             <button 
               onClick={onSearchClick}
               className="text-white hover:text-mantle-green transition-colors p-2"
             >
                <Search className="w-5 h-5" />
             </button>
             
             {user ? (
               <div className="relative">
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 px-3 py-1.5 hover:bg-white/10 transition-all hover:border-mantle-green/50"
                  >
                    <div className="w-7 h-7 bg-zinc-800 grayscale overflow-hidden border border-white/10">
                      <img src={user.profileImage} alt={user.name} />
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-none text-left">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest mb-1">
                          {user.name}
                       </span>
                       <span className="text-[8px] font-bold text-mantle-green uppercase tracking-widest flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" /> {user.hypeScore.toLocaleString()} HYPE
                       </span>
                    </div>
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-white/10 py-4 shadow-2xl animate-[fadeIn_0.3s_ease-out] z-50">
                       <button onClick={() => { onNavigate('mypage'); setIsProfileMenuOpen(false); }} className="w-full px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white hover:bg-white/5 flex items-center gap-4">
                          <LayoutGrid className="w-4 h-4" /> My Dashboard
                       </button>
                       <button onClick={() => { onLogout(); setIsProfileMenuOpen(false); }} className="w-full px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.3em] text-red-500 hover:bg-white/5 flex items-center gap-4 border-t border-white/5 mt-2">
                          <LogOut className="w-4 h-4" /> Logout
                       </button>
                    </div>
                  )}
               </div>
             ) : (
               <button 
                onClick={onLoginClick}
                className="text-[11px] font-black text-black bg-white uppercase px-10 py-3.5 hover:bg-mantle-green transition-all tracking-[0.4em] shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
               >
                  Connect
               </button>
             )}
             
             <button 
               className="lg:hidden text-white"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu className="w-7 h-7" />
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center space-y-12 animate-fadeIn">
           <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
             <X className="w-12 h-12" />
           </button>
           
           <div className="flex items-center gap-6 border-b border-white/10 pb-12 w-full justify-center">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`text-2xl font-black italic tracking-tighter ${
                    language === lang.id ? 'text-mantle-green' : 'text-gray-600'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
           </div>

           {navLinks.map((link) => (
             <button 
               key={link.id}
               onClick={() => { onNavigate(link.id as ViewType); setIsMobileMenuOpen(false); }} 
               className="text-5xl font-black uppercase italic tracking-tighter text-white hover:text-mantle-green transition-colors"
             >
               {link.label}
             </button>
           ))}
        </div>
      )}
    </>
  );
};

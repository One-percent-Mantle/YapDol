
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveTicker } from './components/LiveTicker';
import { ArtistDetail } from './components/ArtistDetail';
import { TrustBanner } from './components/TrustBanner';
import { FundingPage } from './components/FundingPage';
import { MarketPage } from './components/MarketPage';
import { MyPage } from './components/MyPage';
import { AgencyPortal } from './components/AgencyPortal';
import { SearchOverlay } from './components/SearchOverlay';
import { LoginModal } from './components/LoginModal';
import { Artist, ViewType, User } from './types';
import { useLanguage } from './contexts/LanguageContext';
import { useWallet } from './hooks/useWallet';

const App: React.FC = () => {
  const { t } = useLanguage();
  const { address, shortenedAddress, balance, disconnect } = useWallet();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleNavigate = (view: ViewType) => {
    if (view === 'mypage' && !user) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentView(view);
    setSelectedArtist(null);
    window.scrollTo(0, 0);
  };

  const handleArtistSelect = (artist: Artist) => {
    setSelectedArtist(artist);
    window.scrollTo(0, 0);
  };

  const handleLogin = (provider: 'google' | 'x' | 'wallet') => {
    const walletUser: User = {
      id: address || 'yap_01',
      name: shortenedAddress || 'Alpha_Yapper',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      provider,
      balance: balance || 0,
      hypeScore: 0,
      walletAddress: address || undefined
    };
    setUser(walletUser);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    disconnect();
    setUser(null);
    if (currentView === 'mypage') setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-mantle-green selection:text-black">
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        user={user}
        onSearchClick={() => setIsSearchOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {/* Editorial Decorative Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[-15%] w-[1000px] h-[1000px] bg-mantle-green/5 rounded-full blur-[250px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-15%] w-[1000px] h-[1000px] bg-mantle-pink/5 rounded-full blur-[250px] animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        {selectedArtist ? (
          <ArtistDetail 
            artist={selectedArtist} 
            onBack={() => {
              setSelectedArtist(null);
              window.scrollTo(0, 0);
            }} 
            user={user}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            {currentView === 'home' && (
              <>
                <Hero />
                <section className="relative w-full bg-black z-10">
                   <div className="w-full bg-black border-y border-white/5 py-32 px-6 sm:px-12">
                      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end">
                         <div className="space-y-4">
                            <span className="text-mantle-green font-black tracking-[0.6em] text-[10px] uppercase block">
                               The Hype Protocol
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[1.1]">
                               Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-700 italic">Global Roster.</span>
                            </h2>
                         </div>
                         <p className="text-gray-600 text-[11px] font-black max-w-sm text-right mt-12 md:mt-0 leading-relaxed uppercase tracking-[0.4em]">
                            Beyond passive viewing.<br/>
                            We empower fandoms to ignite<br/>
                            the future of talent.
                         </p>
                      </div>
                   </div>

                   <div className="flex flex-col lg:flex-row h-[140vh] lg:h-[80vh] min-h-[750px] bg-black">
                      <div 
                         onClick={() => handleNavigate('funding')} 
                         className="relative w-full lg:w-1/2 h-full group cursor-pointer overflow-hidden border-b lg:border-b-0 border-white/5"
                      >
                         <div className="absolute inset-0">
                            <img 
                               src="https://images.unsplash.com/photo-1547153760-18fc86324498?q=100&w=2400&auto=format&fit=crop" 
                               className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-[1.5s] ease-out transform group-hover:scale-105" 
                               alt="Yapping Lab" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black z-10" />
                            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,1)]" />
                         </div>
                         <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-between z-20">
                            <div className="w-16 h-16 border border-mantle-green/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-2xl group-hover:bg-mantle-green group-hover:text-black transition-all duration-700">
                               <span className="text-sm font-black italic">01</span>
                            </div>
                            <div className="space-y-8">
                               <h3 className="text-6xl md:text-8xl font-black text-white uppercase leading-none tracking-tighter italic">Trainee<br/><span className="text-mantle-green">Archive.</span></h3>
                               <p className="text-lg text-gray-400 font-light max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">Empower future stars through social yapping. Your activity creates their global debut.</p>
                               <div className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-white group-hover:text-mantle-green transition-colors underline decoration-mantle-green underline-offset-[10px]">Open Archive</div>
                            </div>
                         </div>
                      </div>

                      <div 
                         onClick={() => handleNavigate('market')} 
                         className="relative w-full lg:w-1/2 h-full group cursor-pointer overflow-hidden"
                      >
                         <div className="absolute inset-0">
                            <img 
                               src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=100&w=2400&auto=format&fit=crop" 
                               className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-[1.5s] ease-out transform group-hover:scale-105" 
                               alt="Hype Ranking" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/50 to-black z-10" />
                            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,1)]" />
                         </div>
                         <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-between z-20">
                            <div className="w-16 h-16 border border-mantle-pink/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-2xl group-hover:bg-mantle-pink group-hover:text-white transition-all duration-700">
                               <span className="text-sm font-black italic">02</span>
                            </div>
                            <div className="space-y-8">
                               <h3 className="text-6xl md:text-8xl font-black text-white uppercase leading-none tracking-tighter italic">Hype<br/><span className="text-mantle-pink">Ranking.</span></h3>
                               <p className="text-lg text-gray-400 font-light max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">Track performance metrics of global icons. Real-time distribution for dedicated fandoms.</p>
                               <div className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-white group-hover:text-mantle-pink transition-colors underline decoration-mantle-pink underline-offset-[10px]">View Analytics</div>
                            </div>
                         </div>
                      </div>
                   </div>
                </section>
              </>
            )}

            {currentView === 'funding' && <FundingPage onArtistSelect={handleArtistSelect} />}
            {currentView === 'market' && <MarketPage onArtistSelect={handleArtistSelect} onNavigate={handleNavigate} user={user} />}
            {currentView === 'mypage' && user && <MyPage user={user} onArtistSelect={handleArtistSelect} />}
            {currentView === 'agency' && <AgencyPortal />}
          </>
        )}
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onArtistSelect={handleArtistSelect} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <LiveTicker />
      
      {!selectedArtist && (
        <footer className="relative z-10 bg-black border-t border-white/5 py-40 mb-16">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex flex-col lg:flex-row justify-between items-start gap-24">
            <div className="max-w-md space-y-10">
               <h4 className="text-8xl font-black text-white/5 tracking-tighter leading-none italic uppercase">Yapdol.</h4>
               <p className="text-gray-700 text-[11px] font-black leading-relaxed uppercase tracking-[0.5em]">
                  Premium Social Mining Protocol.<br/>
                  Powered by Fandom. Secured by Mantle.
               </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-24">
               <div className="flex flex-col space-y-6">
                  <span className="text-white font-black uppercase tracking-[0.5em] mb-4 text-[11px]">Archive</span>
                  <button onClick={() => handleNavigate('funding')} className="text-gray-600 hover:text-white text-left transition-colors uppercase tracking-[0.3em] text-[10px]">Campaigns</button>
                  <button onClick={() => handleNavigate('market')} className="text-gray-600 hover:text-white text-left transition-colors uppercase tracking-[0.3em] text-[10px]">Ranking</button>
                  <button onClick={() => handleNavigate('agency')} className="text-gray-600 hover:text-white text-left transition-colors uppercase tracking-[0.3em] text-[10px]">Label Hub</button>
               </div>
               <div className="flex flex-col space-y-6">
                  <span className="text-white font-black uppercase tracking-[0.5em] mb-4 text-[11px]">Insights</span>
                  <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Whitepaper</a>
                  <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Governance</a>
                  <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Security</a>
               </div>
               <div className="flex flex-col space-y-6">
                  <span className="text-white font-black uppercase tracking-[0.5em] mb-4 text-[11px]">Support</span>
                  <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Terms</a>
                  <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Privacy</a>
                  <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Press</a>
               </div>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 mt-32 border-t border-white/5 pt-12 flex justify-between items-center text-[10px] font-bold text-gray-800 uppercase tracking-widest">
            <span>© 2025 YAPDOL ENTERTAINMENT. BEYOND IMAGINATION.</span>
            <span className="text-mantle-green">MANTLE ECOSYSTEM PARTNER</span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;

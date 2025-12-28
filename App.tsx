import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveTicker } from './components/LiveTicker';
import { ArtistDetail } from './components/ArtistDetail';
import { TrustBanner } from './components/TrustBanner';
import { FundingPage } from './components/FundingPage';
import { MarketPage } from './components/MarketPage';
import { Artist, ViewType } from './types';
import { FlaskConical, Sparkles, ChevronRight, Lock, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Handler for navigation
  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setSelectedArtist(null);
    window.scrollTo(0, 0);
  };

  // Handler for artist selection
  const handleArtistSelect = (artist: Artist) => {
    setSelectedArtist(artist);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-mantle-black text-white pb-16 selection:bg-mantle-green selection:text-black font-sans">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      {/* Global Background Abstract Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-mantle-teal/5 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10">
        {selectedArtist ? (
          <ArtistDetail 
            artist={selectedArtist} 
            onBack={() => {
              setSelectedArtist(null);
              window.scrollTo(0, 0);
            }} 
          />
        ) : (
          <>
            {/* Show Hero only on Home */}
            {currentView === 'home' && (
              <>
                <Hero />
                <LiveTicker />
                
                {/* Home Gateway Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                   <div className="text-center mb-16 space-y-4">
                      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-mantle-green to-purple-400">Invest Strategy</span>
                      </h2>
                      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Support raw talent in the Lab or trade established stars on the Main Stage. 
                        The Mantle Network secures every transaction.
                      </p>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      {/* Funding Gateway Card */}
                      <div 
                        onClick={() => handleNavigate('funding')}
                        className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-mantle-green/50 transition-all duration-500"
                      >
                         <div className="absolute inset-0 bg-navy-900">
                            {/* Abstract Pattern */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-mantle-green via-transparent to-transparent"></div>
                         </div>
                         <div className="absolute inset-0 flex flex-col justify-between p-10">
                            <div className="bg-black/40 backdrop-blur w-fit p-4 rounded-2xl border border-white/10 group-hover:bg-mantle-green group-hover:text-black transition-colors duration-300">
                               <FlaskConical className="w-10 h-10" />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 text-mantle-green font-bold mb-2 uppercase tracking-widest text-sm">
                                  <Lock className="w-4 h-4" /> Phase 1
                               </div>
                               <h3 className="text-4xl font-black text-white mb-2 italic">The Training Lab</h3>
                               <p className="text-gray-400 mb-6 group-hover:text-gray-200">
                                  Discover pre-debut trainees. Fixed price funding with 70% principal protection.
                               </p>
                               <div className="flex items-center text-white font-bold group-hover:translate-x-2 transition-transform">
                                  Enter Lab <ChevronRight className="w-5 h-5 ml-2" />
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Market Gateway Card */}
                      <div 
                        onClick={() => handleNavigate('market')}
                        className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-purple-500/50 transition-all duration-500"
                      >
                         <div className="absolute inset-0 bg-navy-900">
                            {/* Abstract Pattern */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600 via-transparent to-transparent"></div>
                         </div>
                         <div className="absolute inset-0 flex flex-col justify-between p-10">
                            <div className="bg-black/40 backdrop-blur w-fit p-4 rounded-2xl border border-white/10 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                               <Sparkles className="w-10 h-10" />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 text-purple-400 font-bold mb-2 uppercase tracking-widest text-sm">
                                  <TrendingUp className="w-4 h-4" /> Phase 2
                               </div>
                               <h3 className="text-4xl font-black text-white mb-2 italic">The Main Stage</h3>
                               <p className="text-gray-400 mb-6 group-hover:text-gray-200">
                                  Trade debuted artists. Real-time orderbook market with 1% revenue burn.
                               </p>
                               <div className="flex items-center text-white font-bold group-hover:translate-x-2 transition-transform">
                                  Enter Market <ChevronRight className="w-5 h-5 ml-2" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </>
            )}

            {/* Sub Pages */}
            {currentView === 'funding' && <FundingPage onArtistSelect={handleArtistSelect} />}
            {currentView === 'market' && <MarketPage onArtistSelect={handleArtistSelect} />}
          </>
        )}
      </div>

      <TrustBanner />
      
      {/* Footer */}
      {!selectedArtist && (
        <footer className="relative z-10 bg-black/80 border-t border-white/5 py-16 mt-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="mb-6 md:mb-0 flex items-center">
               <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 italic mr-4">1%</span>
               <div className="flex flex-col">
                 <span className="text-gray-400">© 2024 One Percent Inc.</span>
                 <span className="text-xs text-mantle-green/60">Secured by Mantle Network</span>
               </div>
            </div>
            <div className="flex space-x-8">
              <button onClick={() => handleNavigate('home')} className="hover:text-mantle-green transition-colors">Home</button>
              <a href="#" className="hover:text-mantle-green transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-mantle-green transition-colors">Privacy Policy</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveTicker } from './components/LiveTicker';
import { ArtistDetail } from './components/ArtistDetail';
import { TrustBanner } from './components/TrustBanner';
import { FundingPage } from './components/FundingPage';
import { MarketPage } from './components/MarketPage';
import { Artist, ViewType } from './types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
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
    <div className="min-h-screen bg-mantle-black text-white font-sans selection:bg-white selection:text-black">
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
                
                {/* AGENCY DIVISIONS - SPLIT SCREEN LAYOUT */}
                <section className="relative w-full bg-black z-10">
                   {/* Title Section */}
                   <div className="w-full bg-black border-y border-white/10 py-16 px-6 sm:px-12">
                      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end">
                         <div>
                            <span className="text-gray-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block animate-pulse">
                               Agency Structure
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                               Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Divisions</span>
                            </h2>
                         </div>
                         <p className="text-gray-400 text-sm font-light max-w-md text-right mt-6 md:mt-0 leading-relaxed border-l border-white/20 pl-6">
                            We operate two specialized labels to manage the complete lifecycle of our artists, from incubation to global stardom.
                         </p>
                      </div>
                   </div>

                   {/* SPLIT VIEW */}
                   <div className="flex flex-col lg:flex-row h-[100vh] min-h-[800px]">
                      
                      {/* DIVISION 01: INCUBATION (TRAINEE) */}
                      <div 
                         onClick={() => handleNavigate('funding')}
                         className="relative w-full lg:w-1/2 h-full group cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10"
                      >
                         {/* Background Image */}
                         <div className="absolute inset-0 bg-neutral-900">
                            <img 
                               src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop" 
                               className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                               alt="Incubation"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 group-hover:via-black/20 transition-all duration-700"></div>
                         </div>

                         {/* Content Overlay */}
                         <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:bg-mantle-green group-hover:text-black group-hover:border-mantle-green transition-all duration-500">
                                     <span className="text-sm font-black">01</span>
                                  </div>
                                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 group-hover:text-white transition-colors">Incubation</span>
                               </div>
                               <ArrowUpRight className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                            </div>

                            <div className="space-y-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                               <h3 className="text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase leading-[0.85] tracking-tighter mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity">
                                  Future<br/><span className="text-mantle-green italic">Sounds.</span>
                               </h3>
                               
                               <div className="space-y-6">
                                  <div className="w-16 h-1 bg-mantle-green origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
                                  <p className="text-xl text-gray-300 font-light max-w-sm leading-relaxed">
                                     Discover raw potential. Access monthly evaluation data and support the debut journey.
                                  </p>
                                  <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group-hover:text-mantle-green transition-colors">
                                     View Trainees <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* DIVISION 02: MAIN LABEL (ARTIST) */}
                      <div 
                         onClick={() => handleNavigate('market')}
                         className="relative w-full lg:w-1/2 h-full group cursor-pointer overflow-hidden"
                      >
                         {/* Background Image */}
                         <div className="absolute inset-0 bg-neutral-900">
                            <img 
                               src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop" 
                               className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                               alt="Main Label"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 group-hover:via-black/20 transition-all duration-700"></div>
                         </div>

                         {/* Content Overlay */}
                         <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-all duration-500">
                                     <span className="text-sm font-black">02</span>
                                  </div>
                                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 group-hover:text-white transition-colors">Main Label</span>
                               </div>
                               <ArrowUpRight className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                            </div>

                            <div className="space-y-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                               <h3 className="text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase leading-[0.85] tracking-tighter mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity">
                                  Global<br/><span className="text-purple-500 italic">Icons.</span>
                               </h3>
                               
                               <div className="space-y-6">
                                  <div className="w-16 h-1 bg-purple-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
                                  <p className="text-xl text-gray-300 font-light max-w-sm leading-relaxed">
                                     Trade the value of established stars. 1% revenue burn mechanism active.
                                  </p>
                                  <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group-hover:text-purple-400 transition-colors">
                                     Enter Market <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                   </div>
                </section>
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
        <footer className="relative z-10 bg-black border-t border-white/10 py-24">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-start">
            <div className="mb-12 md:mb-0">
               <h4 className="text-8xl font-black text-white/10 tracking-tighter leading-none mb-6">1%</h4>
               <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                  The First Decentralized Entertainment Agency.<br/>
                  Powered by Mantle Network.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-12 text-sm">
               <div className="flex flex-col space-y-4">
                  <span className="text-white font-bold uppercase tracking-widest mb-2 text-xs">Platform</span>
                  <button onClick={() => handleNavigate('home')} className="text-gray-500 hover:text-white text-left transition-colors">Home</button>
                  <button onClick={() => handleNavigate('funding')} className="text-gray-500 hover:text-white text-left transition-colors">Incubation</button>
                  <button onClick={() => handleNavigate('market')} className="text-gray-500 hover:text-white text-left transition-colors">Market</button>
               </div>
               <div className="flex flex-col space-y-4">
                  <span className="text-white font-bold uppercase tracking-widest mb-2 text-xs">Legal</span>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors">Report</a>
               </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  ShieldCheck, 
  Vote, 
  Activity,
  BarChart3,
  LayoutDashboard,
  Image as ImageIcon,
  Star,
  Globe,
  Share2,
  Mic2,
  Music,
  UserCheck,
  Zap,
  Lock,
  FileBarChart,
  Target
} from 'lucide-react';
import { Artist } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ArtistDetailProps {
  artist: Artist;
  onBack: () => void;
}

type TabId = 'dashboard' | 'evaluation' | 'financials' | 'collection';

export const ArtistDetail: React.FC<ArtistDetailProps> = ({ artist, onBack }) => {
  const { t, language } = useLanguage();
  const isFunding = artist.status === 'funding';
  
  // Set different initial tabs
  const initialTab: TabId = 'dashboard';
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  
  const fundingPercent = isFunding 
    ? Math.floor(((artist.currentFunding || 0) / (artist.fundingGoal || 1)) * 100) 
    : 100;

  const displayName = language === 'ko' ? artist.name : artist.englishName;

  // Tabs Configuration
  const tabs = isFunding ? [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'evaluation', label: 'Evaluation Log', icon: <FileBarChart className="w-4 h-4" /> },
    { id: 'collection', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
  ] : [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'financials', label: 'Financial Report', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'collection', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] bg-mantle-black min-h-screen relative">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={artist.imageUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover object-top filter contrast-[1.1] brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-8 left-6 sm:left-12 z-50">
           <button 
             onClick={onBack} 
             className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
           >
              <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                 <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase hidden sm:block">Back to Roster</span>
           </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 pb-16 z-20">
           <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="max-w-4xl space-y-4">
                 <div className="flex items-center gap-4 animate-[fadeInUp_0.8s_ease-out]">
                    <span className={`px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase ${isFunding ? 'bg-mantle-green text-black' : 'bg-purple-600 text-white'}`}>
                       {isFunding ? 'Incubation' : 'Main Label'}
                    </span>
                 </div>

                 <h1 className="text-8xl sm:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase italic mix-blend-overlay">
                    {displayName}<span className={`${isFunding ? 'text-mantle-green' : 'text-purple-500'}`}>.</span>
                 </h1>
                 
                 <div className="border-l border-white/30 pl-6 pt-2">
                    <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl leading-relaxed">
                       {isFunding 
                          ? "Raw talent in the incubation system. Support the debut journey." 
                          : "Global icon dominating the charts. Revenue-backed asset."}
                    </p>
                 </div>
              </div>

              {/* Quick Stats */}
              <div className="hidden md:flex gap-12 text-right">
                 <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Category</div>
                    <div className="text-xl font-bold text-white">{isFunding ? 'Trainee' : 'Artist'}</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Agency</div>
                    <div className="text-xl font-bold text-white">{artist.agency}</div>
                 </div>
                 {isFunding ? (
                    <div>
                       <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">D-Day</div>
                       <div className="text-xl font-bold text-mantle-green">D-{artist.dDay}</div>
                    </div>
                 ) : (
                    <div>
                       <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Burn Rate</div>
                       <div className="text-xl font-bold text-purple-400">High</div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
           <div className="flex justify-between items-center h-20">
              <div className="flex space-x-12 h-full">
                 {tabs.map((tab) => {
                    // @ts-ignore
                    const isActive = activeTab === tab.id;
                    return (
                       <button
                          key={tab.id}
                          // @ts-ignore
                          onClick={() => setActiveTab(tab.id)}
                          className={`
                             relative flex items-center gap-2 h-full text-xs font-bold uppercase tracking-[0.2em] transition-colors
                             ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                          `}
                       >
                          {tab.label}
                          {isActive && (
                             <motion.div 
                                layoutId="activeTabIndicator"
                                className={`absolute bottom-0 left-0 w-full h-0.5 ${isFunding ? 'bg-mantle-green' : 'bg-purple-500'}`}
                             />
                          )}
                       </button>
                    );
                 })}
              </div>
           </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 min-h-[500px]">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                >
                   {/* 1. DASHBOARD OVERVIEW */}
                   {activeTab === 'dashboard' && (
                      <div className="space-y-16">
                         <div className="prose prose-invert max-w-none">
                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6">Executive Summary</h3>
                            <p className="text-xl text-gray-300 font-light leading-relaxed">
                               {isFunding 
                                  ? `${artist.englishName} has consistently ranked in the top 1% of the monthly evaluations. With exceptional vocal range and stage presence, the debut probability is calculated at 94%. Funds raised will be used for global training camps and debut music video production.`
                                  : `${artist.englishName} continues to dominate global charts. Revenue from the recent world tour and brand deals has triggered a massive buyback event. The token floor price has increased by 15% this quarter due to the 1% burn mechanism.`}
                            </p>
                         </div>

                         {/* Unique Metrics Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {isFunding ? (
                               <>
                                  <div className="p-8 bg-neutral-900 border border-white/5 rounded-2xl">
                                     <div className="flex items-center gap-3 mb-8">
                                        <Target className="w-5 h-5 text-mantle-green" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Debut Probability</span>
                                     </div>
                                     <div className="text-6xl font-black text-white mb-2">94<span className="text-2xl text-mantle-green">%</span></div>
                                     <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="w-[94%] h-full bg-mantle-green"></div>
                                     </div>
                                  </div>
                                  <div className="p-8 bg-neutral-900 border border-white/5 rounded-2xl">
                                     <div className="flex items-center gap-3 mb-8">
                                        <UserCheck className="w-5 h-5 text-white" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Backer Count</span>
                                     </div>
                                     <div className="text-6xl font-black text-white mb-2">{artist.backers}</div>
                                     <div className="text-sm text-gray-400">Verified Investors</div>
                                  </div>
                               </>
                            ) : (
                               <>
                                  <div className="p-8 bg-neutral-900 border border-white/5 rounded-2xl">
                                     <div className="flex items-center gap-3 mb-8">
                                        <Zap className="w-5 h-5 text-purple-500" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Revenue Yield (APY)</span>
                                     </div>
                                     <div className="text-6xl font-black text-white mb-2">12.4<span className="text-2xl text-purple-500">%</span></div>
                                     <div className="text-sm text-gray-400">Paid via Token Buyback</div>
                                  </div>
                                  <div className="p-8 bg-neutral-900 border border-white/5 rounded-2xl">
                                     <div className="flex items-center gap-3 mb-8">
                                        <ShieldCheck className="w-5 h-5 text-white" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Floor Price</span>
                                     </div>
                                     <div className="text-6xl font-black text-white mb-2">105<span className="text-xl text-gray-500 ml-2">USDC</span></div>
                                     <div className="text-sm text-gray-400">Guaranteed by Treasury</div>
                                  </div>
                               </>
                            )}
                         </div>
                      </div>
                   )}

                   {/* 2. EVALUATION LOG (TRAINEE ONLY) */}
                   {activeTab === 'evaluation' && isFunding && (
                      <div className="space-y-8">
                         <div className="flex justify-between items-center mb-8">
                           <h3 className="text-2xl font-bold uppercase tracking-tight">Monthly Assessment</h3>
                           <span className="text-sm font-mono text-mantle-green">Latest Update: Dec 2024</span>
                         </div>
                         
                         <div className="bg-neutral-900 border border-white/5 p-8 rounded-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                               {/* Skill Bars */}
                               <div className="space-y-6">
                                  <div>
                                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">Vocal Stability</div>
                                     <div className="h-2 bg-black rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-white rounded-full"></div>
                                     </div>
                                  </div>
                                  <div>
                                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">Dance Technique</div>
                                     <div className="h-2 bg-black rounded-full overflow-hidden">
                                        <div className="h-full w-[88%] bg-white rounded-full"></div>
                                     </div>
                                  </div>
                                  <div>
                                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">Star Quality</div>
                                     <div className="h-2 bg-black rounded-full overflow-hidden">
                                        <div className="h-full w-[98%] bg-mantle-green rounded-full shadow-[0_0_10px_rgba(0,229,153,0.5)]"></div>
                                     </div>
                                  </div>
                               </div>

                               {/* Trainer Comment */}
                               <div className="border-l border-white/10 pl-8 flex flex-col justify-center">
                                  <div className="text-4xl text-white/20 font-serif mb-4">"</div>
                                  <p className="text-lg text-gray-300 italic mb-4 leading-relaxed">
                                     Exceptional growth in stage presence. The trainee has successfully found their unique signature sound this month. Ready for the next phase.
                                  </p>
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                     <div className="text-xs font-bold uppercase tracking-widest">Head Trainer</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   )}

                   {/* 3. FINANCIAL REPORT (ARTIST ONLY) */}
                   {activeTab === 'financials' && !isFunding && (
                      <div className="space-y-8">
                         <div className="flex justify-between items-center mb-8">
                           <h3 className="text-2xl font-bold uppercase tracking-tight">Revenue & Burn Report</h3>
                           <span className="text-sm font-mono text-purple-500">Live Data</span>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Revenue Sources */}
                            <div className="col-span-2 bg-neutral-900 border border-white/5 p-8 rounded-2xl">
                               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Revenue Mix</h4>
                               <div className="space-y-4">
                                  <div className="flex items-center gap-4">
                                     <div className="w-32 text-sm font-bold">Streaming</div>
                                     <div className="flex-1 h-8 bg-gray-800 rounded flex overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[45%]"></div>
                                     </div>
                                     <span className="text-sm font-mono">45%</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <div className="w-32 text-sm font-bold">Concerts</div>
                                     <div className="flex-1 h-8 bg-gray-800 rounded flex overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[35%]"></div>
                                     </div>
                                     <span className="text-sm font-mono">35%</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <div className="w-32 text-sm font-bold">Merch</div>
                                     <div className="flex-1 h-8 bg-gray-800 rounded flex overflow-hidden">
                                        <div className="h-full bg-pink-500 w-[20%]"></div>
                                     </div>
                                     <span className="text-sm font-mono">20%</span>
                                  </div>
                               </div>
                            </div>

                            {/* Burn Stat */}
                            <div className="col-span-1 bg-gradient-to-b from-purple-900/50 to-black border border-purple-500/20 p-8 rounded-2xl flex flex-col justify-between">
                               <div>
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">Total Burnt</h4>
                                  <p className="text-xs text-gray-400 mb-6">Tokens removed from supply</p>
                                  <div className="text-4xl font-black text-white">$452,100</div>
                               </div>
                               <div className="text-[10px] text-gray-500 font-mono mt-8">
                                  TX: 0x8a...3f92
                               </div>
                            </div>
                         </div>
                      </div>
                   )}

                   {/* 4. GALLERY (COMMON) */}
                   {activeTab === 'collection' && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="aspect-[4/5] bg-neutral-900 border border-white/5 rounded-xl overflow-hidden relative group">
                               <img 
                                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?auto=format&fit=crop&w=500&q=60`}
                                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                               />
                               <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold uppercase border border-white/20">
                                  NFT
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR (Sticky) */}
          <div className="lg:col-span-4 pl-0 lg:pl-12 border-l border-white/0 lg:border-white/5">
             <div className="sticky top-32 space-y-8">
                
                {/* ACTION CARD */}
                <div className="bg-neutral-900 border border-white/10 p-8 relative overflow-hidden group">
                   <div className={`absolute top-0 left-0 w-full h-1 ${isFunding ? 'bg-mantle-green' : 'bg-purple-500'}`}></div>
                   
                   <div className="flex justify-between items-end mb-8">
                      <div>
                         <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
                            {isFunding ? 'Funding Goal' : 'Market Price'}
                         </div>
                         <div className="text-4xl font-black text-white italic">
                            {artist.price.toLocaleString()} <span className="text-sm not-italic text-gray-500">USDC</span>
                         </div>
                      </div>
                   </div>

                   {isFunding ? (
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase">
                               <span className="text-gray-400">Progress</span>
                               <span className="text-mantle-green">{fundingPercent}%</span>
                            </div>
                            <div className="h-1 bg-gray-800 w-full">
                               <div className="h-full bg-mantle-green" style={{ width: `${fundingPercent}%` }}></div>
                            </div>
                         </div>
                         <button className="w-full py-4 bg-white hover:bg-mantle-green text-black font-black uppercase tracking-widest text-sm transition-colors">
                            Invest Now
                         </button>
                      </div>
                   ) : (
                      <div className="grid grid-cols-2 gap-4">
                         <button className="py-4 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-sm transition-colors">
                            Buy
                         </button>
                         <button className="py-4 bg-transparent border border-white/20 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-sm transition-colors">
                            Sell
                         </button>
                      </div>
                   )}
                </div>

                {/* INFO CARD */}
                <div className="p-6 border border-white/5">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Management</h4>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-black">
                         {artist.agency.substring(0,2)}
                      </div>
                      <div>
                         <div className="font-bold text-white">{artist.agency} Ent.</div>
                         <div className="text-xs text-gray-500">Official Partner</div>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  ShieldCheck, 
  LayoutDashboard,
  Image as ImageIcon,
  UserCheck,
  Zap,
  FileBarChart,
  Target,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';
import { Artist } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ArtistDetailProps {
  artist: Artist;
  onBack: () => void;
}

type TabId = 'dashboard' | 'evaluation' | 'financials' | 'collection';

export const ArtistDetail: React.FC<ArtistDetailProps> = ({ artist, onBack }) => {
  const { language } = useLanguage();
  const isFunding = artist.status === 'funding';
  
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [hasToken, setHasToken] = useState(false); // Simulated state for token ownership
  
  const fundingPercent = isFunding 
    ? Math.floor(((artist.currentFunding || 0) / (artist.fundingGoal || 1)) * 100) 
    : 100;

  const displayName = language === 'ko' ? artist.name : artist.englishName;

  const tabs = isFunding ? [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'evaluation', label: 'Evaluation Log', icon: <FileBarChart className="w-4 h-4" /> },
    { id: 'collection', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
  ] : [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'financials', label: 'Financial Report', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'collection', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
  ];

  // Exclusive Gallery Data for Artist
  const galleryImages = [
    { id: 1, title: 'Concept Archive #01', type: 'Editorial', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Rehearsal Moment', type: 'Behind', url: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Visual Identity', type: 'Editorial', url: 'https://images.unsplash.com/photo-1529139513402-720a22bf9d78?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Backstage Archive', type: 'Behind', url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Studio Session', type: 'Making', url: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Official Profile V2', type: 'Editorial', url: 'https://images.unsplash.com/photo-1502035618526-6b2f1f5bca1b?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] bg-black min-h-screen relative">
      
      {/* ================= HERO SECTION (OPTIMIZED FRAMING) ================= */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img 
            src={artist.imageUrl} 
            alt={artist.name} 
            // object-[50%_20%] ensures the focus remains on the top portion (head/face)
            className="w-full h-full object-cover object-[50%_20%] filter contrast-[1.1] brightness-[0.75] transition-transform duration-[4s] scale-100 animate-[slowZoom_15s_ease-in-out_infinite]"
          />
          {/* Advanced Gradients for Text Legibility & Aesthetic Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/10 backdrop-contrast-125" />
        </div>

        {/* Back Navigation Overlay */}
        <div className="absolute top-10 left-6 sm:left-12 z-50">
           <button onClick={onBack} className="flex items-center gap-4 text-white/50 hover:text-white transition-all group">
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/40 group-hover:scale-110 transition-all bg-black/20 backdrop-blur-md">
                 <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hidden sm:block">Back to Roster</span>
           </button>
        </div>

        {/* Brand/Status Badge */}
        <div className="absolute top-10 right-12 z-50 hidden lg:block">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-2">Licensed Artist Profile</span>
              <div className="h-0.5 w-12 bg-white/20"></div>
           </div>
        </div>

        {/* Hero Content Overlay (Bottom Anchored) */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 pb-24 z-20">
           <div className="max-w-[1600px] mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="max-w-4xl space-y-6"
              >
                 <div className="inline-block">
                    <span className={`px-4 py-1.5 text-[9px] font-black tracking-[0.3em] uppercase ${isFunding ? 'bg-mantle-green text-black' : 'bg-purple-600 text-white'}`}>
                       {isFunding ? 'Incubation Division' : 'Main Label Artist'}
                    </span>
                 </div>

                 <h1 className="text-8xl sm:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic drop-shadow-2xl">
                    {displayName}<span className={`${isFunding ? 'text-mantle-green' : 'text-purple-500'}`}>.</span>
                 </h1>
                 
                 <div className="border-l-2 border-white/20 pl-8 py-2 max-w-2xl">
                    <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed tracking-tight italic">
                       {isFunding 
                          ? "Witness the incubation of a future icon. Every training log, every rehearsal, secured on-chain." 
                          : "Defining global excellence. Asset value backed by verified 1% revenue streams."}
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ================= STICKY TABS ================= */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
           <div className="flex justify-between items-center h-20">
              <div className="flex space-x-16 h-full">
                 {tabs.map((tab) => (
                    <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as TabId)}
                       className={`relative flex items-center gap-2 h-full text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-300'}`}
                    >
                       {tab.label}
                       {activeTab === tab.id && <motion.div layoutId="activeTabIndicator" className={`absolute bottom-0 left-0 w-full h-0.5 ${isFunding ? 'bg-mantle-green' : 'bg-purple-500'}`} />}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* ================= CONTENT AREA ================= */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-8">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, ease: "circOut" }}
                >
                   {activeTab === 'dashboard' && (
                      <div className="space-y-24">
                         <div className="space-y-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Artist Profile</h3>
                            <p className="text-3xl md:text-5xl text-white font-light leading-[1.2] tracking-tight">
                               {isFunding 
                                  ? `${artist.englishName} has redefined the training standards at ${artist.agency}. Ranking candidate #1 for the upcoming global debut.`
                                  : `${artist.englishName} is a global phenomenon. Every performance reinforces intrinsic value via our proprietary 1% revenue burn engine.`}
                            </p>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {isFunding ? (
                               <>
                                  <div className="p-10 bg-white/5 border border-white/5 group hover:border-mantle-green/30 transition-all duration-700">
                                     <div className="flex items-center gap-4 mb-10"><Target className="w-5 h-5 text-mantle-green" /><span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Debut Probability</span></div>
                                     <div className="text-7xl font-black text-white mb-6">94<span className="text-3xl text-mantle-green font-light">%</span></div>
                                     <div className="w-full h-0.5 bg-white/10 overflow-hidden"><div className="w-[94%] h-full bg-mantle-green shadow-[0_0_15px_rgba(0,229,153,0.5)]"></div></div>
                                  </div>
                                  <div className="p-10 bg-white/5 border border-white/5 group hover:border-white/20 transition-all duration-700">
                                     <div className="flex items-center gap-4 mb-10"><UserCheck className="w-5 h-5 text-white" /><span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Backer Community</span></div>
                                     <div className="text-7xl font-black text-white mb-4">{artist.backers}</div>
                                     <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Verified Global Investors</div>
                                  </div>
                               </>
                            ) : (
                               <>
                                  <div className="p-10 bg-white/5 border border-white/5 group hover:border-purple-500/30 transition-all duration-700">
                                     <div className="flex items-center gap-4 mb-10"><Zap className="w-5 h-5 text-purple-500" /><span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Market Yield (Est)</span></div>
                                     <div className="text-7xl font-black text-white mb-4">12.4<span className="text-3xl text-purple-500 font-light">%</span></div>
                                     <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Driven by Buyback & Burn</div>
                                  </div>
                                  <div className="p-10 bg-white/5 border border-white/5 group hover:border-white/20 transition-all duration-700">
                                     <div className="flex items-center gap-4 mb-10"><ShieldCheck className="w-5 h-5 text-white" /><span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Market Floor</span></div>
                                     <div className="text-7xl font-black text-white mb-4">110<span className="text-2xl text-gray-500 ml-4 font-light">USDC</span></div>
                                     <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Guaranteed Asset Value</div>
                                  </div>
                               </>
                            )}
                         </div>
                      </div>
                   )}

                   {activeTab === 'collection' && (
                      <div className="space-y-12">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-12">
                            <div>
                               <h3 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">Vision Archive.</h3>
                               <p className="text-gray-500 text-[11px] font-bold tracking-widest uppercase flex items-center gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-mantle-green" /> 
                                  Exclusive high-definition content for authorized holders
                               </p>
                            </div>
                            <button 
                               onClick={() => setHasToken(!hasToken)}
                               className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${hasToken ? 'bg-mantle-green text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                               {hasToken ? <><Unlock className="w-3.5 h-3.5" /> Token Detected</> : <><Lock className="w-3.5 h-3.5" /> Verify Tokens</>}
                            </button>
                         </div>

                         <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {galleryImages.map((img) => (
                               <div key={img.id} className="relative aspect-[3/4] bg-neutral-900 overflow-hidden group">
                                  <img 
                                     src={img.url}
                                     className={`w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 
                                        ${!hasToken ? 'filter blur-2xl grayscale brightness-50' : 'filter grayscale group-hover:grayscale-0'}`}
                                     alt={img.title}
                                  />
                                  {!hasToken && (
                                     <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-sm group-hover:bg-black/20 transition-all duration-500">
                                        <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center mb-6 bg-black/60 backdrop-blur-xl group-hover:scale-110 transition-transform">
                                           <Lock className="w-6 h-6 text-white/50" />
                                        </div>
                                        <div className="text-center space-y-2">
                                           <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-tight">Exclusive</div>
                                           <div className="text-[9px] font-bold text-mantle-green uppercase tracking-widest bg-mantle-green/10 px-2 py-0.5">1% Holder Only</div>
                                        </div>
                                     </div>
                                  )}
                                  <div className={`absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ${!hasToken ? 'pointer-events-none' : ''}`}>
                                     <span className="text-[9px] font-black text-mantle-green uppercase tracking-widest mb-1">{img.type}</span>
                                     <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{img.title}</h4>
                                  </div>
                               </div>
                            ))}
                         </div>
                         {!hasToken && (
                            <div className="p-12 border border-white/5 bg-gradient-to-br from-white/5 to-transparent text-center space-y-8 mt-12">
                               <div className="max-w-md mx-auto space-y-4">
                                  <h4 className="text-2xl font-black uppercase tracking-tighter">Unlock the Full Archive.</h4>
                                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                                     To access high-resolution concept photos, behind-the-scenes films, and monthly practice logs, you must hold at least 1 unit of {displayName}'s official token.
                                  </p>
                               </div>
                               <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-mantle-green transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                  {isFunding ? 'Join Funding to Unlock' : 'Buy Assets in Market'}
                               </button>
                            </div>
                         )}
                      </div>
                   )}
                   
                   {activeTab === 'evaluation' && (
                      <div className="bg-white/5 p-12 border border-white/5">
                        <div className="flex justify-between items-start mb-16">
                           <h3 className="text-4xl font-black uppercase tracking-tighter italic">Assessment Archive.</h3>
                           <span className="text-[10px] font-black text-mantle-green uppercase tracking-widest">Latest Score: S+</span>
                        </div>
                        <div className="space-y-12">
                           {['Vocal Precision', 'Dance Mechanics', 'Stage Presence'].map((skill, i) => (
                             <div key={skill} className="space-y-4">
                               <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                                 <span>{skill}</span><span>{[92, 88, 98][i]}%</span>
                               </div>
                               <div className="h-px w-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${[92, 88, 98][i]}%` }} transition={{ duration: 1.5, ease: "circOut", delay: i * 0.2 }} className="h-full bg-white"/></div>
                             </div>
                           ))}
                        </div>
                      </div>
                   )}
                   
                   {activeTab === 'financials' && (
                      <div className="p-12 bg-white/5 border border-white/5">
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-12 italic">Revenue Cycle.</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                               <div className="flex justify-between items-end border-b border-white/10 pb-4"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Traded</span><span className="text-xl font-black">$4.2M</span></div>
                               <div className="flex justify-between items-end border-b border-white/10 pb-4"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Burned Supply</span><span className="text-xl font-black text-purple-500">14,200 1%</span></div>
                            </div>
                            <div className="flex flex-col justify-center text-right p-8 bg-purple-600/10 border border-purple-500/20">
                               <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">Buyback Status</div><div className="text-5xl font-black">ACTIVE</div>
                            </div>
                         </div>
                      </div>
                   )}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* SIDEBAR (Sticky Transaction Block) */}
          <div className="lg:col-span-4">
             <div className="sticky top-32 space-y-12">
                <div className="bg-white p-12 text-black relative shadow-2xl">
                   <div className="space-y-12">
                      <div className="space-y-2">
                         <div className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Current Valuation</div>
                         <div className="text-6xl font-black tracking-tighter italic">{artist.price.toLocaleString()}<span className="text-sm not-italic ml-2 font-black">USDC</span></div>
                      </div>
                      {isFunding ? (
                         <div className="space-y-8">
                            <div className="space-y-3">
                               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span>Archive Progress</span><span>{fundingPercent}%</span></div>
                               <div className="h-1 w-full bg-gray-100"><div className="h-full bg-black" style={{ width: `${fundingPercent}%` }}></div></div>
                            </div>
                            <button className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-mantle-green hover:text-black transition-all">Join Roster</button>
                         </div>
                      ) : (
                         <div className="grid grid-cols-2 gap-4">
                            <button className="py-5 bg-black text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-purple-600 transition-colors">Buy Asset</button>
                            <button className="py-5 bg-transparent border border-black text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition-all">Sell</button>
                         </div>
                      )}
                   </div>
                </div>
                <div className="p-10 border border-white/10 space-y-6 bg-black/40 backdrop-blur-md">
                   <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">Authorized Agency</h4>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white text-black flex items-center justify-center font-black text-xl italic">{artist.agency.substring(0,2)}</div>
                      <div className="space-y-1"><div className="font-black text-white text-lg tracking-tighter uppercase">{artist.agency} ENTERTAINMENT</div><div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Official Management</div></div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slowZoom { 
          0%, 100% { transform: scale(1); } 
          50% { transform: scale(1.08); } 
        }
      `}</style>
    </div>
  );
};

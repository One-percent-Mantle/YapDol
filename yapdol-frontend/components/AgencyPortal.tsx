
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, BarChart4, Users, Wallet, Settings, LayoutGrid, FileText, AlertCircle, ChevronRight, ChevronDown, ChevronUp, Megaphone, Calendar, DollarSign, X, CheckCircle2, History, Link as LinkIcon, Instagram, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_ARTISTS } from '../data/artists';
import { Artist } from '../types';

// Custom X Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const AgencyPortal: React.FC = () => {
  const { t, language } = useLanguage();
  const [isVerified, setIsVerified] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  // Dashboard States
  const [expandedArtistId, setExpandedArtistId] = useState<string | null>(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  
  // Campaign Form States
  const [selectedTrainee, setSelectedTrainee] = useState<string>('');
  const [campaignDuration, setCampaignDuration] = useState<string>('7');
  const [campaignBudget, setCampaignBudget] = useState<string>('');

  const handleVerify = () => {
    if (accessCode === 'YAPDOL-LABEL-2025') {
      setIsVerified(true);
      setError('');
    } else {
      setError(t.agency.authError);
    }
  };

  const toggleExpand = (artist: Artist) => {
    // Only expand if active campaign (funding status)
    if (artist.status === 'funding') {
      setExpandedArtistId(expandedArtistId === artist.id ? null : artist.id);
    }
  };

  const getMockPromotions = (name: string) => [
    { id: 1, date: '2025.01.14', platform: 'X', username: '@Hype_Master_99', content: 'Official Concept Teaser #1', link: '#', icon: <XIcon className="w-3 h-3 text-white" /> },
    { id: 2, date: '2025.01.12', platform: 'Instagram', username: '@Dance_Lover_KR', content: 'Daily Practice Log - Dance', link: '#', icon: <Instagram className="w-3 h-3 text-pink-500" /> },
    { id: 3, date: '2025.01.10', platform: 'YouTube', username: '@Vocal_Queen', content: 'Vocal Cover: "Ditto"', link: '#', icon: <Youtube className="w-3 h-3 text-red-500" /> },
  ];

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32 animate-[fadeIn_0.5s_ease-out]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative w-full max-w-xl">
           <div className="p-12 bg-zinc-900 border border-white/5 shadow-2xl space-y-10">
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-20 h-20 border border-blue-500/20 bg-blue-500/5 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-10 h-10 text-blue-500" />
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white">{t.agency.verifyTitle}</h2>
                 <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-[0.3em] font-bold">
                    {t.agency.verifyDesc}
                 </p>
              </div>

              <div className="space-y-6">
                 <div className="relative">
                    <input 
                       type="password"
                       placeholder={t.agency.inputPlaceholder}
                       className="w-full bg-black border border-white/10 px-6 py-5 text-sm text-white placeholder:text-gray-700 focus:border-blue-500 outline-none transition-all uppercase tracking-widest font-mono"
                       value={accessCode}
                       onChange={(e) => setAccessCode(e.target.value)}
                    />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                 </div>
                 
                 {error && (
                   <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest bg-red-500/5 p-4 border border-red-500/20">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {error}
                   </div>
                 )}

                 <button 
                    onClick={handleVerify}
                    className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-4"
                 >
                    {t.agency.verifyButton}
                    <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
              
              <div className="text-center">
                 <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.4em]">
                    Internal Administrative Terminal v2.0.4-SECURE
                 </p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-40 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 border-b border-white/5 pb-16">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">{t.agency.portal}</span>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
             </div>
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-white leading-none">
                ADOR<br/><span className="text-gray-800 not-italic">ENT. Dashboard</span>
             </h2>
          </div>

          <div className="flex gap-4">
             <button className="px-6 py-3 border border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center gap-3">
                <Settings className="w-3.5 h-3.5" /> {t.agency.editProfile}
             </button>
             <button className="px-8 py-3 bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center gap-3">
                <FileText className="w-3.5 h-3.5" /> {t.agency.logActivity}
             </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {[
             { label: t.agency.activeTrainees, value: '12', icon: <Users className="w-5 h-5 text-blue-400" /> },
             { label: t.agency.globalIcons, value: '04', icon: <BarChart4 className="w-5 h-5 text-mantle-pink" /> },
             { label: t.agency.totalCapital, value: '$4.2M', icon: <Wallet className="w-5 h-5 text-mantle-green" /> },
             { label: t.agency.conversion, value: '28.4%', icon: <LayoutGrid className="w-5 h-5 text-purple-400" /> },
           ].map((stat, i) => (
             <div key={i} className="p-8 bg-zinc-900 border border-white/5 space-y-6 group hover:border-blue-500/30 transition-all">
                <div className="flex justify-between items-start">
                   <div className="p-3 bg-black border border-white/10 group-hover:border-blue-500/40 transition-all">
                      {stat.icon}
                   </div>
                </div>
                <div>
                   <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
                   <div className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Trainee Management List */}
           <div className="lg:col-span-8 space-y-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                    <Users className="w-6 h-6 text-blue-500" /> {t.agency.management}
                 </h3>
              </div>

              <div className="space-y-4">
                 {MOCK_ARTISTS.map((artist) => {
                    const isExpanded = expandedArtistId === artist.id;
                    const isFunding = artist.status === 'funding';
                    const isDebuted = artist.status === 'market';
                    const artistName = language === 'ko' ? artist.name : artist.englishName;

                    return (
                        <div 
                          key={artist.id}
                          className={`
                            group relative border transition-all duration-500 overflow-hidden 
                            ${isDebuted 
                                ? 'border-l-4 border-l-mantle-pink bg-gradient-to-r from-mantle-pink/5 to-transparent border-t-white/5 border-b-white/5 border-r-white/5' 
                                : isFunding
                                    ? 'border-white/5 bg-zinc-950 hover:bg-zinc-900 hover:border-white/10'
                                    : 'border-white/5 bg-zinc-950 opacity-60' // No campaign case
                            }
                            ${isExpanded ? 'bg-zinc-900/80 border-white/20' : ''}
                          `}
                        >
                           {/* Main Row */}
                           <div 
                             onClick={() => toggleExpand(artist)}
                             className={`grid grid-cols-1 xl:grid-cols-12 gap-4 items-center p-5 relative z-10 ${isFunding ? 'cursor-pointer' : 'cursor-default'}`}
                           >
                              {/* Left: Info (4 Cols) */}
                              <div className="xl:col-span-4 flex items-center gap-5 w-full overflow-hidden">
                                  <div className="relative w-14 h-16 bg-neutral-900 overflow-hidden shrink-0 border border-white/10">
                                      <img 
                                        src={artist.imageUrl} 
                                        className={`w-full h-full object-cover transition-all duration-500 ${isDebuted ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                                        alt={artistName} 
                                      />
                                      {/* Debut Ribbon */}
                                      {isDebuted && (
                                        <div className="absolute top-0 left-0 bg-mantle-pink text-white text-[7px] font-black px-1.5 py-0.5 z-20 shadow-lg tracking-widest">
                                          DEBUT
                                        </div>
                                      )}
                                  </div>
                                  <div className="space-y-1 flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                         <div className={`text-[8px] font-black uppercase tracking-widest leading-none ${isDebuted ? 'text-mantle-pink' : 'text-blue-500'}`}>
                                            {isDebuted ? 'ICON' : isFunding ? 'TRAINEE' : 'INACTIVE'}
                                         </div>
                                      </div>
                                      <h4 className="text-lg font-black text-white uppercase italic tracking-tighter truncate">{artist.englishName}</h4>
                                      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap text-gray-600">
                                         {artist.agency} ENT.
                                      </div>
                                  </div>
                              </div>

                              {/* Middle: Stats (5 Cols) */}
                              <div className="xl:col-span-5 flex items-center gap-6">
                                  {isFunding && (
                                    <>
                                        <div className="space-y-1">
                                            <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Current Hype</div>
                                            <div className="text-sm font-mono font-bold text-white">{(artist.hypePoints || 0).toLocaleString()}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Progress</div>
                                            <div className="w-24 h-1.5 bg-black border border-white/10">
                                                <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                                            </div>
                                        </div>
                                    </>
                                  )}
                                  {isDebuted && (
                                     <div className="px-3 py-1 bg-mantle-pink/10 border border-mantle-pink/20 text-[9px] font-black text-mantle-pink uppercase tracking-widest">
                                        Global Active
                                     </div>
                                  )}
                              </div>

                              {/* Right: Status/Action (3 Cols) */}
                              <div className="xl:col-span-3 flex items-center justify-end gap-4 w-full ml-auto">
                                 {isDebuted ? (
                                    <div className="text-right">
                                        <span className="text-lg font-black italic text-mantle-green">DEBUTED</span>
                                    </div>
                                 ) : isFunding ? (
                                    <div className="flex items-center gap-4">
                                        <div className="text-right space-y-0.5">
                                            <div className="text-lg font-black italic text-white leading-none">
                                                D-{artist.dDay}
                                            </div>
                                            <div className="text-[8px] font-black text-red-500 uppercase tracking-widest text-right">Campaign Live</div>
                                        </div>
                                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                    </div>
                                 ) : (
                                    <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">No Active Campaign</span>
                                 )}
                              </div>
                           </div>

                           {/* Expanded Campaign History (Only for Funding Artists) */}
                           <AnimatePresence>
                              {isExpanded && isFunding && (
                                 <motion.div 
                                   initial={{ height: 0, opacity: 0 }}
                                   animate={{ height: 'auto', opacity: 1 }}
                                   exit={{ height: 0, opacity: 0 }}
                                   className="border-t border-white/5 bg-black/40 relative z-10"
                                 >
                                    <div className="p-6 space-y-4">
                                       <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                          <Megaphone className="w-3 h-3" /> Campaign Promotion Log
                                       </h5>
                                       
                                       {/* Table Header */}
                                       <div className="grid grid-cols-12 text-[9px] font-black text-gray-600 uppercase tracking-widest px-4 pb-2">
                                          <div className="col-span-2">Date</div>
                                          <div className="col-span-2">Platform</div>
                                          <div className="col-span-3">Publisher</div>
                                          <div className="col-span-3">Content</div>
                                          <div className="col-span-2 text-right">Link</div>
                                       </div>

                                       <div className="space-y-2">
                                          {getMockPromotions(artist.englishName).map((promo) => (
                                             <div key={promo.id} className="grid grid-cols-12 items-center px-4 py-3 bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all">
                                                {/* Date: 2 Cols */}
                                                <div className="col-span-2 text-[9px] font-mono text-gray-400">{promo.date}</div>
                                                
                                                {/* Platform: 2 Cols */}
                                                <div className="col-span-2 flex items-center gap-2 text-[10px] font-bold text-white">
                                                   {promo.icon} {promo.platform}
                                                </div>

                                                {/* Username: 3 Cols */}
                                                <div className="col-span-3 text-[9px] font-bold text-blue-400 uppercase tracking-wider truncate">
                                                   {promo.username}
                                                </div>

                                                {/* Content: 3 Cols */}
                                                <div className="col-span-3 text-xs text-gray-300 truncate font-light">{promo.content}</div>

                                                {/* Link: 2 Cols (Right aligned, MyPage style) */}
                                                <div className="col-span-2 text-right flex justify-end">
                                                    <a href={promo.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-mantle-green hover:text-white transition-colors">
                                                       View Post <LinkIcon className="w-3 h-3" />
                                                    </a>
                                                </div>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                    );
                 })}
              </div>
           </div>

           {/* Right Sidebar - Campaign Registration */}
           <div className="lg:col-span-4 space-y-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4 text-gray-500">
                    <Megaphone className="w-6 h-6 text-gray-700" /> Campaigns
                 </h3>
              </div>
              
              <div className="p-10 bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/10 space-y-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
                 <div className="relative z-10 space-y-6">
                    <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center mb-2">
                        <Megaphone className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase italic tracking-tight leading-none">
                        Start New<br/>Campaign
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                       Launch a new support funding round for trainees. Define target hype goals and duration to mobilize the global fandom.
                    </p>
                    
                    <button 
                      onClick={() => setIsCampaignModalOpen(true)}
                      className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                       Register Now <ArrowRight className="w-3 h-3" />
                    </button>
                 </div>
              </div>

              {/* Mini Status Box */}
              <div className="p-6 bg-zinc-900 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Active Campaigns</span>
                     <span className="text-lg font-black text-white">3</span>
                  </div>
                  <div className="h-px w-full bg-white/5"></div>
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Pending Review</span>
                     <span className="text-lg font-black text-gray-400">1</span>
                  </div>
              </div>
           </div>

        </div>
      </div>

      {/* Campaign Registration Modal */}
      <AnimatePresence>
        {isCampaignModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsCampaignModalOpen(false)}
               className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
             />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="relative w-full max-w-lg bg-zinc-900 border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] p-10 space-y-8"
             >
                <button onClick={() => setIsCampaignModalOpen(false)} className="absolute top-6 right-6 text-gray-600 hover:text-white">
                   <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                   <div className="flex items-center gap-3 text-blue-500 mb-2">
                      <Megaphone className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Campaign Center</span>
                   </div>
                   <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Register Campaign</h3>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Set parameters for new trainee funding round.</p>
                </div>

                <div className="space-y-6">
                   {/* Trainee Selector */}
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <Users className="w-3 h-3" /> Target Trainee
                      </label>
                      <div className="relative">
                         <select 
                           value={selectedTrainee}
                           onChange={(e) => setSelectedTrainee(e.target.value)}
                           className="w-full bg-black border border-white/10 px-4 py-4 text-xs text-white appearance-none outline-none focus:border-blue-500 transition-all uppercase tracking-wider"
                         >
                            <option value="">Select Trainee...</option>
                            {MOCK_ARTISTS.filter(a => a.status === 'funding').map(a => (
                               <option key={a.id} value={a.id}>{a.englishName} ({a.agency})</option>
                            ))}
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                      </div>
                   </div>

                   {/* Duration */}
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <Calendar className="w-3 h-3" /> Duration (Days)
                      </label>
                      <input 
                        type="number" 
                        value={campaignDuration}
                        onChange={(e) => setCampaignDuration(e.target.value)}
                        className="w-full bg-black border border-white/10 px-4 py-4 text-xs text-white outline-none focus:border-blue-500 transition-all font-mono"
                        placeholder="7"
                      />
                   </div>

                   {/* Point Goal */}
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <DollarSign className="w-3 h-3" /> Target Hype Points
                      </label>
                      <input 
                        type="text" 
                        value={campaignBudget}
                        onChange={(e) => setCampaignBudget(e.target.value)}
                        className="w-full bg-black border border-white/10 px-4 py-4 text-xs text-white outline-none focus:border-blue-500 transition-all font-mono"
                        placeholder="e.g. 100,000"
                      />
                   </div>
                </div>

                <div className="pt-4">
                   <button 
                     onClick={() => setIsCampaignModalOpen(false)}
                     className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3"
                   >
                      <CheckCircle2 className="w-4 h-4" /> Launch Campaign
                   </button>
                </div>

             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

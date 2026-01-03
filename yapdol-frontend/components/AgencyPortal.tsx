
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, BarChart4, Users, Wallet, Settings, LayoutGrid, FileText, AlertCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_ARTISTS } from '../data/artists';

export const AgencyPortal: React.FC = () => {
  const { t } = useLanguage();
  const [isVerified, setIsVerified] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    // Mock code for verification
    if (accessCode === 'YAPDOL-LABEL-2025') {
      setIsVerified(true);
      setError('');
    } else {
      setError(t.agency.authError);
    }
  };

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

  // DASHBOARD STATE
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

        {/* Management & Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           <div className="lg:col-span-8 space-y-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                    <Users className="w-6 h-6 text-blue-500" /> {t.agency.management}
                 </h3>
                 <button className="text-[9px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-widest">{t.hero.viewAll}</button>
              </div>

              <div className="space-y-4">
                 {MOCK_ARTISTS.map((artist) => (
                    <div key={artist.id} className="p-6 bg-zinc-950 border border-white/5 flex items-center justify-between group hover:bg-zinc-900 transition-all cursor-pointer">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-20 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10">
                             <img src={artist.imageUrl} className="w-full h-full object-cover" alt={artist.englishName} />
                          </div>
                          <div>
                             <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">
                                {artist.status === 'funding' ? 'ARCHIVE' : 'ICON PORTFOLIO'}
                             </div>
                             <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{artist.englishName}</h4>
                          </div>
                       </div>
                       <div className="flex items-center gap-12">
                          <div className="text-right">
                             <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{t.card.debutGauge}</div>
                             <div className="flex items-center gap-3">
                                <div className="w-24 h-1.5 bg-black border border-white/5"><div className="h-full bg-blue-500" style={{ width: '85%' }}></div></div>
                                <span className="text-xs font-mono font-bold text-white">85%</span>
                             </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-800 group-hover:text-white transition-colors" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-4 space-y-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4 text-gray-500">
                    <BarChart4 className="w-6 h-6 text-gray-700" /> {t.agency.analytics}
                 </h3>
              </div>
              
              <div className="p-10 bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/10 space-y-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
                 <div className="space-y-6">
                    <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Q1 Growth Projection</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                       Trend data suggests a 15% increase in fan engagement for Division 01 trainees following the upcoming "Visual Vault" unlock.
                    </p>
                    <div className="pt-4 border-t border-white/5 space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Est. Capital Flow</span>
                          <span className="text-sm font-mono font-bold text-white">+$840k</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Market Dominance</span>
                          <span className="text-sm font-mono font-bold text-mantle-green">12.4%</span>
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

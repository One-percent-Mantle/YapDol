
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Zap, CheckCircle2, ChevronRight, Sparkles, RotateCcw, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ViewType } from '../types';
import { addPromotionHistory } from '../services/api';

interface Mission {
  id: number;
  title: string;
  reward: string;
  link: string;
  platform: 'x' | 'instagram' | 'youtube';
}

interface YappingMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  artistId?: number;
  walletAddress?: string;
  onNavigate?: (view: ViewType) => void;
}

export const YappingMissionModal: React.FC<YappingMissionModalProps> = ({ isOpen, onClose, artistName, artistId, walletAddress, onNavigate }) => {
  const { t } = useLanguage();
  const [submissions, setSubmissions] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const missions: Mission[] = [
    { id: 1, title: t.missions.m1, reward: '100 HYPE', link: 'https://x.com', platform: 'x' },
    { id: 2, title: t.missions.m2, reward: '150 HYPE', link: 'https://instagram.com', platform: 'instagram' },
    { id: 3, title: t.missions.m3, reward: '200 HYPE', link: 'https://youtube.com', platform: 'youtube' },
    { id: 4, title: t.missions.m4, reward: '100 HYPE', link: '#', platform: 'x' },
    { id: 5, title: t.missions.m5, reward: '100 HYPE', link: '#', platform: 'x' },
  ];

  const handleInputChange = (id: number, value: string) => {
    setSubmissions(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (id: number) => {
    if (!submissions[id]) return;
    
    const mission = missions.find(m => m.id === id);
    if (!mission) return;
    
    // DB에 프로모션 히스토리 저장 (walletAddress와 artistId가 있을 때만)
    if (walletAddress && artistId) {
      setIsSubmitting(true);
      const success = await addPromotionHistory(
        walletAddress,
        artistId,
        mission.platform,
        submissions[id],
        mission.title
      );
      setIsSubmitting(false);
      
      if (!success) {
        console.error('Failed to save promotion history');
      }
    }
    
    setCompleted(prev => ({ ...prev, [id]: true }));
  };

  const handleRedo = (id: number) => {
    setCompleted(prev => ({ ...prev, [id]: false }));
    setSubmissions(prev => ({ ...prev, [id]: '' }));
  };

  const handleConfirm = () => {
    onClose();
    if (onNavigate) {
      onNavigate('mypage');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Zap className="w-3.5 h-3.5 text-mantle-green animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-mantle-green">{t.missions.missionCenter}</span>
            </div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
              {t.missions.yappingFor} <span className="text-mantle-green">{artistName}</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-white/30 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto hide-scrollbar space-y-8">
          {missions.map((mission) => {
            const isDone = completed[mission.id];
            return (
              <div key={mission.id} className="group relative">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-white/20">0{mission.id}</span>
                      <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                        {mission.title}
                        {mission.link !== '#' && (
                          <a href={mission.link} target="_blank" rel="noreferrer">
                            <ExternalLink className="w-3 h-3 text-white/20 hover:text-white transition-colors" />
                          </a>
                        )}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-mantle-green/5 px-2 py-0.5 border border-mantle-green/10">
                        <Sparkles className="w-2.5 h-2.5 text-mantle-green" />
                        <span className="text-[8px] font-black text-mantle-green uppercase tracking-widest">{mission.reward}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto shrink-0 flex items-center">
                    <AnimatePresence mode="wait">
                      {isDone ? (
                        <motion.div 
                          key="completed-actions"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2"
                        >
                           <button 
                             onClick={() => handleRedo(mission.id)}
                             className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[9px] hover:bg-white/10 transition-colors"
                           >
                             <RotateCcw className="w-3 h-3" />
                             {t.missions.redo}
                           </button>
                           <button 
                             onClick={handleConfirm}
                             className="flex items-center gap-2 px-4 py-2 bg-white text-black font-black uppercase tracking-[0.2em] text-[9px] hover:bg-mantle-green transition-all"
                           >
                             <CheckCircle2 className="w-3.5 h-3.5" />
                             {t.missions.confirm}
                           </button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="input"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-1.5"
                        >
                          <input 
                            type="text" 
                            placeholder="URL"
                            className="bg-white/5 border border-white/10 px-3 py-2 text-[10px] text-white outline-none focus:border-mantle-green transition-colors w-full sm:w-32 placeholder:text-white/10"
                            value={submissions[mission.id] || ''}
                            onChange={(e) => handleInputChange(mission.id, e.target.value)}
                          />
                          <button 
                            onClick={() => handleSubmit(mission.id)}
                            disabled={!submissions[mission.id]}
                            className="px-4 py-2 bg-white text-black text-[8px] font-black uppercase tracking-widest hover:bg-mantle-green transition-all disabled:opacity-20 disabled:grayscale"
                          >
                            {t.missions.submit}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {/* Horizontal Divider */}
                <div className="mt-8 h-px w-full bg-white/5" />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">
             {t.missions.verifying}
           </div>
           <button 
             onClick={onClose}
             className="text-[9px] font-black text-white uppercase tracking-[0.4em] hover:text-mantle-green transition-colors"
           >
             {t.missions.finish}
           </button>
        </div>
      </motion.div>
    </div>
  );
};

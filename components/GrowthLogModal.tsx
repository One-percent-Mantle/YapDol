import React from 'react';
import { X, Music2, Mic2, MessageCircle, Star, Lock, Wallet, Quote, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GrowthLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
}

export const GrowthLogModal: React.FC<GrowthLogModalProps> = ({ isOpen, onClose, artistName }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-navy-900 border border-white/10 rounded-2xl shadow-2xl animate-[scaleIn_0.3s_ease-out] hide-scrollbar">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-navy-900/90 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {artistName}'s {t.modal.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{t.modal.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-12">
          {/* Section 1: Skill Roadmap */}
          <section>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              {t.modal.skillRoadmap}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Dance Performance', status: 'Mastering Details', desc: '디테일 및 강약 조절 완성 단계', color: 'from-purple-600 to-purple-400' },
                { label: 'Vocal Technique', status: 'Expanding Range', desc: '고음역대 안정화 훈련 중', color: 'from-blue-600 to-blue-400' },
                { label: 'Visual Concept', status: 'Concept Tuning', desc: '데뷔 컨셉 화보 테스트 촬영', color: 'from-pink-600 to-pink-400' },
                { label: 'Global Language', status: 'Practical Use', desc: '영어 인터뷰 시뮬레이션 진행', color: 'from-cyan-600 to-cyan-400' },
              ].map((skill) => (
                <div key={skill.label} className="bg-navy-800 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-bold">{skill.label}</span>
                    <span className="text-sm font-medium text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">{skill.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{skill.desc}</p>
                  {/* Qualitative Bar (No numbers) */}
                  <div className="h-2 bg-navy-950 rounded-full overflow-hidden">
                     <div className={`h-full w-3/4 bg-gradient-to-r ${skill.color} rounded-full animate-pulse-slow`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Trainer & Artist Voice */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-navy-800/50 rounded-xl p-6 border border-white/5 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 border border-white/10">
                   <Mic2 className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Coach's Feedback</h4>
                  <p className="text-xs text-gray-500">Vocal Trainer Kim</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                "현우 군은 이번 달 고음역대 발성 시 호흡 배분을 익히는 데 집중했습니다. 기술적인 성장을 넘어 무대에서의 여유가 생기기 시작했습니다. 특히 감정 표현력이 눈에 띄게 좋아졌습니다."
              </p>
            </div>

            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl p-6 border border-purple-500/20 relative shadow-[0_0_15px_rgba(168,85,247,0.05)]">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-500/10" />
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3 border border-purple-500/30">
                   <MessageCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold text-purple-200">KAI's Diary</h4>
                  <p className="text-xs text-purple-400/60">2025.12.20</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "팬분들이 응원해주신 덕분에 평소 어렵던 안무 구간을 드디어 완벽하게 소화했을 때의 짜릿함을 잊지 못할 것 같아요. 더 완벽한 모습으로 보답하겠습니다!"
              </p>
            </div>
          </section>

          {/* Section 3: Exclusive Vault */}
          <section>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-cyan-400" />
              {t.modal.exclusiveVault}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group relative aspect-square bg-navy-950 rounded-xl overflow-hidden border border-white/5 cursor-pointer">
                  <img src={`https://picsum.photos/seed/kai${item}/300/300`} className="w-full h-full object-cover opacity-50 blur-sm group-hover:scale-105 transition-transform duration-500" alt="Exclusive content" />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
                    <Lock className="w-8 h-8 text-white/50 mb-2" />
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{t.modal.holderOnly}</span>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-[10px] font-bold text-white rounded">
                    {t.modal.exclusive}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Use of Funds */}
          <section>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-green-400" />
              {t.modal.investment}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[
                 { title: 'Global Vocal Lesson', cost: 'Top-tier Coach Invitation', icon: <Mic2 className="w-5 h-5 text-blue-400" /> },
                 { title: 'Stage Equipment', cost: 'In-ear Monitors & Mics', icon: <Music2 className="w-5 h-5 text-purple-400" /> },
                 { title: 'Language Training', cost: 'Native English Tutor', icon: <MessageCircle className="w-5 h-5 text-green-400" /> },
               ].map((fund) => (
                 <div key={fund.title} className="bg-navy-800 p-4 rounded-xl border border-white/5 flex items-start space-x-3">
                    <div className="p-2 bg-navy-900 rounded-lg border border-white/10">
                      {fund.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{fund.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{fund.cost}</div>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
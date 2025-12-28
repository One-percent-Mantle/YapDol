import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden group">
      {/* Background Video/Image Concept */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" 
          alt="Stage Light" 
          className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-in-out"
        />
        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
      </div>

      {/* Editorial Content */}
      <div className="relative h-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-32">
        <div className="max-w-4xl space-y-6 animate-fade-in-up">
          {/* Label Badge */}
          <div className="inline-flex items-center space-x-2 border-l-2 border-mantle-green pl-4 mb-4">
            <span className="text-mantle-green font-bold tracking-widest text-xs uppercase">Upcoming Debut</span>
            <span className="text-gray-400 text-xs tracking-widest uppercase">/ 2024 Global Audition</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase mix-blend-overlay opacity-90">
            Create<br/>The Next<br/>Icon.
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-xl leading-relaxed pt-4 border-t border-white/20 mt-8">
            {t.hero.title} {t.hero.strategyDesc}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-8">
             <button className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest text-sm uppercase hover:bg-mantle-green transition-colors duration-300">
                {t.hero.cta}
                <div className="absolute inset-0 border border-white translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform pointer-events-none mix-blend-difference"></div>
             </button>
             
             <button className="flex items-center space-x-3 group cursor-pointer px-6 py-4">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all">
                   <Play className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">Watch Brand Film</span>
             </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end space-y-2">
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 rotate-90 origin-right translate-x-2">Scroll Down</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
    </section>
  );
};

import React from 'react';
import { Play, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen min-h-[750px] overflow-hidden group bg-black">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" 
          alt="Yapdol Stage" 
          className="w-full h-full object-cover opacity-40 scale-100 group-hover:scale-105 transition-transform duration-[8s] ease-out filter grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-70" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col justify-center pt-20">
        <div className="max-w-4xl space-y-10 animate-fade-in-up">
          <div className="inline-flex items-center space-x-6">
            <span className="px-4 py-1.5 bg-mantle-green/5 border border-mantle-green/20 text-mantle-green font-black tracking-[0.4em] text-[10px] uppercase flex items-center gap-2">
               <Sparkles className="w-3.5 h-3.5" /> 
               Next-Gen Entertainment Protocol
            </span>
            <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
               <TrendingUp className="w-3.5 h-3.5 text-mantle-pink" /> 
               1.4B YAP Accumulated
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl">
            Defining the<br/>New Fandom<span className="text-mantle-green">.</span>
          </h1>
          
          <div className="max-w-2xl border-l-2 border-mantle-green/30 pl-8 py-2">
            <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed italic opacity-80">
              Join curated labels to debut your trainees. <br className="hidden md:block" />
              Empower idols and share in the global glory of their success.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-8">
             <button className="px-10 py-5 bg-blue-600 text-white font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(37,99,235,0.5)]">
                {t.hero.cta}
             </button>
             
             <button className="flex items-center space-x-4 group px-6 py-4 border border-white/5 hover:border-white/20 transition-all bg-white/5 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-mantle-pink group-hover:scale-110 transition-all">
                   <Play className="w-3 h-3 text-white fill-white" />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white group-hover:text-mantle-pink transition-colors">Vision Film</span>
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

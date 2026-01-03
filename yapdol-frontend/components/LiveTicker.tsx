
import React from 'react';
import { Disc, Activity, Star, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LiveTicker: React.FC = () => {
  const { language } = useLanguage();

  const newsItems = language === 'en' ? [
    { icon: <Zap className="w-3.5 h-3.5" />, prefix: "ACTIVITY:", text: "User @HypeKing just generated 500 Hype for KAI." },
    { icon: <Disc className="w-3.5 h-3.5" />, prefix: "MARKET:", text: "MINJI global hype index reaches new all-time high." },
    { icon: <Star className="w-3.5 h-3.5" />, prefix: "EXCLUSIVE:", text: "Limited Edition concept photos unlocked for JUN supporters." },
    { icon: <Activity className="w-3.5 h-3.5" />, prefix: "LABEL:", text: "SM Entertainment opens a new support pool for upcoming soloist." },
  ] : [
    { icon: <Zap className="w-3.5 h-3.5" />, prefix: "ACTIVITY:", text: "얍돌러 'HypeKing'님이 KAI를 위해 500 Hype를 획득했습니다." },
    { icon: <Disc className="w-3.5 h-3.5" />, prefix: "MARKET:", text: "MINJI 글로벌 화력 지수가 역대 최고치를 기록했습니다." },
    { icon: <Star className="w-3.5 h-3.5" />, prefix: "EXCLUSIVE:", text: "JUN 서포터 전용 한정판 컨셉 포토가 해제되었습니다." },
    { icon: <Activity className="w-3.5 h-3.5" />, prefix: "LABEL:", text: "SM 엔터테인먼트가 신인 솔로 아티스트의 서포트 풀을 오픈했습니다." },
  ];

  const duplicatedItems = [...newsItems, ...newsItems, ...newsItems, ...newsItems];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-2xl border-t border-white/5 overflow-hidden py-4 z-[45]">
      <div className="flex whitespace-nowrap animate-marquee">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center mx-16 space-x-4 group">
            <span className="text-mantle-green">
              {item.icon}
            </span>
            <div className="flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase">
              <span className="font-black text-white">{item.prefix}</span>
              <span className="font-bold text-gray-500 group-hover:text-white transition-colors">
                {item.text}
              </span>
            </div>
            <div className="w-1.5 h-1.5 bg-white/10 ml-16 rotate-45"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
};

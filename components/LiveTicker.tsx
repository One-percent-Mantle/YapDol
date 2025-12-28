import React from 'react';
import { Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LiveTicker: React.FC = () => {
  const { t, language } = useLanguage();

  // Dynamically generate items based on language
  const newsItems = language === 'en' ? [
    { icon: <ShieldCheck className="w-4 h-4 text-mantle-green" />, prefix: "BREAKING:", text: "Trainee KAI hits 90% funding goal on Mantle Network!" },
    { icon: <TrendingUp className="w-4 h-4 text-purple-400" />, prefix: "MARKET UPDATE:", text: "'NewJeans' token floor price up 5% via 1% burn mechanism." },
    { icon: <Zap className="w-4 h-4 text-yellow-400" />, prefix: "NEW ARRIVAL:", text: "'Project Alpha' boys group open for Phase 1 funding." },
    { icon: <ShieldCheck className="w-4 h-4 text-mantle-green" />, prefix: "MANTLE TREASURY:", text: "70% Principal Protection Audit Complete." },
  ] : [
    { icon: <ShieldCheck className="w-4 h-4 text-mantle-green" />, prefix: "속보:", text: "연습생 'KAI' 맨틀 네트워크 펀딩 목표 90% 달성!" },
    { icon: <TrendingUp className="w-4 h-4 text-purple-400" />, prefix: "시장 업데이트:", text: "'뉴진스' 토큰 1% 소각 메커니즘으로 바닥가 5% 상승." },
    { icon: <Zap className="w-4 h-4 text-yellow-400" />, prefix: "신규 등록:", text: "'프로젝트 알파' 보이그룹 1단계 펀딩 시작." },
    { icon: <ShieldCheck className="w-4 h-4 text-mantle-green" />, prefix: "맨틀 트레저리:", text: "70% 원금 보호 컨트랙트 감사 완료." },
  ];

  return (
    <div className="w-full bg-navy-900/90 border-y border-mantle-green/20 overflow-hidden py-3 backdrop-blur-sm relative z-30">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...newsItems, ...newsItems, ...newsItems].map((item, index) => (
          <div key={index} className="flex items-center mx-8 space-x-2">
            <span className="bg-white/5 p-1 rounded-full">{item.icon}</span>
            <span className="text-sm font-mono text-gray-300 tracking-wide uppercase">
              <span className="font-bold text-white mr-1">1% {item.prefix}</span>
              {item.text}
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full ml-8"></span>
          </div>
        ))}
      </div>
      
      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-navy-900 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-navy-900 to-transparent pointer-events-none" />
    </div>
  );
};
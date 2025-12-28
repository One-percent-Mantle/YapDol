import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const TrustBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-navy-800 to-purple-900 border-t border-blue-500/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sm sm:text-base text-blue-100">
          <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <p className="font-medium truncate pr-4">
             {t.trust.text}
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors text-blue-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
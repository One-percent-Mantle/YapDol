
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Globe, Chrome } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: 'google' | 'x' | 'wallet') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-10 shadow-2xl overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mantle-green via-purple-500 to-blue-500"></div>
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-4xl font-black italic tracking-tighter text-white uppercase">
              YAP<span className="text-mantle-green">DOL</span>
            </span>
            <div className="w-2 h-2 bg-mantle-green rounded-full animate-pulse mt-2"></div>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Join the Roster</h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Connect to start investing in the next global K-Pop icons. Secure, on-chain, and exclusive.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin('wallet')}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-mantle-green transition-all"
          >
            <Wallet className="w-4 h-4" /> Connect Mantle Wallet
          </button>
          
          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Social Login</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onLogin('google')}
              className="flex items-center justify-center gap-3 py-4 border border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-white transition-all"
            >
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button 
              onClick={() => onLogin('x')}
              className="flex items-center justify-center gap-3 py-4 border border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-white transition-all"
            >
              <span className="text-base font-bold">𝕏</span> Twitter
            </button>
          </div>
        </div>

        <p className="mt-10 text-[9px] text-gray-600 text-center uppercase tracking-widest font-bold">
          By connecting, you agree to our <a href="#" className="underline hover:text-white">Terms</a> & <a href="#" className="underline hover:text-white">Privacy</a>
        </p>
      </motion.div>
    </div>
  );
};

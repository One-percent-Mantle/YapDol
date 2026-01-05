
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Globe, Chrome, AlertCircle, Loader2 } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: 'google' | 'x' | 'wallet') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { 
    isConnected, 
    isConnecting, 
    isCorrectNetwork, 
    connectWallet, 
    switchToMantleSepolia,
    connectError 
  } = useWallet();

  // isConnected 상태 변화 감지하여 로그인 처리
  useEffect(() => {
    if (isOpen && isConnected) {
      if (isCorrectNetwork) {
        onLogin('wallet');
      } else {
        // 연결되었지만 네트워크가 다르면 전환 요청
        switchToMantleSepolia();
      }
    }
  }, [isOpen, isConnected, isCorrectNetwork]);

  const handleWalletConnect = async () => {
    const success = await connectWallet();
    // connectWallet이 성공하면 useEffect에서 isConnected 변화 감지하여 로그인 처리
    if (success && isConnected) {
      onLogin('wallet');
    }
  };

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
          {isConnected && !isCorrectNetwork && (
            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Mantle Sepolia 네트워크로 전환이 필요합니다</span>
            </div>
          )}

          {connectError && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>연결 실패: {connectError.message}</span>
            </div>
          )}

          <button 
            onClick={handleWalletConnect}
            disabled={isConnecting}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-mantle-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Connecting...
              </>
            ) : isConnected && !isCorrectNetwork ? (
              <>
                <Wallet className="w-4 h-4" /> Switch to Mantle Sepolia
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" /> Connect Wallet
              </>
            )}
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

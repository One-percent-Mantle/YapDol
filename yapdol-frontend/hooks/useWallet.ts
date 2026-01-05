import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { useState, useCallback, useEffect } from 'react';
import { mantleSepolia } from '../config/wagmi';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (data: unknown) => void) => void;
      removeListener: (event: string, callback: (data: unknown) => void) => void;
    };
  }
}

const TARGET_CHAIN_ID = mantleSepolia.id; // 5003
const TARGET_CHAIN_ID_HEX = `0x${TARGET_CHAIN_ID.toString(16)}`; // 0x138b

// Mantle Sepolia 네트워크 정보
const MANTLE_SEPOLIA_CHAIN = {
  chainId: TARGET_CHAIN_ID_HEX,
  chainName: 'Mantle Sepolia Testnet',
  nativeCurrency: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.sepolia.mantle.xyz'],
  blockExplorerUrls: ['https://sepolia.mantlescan.xyz'],
};

// 지갑에서 직접 현재 체인 ID 가져오기
async function getWalletChainId(): Promise<number | null> {
  if (typeof window === 'undefined' || !window.ethereum) return null;
  try {
    const chainIdHex = (await window.ethereum.request({ method: 'eth_chainId' })) as string;
    return parseInt(chainIdHex, 16);
  } catch {
    return null;
  }
}

// 지갑에 네트워크 추가 및 전환
async function addAndSwitchNetwork(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: TARGET_CHAIN_ID_HEX }],
    });
    return true;
  } catch (switchError: unknown) {
    const error = switchError as { code?: number };
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [MANTLE_SEPOLIA_CHAIN],
        });
        return true;
      } catch (addError) {
        console.error('[Network] Failed to add network:', addError);
        return false;
      }
    }
    if (error.code === 4001) {
      return false;
    }
    console.error('[Network] Switch error:', switchError);
    return false;
  }
}

export function useWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connectAsync, connectors, isPending: isConnecting } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [error, setError] = useState<Error | null>(null);
  const [walletChainId, setWalletChainId] = useState<number | null>(null);
  
  const { data: balanceData } = useBalance({
    address,
  });

  const injectedConnector = connectors.find((c) => c.id === 'injected');
  const isCorrectNetwork = walletChainId === TARGET_CHAIN_ID || chain?.id === TARGET_CHAIN_ID;

  // 지갑 연결 시 실제 체인 ID 확인 및 네트워크 변경 이벤트 리스닝
  useEffect(() => {
    if (!isConnected) {
      setWalletChainId(null);
      return;
    }

    getWalletChainId().then(setWalletChainId);

    const handleChainChanged = (data: unknown) => {
      const chainIdHex = data as string;
      const newChainId = parseInt(chainIdHex, 16);
      setWalletChainId(newChainId);
    };

    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [isConnected]);

  const switchToMantleSepolia = useCallback(async () => {
    const success = await addAndSwitchNetwork();
    if (!success) {
      console.error('네트워크 전환 실패');
    }
  }, []);

  const connectWallet = useCallback(async (): Promise<boolean> => {
    setError(null);
    
    if (!window.ethereum) {
      alert('MetaMask가 설치되어 있지 않습니다. MetaMask를 설치해주세요.');
      window.open('https://metamask.io/download/', '_blank');
      return false;
    }

    try {
      // MetaMask에 직접 연결 요청
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // wagmi 커넥터로도 연결
      if (injectedConnector && !isConnected) {
        try {
          await connectAsync({ connector: injectedConnector });
        } catch (err: any) {
          // already connected 에러는 무시
          if (!err?.message?.includes('already connected')) {
            throw err;
          }
        }
      }
      
      return true;
    } catch (err: any) {
      if (err.code === 4001) {
        // 사용자가 거부
        return false;
      }
      setError(err);
      console.error('지갑 연결 실패:', err);
      return false;
    }
  }, [injectedConnector, isConnected, connectAsync]);

  const disconnect = useCallback(async () => {
    setError(null);
    try {
      await disconnectAsync();
    } catch (err) {
      console.error('지갑 연결 해제 실패:', err);
    }
  }, [disconnectAsync]);

  const shortenedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const balance = balanceData 
    ? parseFloat(formatUnits(balanceData.value, balanceData.decimals))
    : 0;

  return {
    address,
    shortenedAddress,
    isConnected,
    isConnecting,
    isCorrectNetwork,
    chain,
    balance,
    balanceSymbol: balanceData?.symbol || 'MNT',
    connectError: error,
    connectWallet,
    disconnect,
    switchToMantleSepolia,
  };
}

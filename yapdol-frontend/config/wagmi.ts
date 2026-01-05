import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { injected } from 'wagmi/connectors';

// Mantle Sepolia Testnet 정의
export const mantleSepolia = defineChain({
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Sepolia Explorer',
      url: 'https://sepolia.mantlescan.xyz',
    },
  },
  testnet: true,
});

// Wagmi 설정
export const config = createConfig({
  chains: [mantleSepolia],
  connectors: [
    injected({
      shimDisconnect: true, // disconnect 시 완전히 연결 해제
    }),
  ],
  transports: {
    [mantleSepolia.id]: http(),
  },
  // 페이지 로드 시 자동 재연결 비활성화
  storage: null,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

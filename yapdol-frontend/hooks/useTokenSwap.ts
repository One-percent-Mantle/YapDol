import { useState, useCallback } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { FACTORY_ABI, FACTORY_ADDRESS } from '../contracts/ArtistTokenFactory';

const API_BASE = 'http://localhost:3002/api';

interface SwapSignatureResponse {
  success: boolean;
  signature?: string;
  nonce?: number;
  factoryAddress?: string;
  artistId?: number;
  hypePoints?: number;
  tokensToMint?: number;
  message?: string;
}

export function useTokenSwap() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const swapTokens = useCallback(async (
    walletAddress: string,
    artistId: number,
    hypePoints: number,
    tokensToMint: number
  ): Promise<{ success: boolean; hash?: string; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get signature from backend
      const response = await fetch(`${API_BASE}/token/swap-signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress,
          artistId,
          hypePoints,
          tokensToMint,
        }),
      });

      const data: SwapSignatureResponse = await response.json();

      if (!data.success || !data.signature || !data.nonce) {
        throw new Error(data.message || 'Failed to get signature');
      }

      // Step 2: Call contract with signature
      const txHash = await writeContractAsync({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'swapPointsForTokens',
        args: [
          BigInt(artistId),
          BigInt(hypePoints),
          BigInt(tokensToMint),
          BigInt(data.nonce),
          data.signature as `0x${string}`,
        ],
      });

      setIsLoading(false);
      return { success: true, hash: txHash };
    } catch (err: any) {
      const errorMessage = err.message || 'Token swap failed';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, [writeContractAsync]);

  return {
    swapTokens,
    isLoading: isLoading || isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  };
}

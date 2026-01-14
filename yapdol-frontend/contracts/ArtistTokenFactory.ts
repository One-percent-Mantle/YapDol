// ArtistTokenFactory Contract - Mantle Sepolia
export const FACTORY_ADDRESS = '0x7b26C4645CD5C76bd0A8183DcCf8eAB9217C1Baf' as const;

export const FACTORY_ABI = [
  {
    inputs: [{ internalType: 'address', name: '_signer', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'artistTokens',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllArtistIds',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getArtistTokenCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'signer',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'artistId', type: 'uint256' },
      { internalType: 'uint256', name: 'hypePoints', type: 'uint256' },
      { internalType: 'uint256', name: 'tokensToMint', type: 'uint256' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'swapPointsForTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'artistId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'nonce', type: 'uint256' },
    ],
    name: 'TokensMinted',
    type: 'event',
  },
] as const;

// Artist Token addresses (ERC20)
export const ARTIST_TOKENS: Record<number, string> = {
  1: '0xc56330Ee5037d74AA64B3ED1D09EfCAc6bF149a5',   // MINJI
  2: '0x81f442F9ab3480bAdFE940C444c0bBA908312FA6',   // HAERIN
  3: '0x9C5B4496d39Bc49593C099ca24689b7fC8b720aa',   // DANIELLE
  4: '0x285b6cea95213abCce872181269f40f6fd56B200',   // HANNI
  5: '0x251a75Be5B82416589eC17C91C9E858CBDb7645f',   // SULYOON
  6: '0xD5735a22e518E4C6F15B0955A35A52e543254A23',   // SOHEE
  7: '0xA472e4D9F73D2FC7B1C5a245DE3b36d062BCF47C',   // KAI
  8: '0xAb89565F366Cd4eE6d9CDA8Ef5AeABa5A768F970',   // JUN
  10: '0x01D845D42df7A5eB84aC0083F5213A6202b883b0',  // JENNIE
};

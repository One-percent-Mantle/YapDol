
export type ArtistStatus = 'funding' | 'market';
export type ViewType = 'home' | 'funding' | 'market' | 'live' | 'mypage' | 'agency';
export type Language = 'en' | 'ko' | 'cn';

export interface Artist {
  id: string;
  name: string;
  englishName: string;
  agency: string;
  status: ArtistStatus;
  comingSoon?: boolean; // Mark artist as coming soon
  
  // Support Data (Campaigns)
  hypePoints?: number;
  revenueShare?: number; // % revenue share claimable by fans
  nicknames?: string[]; // AI-generated persona tags
  contributorCount?: number; // Number of people participating in yapping
  campaignDDay?: number; // Campaign end date D-?
  availableGoodsCount?: number; // For debuted artists
  youtubeId?: string; // For introduction video
  
  // Performance Data (Ranking)
  growthRate?: number;
  totalHypeDistributed?: string;
  
  // Pricing / Value
  price: number;
  currency: string;
  
  // Meta
  dDay: number; // For trainees: Debut D-Day
  imageUrl: string;
  isTrending: boolean;
  category: 'Trending' | 'New Arrivals' | 'Debut Soon';
}

export interface SupportItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  color: string;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  points: number;
  share: number;
  isMe?: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  walletAddress?: string;
  profileImage: string;
  provider: 'google' | 'x' | 'wallet';
  balance: number;
  hypeScore: number;
}

export type FilterCategory = 'Trending' | 'New Arrivals' | 'Debut Soon';

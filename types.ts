export type ArtistStatus = 'funding' | 'market';
export type ViewType = 'home' | 'funding' | 'market';
export type Language = 'en' | 'ko';

export interface Artist {
  id: string;
  name: string;
  englishName: string;
  agency: string;
  status: ArtistStatus;
  
  // Market Data
  price: number; // Current Price or Fixed Funding Price
  currency: string;
  marketCap?: string;
  floorPrice?: number;
  
  // Funding Data
  fundingGoal?: number; // Total amount to raise
  currentFunding?: number; // Amount raised so far
  backers?: number;
  
  // Common
  dDay: number; // D-Day for debut or Next Event
  imageUrl: string;
  isTrending: boolean;
  category: 'Trending' | 'New Arrivals' | 'Debut Soon';
}

export type FilterCategory = 'Trending' | 'New Arrivals' | 'Debut Soon';
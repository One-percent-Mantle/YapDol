import { Artist } from '../types';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '4', // KAI moved to top
    name: '강현우',
    englishName: 'KAI',
    agency: 'SM',
    status: 'funding',
    price: 10,
    currency: 'USDC',
    fundingGoal: 500000,
    currentFunding: 325000,
    backers: 1240,
    dDay: 20,
    // Intense, moody male dancer vibe
    imageUrl: 'https://images.unsplash.com/photo-1605218457316-2d90ec1b4b39?q=80&w=1280&auto=format&fit=crop',
    isTrending: true,
    category: 'Trending'
  },
  {
    id: '1',
    name: '민지',
    englishName: 'MINJI',
    agency: 'ADOR',
    status: 'market',
    price: 130,
    currency: 'USDC',
    marketCap: '13.0M USDC',
    floorPrice: 110,
    dDay: 0,
    // Clean, high-fashion aesthetic
    imageUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1279&auto=format&fit=crop',
    isTrending: true,
    category: 'Trending'
  },
  {
    id: '2',
    name: '다니',
    englishName: 'DANI',
    agency: 'ADOR',
    status: 'market',
    price: 125,
    currency: 'USDC',
    marketCap: '12.5M USDC',
    floorPrice: 105,
    dDay: 0,
    // Vibrant, dreamy look
    imageUrl: 'https://images.unsplash.com/photo-1620409736858-690226c48325?q=80&w=1280&auto=format&fit=crop',
    isTrending: false,
    category: 'Trending'
  },
  {
    id: '3',
    name: '준',
    englishName: 'JUN',
    agency: 'HYBE',
    status: 'funding',
    price: 10,
    currency: 'USDC',
    fundingGoal: 300000,
    currentFunding: 45000,
    backers: 120,
    dDay: 45,
    // Street style, boyish
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1280&auto=format&fit=crop',
    isTrending: true,
    category: 'New Arrivals'
  },
  {
    id: '5',
    name: '소희',
    englishName: 'SOHEE',
    agency: 'JYP',
    status: 'funding',
    price: 10,
    currency: 'USDC',
    fundingGoal: 200000,
    currentFunding: 180000,
    backers: 890,
    dDay: 5,
    // Pure, innocent visual
    imageUrl: 'https://images.unsplash.com/photo-1544357592-e52bd137aa30?q=80&w=1280&auto=format&fit=crop',
    isTrending: false,
    category: 'New Arrivals'
  },
  {
    id: '6',
    name: '리키',
    englishName: 'RICKY',
    agency: 'YG',
    status: 'market',
    price: 122,
    currency: 'USDC',
    marketCap: '12.2M USDC',
    floorPrice: 98,
    dDay: 0,
    // Edgy, Hip-hop vibe
    imageUrl: 'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=1280&auto=format&fit=crop',
    isTrending: true,
    category: 'Trending'
  },
  {
    id: '7',
    name: '예린',
    englishName: 'YERIN',
    agency: 'CUBE',
    status: 'funding',
    price: 10,
    currency: 'USDC',
    fundingGoal: 100000,
    currentFunding: 12000,
    backers: 45,
    dDay: 60,
    // Unique atmosphere
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1280&auto=format&fit=crop',
    isTrending: false,
    category: 'Debut Soon'
  }
];
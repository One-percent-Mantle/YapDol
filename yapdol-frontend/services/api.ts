const API_BASE = 'http://localhost:3002/api';

export interface UserData {
  id: number;
  wallet_address: string;
  username: string;
  profile_image: string;
  total_points: number;
  global_rank: number;
  roi_percentage: number;
  is_agency: boolean;
  agency_name: string | null;
}

export interface PortfolioItem {
  id: number;
  holdings: number;
  my_points: number;
  artist_id: number;
  english_name: string;
  korean_name: string;
  agency: string;
  image_url: string;
  status: 'funding' | 'market' | 'inactive';
  hype_points: number;
  d_day: number | null;
}

export interface PromotionCounts {
  x: number;
  instagram: number;
  youtube: number;
  wechat: number;
  weibo: number;
}

export interface PromotionHistory {
  id: number;
  platform: string;
  link: string;
  content: string;
  created_at: string;
}

export interface ActivityItem {
  id: number;
  activity_type: 'SUPPORT' | 'DIVIDEND' | 'CAMPAIGN' | 'SWAP';
  amount: string;
  created_at: string;
  artist_name: string;
}

export interface ArtistData {
  id: number;
  english_name: string;
  korean_name: string;
  agency: string;
  image_url: string;
  status: 'funding' | 'market' | 'inactive';
  hype_points: number;
  d_day: number | null;
}

export interface CampaignLog {
  id: number;
  platform: string;
  publisher_username: string;
  content: string;
  link: string;
  created_at: string;
}

export interface AgencyStats {
  activeTrainees: number;
  globalIcons: number;
  activeCampaigns: number;
  pendingCampaigns: number;
}

// 사용자 정보 조회
export async function fetchUser(walletAddress: string): Promise<UserData | null> {
  try {
    const res = await fetch(`${API_BASE}/user/${walletAddress}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// 포트폴리오 조회
export async function fetchPortfolio(walletAddress: string): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(`${API_BASE}/portfolio/${walletAddress}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// 프로모션 카운트 조회
export async function fetchPromotionCounts(walletAddress: string, artistId: number): Promise<PromotionCounts> {
  try {
    const res = await fetch(`${API_BASE}/promotion-counts/${walletAddress}/${artistId}`);
    if (!res.ok) return { x: 0, instagram: 0, youtube: 0, wechat: 0, weibo: 0 };
    return res.json();
  } catch {
    return { x: 0, instagram: 0, youtube: 0, wechat: 0, weibo: 0 };
  }
}

// 프로모션 히스토리 조회
export async function fetchPromotionHistory(walletAddress: string, artistId: number): Promise<PromotionHistory[]> {
  try {
    const res = await fetch(`${API_BASE}/promotion-history/${walletAddress}/${artistId}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// 활동 내역 조회
export async function fetchActivity(walletAddress: string): Promise<ActivityItem[]> {
  try {
    const res = await fetch(`${API_BASE}/activity/${walletAddress}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// 모든 아티스트 조회
export async function fetchArtists(): Promise<ArtistData[]> {
  try {
    const res = await fetch(`${API_BASE}/artists`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// 캠페인 프로모션 로그 조회
export async function fetchCampaignLog(artistId: number): Promise<CampaignLog[]> {
  try {
    const res = await fetch(`${API_BASE}/campaign-log/${artistId}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Agency 통계 조회
export async function fetchAgencyStats(): Promise<AgencyStats> {
  try {
    const res = await fetch(`${API_BASE}/agency-stats`);
    if (!res.ok) return { activeTrainees: 0, globalIcons: 0, activeCampaigns: 0, pendingCampaigns: 0 };
    return res.json();
  } catch {
    return { activeTrainees: 0, globalIcons: 0, activeCampaigns: 0, pendingCampaigns: 0 };
  }
}

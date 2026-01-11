import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'yapdol',
  user: 'yapdol',
  password: 'yapdol123',
});

// 사용자 정보 조회 (지갑 주소로)
app.get('/api/user/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const result = await pool.query(
      'SELECT * FROM users WHERE wallet_address = $1',
      [walletAddress]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 사용자 포트폴리오 조회
app.get('/api/portfolio/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const result = await pool.query(
      `SELECT 
        up.id,
        up.holdings,
        up.my_points,
        a.id as artist_id,
        a.english_name,
        a.korean_name,
        a.agency,
        a.image_url,
        a.status,
        a.hype_points,
        a.d_day
      FROM user_portfolio up
      JOIN users u ON up.user_id = u.id
      JOIN artists a ON up.artist_id = a.id
      WHERE u.wallet_address = $1`,
      [walletAddress]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 프로모션 카운트 조회 (promotion_history에서 실제 개수 계산)
app.get('/api/promotion-counts/:walletAddress/:artistId', async (req, res) => {
  try {
    const { walletAddress, artistId } = req.params;
    const result = await pool.query(
      `SELECT ph.platform, COUNT(*) as count
      FROM promotion_history ph
      JOIN users u ON ph.user_id = u.id
      WHERE u.wallet_address = $1 AND ph.artist_id = $2
      GROUP BY ph.platform`,
      [walletAddress, artistId]
    );
    const counts = { x: 0, instagram: 0, youtube: 0, wechat: 0, weibo: 0 };
    result.rows.forEach(row => {
      counts[row.platform] = parseInt(row.count);
    });
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 프로모션 히스토리 조회
app.get('/api/promotion-history/:walletAddress/:artistId', async (req, res) => {
  try {
    const { walletAddress, artistId } = req.params;
    const result = await pool.query(
      `SELECT ph.id, ph.platform, ph.link, ph.content, ph.created_at
      FROM promotion_history ph
      JOIN users u ON ph.user_id = u.id
      WHERE u.wallet_address = $1 AND ph.artist_id = $2
      ORDER BY ph.created_at DESC
      LIMIT 10`,
      [walletAddress, artistId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 프로모션 히스토리 추가 (야핑하기)
app.post('/api/promotion-history', async (req, res) => {
  try {
    const { walletAddress, artistId, platform, link, content } = req.body;
    
    // 사용자 ID 조회
    const userResult = await pool.query(
      'SELECT id FROM users WHERE wallet_address = $1',
      [walletAddress]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userId = userResult.rows[0].id;
    
    // 프로모션 히스토리에 추가
    const result = await pool.query(
      `INSERT INTO promotion_history (user_id, artist_id, platform, link, content, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userId, artistId, platform, link, content]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 활동 내역 조회
app.get('/api/activity/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const result = await pool.query(
      `SELECT 
        al.id,
        al.activity_type,
        al.amount,
        al.created_at,
        a.english_name as artist_name
      FROM activity_ledger al
      JOIN users u ON al.user_id = u.id
      JOIN artists a ON al.artist_id = a.id
      WHERE u.wallet_address = $1
      ORDER BY al.created_at DESC
      LIMIT 20`,
      [walletAddress]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agency: 모든 아티스트 조회
app.get('/api/artists', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM artists ORDER BY status, english_name'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agency: 캠페인 목록 조회
app.get('/api/campaigns/:agencyWallet', async (req, res) => {
  try {
    const { agencyWallet } = req.params;
    const result = await pool.query(
      `SELECT 
        c.*,
        a.english_name as artist_name,
        a.korean_name as artist_korean_name
      FROM campaigns c
      JOIN users u ON c.agency_id = u.id
      JOIN artists a ON c.artist_id = a.id
      WHERE u.wallet_address = $1
      ORDER BY c.created_at DESC`,
      [agencyWallet]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agency: 캠페인 프로모션 로그 조회
app.get('/api/campaign-log/:artistId', async (req, res) => {
  try {
    const { artistId } = req.params;
    const result = await pool.query(
      `SELECT 
        cpl.id,
        cpl.platform,
        cpl.publisher_username,
        cpl.content,
        cpl.link,
        cpl.created_at
      FROM campaign_promotion_log cpl
      WHERE cpl.artist_id = $1
      ORDER BY cpl.created_at DESC
      LIMIT 10`,
      [artistId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agency: 통계 조회
app.get('/api/agency-stats', async (req, res) => {
  try {
    const trainees = await pool.query(
      "SELECT COUNT(*) FROM artists WHERE status = 'funding'"
    );
    const icons = await pool.query(
      "SELECT COUNT(*) FROM artists WHERE status = 'market'"
    );
    const activeCampaigns = await pool.query(
      "SELECT COUNT(*) FROM campaigns WHERE status = 'active'"
    );
    const pendingCampaigns = await pool.query(
      "SELECT COUNT(*) FROM campaigns WHERE status = 'pending'"
    );
    
    res.json({
      activeTrainees: parseInt(trainees.rows[0].count),
      globalIcons: parseInt(icons.rows[0].count),
      activeCampaigns: parseInt(activeCampaigns.rows[0].count),
      pendingCampaigns: parseInt(pendingCampaigns.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`YapDol API Server running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Signer for contract interactions
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const signer = SIGNER_PRIVATE_KEY ? new ethers.Wallet(SIGNER_PRIVATE_KEY) : null;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  port: 5433,
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
  const client = await pool.connect();

  try {
    const { walletAddress, artistId, platform, link, content } = req.body;

    await client.query('BEGIN');

    // 사용자 ID 조회
    const userResult = await client.query(
      'SELECT id FROM users WHERE wallet_address = $1',
      [walletAddress]
    );

    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userResult.rows[0].id;

    // 프로모션 히스토리에 추가
    const result = await client.query(
      `INSERT INTO promotion_history (user_id, artist_id, platform, link, content, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userId, artistId, platform, link, content]
    );

    // 포트폴리오 확인 및 생성/업데이트 (야핑 시 포인트 적립)
    const POINTS_PER_YAPPING = 1000; // 야핑 1회당 적립 포인트

    const portfolioResult = await client.query(
      'SELECT id FROM user_portfolio WHERE user_id = $1 AND artist_id = $2',
      [userId, artistId]
    );

    if (portfolioResult.rows.length === 0) {
      // 포트폴리오가 없으면 생성
      await client.query(
        `INSERT INTO user_portfolio (user_id, artist_id, holdings, my_points)
         VALUES ($1, $2, 0, $3)`,
        [userId, artistId, POINTS_PER_YAPPING]
      );
    } else {
      // 포트폴리오가 있으면 포인트 추가
      await client.query(
        `UPDATE user_portfolio SET my_points = my_points + $1
         WHERE user_id = $2 AND artist_id = $3`,
        [POINTS_PER_YAPPING, userId, artistId]
      );
    }

    await client.query('COMMIT');

    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
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

// Token Swap (Hype Points → Artist Token)
app.post('/api/token/swap', async (req, res) => {
  const client = await pool.connect();

  try {
    const { walletAddress, artistId, hypePoints, tokensToMint } = req.body;

    // 입력값 검증
    if (!walletAddress || !artistId || !hypePoints || !tokensToMint) {
      return res.status(400).json({
        success: false,
        tokensReceived: 0,
        message: 'Missing required fields'
      });
    }

    if (hypePoints <= 0 || tokensToMint <= 0) {
      return res.status(400).json({
        success: false,
        tokensReceived: 0,
        message: 'Invalid amount'
      });
    }

    await client.query('BEGIN');

    // 사용자 ID 조회
    const userResult = await client.query(
      'SELECT id FROM users WHERE wallet_address = $1',
      [walletAddress]
    );

    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        tokensReceived: 0,
        message: 'User not found'
      });
    }

    const userId = userResult.rows[0].id;

    // 사용자 포트폴리오에서 현재 my_points 확인
    let portfolioResult = await client.query(
      'SELECT id, my_points, holdings FROM user_portfolio WHERE user_id = $1 AND artist_id = $2',
      [userId, artistId]
    );

    // 포트폴리오가 없으면 자동으로 생성 (기본 10만 포인트 지급)
    if (portfolioResult.rows.length === 0) {
      const insertResult = await client.query(
        `INSERT INTO user_portfolio (user_id, artist_id, holdings, my_points)
         VALUES ($1, $2, 0, 100000)
         RETURNING id, my_points, holdings`,
        [userId, artistId]
      );
      portfolioResult = insertResult;
    }

    const portfolio = portfolioResult.rows[0];
    const currentPoints = parseInt(portfolio.my_points);

    // 포인트 잔액 확인
    if (currentPoints < hypePoints) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        tokensReceived: 0,
        message: 'Insufficient hype points'
      });
    }

    // my_points 차감 및 holdings 증가
    await client.query(
      `UPDATE user_portfolio
       SET my_points = my_points - $1, holdings = holdings + $2
       WHERE id = $3`,
      [hypePoints, tokensToMint, portfolio.id]
    );

    // Activity Ledger에 SWAP 활동 기록 추가
    await client.query(
      `INSERT INTO activity_ledger (user_id, artist_id, activity_type, amount, created_at)
       VALUES ($1, $2, 'SWAP', $3, NOW())`,
      [userId, artistId, `${tokensToMint.toLocaleString()} TOKENS`]
    );

    await client.query('COMMIT');

    // 가상의 트랜잭션 해시 생성
    const transactionHash = `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;

    res.json({
      success: true,
      transactionHash,
      tokensReceived: tokensToMint,
      message: 'Token swap completed successfully'
    });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({
      success: false,
      tokensReceived: 0,
      message: err.message
    });
  } finally {
    client.release();
  }
});

// Token Swap Signature (On-chain swap with signature)
app.post('/api/token/swap-signature', async (req, res) => {
  const client = await pool.connect();

  try {
    const { walletAddress, artistId, hypePoints, tokensToMint } = req.body;

    // Check if signer is configured
    if (!signer) {
      return res.status(500).json({
        success: false,
        message: 'Signer not configured'
      });
    }

    // 입력값 검증
    if (!walletAddress || !artistId || !hypePoints || !tokensToMint) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (hypePoints <= 0 || tokensToMint <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    await client.query('BEGIN');

    // 사용자 ID 조회
    const userResult = await client.query(
      'SELECT id FROM users WHERE wallet_address = $1',
      [walletAddress]
    );

    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userId = userResult.rows[0].id;

    // 사용자 포트폴리오에서 현재 my_points 확인
    let portfolioResult = await client.query(
      'SELECT id, my_points, holdings FROM user_portfolio WHERE user_id = $1 AND artist_id = $2',
      [userId, artistId]
    );

    // 포트폴리오가 없으면 자동으로 생성 (기본 10만 포인트 지급)
    if (portfolioResult.rows.length === 0) {
      const insertResult = await client.query(
        `INSERT INTO user_portfolio (user_id, artist_id, holdings, my_points)
         VALUES ($1, $2, 0, 100000)
         RETURNING id, my_points, holdings`,
        [userId, artistId]
      );
      portfolioResult = insertResult;
    }

    const portfolio = portfolioResult.rows[0];
    const currentPoints = parseInt(portfolio.my_points);

    // 포인트 잔액 확인
    if (currentPoints < hypePoints) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: 'Insufficient hype points'
      });
    }

    // my_points 차감 및 holdings 증가
    await client.query(
      `UPDATE user_portfolio
       SET my_points = my_points - $1, holdings = holdings + $2
       WHERE id = $3`,
      [hypePoints, tokensToMint, portfolio.id]
    );

    // Activity Ledger에 SWAP 활동 기록 추가
    await client.query(
      `INSERT INTO activity_ledger (user_id, artist_id, activity_type, amount, created_at)
       VALUES ($1, $2, 'SWAP', $3, NOW())`,
      [userId, artistId, `${tokensToMint.toLocaleString()} TOKENS`]
    );

    await client.query('COMMIT');

    // Generate signature for on-chain minting
    const nonce = Date.now();
    const messageHash = ethers.solidityPackedKeccak256(
      ['address', 'uint256', 'uint256', 'uint256', 'uint256'],
      [walletAddress, artistId, hypePoints, tokensToMint, nonce]
    );
    const signature = await signer.signMessage(ethers.getBytes(messageHash));

    res.json({
      success: true,
      signature,
      nonce,
      factoryAddress: FACTORY_ADDRESS,
      artistId,
      hypePoints,
      tokensToMint,
      message: 'Signature generated successfully. Call the contract to mint tokens.'
    });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({
      success: false,
      message: err.message
    });
  } finally {
    client.release();
  }
});

// Get contract info
app.get('/api/contract-info', (req, res) => {
  res.json({
    factoryAddress: FACTORY_ADDRESS || null,
    signerAddress: signer ? signer.address : null,
    network: 'Mantle Sepolia',
    chainId: 5003
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`YapDol API Server running on http://localhost:${PORT}`);
});

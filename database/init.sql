-- =============================================
-- YapDol Database Schema
-- =============================================

-- 1. 회원 테이블 (Users)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    profile_image VARCHAR(500),
    total_points BIGINT DEFAULT 0,
    global_rank INTEGER DEFAULT 0,
    roi_percentage DECIMAL(10, 2) DEFAULT 0,
    is_agency BOOLEAN DEFAULT FALSE,
    agency_name VARCHAR(100),
    agency_access_code VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 아티스트 테이블 (Artists)
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    english_name VARCHAR(100) NOT NULL,
    korean_name VARCHAR(100),
    agency VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    status VARCHAR(20) NOT NULL CHECK (status IN ('funding', 'market', 'inactive')),
    hype_points BIGINT DEFAULT 0,
    d_day INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 사용자 포트폴리오 (User Portfolio - 사용자가 투자한 아티스트)
CREATE TABLE user_portfolio (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    holdings BIGINT DEFAULT 0,
    my_points BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, artist_id)
);

-- 4. 소셜 프로모션 카운트 (플랫폼별 홍보 횟수)
CREATE TABLE promotion_counts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('x', 'instagram', 'youtube', 'wechat', 'weibo')),
    count INTEGER DEFAULT 0,
    UNIQUE(user_id, artist_id, platform)
);

-- 5. 프로모션 히스토리 (홍보 활동 기록)
CREATE TABLE promotion_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL,
    link VARCHAR(500),
    content VARCHAR(500),
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. 활동 내역 (Activity Ledger)
CREATE TABLE activity_ledger (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    activity_type VARCHAR(20) NOT NULL CHECK (activity_type IN ('SUPPORT', 'DIVIDEND', 'CAMPAIGN', 'SWAP')),
    amount VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. 캠페인 테이블 (Agency Portal용)
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    agency_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    duration_days INTEGER NOT NULL,
    target_hype_points BIGINT NOT NULL,
    current_hype_points BIGINT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'pending')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP
);

-- 8. 캠페인 프로모션 로그 (Agency가 보는 홍보 로그)
CREATE TABLE campaign_promotion_log (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL,
    publisher_username VARCHAR(100),
    content VARCHAR(500),
    link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 인덱스 생성
-- =============================================
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_user_portfolio_user ON user_portfolio(user_id);
CREATE INDEX idx_activity_ledger_user ON activity_ledger(user_id);
CREATE INDEX idx_campaigns_agency ON campaigns(agency_id);

-- =============================================
-- 가짜 데이터 삽입
-- =============================================

-- 1. 아티스트 데이터
INSERT INTO artists (english_name, korean_name, agency, image_url, status, hype_points, d_day) VALUES
('MINJI', '민지', 'ADOR', '/images/minji.jpg', 'funding', 185000, 2),
('HAERIN', '해린', 'ADOR', '/images/haerin.jpg', 'market', 1800000, NULL),
('DANIELLE', '다니엘', 'ADOR', '/images/danielle.jpg', 'market', 2100000, NULL),
('HANNI', '하니', 'ADOR', '/images/hanni.jpg', 'market', 2300000, NULL),
('SULYOON', '설윤', 'JYP', '/images/sulyoon.jpg', 'market', 2420000, NULL),
('SOHEE', '소희', 'ADOR', '/images/sohee.jpg', 'funding', 450000, 14),
('KAI', '카이', 'ADOR', '/images/kai.jpg', 'funding', 320000, 21),
('JUN', '준', 'ADOR', '/images/jun.jpg', 'funding', 180000, 30),
('YUNA', '유나', 'ADOR', '/images/yuna.jpg', 'inactive', 0, NULL),
('JENNIE', '제니', 'YG', '/images/jennie.jpg', 'market', 5000000, NULL);

-- 2. 사용자 데이터 (지갑 주소: 0xa272495f292E2FF1f96A80ff5DbBF7d7E3d396c8)
INSERT INTO users (wallet_address, username, profile_image, total_points, global_rank, roi_percentage, is_agency, agency_name, agency_access_code) VALUES
('0xa272495f292E2FF1f96A80ff5DbBF7d7E3d396c8', 'CryptoFan_KR', '/images/profile1.jpg', 1245000, 1, 3.0, FALSE, NULL, NULL),
('0xADOR_AGENCY_WALLET_ADDRESS', 'ADOR Entertainment', '/images/ador_logo.jpg', 0, 0, 0, TRUE, 'ADOR', 'YAPDOL-LABEL-2025');

-- 3. 사용자 포트폴리오 (지갑 주소 사용자가 투자한 아티스트)
-- MOCK_ARTISTS 기준: MINJI, SULYOON, JENNIE (모두 이미지 있음)
INSERT INTO user_portfolio (user_id, artist_id, holdings, my_points) VALUES
(1, 1, 1420, 84200),   -- MINJI (market)
(1, 5, 800, 42000),    -- SULYOON (market) - MOCK_ARTISTS에 있음
(1, 10, 1420, 65000);  -- JENNIE (market) - MOCK_ARTISTS에 있음

-- 4. 플랫폼별 프로모션 카운트
INSERT INTO promotion_counts (user_id, artist_id, platform, count) VALUES
-- MINJI
(1, 1, 'x', 45),
(1, 1, 'instagram', 23),
(1, 1, 'youtube', 12),
(1, 1, 'wechat', 5),
(1, 1, 'weibo', 8),
-- SULYOON
(1, 5, 'x', 30),
(1, 5, 'instagram', 15),
(1, 5, 'youtube', 8),
(1, 5, 'wechat', 3),
(1, 5, 'weibo', 5),
-- JENNIE
(1, 10, 'x', 38),
(1, 10, 'instagram', 20),
(1, 10, 'youtube', 10),
(1, 10, 'wechat', 4),
(1, 10, 'weibo', 6);

-- 5. 프로모션 히스토리
INSERT INTO promotion_history (user_id, artist_id, platform, link, content, created_at) VALUES
(1, 1, 'youtube', 'https://youtube.com/watch?v=abc123', 'Fan Reaction Video', '2024-12-20 14:30:00'),
(1, 1, 'x', 'https://x.com/user/status/123', 'Concert Highlights Thread', '2024-12-18 10:15:00'),
(1, 1, 'instagram', 'https://instagram.com/p/xyz789', 'Photo Collection Post', '2024-12-15 18:45:00'),
(1, 5, 'x', 'https://x.com/user/status/456', 'SULYOON Support Post', '2024-12-22 09:00:00'),
(1, 5, 'youtube', 'https://youtube.com/watch?v=def456', 'Dance Practice Reaction', '2024-12-19 16:20:00'),
(1, 10, 'instagram', 'https://instagram.com/p/abc123', 'Birthday Celebration Post', '2024-12-17 12:00:00');

-- 6. 활동 내역 (Activity Ledger)
INSERT INTO activity_ledger (user_id, artist_id, activity_type, amount, created_at) VALUES
(1, 1, 'SUPPORT', '120 PTS', NOW() - INTERVAL '2 hours'),
(1, 5, 'REWARD', '450 PTS', NOW() - INTERVAL '5 hours'),
(1, 10, 'SWAP', '1,000 PTS', NOW() - INTERVAL '1 day');

-- 7. 캠페인 데이터 (Agency Portal용)
INSERT INTO campaigns (agency_id, artist_id, duration_days, target_hype_points, current_hype_points, status, ends_at) VALUES
(2, 6, 14, 500000, 450000, 'active', NOW() + INTERVAL '14 days'),
(2, 7, 21, 400000, 320000, 'active', NOW() + INTERVAL '21 days'),
(2, 8, 30, 300000, 180000, 'active', NOW() + INTERVAL '30 days');

-- 8. 캠페인 프로모션 로그
INSERT INTO campaign_promotion_log (campaign_id, artist_id, platform, publisher_username, content, link, created_at) VALUES
(1, 6, 'x', '@Hype_Master_99', 'Official Concept Teaser #1', 'https://x.com/status/1', '2025-01-14 10:00:00'),
(1, 6, 'instagram', '@Dance_Lover_KR', 'Daily Practice Log - Dance', 'https://instagram.com/p/1', '2025-01-12 15:30:00'),
(1, 6, 'youtube', '@Vocal_Queen', 'Vocal Cover: "Ditto"', 'https://youtube.com/watch?v=1', '2025-01-10 20:00:00'),
(2, 7, 'x', '@KPop_Fan_2025', 'KAI Dance Challenge', 'https://x.com/status/2', '2025-01-13 11:00:00'),
(2, 7, 'instagram', '@Trainee_Support', 'KAI Fan Art Collection', 'https://instagram.com/p/2', '2025-01-11 14:00:00'),
(3, 8, 'youtube', '@Reaction_King', 'JUN Vocal Analysis', 'https://youtube.com/watch?v=2', '2025-01-09 18:00:00');

-- =============================================
-- 뷰 생성 (편의용)
-- =============================================

-- 사용자 포트폴리오 상세 뷰
CREATE VIEW v_user_portfolio_detail AS
SELECT 
    up.id,
    u.wallet_address,
    u.username,
    a.english_name as artist_name,
    a.korean_name as artist_korean_name,
    a.agency,
    a.status as artist_status,
    up.holdings,
    up.my_points,
    a.image_url
FROM user_portfolio up
JOIN users u ON up.user_id = u.id
JOIN artists a ON up.artist_id = a.id;

-- 활동 내역 상세 뷰
CREATE VIEW v_activity_ledger_detail AS
SELECT 
    al.id,
    u.wallet_address,
    a.english_name as artist_name,
    al.activity_type,
    al.amount,
    al.created_at
FROM activity_ledger al
JOIN users u ON al.user_id = u.id
JOIN artists a ON al.artist_id = a.id
ORDER BY al.created_at DESC;

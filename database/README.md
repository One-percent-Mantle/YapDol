# YapDol Database 설정

## 실행 방법

### 1. Docker로 PostgreSQL 실행
```bash
cd YapDol
docker-compose up -d
```

### 2. DB 접속 정보
- **Host**: localhost
- **Port**: 5432
- **Database**: yapdol
- **User**: yapdol
- **Password**: yapdol123

### 3. 백엔드 API 실행
```bash
cd yapdol-backend
npm install
npm run dev
```
API 서버: http://localhost:3001

---

## 테이블 구조

| 테이블 | 설명 |
|--------|------|
| `users` | 회원 정보 (지갑 주소, 포인트, 랭킹 등) |
| `artists` | 아티스트 정보 (이름, 소속사, 상태 등) |
| `user_portfolio` | 사용자가 투자한 아티스트 목록 |
| `promotion_counts` | 플랫폼별 홍보 횟수 |
| `promotion_history` | 홍보 활동 기록 |
| `activity_ledger` | 활동 내역 (SUPPORT, DIVIDEND 등) |
| `campaigns` | 캠페인 정보 (Agency Portal용) |
| `campaign_promotion_log` | 캠페인 프로모션 로그 |

---

## API 엔드포인트

### MyPage용
- `GET /api/user/:walletAddress` - 사용자 정보
- `GET /api/portfolio/:walletAddress` - 포트폴리오
- `GET /api/promotion-counts/:walletAddress/:artistId` - 프로모션 카운트
- `GET /api/promotion-history/:walletAddress/:artistId` - 프로모션 히스토리
- `GET /api/activity/:walletAddress` - 활동 내역

### Agency Portal용
- `GET /api/artists` - 모든 아티스트
- `GET /api/campaigns/:agencyWallet` - 캠페인 목록
- `GET /api/campaign-log/:artistId` - 캠페인 프로모션 로그
- `GET /api/agency-stats` - 통계

---

## 테스트 지갑 주소
```
0xa272495f292E2FF1f96A80ff5DbBF7d7E3d396c8
```

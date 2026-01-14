# YapDol (Yapdol) - Social Mining Protocol for K-Pop Fandoms

> **"Turn Your Fandom Energy Into Real Value"**

YapDol is a Web3-powered social mining platform where K-Pop fans earn rewards by promoting their favorite artists on social media. Built on Mantle L2 Network.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Deployment](#installation--deployment)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [Team](#team)

---

## Overview

### The Problem
- Traditional K-Pop fan activities (streaming, voting, social media promotion) are not fairly rewarded
- Fans invest time and effort but receive no tangible value
- Entertainment agencies struggle to measure and incentivize organic fan engagement

### The Solution
YapDol creates a **Social Mining Protocol** where:
1. Fans earn **Hype Points** by promoting artists on social media ("Yapping")
2. Points can be swapped for **Artist Tokens**
3. Token holders participate in governance and receive rewards based on artist success

---

## Features

### For Fans (Yappers)
- **Yapping (Social Mining)**: Submit social media posts promoting artists to earn Hype Points
- **Token Swap**: Convert Hype Points to Artist Tokens
- **Portfolio Management**: Track holdings across multiple artists
- **Activity History**: View all yapping and reward activities

### For Agencies (Labels)
- **Campaign Management**: Create and manage promotional campaigns
- **Analytics Dashboard**: Monitor real-time promotion metrics
- **Trainee Incubation**: Crowdfunded debut support system

### Two-Tier System
| Tier | Name | Description |
|------|------|-------------|
| 01 | **Trainee Archive** | Pre-debut artists. Fans support trainees through yapping to help them reach debut goals |
| 02 | **Hype Ranking** | Debuted artists. Token holders receive dividends from artist activity revenue |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Web3** | wagmi v3, viem, Mantle L2 Network |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL 16 |
| **Infrastructure** | Docker, Docker Compose |
| **UI/Animation** | Framer Motion, Lucide Icons |

---

## Architecture

```
yapdol/
├── yapdol-frontend/     # React + Vite frontend application
├── yapdol-backend/      # Express.js API server
├── database/            # PostgreSQL schema and seed data
└── docker-compose.yml   # Docker orchestration
```

```
[User] <---> [Frontend (React)] <---> [Backend (Express)]
                   |                         |
                   v                         v
           [Mantle L2 Network]        [PostgreSQL DB]
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn**
- **Docker** & **Docker Compose** (for database)
- **Git**

---

## Installation & Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/One-percent-Mantle/yapdol.git
cd yapdol
```

### 2. Start the Database

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify database is running
docker ps
# You should see: yapdol-db container running on port 5433
```

The database will be automatically initialized with:
- Schema (tables, indexes, views)
- Sample data (artists, users, campaigns)

### 3. Start the Backend Server

```bash
cd yapdol-backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The API server will start at `http://localhost:3002`

### 4. Start the Frontend Application

```bash
cd yapdol-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173`

### 5. Build for Production

```bash
# Frontend
cd yapdol-frontend
npm run build
# Output: yapdol-frontend/dist/

# Backend
cd yapdol-backend
npm start
```

---

## Quick Start (All-in-One)

```bash
# 1. Start database
docker-compose up -d

# 2. Install all dependencies and start servers (run in separate terminals)
# Terminal 1 - Backend
cd yapdol-backend && npm install && npm run dev

# Terminal 2 - Frontend
cd yapdol-frontend && npm install && npm run dev
```

---

## Environment Variables

### Frontend (`yapdol-frontend/.env.local`)
```env
VITE_API_URL=http://localhost:3002
```

### Backend
Database configuration is in `yapdol-backend/src/index.js`:
```javascript
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'yapdol',
  user: 'yapdol',
  password: 'yapdol123',
});
```

---

## API Endpoints

### User Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/:walletAddress` | Get user info by wallet |
| GET | `/api/portfolio/:walletAddress` | Get user's artist portfolio |
| GET | `/api/activity/:walletAddress` | Get user's activity history |

### Promotion (Yapping) Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/promotion-counts/:walletAddress/:artistId` | Get promotion counts by platform |
| GET | `/api/promotion-history/:walletAddress/:artistId` | Get promotion history |
| POST | `/api/promotion-history` | Submit new yapping activity |

### Token Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/swap` | Swap Hype Points for Artist Tokens |

### Agency Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/artists` | Get all artists |
| GET | `/api/campaigns/:agencyWallet` | Get agency's campaigns |
| GET | `/api/campaign-log/:artistId` | Get campaign promotion logs |
| GET | `/api/agency-stats` | Get agency dashboard stats |

---

## Database Schema

### Main Tables
- `users` - User accounts (fans & agencies)
- `artists` - Artist profiles (trainees & icons)
- `user_portfolio` - User's token holdings
- `promotion_history` - Yapping activity records
- `activity_ledger` - All activities (support, swap, rewards)
- `campaigns` - Agency promotional campaigns

---

## Project Structure

```
yapdol/
├── yapdol-frontend/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── FundingPage.tsx    # Trainee Archive
│   │   ├── MarketPage.tsx     # Hype Ranking
│   │   ├── MyPage.tsx         # User Portfolio
│   │   ├── AgencyPortal.tsx   # Label Dashboard
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   └── useWallet.ts   # Web3 wallet integration
│   ├── contexts/          # React contexts
│   ├── services/          # API service layer
│   ├── App.tsx            # Main application
│   └── package.json
│
├── yapdol-backend/
│   └── src/
│       └── index.js       # Express API server
│
├── database/
│   ├── init.sql           # Schema & seed data
│   └── README.md
│
└── docker-compose.yml     # PostgreSQL container config
```

---

## Wallet Connection

YapDol uses wagmi for Web3 wallet integration. Supported wallets:
- MetaMask
- WalletConnect
- Coinbase Wallet

The app connects to **Mantle L2 Network** for low-fee transactions.

---

## Demo

### Demo Video
**[Watch Demo on YouTube (3-5 min)](https://youtu.be/4N7qmdkCBLQ)**

### Test Account
Connect with any Ethereum wallet to test the platform. Sample data includes:
- Pre-configured artists (trainees and debuted icons)
- Demo campaigns
- Sample promotion history

### User Flow
1. Connect wallet
2. Browse Trainee Archive or Hype Ranking
3. Select an artist
4. Submit yapping (social media URL)
5. Earn Hype Points
6. Swap points for Artist Tokens

---

## Troubleshooting

### Database Connection Error
```bash
# Ensure Docker container is running
docker-compose up -d

# Check container logs
docker logs yapdol-db
```

### Port Already in Use
```bash
# Backend default port: 3002
# Frontend default port: 5173
# Database port: 5433

# Check port usage
netstat -ano | findstr :5433
```

### Clear Database and Restart
```bash
docker-compose down -v
docker-compose up -d
```

---

## License

This project was built for the Mantle Hackathon 2025.

---

## Team

**One Percent Mantle**

| Role | Contact |
|------|---------|
| Team Lead | Telegram: @TriaThome |

---

## Compliance Declaration

This project:
- Does **NOT** involve regulated securities
- Artist Tokens are **utility tokens** for platform governance and rewards only
- No financial returns are promised or guaranteed
- All token activities comply with applicable regulations
- This is a hackathon prototype for demonstration purposes

---

*Built with passion for K-Pop and Web3. Powered by Mantle Network.*

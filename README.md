# SD 2.0 Universal Action Token (UAT) - Investor DApp / SCCT Platform

## Project Overview
SD 2.0 is an institutional-grade RWA (Real World Asset) tokenization platform focused on sustainable development. This demo showcases the **Universal Action Token (UAT)** ecosystem, integrating ERC-3643 compliance, real-time RWA oracles, and automated revenue distribution.

### Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Three.js (React Three Fiber)
- **Blockchain**: Solidity, Hardhat, ethers.js/v6
- **Web3**: wagmi + viem, RainbowKit
- **Design**: Institutional dark mode, biophilic accents, sustainable architecture imagery, 3D background components

---

## Core Modules (Demo Implementation)

1.  **Token Layer**: Simplified ERC-3643 compliant security token (`UATToken.sol`) featuring identity-based whitelisting and transfer restrictions.
2.  **Revenue Distribution Engine**: Automated NOI allocation system (`RevenueEngine.sol`) distributing stablecoin payouts to token holders.
3.  **RWA Oracle Layer**: Mock Chainlink-style data feeds (`Treasury.sol`) for physical asset performance (solar energy, carbon credits, revenue).
4.  **Compliance Layer**: KYC/AML whitelist simulation and restricted transfer logic integrated into the DApp.
5.  **ESG Impact Dashboard**: Live tracking of environmental metrics (CO2 offset, energy generation) with institutional-grade reporting.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or any Web3 wallet

### Installation

1.  **Clone the repository**
2.  **Install Blockchain dependencies**
    ```bash
    cd blockchain
    npm install --legacy-peer-deps
    ```
3.  **Install Frontend dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

---

## Deployment Instructions

### Smart Contracts (Hardhat)

1.  **Environment Setup**: Create a `.env` file in the `blockchain` directory:
    ```env
    SEPOLIA_RPC_URL=your_rpc_url
    AMOY_RPC_URL=your_rpc_url
    PRIVATE_KEY=your_private_key
    ```

2.  **Compile Contracts**:
    ```bash
    npx hardhat compile
    ```

3.  **Deploy to Testnet (Sepolia/Amoy)**:
    ```bash
    npx hardhat run scripts/deploy.ts --network amoy
    ```

### Frontend (Next.js)

1.  **Environment Setup**: Create a `.env.local` file in the `frontend` directory:
    ```env
    NEXT_PUBLIC_WAGMI_PROJECT_ID=your_rainbowkit_project_id
    NEXT_PUBLIC_UAT_TOKEN_ADDRESS=deployed_address
    NEXT_PUBLIC_REVENUE_ENGINE_ADDRESS=deployed_address
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to view the DApp.

---

## Demo Features Walkthrough

- **Investor Dashboard**: View portfolio value, asset allocation, and key performance metrics.
- **Revenue Page**: Simulate NOI payouts and view historical distribution reports.
- **RWA Oracle**: Monitor live telemetry from physical solar and carbon assets.
- **Compliance Demo**: Test the transfer restriction logic by toggling whitelists.
- **ESG Dashboard**: Visualize the real-world impact of your investments.
- **Governance**: Preview the institutional DAO voting mechanism.

---

## Project Structure

```
sd/
├── blockchain/           # Hardhat Environment
│   ├── contracts/        # Solidity Smart Contracts
│   ├── scripts/          # Deployment & Interaction Scripts
│   └── test/             # Contract Unit Tests
└── frontend/             # Next.js 15 DApp
    ├── src/
    │   ├── app/          # App Router Pages
    │   ├── components/   # Reusable UI Components
    │   └── lib/          # Web3 Config & Utilities
```

---

## Legal Disclaimer
This is a **Functional Demo** for the SD 2.0 Platform. All data, yield figures, and asset performance metrics are simulated for demonstration purposes only. This is not financial advice or a solicitation for investment.

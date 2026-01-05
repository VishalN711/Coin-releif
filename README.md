# Coin-releif
# ReliefCoin: Blockchain-Powered Disaster Relief

ReliefCoin is a decentralized financial system designed to solve the two biggest problems in humanitarian aid: **corruption (leakage)** and **slow distribution**. 

By using "Programmable Digital Dollars," we ensure that emergency funds go directly to victims and can only be spent on survival essentials.

---

##  The Problem & Solution

* **The Problem:** Traditional aid often takes weeks to arrive and up to 30% of funds are lost to administrative middle-men or corruption.
* **The Solution:** ReliefCoin uses Smart Contracts to send funds instantly. The money is "locked" so it can only be spent at verified pharmacies and grocery stores.

---

##  Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Blockchain** | Solidity / Polygon | Secure, low-fee smart contracts |
| **Frontend** | React.js / Tailwind CSS | Fast, mobile-friendly user dashboard |
| **Backend** | Node.js / Express | Managing merchant & beneficiary verification |
| **Wallet** | Ethers.js / MetaMask | Secure digital signatures for transactions |

---

##  Project Structure

```text
/relief-coin-system
├── /contracts            # Solidity code for the logic of the aid
├── /frontend             # The Web App interface (React)
├── /backend              # API for verification and database management
├── .gitignore            # Security file to hide private keys
└── LICENSE               # MIT Open Source permissions

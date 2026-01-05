import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// Import your helper file and the Smart Contract ABI
import { getReliefContract, formatAmount } from './utils/blockchain';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Function to connect the user's MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask to use this app!");
    }
  };

  // 2. Function to load the Beneficiary's data from the Blockchain
  const loadBlockchainData = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const { reliefContract } = await getReliefContract();
      // Calling the 'beneficiaries' mapping from your Solidity contract
      const data = await reliefContract.beneficiaries(account);
      
      setBalance(formatAmount(data.balance));
      setIsVerified(data.isVerified);
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
    }
    setLoading(false);
  };

  // Automatically refresh data when the account changes
  useEffect(() => {
    if (account) loadBlockchainData();
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-blue-700">ReliefCoin Portal</h1>
        {!account ? (
          <button onClick={connectWallet} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
            Connect Wallet
          </button>
        ) : (
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-mono">
            {account.substring(0, 6)}...{account.substring(38)}
          </span>
        )}
      </header>

      <main className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Total Aid Available</h2>
          <p className="text-4xl font-bold text-gray-900">${balance} <span className="text-lg text-gray-400">USDC</span></p>
          
          <div className="mt-4 flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${isVerified ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm font-medium text-gray-600">
              {isVerified ? "ID Verified & Active" : "Verification Pending"}
            </span>
          </div>
        </div>

        <button 
          disabled={!isVerified}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg disabled:bg-gray-300"
        >
          Scan to Pay Merchant
        </button>
      </main>
    </div>
  );
}

export default App;

import { ethers } from "ethers";

// 1. Define the 'Rules' (ABI) - This must match your Solidity contract exactly
const contractABI = [
  "function distributeAid(address beneficiary, uint256 amount) public",
  "function spendAid(address merchant, uint256 amount) public",
  "function beneficiaries(address) public view returns (uint256 balance, bool isVerified)",
  "function approvedMerchants(address) public view returns (bool)",
  "event AidSpent(address indexed beneficiary, address indexed merchant, uint256 amount)"
];

const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";

/**
 * Initializes a connection to the smart contract
 * @returns {Object} { contract, signer, provider }
 */
export const getReliefContract = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found. Please install MetaMask.");

  // A Provider is for reading data; a Signer is for writing (spending/sending)
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  // Create the contract instance
  const reliefContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  return { reliefContract, signer, provider };
};

/**
 * Helper: Formats big blockchain numbers into readable decimals
 */
export const formatAmount = (rawAmount) => {
  return ethers.formatUnits(rawAmount, 18); // Assumes 18 decimals like most stablecoins
};

/**
 * Helper: Converts human readable numbers (e.g. "50.00") into blockchain format
 */
export const parseAmount = (amount) => {
  return ethers.parseUnits(amount.toString(), 18);
};

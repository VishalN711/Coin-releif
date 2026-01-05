const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = [ /* Add ABI from compiled Solidity here */ ];
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// Route to verify and fund a beneficiary
app.post('/api/verify-and-fund', async (req, res) => {
    const { address, amount } = req.body;
    try {
        const tx = await contract.distributeAid(address, ethers.parseUnits(amount, 18));
        await tx.wait();
        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Backend running on port 3000"));

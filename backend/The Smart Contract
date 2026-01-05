// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReliefAid {
    address public admin;
    
    struct Beneficiary {
        uint256 balance;
        bool isVerified;
    }

    mapping(address => Beneficiary) public beneficiaries;
    mapping(address => bool) public approvedMerchants;

    event AidDistributed(address indexed beneficiary, uint256 amount);
    event AidSpent(address indexed beneficiary, address indexed merchant, uint256 amount);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Admin verifies a beneficiary and allocates funds
    function distributeAid(address _beneficiary, uint256 _amount) public onlyAdmin {
        beneficiaries[_beneficiary].isVerified = true;
        beneficiaries[_beneficiary].balance += _amount;
        emit AidDistributed(_beneficiary, _amount);
    }

    // Admin approves a local merchant (e.g., a grocery store)
    function approveMerchant(address _merchant) public onlyAdmin {
        approvedMerchants[_merchant] = true;
    }

    // Beneficiary spends aid only at approved merchants
    function spendAid(address _merchant, uint256 _amount) public {
        require(beneficiaries[msg.sender].isVerified, "Not a verified beneficiary");
        require(beneficiaries[msg.sender].balance >= _amount, "Insufficient aid balance");
        require(approvedMerchants[_merchant], "Merchant not approved for essential goods");

        beneficiaries[msg.sender].balance -= _amount;
        emit AidSpent(msg.sender, _merchant, _amount);
    }
}

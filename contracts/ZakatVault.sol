// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ZakatVault {
    mapping(address => uint256) public lastZakatPaid;

    event ZakatPaid(address indexed user, address indexed recipient, uint256 amount, uint256 timestamp);

    function recordBalanceSnapshot(address user) external {
        // Used by off-chain agent to track history. 
        // In MVP, we can emit an event to track it off-chain or simply keep it as a stub.
    }

    function calculateZakatDue(address user, uint256 eligibleBalance) external pure returns (uint256) {
        // 2.5% of eligible balance. (eligibleBalance * 25) / 1000
        return (eligibleBalance * 25) / 1000;
    }

    function payZakat(address user, address recipient, uint256 amount) external {
        // In MVP, this function acts as an on-chain ledger/event emitter.
        // The actual stablecoin transfer is handled off-chain via x402 facilitator APIs.
        // The agent signs and calls this to update the timestamp after x402 settlement.
        // No recipient allowlist check is performed here - legitimacy is user's responsibility.
        
        lastZakatPaid[user] = block.timestamp;
        emit ZakatPaid(user, recipient, amount, block.timestamp);
    }
}

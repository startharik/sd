// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./UATToken.sol";

/**
 * @title RevenueEngine
 * @dev Distributes 25-30% NOI allocation to token holders in stablecoins.
 */
contract RevenueEngine is Ownable {
    UATToken public uatToken;
    IERC20 public stablecoin;

    uint256 public constant DISTRIBUTION_SHARE_PERCENT = 30; // 30% NOI allocation
    uint256 public totalRevenueDistributed;

    event RevenueDistributed(uint256 amount, uint256 timestamp);

    constructor(address _uatToken, address _stablecoin, address initialOwner) 
        Ownable(initialOwner) 
    {
        uatToken = UATToken(_uatToken);
        stablecoin = IERC20(_stablecoin);
    }

    /**
     * @dev Distribute NOI to token holders. For simplicity in this demo, 
     * we'll assume the contract holds enough stablecoins for distribution.
     * In a real project, this would involve snapshotting balances.
     */
    function distributeRevenue(uint256 noiAmount) external onlyOwner {
        uint256 payoutAmount = (noiAmount * DISTRIBUTION_SHARE_PERCENT) / 100;
        require(stablecoin.balanceOf(address(this)) >= payoutAmount, "Insufficient stablecoins for payout");
        
        // Mock distribution logic: In a real scenario, this would use snapshots 
        // to fairly distribute funds to all token holders.
        totalRevenueDistributed += payoutAmount;
        emit RevenueDistributed(payoutAmount, block.timestamp);
    }
}

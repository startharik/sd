// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Treasury
 * @dev Manages RWA asset data and oracle feeds (mock).
 */
contract Treasury is Ownable {
    struct RWAData {
        uint256 revenue;
        uint256 solarKwh;
        uint256 carbonCredits;
        uint256 timestamp;
    }

    RWAData public latestData;

    event RWADataUpdated(uint256 revenue, uint256 solarKwh, uint256 carbonCredits, uint256 timestamp);

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Mock Chainlink-style data update for revenue, solar kWh, carbon credits.
     */
    function updateRWAData(uint256 revenue, uint256 solarKwh, uint256 carbonCredits) external onlyOwner {
        latestData = RWAData({
            revenue: revenue,
            solarKwh: solarKwh,
            carbonCredits: carbonCredits,
            timestamp: block.timestamp
        });
        emit RWADataUpdated(revenue, solarKwh, carbonCredits, block.timestamp);
    }
}

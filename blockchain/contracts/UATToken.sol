// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title UATToken (Universal Action Token)
 * @dev Simplified ERC-3643 compliant token with whitelisting and transfer restrictions.
 */
contract UATToken is ERC20, Ownable {
    mapping(address => bool) public isWhitelisted;
    bool public transferRestricted = true;

    event Whitelisted(address indexed account, bool status);
    event TransferRestrictionChanged(bool restricted);

    constructor(string memory name, string memory symbol, address initialOwner) 
        ERC20(name, symbol) 
        Ownable(initialOwner) 
    {
        isWhitelisted[initialOwner] = true;
    }

    function setWhitelisted(address account, bool status) external onlyOwner {
        isWhitelisted[account] = status;
        emit Whitelisted(account, status);
    }

    function setTransferRestriction(bool restricted) external onlyOwner {
        transferRestricted = restricted;
        emit TransferRestrictionChanged(restricted);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(isWhitelisted[to], "Recipient not whitelisted");
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value) internal override {
        if (transferRestricted && from != address(0) && to != address(0)) {
            require(isWhitelisted[from], "Sender not whitelisted");
            require(isWhitelisted[to], "Recipient not whitelisted");
        }
        super._update(from, to, value);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./HalalRegistry.sol";

contract RemittanceRouter {
    using SafeERC20 for IERC20;

    HalalRegistry public registry;
    address public feeTreasury;
    uint256 public flatFeeAmount;

    event RemittanceSent(address indexed from, address indexed to, address token, uint256 amount, uint256 fee, bytes attributionTag);

    constructor(address _registry, address _feeTreasury, uint256 _flatFeeAmount) {
        registry = HalalRegistry(_registry);
        feeTreasury = _feeTreasury;
        flatFeeAmount = _flatFeeAmount;
    }

    function sendRemittance(address token, address to, uint256 amount, bytes calldata attributionTag) external {
        require(registry.isHalal(token), "Token is not halal compliant");
        require(amount > 0, "Amount must be greater than 0");
        
        uint256 totalRequired = amount + flatFeeAmount;
        
        // Transfer the total amount from the sender to this contract
        IERC20(token).safeTransferFrom(msg.sender, address(this), totalRequired);
        
        // Send the principal amount to the recipient
        IERC20(token).safeTransfer(to, amount);
        
        // Send the flat fee to the treasury
        IERC20(token).safeTransfer(feeTreasury, flatFeeAmount);
        
        // Emit the event with the ERC-8021 attribution tag for hackathon tracking
        emit RemittanceSent(msg.sender, to, token, amount, flatFeeAmount, attributionTag);
    }
}

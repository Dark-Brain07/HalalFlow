// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HalalRegistry {
    address public admin;
    mapping(address => bool) public isHalal;

    event RegistryUpdated(address indexed entity, bool isHalal);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addToRegistry(address entity, bool halal) external onlyAdmin {
        isHalal[entity] = halal;
        emit RegistryUpdated(entity, halal);
    }
}

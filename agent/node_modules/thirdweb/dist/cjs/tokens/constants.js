"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROXY_DEPLOY = exports.CONTRACT_DEPLOY = exports.MANAGER_ADDRESS = exports.OWNER_ADDRESS = exports.ENTRYPOINT_DEPLOY_URL = exports.CONTRACT_FACTORY_DEPLOY_URL = exports.DEFAULT_DEVELOPER_ADDRESS = exports.DEFAULT_DEVELOPER_REWARD_BPS = exports.DEFAULT_POOL_INITIAL_TICK = exports.DEFAULT_MAX_SUPPLY_ERC20 = void 0;
exports.DEFAULT_MAX_SUPPLY_ERC20 = 1000000000n;
exports.DEFAULT_POOL_INITIAL_TICK = 230200;
exports.DEFAULT_DEVELOPER_REWARD_BPS = 0;
exports.DEFAULT_DEVELOPER_ADDRESS = "0x1Af20C6B23373350aD464700B5965CE4B0D2aD94";
exports.CONTRACT_FACTORY_DEPLOY_URL = "ipfs://Qmd9WJU4YCD7kqmcQNA9jw8gvjpj1Ns5QUVjZxVzBm6hPy/1";
exports.ENTRYPOINT_DEPLOY_URL = "ipfs://Qmd9WJU4YCD7kqmcQNA9jw8gvjpj1Ns5QUVjZxVzBm6hPy/3";
exports.OWNER_ADDRESS = "0x1A472863cF21D5Aa27F417dF9140400324C48f22";
exports.MANAGER_ADDRESS = "0x9d4D20B7571F9552D730eCA812E805E7d5fb64E5";
exports.CONTRACT_DEPLOY = {
    CREATE: 0,
    CREATE2: 1,
    CREATE3: 2,
};
exports.PROXY_DEPLOY = {
    CLONE: 0, // Deterministic minimal proxy
    CLONE_IMMUTABLE_ARGS: 1, // Deterministic proxy with immutable args
    ERC1967: 2, // ERC1967 upgradeable proxy
    ERC1967_IMMUTABLE_ARGS: 3, // ERC1967 proxy with immutable args
    ERC1967_BEACON: 4, // ERC1967 beacon proxy
    ERC1967_BEACON_IMMUTABLE_ARGS: 5, // ERC1967 beacon proxy with immutable args
};
//# sourceMappingURL=constants.js.map
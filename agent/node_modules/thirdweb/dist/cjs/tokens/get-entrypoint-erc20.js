"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployedEntrypointERC20 = getDeployedEntrypointERC20;
exports.getDeployedContractFactory = getDeployedContractFactory;
const contract_js_1 = require("../contract/contract.js");
const infra_js_1 = require("../contract/deployment/utils/infra.js");
const computeDeployAddress_js_1 = require("../extensions/tokens/__generated__/ContractFactory/read/computeDeployAddress.js");
const computeProxyAddress_js_1 = require("../extensions/tokens/__generated__/ContractFactory/read/computeProxyAddress.js");
const encodeAbiParameters_js_1 = require("../utils/abi/encodeAbiParameters.js");
const normalizeFunctionParams_js_1 = require("../utils/abi/normalizeFunctionParams.js");
const deploy_metadata_js_1 = require("../utils/any-evm/deploy-metadata.js");
const is_contract_deployed_js_1 = require("../utils/bytecode/is-contract-deployed.js");
const hex_js_1 = require("../utils/encoding/hex.js");
const withCache_js_1 = require("../utils/promise/withCache.js");
const constants_js_1 = require("./constants.js");
async function getDeployedEntrypointERC20(options) {
    const cacheKey = `${options.chain.id}-${constants_js_1.ENTRYPOINT_DEPLOY_URL}-${JSON.stringify(options.client)}`;
    return (0, withCache_js_1.withCache)(async () => {
        // 1. Get deployed contract factory
        const contractFactory = await getDeployedContractFactory(options);
        if (!contractFactory) {
            throw new Error(`Contract factory not found on chain: ${options.chain.id}`);
        }
        // 2. Fetch metadata and encode args for entrypoint implementation
        const contractMetadata = await (0, deploy_metadata_js_1.fetchDeployMetadata)({
            client: options.client,
            uri: constants_js_1.ENTRYPOINT_DEPLOY_URL,
        });
        const bytecode = await (0, deploy_metadata_js_1.fetchBytecodeFromCompilerMetadata)({
            chain: options.chain,
            client: options.client,
            compilerMetadata: contractMetadata,
        });
        const constructorAbi = contractMetadata.abi.find((abi) => abi.type === "constructor");
        const encodedArgs = (0, encodeAbiParameters_js_1.encodeAbiParameters)(constructorAbi?.inputs ?? [], (0, normalizeFunctionParams_js_1.normalizeFunctionParams)(constructorAbi, {}));
        // 3. Compute entrypoint implementation address
        const entrypointImplAddress = await (0, computeDeployAddress_js_1.computeDeployAddress)({
            contract: contractFactory,
            deployType: constants_js_1.CONTRACT_DEPLOY.CREATE2,
            bytecode,
            constructorArgs: encodedArgs,
            salt: (0, hex_js_1.padHex)((0, hex_js_1.toHex)("ERC20_ENTRYPOINT:1"), { size: 32 }),
        });
        // 4. Compute entrypoint proxy address
        const entrypointProxyAddress = await (0, computeProxyAddress_js_1.computeProxyAddress)({
            contract: contractFactory,
            implementation: entrypointImplAddress,
            data: "0x",
            salt: (0, hex_js_1.padHex)((0, hex_js_1.toHex)("ERC20_ENTRYPOINT_PROXY:1"), { size: 32 }),
            deployType: constants_js_1.PROXY_DEPLOY.ERC1967,
        });
        const entrypointProxy = (0, contract_js_1.getContract)({
            ...options,
            address: entrypointProxyAddress,
        });
        const isDeployed = await (0, is_contract_deployed_js_1.isContractDeployed)(entrypointProxy);
        if (!isDeployed) {
            throw new Error(`Entrypoint is not deployed yet on chain: ${options.chain.id}`);
        }
        return entrypointProxy;
    }, {
        cacheKey,
        cacheTime: 24 * 60 * 60 * 1000, // 1 day
    });
}
async function getDeployedContractFactory(options) {
    const cacheKey = `${options.chain.id}-${constants_js_1.CONTRACT_FACTORY_DEPLOY_URL}-${JSON.stringify(options.client)}`;
    return (0, withCache_js_1.withCache)(async () => {
        const contractMetadata = await (0, deploy_metadata_js_1.fetchDeployMetadata)({
            client: options.client,
            uri: constants_js_1.CONTRACT_FACTORY_DEPLOY_URL,
        });
        return (0, infra_js_1.getDeployedInfraContractFromMetadata)({
            chain: options.chain,
            client: options.client,
            constructorParams: {
                owner: constants_js_1.OWNER_ADDRESS,
                manager: constants_js_1.MANAGER_ADDRESS,
            },
            contractMetadata,
            salt: "THIRDWEB_CONTRACT_FACTORY:1",
        });
    }, {
        cacheKey,
        cacheTime: 24 * 60 * 60 * 1000, // 1 day
    });
}
//# sourceMappingURL=get-entrypoint-erc20.js.map
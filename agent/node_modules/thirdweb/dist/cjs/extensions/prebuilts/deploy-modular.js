"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployModularContract = deployModularContract;
const deploy_via_autofactory_js_1 = require("../../contract/deployment/deploy-via-autofactory.js");
const bootstrap_js_1 = require("../../contract/deployment/utils/bootstrap.js");
const upload_js_1 = require("../../storage/upload.js");
const address_js_1 = require("../../utils/address.js");
const initialize_js_1 = require("../modules/__generated__/ERC20Core/write/initialize.js");
/**
 * Deploys an thirdweb ERC20 contract of the given type.
 * On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.
 * @param options - The deployment options.
 * @returns The deployed contract address.
 * @modules
 * @example
 * ```ts
 * import { deployModularContract } from "thirdweb/modules";
 * const contractAddress = await deployModularContract({
 *  chain,
 *  client,
 *  account,
 *  core: "ERC20",
 *  params: {
 *    name: "MyToken",
 *    description: "My Token contract",
 *    symbol: "MT",
 * },
 * modules: [
 *   ClaimableERC721.module({
 *     primarySaleRecipient: "0x...",
 *   }),
 *   RoyaltyERC721.module({
 *     royaltyRecipient: "0x...",
 *     royaltyBps: 500n,
 *   }),
 * ],
 * });
 * ```
 */
async function deployModularContract(options) {
    const { chain, client, account, publisher, core, params: coreParams, modules = [], salt, } = options;
    const contractId = getContractId(core);
    const { cloneFactoryContract, implementationContract } = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
        account,
        chain,
        client,
        contractId,
        publisher,
    });
    const contractURI = coreParams.contractURI ||
        (await (0, upload_js_1.upload)({
            client,
            files: [
                {
                    description: coreParams.description,
                    external_link: coreParams.external_link,
                    image: coreParams.image,
                    name: coreParams.name,
                    social_urls: coreParams.social_urls,
                    symbol: coreParams.symbol,
                },
            ],
        })) ||
        "";
    const initializeTransaction = await getInitializeTransactionForModularContract({
        account,
        accountAddress: (0, address_js_1.getAddress)(account.address),
        chain,
        client,
        contractId,
        implementationContract,
        initializeParams: {
            contractURI,
            name: coreParams.name || "",
            owner: coreParams.defaultAdmin
                ? (0, address_js_1.getAddress)(coreParams.defaultAdmin)
                : account.address,
            symbol: coreParams.symbol || "",
        },
        modules,
    });
    return (0, deploy_via_autofactory_js_1.deployViaAutoFactory)({
        account,
        chain,
        client,
        cloneFactoryContract,
        initializeTransaction,
        salt,
    });
}
async function getInitializeTransactionForModularContract(options) {
    const { client, implementationContract, contractId, initializeParams, modules, chain, account, } = options;
    switch (contractId) {
        case "ERC20CoreInitializable":
        case "ERC721CoreInitializable":
        case "ERC1155CoreInitializable": {
            // can't promise all this unfortunately, needs to be sequential because of nonces
            const moduleAddresses = [];
            const moduleInstallData = [];
            for (const installer of modules) {
                // this might deploy the module if not already deployed
                const installData = await installer({
                    account,
                    chain,
                    client,
                });
                moduleAddresses.push(installData.module);
                moduleInstallData.push(installData.data);
            }
            // all 3 cores have the same initializer
            return (0, initialize_js_1.initialize)({
                contract: implementationContract,
                contractURI: initializeParams.contractURI,
                moduleInstallData,
                modules: moduleAddresses,
                name: initializeParams.name,
                owner: initializeParams.owner,
                symbol: initializeParams.symbol,
            });
        }
        default:
            throw new Error(`Unsupported core type: ${contractId}`);
    }
}
function getContractId(core) {
    switch (core) {
        case "ERC20":
            return "ERC20CoreInitializable";
        case "ERC721":
            return "ERC721CoreInitializable";
        case "ERC1155":
            return "ERC1155CoreInitializable";
        default:
            throw new Error(`Unsupported core type: ${core}`);
    }
}
//# sourceMappingURL=deploy-modular.js.map
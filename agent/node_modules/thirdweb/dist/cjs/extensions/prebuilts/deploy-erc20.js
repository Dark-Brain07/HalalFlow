"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployERC20Contract = deployERC20Contract;
const deploy_via_autofactory_js_1 = require("../../contract/deployment/deploy-via-autofactory.js");
const bootstrap_js_1 = require("../../contract/deployment/utils/bootstrap.js");
const upload_js_1 = require("../../storage/upload.js");
const initialize_js_1 = require("./__generated__/DropERC20/write/initialize.js");
const initialize_js_2 = require("./__generated__/TokenERC20/write/initialize.js");
/**
 * Deploys an thirdweb ERC20 contract of the given type.
 * On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.
 * @param options - The deployment options.
 * @returns The deployed contract address.
 * @extension DEPLOY
 * @example
 * ```ts
 * import { deployERC20Contract } from "thirdweb/deploys";
 * const contractAddress = await deployERC20Contract({
 *  chain,
 *  client,
 *  account,
 *  type: "TokenERC20",
 *  params: {
 *    name: "MyToken",
 *    description: "My Token contract",
 *    symbol: "MT",
 * });
 * ```
 */
async function deployERC20Contract(options) {
    const { chain, client, account, type, params, publisher } = options;
    const { cloneFactoryContract, implementationContract } = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
        account,
        chain,
        client,
        contractId: type,
        publisher,
    });
    const initializeTransaction = await getInitializeTransaction({
        accountAddress: account.address,
        client,
        implementationContract,
        params,
        type,
    });
    return (0, deploy_via_autofactory_js_1.deployViaAutoFactory)({
        account,
        chain,
        client,
        cloneFactoryContract,
        initializeTransaction,
    });
}
async function getInitializeTransaction(options) {
    const { client, implementationContract, type, params, accountAddress } = options;
    const contractURI = options.params.contractURI ||
        (await (0, upload_js_1.upload)({
            client,
            files: [
                {
                    description: params.description,
                    external_link: params.external_link,
                    image: params.image,
                    name: params.name,
                    social_urls: params.social_urls,
                    symbol: params.symbol,
                },
            ],
        })) ||
        "";
    switch (type) {
        case "DropERC20":
            return (0, initialize_js_1.initialize)({
                contract: implementationContract,
                contractURI,
                defaultAdmin: params.defaultAdmin || accountAddress,
                name: params.name || "",
                platformFeeBps: params.platformFeeBps || 0n,
                platformFeeRecipient: params.platformFeeRecipient || accountAddress,
                saleRecipient: params.saleRecipient || accountAddress,
                symbol: params.symbol || "",
                trustedForwarders: params.trustedForwarders || [],
            });
        case "TokenERC20":
            return (0, initialize_js_2.initialize)({
                contract: implementationContract,
                contractURI,
                defaultAdmin: params.defaultAdmin || accountAddress,
                name: params.name || "",
                platformFeeBps: params.platformFeeBps || 0n,
                platformFeeRecipient: params.platformFeeRecipient || accountAddress,
                primarySaleRecipient: params.saleRecipient || accountAddress,
                symbol: params.symbol || "",
                trustedForwarders: params.trustedForwarders || [],
            });
    }
}
//# sourceMappingURL=deploy-erc20.js.map
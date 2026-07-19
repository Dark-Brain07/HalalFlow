"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploySplitContract = deploySplitContract;
const deploy_via_autofactory_js_1 = require("../../contract/deployment/deploy-via-autofactory.js");
const bootstrap_js_1 = require("../../contract/deployment/utils/bootstrap.js");
const upload_js_1 = require("../../storage/upload.js");
const initialize_js_1 = require("./__generated__/Split/write/initialize.js");
/**
 * Deploys a thirdweb [`Split contract`](https://thirdweb.com/thirdweb.eth/Split)
 * On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.
 * @param options - The deployment options.
 * @returns The deployed contract address.
 * @extension DEPLOY
 *
 * @example
 * ```ts
 * import { deploySplitContract } from "thirdweb/deploys";
 * const contractAddress = await deploySplitContract({
 *  chain,
 *  client,
 *  account,
 *  params: {
 *    name: "Split contract",
 *    payees: ["0x...123", "0x...456"],
 *    shares: [5100, 4900], // See type `SplitContractParams` for more context
 *  },
 * });
 * ```
 */
async function deploySplitContract(options) {
    const { chain, client, account, params } = options;
    const { cloneFactoryContract, implementationContract } = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
        account,
        chain,
        client,
        contractId: "Split",
    });
    const initializeTransaction = await getInitializeTransaction({
        accountAddress: account.address,
        client,
        implementationContract,
        params,
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
    const { client, implementationContract, params, accountAddress } = options;
    const { name, description, symbol, image, external_link, social_urls, payees, shares, } = params;
    const contractURI = params.contractURI ||
        (await (0, upload_js_1.upload)({
            client,
            files: [
                {
                    description,
                    external_link,
                    image,
                    name,
                    social_urls,
                    symbol,
                },
            ],
        })) ||
        "";
    return (0, initialize_js_1.initialize)({
        contract: implementationContract,
        contractURI,
        defaultAdmin: params.defaultAdmin || accountAddress,
        payees,
        shares,
        trustedForwarders: params.trustedForwarders || [],
    });
}
//# sourceMappingURL=deploy-split.js.map
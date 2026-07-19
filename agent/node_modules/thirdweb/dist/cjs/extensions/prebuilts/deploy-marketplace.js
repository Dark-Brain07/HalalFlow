"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMarketplaceContract = deployMarketplaceContract;
const resolve_abi_js_1 = require("../../contract/actions/resolve-abi.js");
const deploy_via_autofactory_js_1 = require("../../contract/deployment/deploy-via-autofactory.js");
const bootstrap_js_1 = require("../../contract/deployment/utils/bootstrap.js");
const upload_js_1 = require("../../storage/upload.js");
const royalty_engine_js_1 = require("../../utils/royalty-engine.js");
const initialize_js_1 = require("./__generated__/Marketplace/write/initialize.js");
const get_required_transactions_js_1 = require("./get-required-transactions.js");
/**
 * Deploys a marketplace contract.
 * @param options - The options for deploying the marketplace contract.
 *
 * @extension MARKETPLACE
 *
 * @example
 * ```ts
 * import { deployMarketplaceContract } from "thirdweb/deploys";
 *
 * const address = await deployMarketplaceContract({
      client,
      chain,
      account,
      params: {
        name: "MarketplaceV3",
        description: "MarketplaceV3 deployed using thirdweb SDK",
        platformFeeRecipient: "0x21d514c90ee4E4e4Cd16Ce9185BF01F0F1eE4A04",
        platformFeeBps: 1000,
      },
    });
 * ```
 */
async function deployMarketplaceContract(options) {
    const { chain, client, account, params, version } = options;
    const WETH = await (0, bootstrap_js_1.getOrDeployInfraContract)({
        account,
        chain,
        client,
        contractId: "WETH9",
    });
    let extensions = [];
    if (options.version !== "6.0.0") {
        const isFeeExempt = chain.id === 232 || chain.id === 37111;
        const direct = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
            account,
            chain,
            client,
            constructorParams: { _nativeTokenWrapper: WETH.address },
            contractId: "DirectListingsLogic",
            version: isFeeExempt ? "0.1.2" : "latest",
        });
        const english = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
            account,
            chain,
            client,
            constructorParams: { _nativeTokenWrapper: WETH.address },
            contractId: "EnglishAuctionsLogic",
            version: isFeeExempt ? "0.0.11" : "latest",
        });
        const offers = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
            account,
            chain,
            client,
            contractId: "OffersLogic",
            version: isFeeExempt ? "0.0.8" : "latest",
        });
        const [directFunctions, englishFunctions, offersFunctions] = await Promise.all([
            (0, resolve_abi_js_1.resolveContractAbi)(direct.implementationContract).then(get_required_transactions_js_1.generateExtensionFunctionsFromAbi),
            (0, resolve_abi_js_1.resolveContractAbi)(english.implementationContract).then(get_required_transactions_js_1.generateExtensionFunctionsFromAbi),
            (0, resolve_abi_js_1.resolveContractAbi)(offers.implementationContract).then(get_required_transactions_js_1.generateExtensionFunctionsFromAbi),
        ]);
        extensions = [
            {
                functions: directFunctions,
                metadata: {
                    implementation: direct.implementationContract.address,
                    metadataURI: "",
                    name: "Direct Listings",
                },
            },
            {
                functions: englishFunctions,
                metadata: {
                    implementation: english.implementationContract.address,
                    metadataURI: "",
                    name: "English Auctions",
                },
            },
            {
                functions: offersFunctions,
                metadata: {
                    implementation: offers.implementationContract.address,
                    metadataURI: "",
                    name: "Offers",
                },
            },
        ];
    }
    const { cloneFactoryContract, implementationContract } = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
        account,
        chain,
        client,
        constructorParams: {
            _marketplaceV3Params: {
                extensions,
                nativeTokenWrapper: WETH.address,
                royaltyEngineAddress: (0, royalty_engine_js_1.getRoyaltyEngineV1ByChainId)(chain.id),
            },
        },
        contractId: "MarketplaceV3",
        version,
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
                },
            ],
        })) ||
        "";
    return (0, initialize_js_1.initialize)({
        contract: implementationContract,
        contractURI,
        defaultAdmin: params.defaultAdmin || accountAddress,
        platformFeeBps: params.platformFeeBps || 0,
        platformFeeRecipient: params.platformFeeRecipient || accountAddress,
        trustedForwarders: params.trustedForwarders || [],
    });
}
//# sourceMappingURL=deploy-marketplace.js.map
import { resolveContractAbi } from "../../contract/actions/resolve-abi.js";
import { deployViaAutoFactory } from "../../contract/deployment/deploy-via-autofactory.js";
import { getOrDeployInfraContract, getOrDeployInfraForPublishedContract, } from "../../contract/deployment/utils/bootstrap.js";
import { upload } from "../../storage/upload.js";
import { getRoyaltyEngineV1ByChainId } from "../../utils/royalty-engine.js";
import { initialize as initMarketplace } from "./__generated__/Marketplace/write/initialize.js";
import { generateExtensionFunctionsFromAbi } from "./get-required-transactions.js";
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
export async function deployMarketplaceContract(options) {
    const { chain, client, account, params, version } = options;
    const WETH = await getOrDeployInfraContract({
        account,
        chain,
        client,
        contractId: "WETH9",
    });
    let extensions = [];
    if (options.version !== "6.0.0") {
        const isFeeExempt = chain.id === 232 || chain.id === 37111;
        const direct = await getOrDeployInfraForPublishedContract({
            account,
            chain,
            client,
            constructorParams: { _nativeTokenWrapper: WETH.address },
            contractId: "DirectListingsLogic",
            version: isFeeExempt ? "0.1.2" : "latest",
        });
        const english = await getOrDeployInfraForPublishedContract({
            account,
            chain,
            client,
            constructorParams: { _nativeTokenWrapper: WETH.address },
            contractId: "EnglishAuctionsLogic",
            version: isFeeExempt ? "0.0.11" : "latest",
        });
        const offers = await getOrDeployInfraForPublishedContract({
            account,
            chain,
            client,
            contractId: "OffersLogic",
            version: isFeeExempt ? "0.0.8" : "latest",
        });
        const [directFunctions, englishFunctions, offersFunctions] = await Promise.all([
            resolveContractAbi(direct.implementationContract).then(generateExtensionFunctionsFromAbi),
            resolveContractAbi(english.implementationContract).then(generateExtensionFunctionsFromAbi),
            resolveContractAbi(offers.implementationContract).then(generateExtensionFunctionsFromAbi),
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
    const { cloneFactoryContract, implementationContract } = await getOrDeployInfraForPublishedContract({
        account,
        chain,
        client,
        constructorParams: {
            _marketplaceV3Params: {
                extensions,
                nativeTokenWrapper: WETH.address,
                royaltyEngineAddress: getRoyaltyEngineV1ByChainId(chain.id),
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
    return deployViaAutoFactory({
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
        (await upload({
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
    return initMarketplace({
        contract: implementationContract,
        contractURI,
        defaultAdmin: params.defaultAdmin || accountAddress,
        platformFeeBps: params.platformFeeBps || 0,
        platformFeeRecipient: params.platformFeeRecipient || accountAddress,
        trustedForwarders: params.trustedForwarders || [],
    });
}
//# sourceMappingURL=deploy-marketplace.js.map
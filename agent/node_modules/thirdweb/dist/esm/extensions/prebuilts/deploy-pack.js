import { deployViaAutoFactory } from "../../contract/deployment/deploy-via-autofactory.js";
import { getOrDeployInfraContract, getOrDeployInfraForPublishedContract, } from "../../contract/deployment/utils/bootstrap.js";
import { upload } from "../../storage/upload.js";
import { initialize } from "./__generated__/Pack/write/initialize.js";
/**
 * @deprecated [Pack contract is incompatible with Pectra update. Support for this contract is being removed in next release.]
 *
 * Deploy a thirdweb Pack contract
 * @param options params for deploying [`Pack contract`](https://thirdweb.com/thirdweb.eth/Pack)
 * @returns
 *
 * @example
 * ```ts
 * import { deployPackContract } from "thirdweb/extensions/deploy";
 *
 * const packAddress = await deployPackContract({
 *   account,
 *   client,
 *   chain,
 *   params: {
 *     name: "Pack contract name",
 *     symbol: "PACK1155",
 *   },
 * });
 * ```
 * @extension DEPLOY
 */
export async function deployPackContract(options) {
    const { chain, client, account, params } = options;
    const [WETH, forwarder] = await Promise.all([
        getOrDeployInfraContract({
            account,
            chain,
            client,
            contractId: "WETH9",
        }),
        getOrDeployInfraContract({
            account,
            chain,
            client,
            contractId: "ForwarderEOAOnly",
        }),
    ]);
    const { cloneFactoryContract, implementationContract } = await getOrDeployInfraForPublishedContract({
        account,
        chain,
        client,
        constructorParams: {
            nativeTokenWrapper: WETH.address,
            trustedForwarder: forwarder.address,
        },
        contractId: "Pack",
    });
    const initializeTransaction = await getInitializeTransaction({
        accountAddress: account.address,
        chain,
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
/**
 * @internal
 */
async function getInitializeTransaction(options) {
    const { params, implementationContract, accountAddress, client } = options;
    const contractURI = params.contractURI ||
        (await upload({
            client,
            files: [
                {
                    description: params.description,
                    external_link: params.external_link,
                    image: params.image,
                    name: params.name,
                    social_urls: params.social_urls,
                    symbol: params.symbol || "",
                },
            ],
        })) ||
        "";
    let royaltyBps = 0n;
    if (params.royaltyBps) {
        const numberVal = Number(params.royaltyBps);
        if (Number.isNaN(numberVal)) {
            throw new Error("royaltyBps: Invalid royaltyBps value");
        }
        if (numberVal < 0 || numberVal > 100) {
            throw new Error("royaltyBps: should be between 0 and 100");
        }
        // If is a float, make sure it only has 2 digit after the decimal point
        if (numberVal % 1 !== 0 && !/^\d+(\.\d{1,2})?$/.test(String(numberVal))) {
            throw new Error("royaltyBps: Maximum 2 decimal places allowed.");
        }
        royaltyBps = BigInt(numberVal * 100); // 21.12 -> 2112n
    }
    return initialize({
        contract: implementationContract,
        contractURI,
        defaultAdmin: params.defaultAdmin || accountAddress,
        name: params.name,
        royaltyBps,
        royaltyRecipient: params.royaltyRecipient || accountAddress,
        symbol: params.symbol || "",
        trustedForwarders: params.trustedForwarders || [],
    });
}
//# sourceMappingURL=deploy-pack.js.map
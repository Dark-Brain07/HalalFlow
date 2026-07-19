import { fetchTokenMetadata } from "../../../utils/nft/fetchTokenMetadata.js";
import { parseNFT } from "../../../utils/nft/parseNft.js";
import { tokenURI, } from "../__generated__/IERC721A/read/tokenURI.js";
import { tokenByIndex } from "../__generated__/IERC721Enumerable/read/tokenByIndex.js";
export { isTokenURISupported as isGetNFTSupported } from "../__generated__/IERC721A/read/tokenURI.js";
import { getNFT as getNFTInsight } from "../../../insight/index.js";
/**
 * Retrieves information about a specific ERC721 non-fungible token (NFT).
 * @param options - The options for retrieving the NFT.
 * @returns A promise that resolves to the NFT object.
 * @extension ERC721
 * @example
 * ```ts
 * import { getNFT } from "thirdweb/extensions/erc721";
 * const nft = await getNFT({
 *  contract,
 *  tokenId: 1n,
 * });
 * ```
 *
 * * @example
 * ```ts
 * import { getNFT } from "thirdweb/extensions/erc721";
 *
 *
 * const nft = await getNFT({
 *  contract,
 *  tokenId: 1n,
 *  tokenByIndex: true // use this flag if the contract supports `tokenByIndex` and the above tokenId should be treated as an index.
 * });
 * ```
 */
export async function getNFT(options) {
    const { useIndexer = true } = options;
    if (useIndexer) {
        try {
            return await getNFTFromInsight(options);
        }
        catch {
            return await getNFTFromRPC(options);
        }
    }
    return await getNFTFromRPC(options);
}
async function getNFTFromInsight(options) {
    const nft = await getNFTInsight({
        chain: options.contract.chain,
        client: options.contract.client,
        contractAddress: options.contract.address,
        includeOwners: options.includeOwner,
        tokenId: options.tokenId,
    });
    if (!nft) {
        // fresh contracts might be delayed in indexing, so we fallback to RPC
        return getNFTFromRPC(options);
    }
    return nft;
}
async function getNFTFromRPC(options) {
    let tokenId = options.tokenId;
    if (options.tokenByIndex) {
        try {
            tokenId = await tokenByIndex({
                contract: options.contract,
                index: options.tokenId,
            });
        }
        catch { }
    }
    const [uri, owner] = await Promise.all([
        tokenURI({ contract: options.contract, tokenId }).catch(() => null),
        options.includeOwner
            ? import("../__generated__/IERC721A/read/ownerOf.js")
                .then((m) => m.ownerOf({ contract: options.contract, tokenId }))
                .catch(() => null)
            : null,
    ]);
    if (!uri?.trim()) {
        return parseNFT({
            id: tokenId,
            type: "ERC721",
            uri: "",
        }, {
            chainId: options.contract.chain.id,
            owner,
            tokenAddress: options.contract.address,
            tokenId,
            tokenUri: "",
            type: "ERC721",
        });
    }
    return parseNFT(await fetchTokenMetadata({
        client: options.contract.client,
        tokenId,
        tokenUri: uri,
    })
        .then((metadata) => {
        // if the metadata is null-ish, return a default metadata object
        if (!metadata) {
            return {
                id: tokenId,
                type: "ERC721",
                uri,
            };
        }
        return metadata;
    })
        .catch(() => ({
        id: tokenId,
        type: "ERC721",
        uri,
    })), {
        chainId: options.contract.chain.id,
        owner,
        tokenAddress: options.contract.address,
        tokenId: tokenId,
        tokenUri: uri,
        type: "ERC721",
    });
}
//# sourceMappingURL=getNFT.js.map
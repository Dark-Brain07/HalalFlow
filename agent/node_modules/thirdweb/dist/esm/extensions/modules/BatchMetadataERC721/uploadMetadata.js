import { getBaseUriFromBatch, uploadOrExtractURIs, } from "../../../utils/ipfs.js";
import { uploadMetadata as generatedUploadMetadata } from "../__generated__/BatchMetadataERC721/write/uploadMetadata.js";
/**
 * Uploads metadata for a batch of NFTs.
 * @param options - The options for the transaction.
 * @param options.contract - The contract to upload the metadata for.
 * @param options.metadatas - The metadata for the NFTs.
 * @returns The transaction to upload the metadata.
 * @modules BatchMetadataERC721
 * @example
 * ```ts
 * import { BatchMetadataERC721 } from "thirdweb/modules";
 *
 * const transaction = BatchMetadataERC721.uploadMetadata({
 *   contract,
 *   metadatas: [
 *     { name: "My NFT", description: "This is my NFT" },
 *   ],
 * });
 *
 * await sendTransaction({
 *   transaction,
 *   account,
 * });
 * ```
 */
export function uploadMetadata(options) {
    return generatedUploadMetadata({
        asyncParams: async () => {
            const batchOfUris = await uploadOrExtractURIs(options.metadatas, options.contract.client);
            const baseURI = getBaseUriFromBatch(batchOfUris);
            return {
                amount: BigInt(batchOfUris.length),
                baseURI,
            };
        },
        contract: options.contract,
    });
}
//# sourceMappingURL=uploadMetadata.js.map
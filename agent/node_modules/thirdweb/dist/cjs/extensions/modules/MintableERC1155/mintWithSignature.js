"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintWithSignature = mintWithSignature;
exports.generateMintSignature = generateMintSignature;
const Solidity_1 = require("ox/Solidity");
const addresses_js_1 = require("../../../constants/addresses.js");
const date_js_1 = require("../../../utils/date.js");
const random_js_1 = require("../../../utils/random.js");
const mintWithSignature_js_1 = require("../__generated__/ERC1155Core/write/mintWithSignature.js");
const encodeBytesBeforeMintWithSignatureERC1155_js_1 = require("../__generated__/MintableERC1155/encode/encodeBytesBeforeMintWithSignatureERC1155.js");
/**
 * Mints ERC1155 tokens to a specified address with a signature via a MintableERC1155 module.
 * @param options The options for minting tokens.
 * @returns A transaction to mint tokens.
 * @example
 * ```typescript
 * import { MintableERC1155 } from "thirdweb/modules";
 *
 * // generate the payload and signature, this is typically done on the server
 * // requires to be generated with a wallet that has the MINTER_ROLE
 * const { payload, signature } = await MintableERC1155.generateMintSignature({
 *   account,
 *   contract,
 *   nft: {
 *     name: "My NFT",
 *     description: "This is my NFT",
 *     image: "ipfs://...",
 *   },
 *   mintRequest: {
 *     recipient: "0x...",
 *     quantity: "10",
 *   },
 * });
 *
 * // prepare the transaction, this is typically done on the client
 * // can be executed by any wallet
 * const transaction = MintableERC1155.mintWithSignature({
 *   contract,
 *   payload,
 *   signature,
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 * @modules MintableERC1155
 */
function mintWithSignature(options) {
    return (0, mintWithSignature_js_1.mintWithSignature)({
        asyncParams: async () => {
            const { payload, signature } = options;
            return {
                amount: payload.amount,
                baseURI: payload.baseURI,
                data: payload.data,
                signature,
                to: payload.to,
                tokenId: payload.tokenId,
            };
        },
        contract: options.contract,
    });
}
/**
 * Generates a payload and signature for minting ERC1155 tokens with a signature.
 * @param options The options for generating the payload and signature.
 * @returns The payload and signature.
 * @example
 * ```typescript
 * import { MintableERC1155 } from "thirdweb/modules";
 *
 * // generate the payload and signature, this is typically done on the server
 * // requires to be generated with a wallet that has the MINTER_ROLE
 * const { payload, signature } = await MintableERC1155.generateMintSignature({
 *   account,
 *   contract,
 *   nft: {
 *     name: "My NFT",
 *     description: "This is my NFT",
 *     image: "ipfs://...",
 *   },
 *   mintRequest: {
 *     recipient: "0x...",
 *     quantity: "10",
 *   },
 * });
 *
 * // prepare the transaction, this is typically done on the client
 * // can be executed by any wallet
 * const transaction = MintableERC1155.mintWithSignature({
 *   contract,
 *   payload,
 *   signature,
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 * @modules MintableERC1155
 */
async function generateMintSignature(options) {
    const { mintRequest, account, contract } = options;
    const currency = mintRequest.currency || addresses_js_1.NATIVE_TOKEN_ADDRESS;
    const pricePerUnit = options.mintRequest.pricePerUnit || 0n;
    const uid = mintRequest.uid || (0, random_js_1.randomBytesHex)();
    const startTime = mintRequest.validityStartTimestamp || new Date(0);
    const endTime = mintRequest.validityEndTimestamp || (0, date_js_1.tenYearsFromNow)();
    let metadataURI;
    if (typeof options.nft === "string") {
        // if the input is already a string then we just use that
        metadataURI = options.nft;
    }
    else {
        // otherwise we need to upload the file to the storage server
        // load the upload code if we need it
        const { upload } = await Promise.resolve().then(() => require("../../../storage/upload.js"));
        metadataURI = await upload({
            client: options.contract.client,
            files: [options.nft],
        });
    }
    const mintParams = {
        currency,
        endTimestamp: Number((0, date_js_1.dateToSeconds)(endTime)),
        pricePerUnit,
        startTimestamp: Number((0, date_js_1.dateToSeconds)(startTime)),
        uid,
    };
    const payload = {
        amount: mintRequest.quantity,
        baseURI: metadataURI,
        data: (0, encodeBytesBeforeMintWithSignatureERC1155_js_1.encodeBytesBeforeMintWithSignatureERC1155Params)({
            params: mintParams,
        }),
        to: mintRequest.recipient,
        tokenId: mintRequest.tokenId ?? Solidity_1.maxUint256,
    };
    const signature = await account.signTypedData({
        domain: {
            chainId: contract.chain.id,
            name: "ERC1155Core",
            verifyingContract: contract.address,
            version: "1",
        },
        message: payload,
        primaryType: "MintRequestERC1155",
        types: { MintRequestERC1155: MintRequestERC1155 },
    });
    return { payload, signature };
}
const MintRequestERC1155 = [
    { name: "to", type: "address" },
    { name: "tokenId", type: "uint256" },
    { name: "amount", type: "uint256" },
    { name: "baseURI", type: "string" },
    { name: "data", type: "bytes" },
];
//# sourceMappingURL=mintWithSignature.js.map
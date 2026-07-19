"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalUnclaimedSupply = getTotalUnclaimedSupply;
const startTokenId_js_1 = require("../__generated__/IERC721A/read/startTokenId.js");
const nextTokenIdToMint_js_1 = require("../__generated__/IERC721Enumerable/read/nextTokenIdToMint.js");
const getTotalClaimedSupply_js_1 = require("./getTotalClaimedSupply.js");
/**
 * Retrieves the total unclaimed supply of ERC721 tokens.
 * @param options - The base transaction options.
 * @returns A promise that resolves to the total unclaimed supply as a bigint.
 * @extension ERC721
 * @example
 *
 * ```ts
 * import { getTotalUnclaimedSupply } from "thirdweb/extensions/erc721";
 *
 * const totalUnclaimedSupply = await getTotalUnclaimedSupply({
 *  contract,
 * });
 */
async function getTotalUnclaimedSupply(options) {
    const [startTokenId_, nextTokenIdToMint_, totalClaimedSupply_] = await Promise.all([
        (0, startTokenId_js_1.startTokenId)(options).catch(() => 0n),
        (0, nextTokenIdToMint_js_1.nextTokenIdToMint)(options),
        (0, getTotalClaimedSupply_js_1.getTotalClaimedSupply)(options),
    ]);
    return nextTokenIdToMint_ - startTokenId_ - totalClaimedSupply_;
}
//# sourceMappingURL=getTotalUnclaimedSupply.js.map
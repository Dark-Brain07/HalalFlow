"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalClaimedSupply = getTotalClaimedSupply;
const nextTokenIdToClaim_js_1 = require("../__generated__/IDrop/read/nextTokenIdToClaim.js");
const startTokenId_js_1 = require("../__generated__/IERC721A/read/startTokenId.js");
/**
 * Retrieves the total claimed supply of ERC721 tokens.
 * @param options - The base transaction options.
 * @returns A promise that resolves to the total claimed supply as a bigint.
 * @throws An error if the total claimed supply cannot be retrieved.
 * @extension ERC721
 * @example
 *
 * ```ts
 * import { getTotalClaimedSupply } from "thirdweb/extensions/erc721";
 *
 * const totalClaimedSupply = await getTotalClaimedSupply({
 *  contract,
 * });
 * ```
 */
async function getTotalClaimedSupply(options) {
    const [startTokenId_, nextTokenIdToClaim_] = await Promise.all([
        (0, startTokenId_js_1.startTokenId)(options).catch(() => 0n),
        (0, nextTokenIdToClaim_js_1.nextTokenIdToClaim)(options),
    ]);
    return nextTokenIdToClaim_ - startTokenId_;
}
//# sourceMappingURL=getTotalClaimedSupply.js.map
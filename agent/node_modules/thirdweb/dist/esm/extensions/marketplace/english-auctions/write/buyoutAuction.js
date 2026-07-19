import { isNativeTokenAddress } from "../../../../constants/addresses.js";
import { bidInAuction as generatedBidInAuction } from "../../__generated__/IEnglishAuctions/write/bidInAuction.js";
import { getAuction } from "../read/getAuction.js";
/**
 * Buys out an English auction.
 * @param options - The options for buying out the auction.
 * @returns A transaction that can be sent to buy out the auction.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { buyoutAuction } from "thirdweb/extensions/marketplace";
 * import { sendTransaction } from "thirdweb";
 *
 * const transaction = buyoutAuction({
 *  contract,
 *  auctionId: 0n
 * });
 *
 * await sendTransaction({ transaction, account });
 * ```
 */
export function buyoutAuction(options) {
    return generatedBidInAuction({
        asyncParams: async () => {
            const auction = await getAuction({
                auctionId: options.auctionId,
                contract: options.contract,
            });
            return {
                auctionId: options.auctionId,
                bidAmount: auction.buyoutBidAmount,
                overrides: {
                    extraGas: 50000n,
                    value: isNativeTokenAddress(auction.currencyContractAddress)
                        ? auction.buyoutBidAmount
                        : undefined, // add extra gas to account for router call
                },
            };
        },
        contract: options.contract,
    });
}
//# sourceMappingURL=buyoutAuction.js.map
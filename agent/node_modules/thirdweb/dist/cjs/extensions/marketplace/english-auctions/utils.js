"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEnglishAuction = mapEnglishAuction;
const contract_js_1 = require("../../../contract/contract.js");
const units_js_1 = require("../../../utils/units.js");
const getCurrencyMetadata_js_1 = require("../../erc20/read/getCurrencyMetadata.js");
const utils_js_1 = require("../utils.js");
/**
 * @internal
 */
async function mapEnglishAuction(options) {
    const { latestBlock, rawAuction } = options;
    // process the listing
    const status = (0, utils_js_1.computeStatus)({
        blockTimeStamp: latestBlock.timestamp,
        endTimestamp: rawAuction.endTimestamp,
        listingStatus: rawAuction.status,
        startTimestamp: rawAuction.startTimestamp,
    });
    const currencyContract = (0, contract_js_1.getContract)({
        ...options.contract,
        address: rawAuction.currency,
    });
    const [auctionCurrencyMetadata, nftAsset] = await Promise.all([
        (0, getCurrencyMetadata_js_1.getCurrencyMetadata)({
            contract: currencyContract,
        }),
        (0, utils_js_1.getNFTAsset)({
            ...options,
            contract: (0, contract_js_1.getContract)({
                ...options.contract,
                address: rawAuction.assetContract,
            }),
            tokenId: rawAuction.tokenId,
        }),
    ]);
    return {
        asset: nftAsset,
        assetContractAddress: rawAuction.assetContract,
        bidBufferBps: rawAuction.bidBufferBps,
        buyoutBidAmount: rawAuction.buyoutBidAmount,
        buyoutCurrencyValue: {
            ...auctionCurrencyMetadata,
            chainId: currencyContract.chain.id,
            displayValue: (0, units_js_1.toTokens)(rawAuction.buyoutBidAmount, auctionCurrencyMetadata.decimals),
            tokenAddress: currencyContract.address,
            value: rawAuction.buyoutBidAmount,
        },
        creatorAddress: rawAuction.auctionCreator,
        currencyContractAddress: rawAuction.currency,
        endTimeInSeconds: rawAuction.endTimestamp,
        id: rawAuction.auctionId,
        minimumBidAmount: rawAuction.minimumBidAmount,
        minimumBidCurrencyValue: {
            ...auctionCurrencyMetadata,
            chainId: currencyContract.chain.id,
            displayValue: (0, units_js_1.toTokens)(rawAuction.minimumBidAmount, auctionCurrencyMetadata.decimals),
            tokenAddress: currencyContract.address,
            value: rawAuction.minimumBidAmount,
        },
        quantity: rawAuction.quantity,
        startTimeInSeconds: rawAuction.startTimestamp,
        status,
        timeBufferInSeconds: rawAuction.timeBufferInSeconds,
        tokenId: rawAuction.tokenId,
        type: "english-auction",
    };
}
//# sourceMappingURL=utils.js.map
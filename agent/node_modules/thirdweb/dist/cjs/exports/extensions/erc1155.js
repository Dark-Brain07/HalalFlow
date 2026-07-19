"use strict";
// READ
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClaimToSupported = exports.claimTo = exports.isGetClaimConditionsSupported = exports.getClaimConditions = exports.isGetActiveClaimConditionSupported = exports.getActiveClaimCondition = exports.canClaim = exports.nextTokenId = exports.tokensMintedWithSignatureEvent = exports.openPack = exports.createPack = exports.packUpdatedEvent = exports.packOpenedEvent = exports.packCreatedEvent = exports.setTokenURI = exports.freezeMetadata = exports.metadataUpdateEvent = exports.metadataFrozenEvent = exports.batchMetadataUpdateEvent = exports.tokensLazyMintedEvent = exports.setApprovalForAll = exports.safeTransferFrom = exports.encodeSafeTransferFrom = exports.safeBatchTransferFrom = exports.transferSingleEvent = exports.transferBatchEvent = exports.approvalForAllEvent = exports.claimCondition = exports.isGetClaimConditionByIdSupported = exports.getClaimConditionById = exports.tokensClaimedEvent = exports.burnBatch = exports.isBurnSupported = exports.burn = exports.isERC1155 = exports.getOwnedTokenIds = exports.getOwnedNFTs = exports.isGetNFTsSupported = exports.getNFTs = exports.isGetNFTSupported = exports.getNFT = exports.nextTokenIdToMint = exports.isNextTokenIdToMintSupported = exports.tokenUri = exports.uri = exports.totalSupply = exports.isTotalSupplySupported = exports.isApprovedForAll = exports.balanceOfBatch = exports.balanceOf = void 0;
exports.updateTokenURI = exports.isUpdateTokenURISupported = exports.mintWithSignature = exports.generateMintSignature = exports.mintToBatch = exports.mintTo = exports.isMintToSupported = exports.mintAdditionalSupplyToBatch = exports.mintAdditionalSupplyTo = exports.isMintAdditionalSupplyToSupported = exports.lazyMint = exports.isLazyMintSupported = exports.updateMetadata = exports.isUpdateMetadataSupported = exports.setClaimConditions = exports.isSetClaimConditionsSupported = exports.resetClaimEligibility = exports.isResetClaimEligibilitySupported = void 0;
var balanceOf_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/read/balanceOf.js");
Object.defineProperty(exports, "balanceOf", { enumerable: true, get: function () { return balanceOf_js_1.balanceOf; } });
var balanceOfBatch_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/read/balanceOfBatch.js");
Object.defineProperty(exports, "balanceOfBatch", { enumerable: true, get: function () { return balanceOfBatch_js_1.balanceOfBatch; } });
var isApprovedForAll_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/read/isApprovedForAll.js");
Object.defineProperty(exports, "isApprovedForAll", { enumerable: true, get: function () { return isApprovedForAll_js_1.isApprovedForAll; } });
var totalSupply_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/read/totalSupply.js");
Object.defineProperty(exports, "isTotalSupplySupported", { enumerable: true, get: function () { return totalSupply_js_1.isTotalSupplySupported; } });
Object.defineProperty(exports, "totalSupply", { enumerable: true, get: function () { return totalSupply_js_1.totalSupply; } });
var uri_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/read/uri.js");
Object.defineProperty(exports, "uri", { enumerable: true, get: function () { return uri_js_1.uri; } });
/**
 * @alias for `uri`
 */
Object.defineProperty(exports, "tokenUri", { enumerable: true, get: function () { return uri_js_1.uri; } });
var nextTokenIdToMint_js_1 = require("../../extensions/erc1155/__generated__/IERC1155Enumerable/read/nextTokenIdToMint.js");
Object.defineProperty(exports, "isNextTokenIdToMintSupported", { enumerable: true, get: function () { return nextTokenIdToMint_js_1.isNextTokenIdToMintSupported; } });
Object.defineProperty(exports, "nextTokenIdToMint", { enumerable: true, get: function () { return nextTokenIdToMint_js_1.nextTokenIdToMint; } });
var getNFT_js_1 = require("../../extensions/erc1155/read/getNFT.js");
Object.defineProperty(exports, "getNFT", { enumerable: true, get: function () { return getNFT_js_1.getNFT; } });
Object.defineProperty(exports, "isGetNFTSupported", { enumerable: true, get: function () { return getNFT_js_1.isGetNFTSupported; } });
var getNFTs_js_1 = require("../../extensions/erc1155/read/getNFTs.js");
Object.defineProperty(exports, "getNFTs", { enumerable: true, get: function () { return getNFTs_js_1.getNFTs; } });
Object.defineProperty(exports, "isGetNFTsSupported", { enumerable: true, get: function () { return getNFTs_js_1.isGetNFTsSupported; } });
var getOwnedNFTs_js_1 = require("../../extensions/erc1155/read/getOwnedNFTs.js");
Object.defineProperty(exports, "getOwnedNFTs", { enumerable: true, get: function () { return getOwnedNFTs_js_1.getOwnedNFTs; } });
var getOwnedTokenIds_js_1 = require("../../extensions/erc1155/read/getOwnedTokenIds.js");
Object.defineProperty(exports, "getOwnedTokenIds", { enumerable: true, get: function () { return getOwnedTokenIds_js_1.getOwnedTokenIds; } });
var isERC1155_js_1 = require("../../extensions/erc1155/read/isERC1155.js");
Object.defineProperty(exports, "isERC1155", { enumerable: true, get: function () { return isERC1155_js_1.isERC1155; } });
//WRITE
var burn_js_1 = require("../../extensions/erc1155/__generated__/IBurnableERC1155/write/burn.js");
Object.defineProperty(exports, "burn", { enumerable: true, get: function () { return burn_js_1.burn; } });
Object.defineProperty(exports, "isBurnSupported", { enumerable: true, get: function () { return burn_js_1.isBurnSupported; } });
var burnBatch_js_1 = require("../../extensions/erc1155/__generated__/IBurnableERC1155/write/burnBatch.js");
Object.defineProperty(exports, "burnBatch", { enumerable: true, get: function () { return burnBatch_js_1.burnBatch; } });
var TokensClaimed_js_1 = require("../../extensions/erc1155/__generated__/IDrop1155/events/TokensClaimed.js");
Object.defineProperty(exports, "tokensClaimedEvent", { enumerable: true, get: function () { return TokensClaimed_js_1.tokensClaimedEvent; } });
var getClaimConditionById_js_1 = require("../../extensions/erc1155/__generated__/IDrop1155/read/getClaimConditionById.js");
Object.defineProperty(exports, "getClaimConditionById", { enumerable: true, get: function () { return getClaimConditionById_js_1.getClaimConditionById; } });
Object.defineProperty(exports, "isGetClaimConditionByIdSupported", { enumerable: true, get: function () { return getClaimConditionById_js_1.isGetClaimConditionByIdSupported; } });
var claimCondition_js_1 = require("../../extensions/erc1155/__generated__/IDropSinglePhase1155/read/claimCondition.js");
Object.defineProperty(exports, "claimCondition", { enumerable: true, get: function () { return claimCondition_js_1.claimCondition; } });
var ApprovalForAll_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/events/ApprovalForAll.js");
Object.defineProperty(exports, "approvalForAllEvent", { enumerable: true, get: function () { return ApprovalForAll_js_1.approvalForAllEvent; } });
var TransferBatch_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/events/TransferBatch.js");
Object.defineProperty(exports, "transferBatchEvent", { enumerable: true, get: function () { return TransferBatch_js_1.transferBatchEvent; } });
var TransferSingle_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/events/TransferSingle.js");
Object.defineProperty(exports, "transferSingleEvent", { enumerable: true, get: function () { return TransferSingle_js_1.transferSingleEvent; } });
var safeBatchTransferFrom_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/write/safeBatchTransferFrom.js");
Object.defineProperty(exports, "safeBatchTransferFrom", { enumerable: true, get: function () { return safeBatchTransferFrom_js_1.safeBatchTransferFrom; } });
var safeTransferFrom_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/write/safeTransferFrom.js");
Object.defineProperty(exports, "encodeSafeTransferFrom", { enumerable: true, get: function () { return safeTransferFrom_js_1.encodeSafeTransferFrom; } });
Object.defineProperty(exports, "safeTransferFrom", { enumerable: true, get: function () { return safeTransferFrom_js_1.safeTransferFrom; } });
var setApprovalForAll_js_1 = require("../../extensions/erc1155/__generated__/IERC1155/write/setApprovalForAll.js");
Object.defineProperty(exports, "setApprovalForAll", { enumerable: true, get: function () { return setApprovalForAll_js_1.setApprovalForAll; } });
// EVENTS
var TokensLazyMinted_js_1 = require("../../extensions/erc1155/__generated__/ILazyMint/events/TokensLazyMinted.js");
Object.defineProperty(exports, "tokensLazyMintedEvent", { enumerable: true, get: function () { return TokensLazyMinted_js_1.tokensLazyMintedEvent; } });
var BatchMetadataUpdate_js_1 = require("../../extensions/erc1155/__generated__/INFTMetadata/events/BatchMetadataUpdate.js");
Object.defineProperty(exports, "batchMetadataUpdateEvent", { enumerable: true, get: function () { return BatchMetadataUpdate_js_1.batchMetadataUpdateEvent; } });
var MetadataFrozen_js_1 = require("../../extensions/erc1155/__generated__/INFTMetadata/events/MetadataFrozen.js");
Object.defineProperty(exports, "metadataFrozenEvent", { enumerable: true, get: function () { return MetadataFrozen_js_1.metadataFrozenEvent; } });
var MetadataUpdate_js_1 = require("../../extensions/erc1155/__generated__/INFTMetadata/events/MetadataUpdate.js");
Object.defineProperty(exports, "metadataUpdateEvent", { enumerable: true, get: function () { return MetadataUpdate_js_1.metadataUpdateEvent; } });
var freezeMetadata_js_1 = require("../../extensions/erc1155/__generated__/INFTMetadata/write/freezeMetadata.js");
Object.defineProperty(exports, "freezeMetadata", { enumerable: true, get: function () { return freezeMetadata_js_1.freezeMetadata; } });
var setTokenURI_js_1 = require("../../extensions/erc1155/__generated__/INFTMetadata/write/setTokenURI.js");
Object.defineProperty(exports, "setTokenURI", { enumerable: true, get: function () { return setTokenURI_js_1.setTokenURI; } });
// Packs
var PackCreated_js_1 = require("../../extensions/erc1155/__generated__/IPack/events/PackCreated.js");
Object.defineProperty(exports, "packCreatedEvent", { enumerable: true, get: function () { return PackCreated_js_1.packCreatedEvent; } });
var PackOpened_js_1 = require("../../extensions/erc1155/__generated__/IPack/events/PackOpened.js");
Object.defineProperty(exports, "packOpenedEvent", { enumerable: true, get: function () { return PackOpened_js_1.packOpenedEvent; } });
var PackUpdated_js_1 = require("../../extensions/erc1155/__generated__/IPack/events/PackUpdated.js");
Object.defineProperty(exports, "packUpdatedEvent", { enumerable: true, get: function () { return PackUpdated_js_1.packUpdatedEvent; } });
var createPack_js_1 = require("../../extensions/erc1155/__generated__/IPack/write/createPack.js");
Object.defineProperty(exports, "createPack", { enumerable: true, get: function () { return createPack_js_1.createPack; } });
var openPack_js_1 = require("../../extensions/erc1155/__generated__/IPack/write/openPack.js");
Object.defineProperty(exports, "openPack", { enumerable: true, get: function () { return openPack_js_1.openPack; } });
var TokensMintedWithSignature_js_1 = require("../../extensions/erc1155/__generated__/ISignatureMintERC1155/events/TokensMintedWithSignature.js");
Object.defineProperty(exports, "tokensMintedWithSignatureEvent", { enumerable: true, get: function () { return TokensMintedWithSignature_js_1.tokensMintedWithSignatureEvent; } });
// Zora 1155 contract
var nextTokenId_js_1 = require("../../extensions/erc1155/__generated__/Zora1155/read/nextTokenId.js");
Object.defineProperty(exports, "nextTokenId", { enumerable: true, get: function () { return nextTokenId_js_1.nextTokenId; } });
var canClaim_js_1 = require("../../extensions/erc1155/drops/read/canClaim.js");
Object.defineProperty(exports, "canClaim", { enumerable: true, get: function () { return canClaim_js_1.canClaim; } });
/**
 * DROPS extension for ERC1155
 */
// READ
var getActiveClaimCondition_js_1 = require("../../extensions/erc1155/drops/read/getActiveClaimCondition.js");
Object.defineProperty(exports, "getActiveClaimCondition", { enumerable: true, get: function () { return getActiveClaimCondition_js_1.getActiveClaimCondition; } });
Object.defineProperty(exports, "isGetActiveClaimConditionSupported", { enumerable: true, get: function () { return getActiveClaimCondition_js_1.isGetActiveClaimConditionSupported; } });
var getClaimConditions_js_1 = require("../../extensions/erc1155/drops/read/getClaimConditions.js");
Object.defineProperty(exports, "getClaimConditions", { enumerable: true, get: function () { return getClaimConditions_js_1.getClaimConditions; } });
Object.defineProperty(exports, "isGetClaimConditionsSupported", { enumerable: true, get: function () { return getClaimConditions_js_1.isGetClaimConditionsSupported; } });
// WRITE
var claimTo_js_1 = require("../../extensions/erc1155/drops/write/claimTo.js");
Object.defineProperty(exports, "claimTo", { enumerable: true, get: function () { return claimTo_js_1.claimTo; } });
Object.defineProperty(exports, "isClaimToSupported", { enumerable: true, get: function () { return claimTo_js_1.isClaimToSupported; } });
var resetClaimEligibility_js_1 = require("../../extensions/erc1155/drops/write/resetClaimEligibility.js");
Object.defineProperty(exports, "isResetClaimEligibilitySupported", { enumerable: true, get: function () { return resetClaimEligibility_js_1.isResetClaimEligibilitySupported; } });
Object.defineProperty(exports, "resetClaimEligibility", { enumerable: true, get: function () { return resetClaimEligibility_js_1.resetClaimEligibility; } });
var setClaimConditions_js_1 = require("../../extensions/erc1155/drops/write/setClaimConditions.js");
Object.defineProperty(exports, "isSetClaimConditionsSupported", { enumerable: true, get: function () { return setClaimConditions_js_1.isSetClaimConditionsSupported; } });
Object.defineProperty(exports, "setClaimConditions", { enumerable: true, get: function () { return setClaimConditions_js_1.setClaimConditions; } });
// METADATA
var updateMetadata_js_1 = require("../../extensions/erc1155/drops/write/updateMetadata.js");
Object.defineProperty(exports, "isUpdateMetadataSupported", { enumerable: true, get: function () { return updateMetadata_js_1.isUpdateMetadataSupported; } });
Object.defineProperty(exports, "updateMetadata", { enumerable: true, get: function () { return updateMetadata_js_1.updateMetadata; } });
var lazyMint_js_1 = require("../../extensions/erc1155/write/lazyMint.js");
Object.defineProperty(exports, "isLazyMintSupported", { enumerable: true, get: function () { return lazyMint_js_1.isLazyMintSupported; } });
Object.defineProperty(exports, "lazyMint", { enumerable: true, get: function () { return lazyMint_js_1.lazyMint; } });
var mintAdditionalSupplyTo_js_1 = require("../../extensions/erc1155/write/mintAdditionalSupplyTo.js");
Object.defineProperty(exports, "isMintAdditionalSupplyToSupported", { enumerable: true, get: function () { return mintAdditionalSupplyTo_js_1.isMintAdditionalSupplyToSupported; } });
Object.defineProperty(exports, "mintAdditionalSupplyTo", { enumerable: true, get: function () { return mintAdditionalSupplyTo_js_1.mintAdditionalSupplyTo; } });
var mintAdditionalSupplyToBatch_js_1 = require("../../extensions/erc1155/write/mintAdditionalSupplyToBatch.js");
Object.defineProperty(exports, "mintAdditionalSupplyToBatch", { enumerable: true, get: function () { return mintAdditionalSupplyToBatch_js_1.mintAdditionalSupplyToBatch; } });
var mintTo_js_1 = require("../../extensions/erc1155/write/mintTo.js");
Object.defineProperty(exports, "isMintToSupported", { enumerable: true, get: function () { return mintTo_js_1.isMintToSupported; } });
Object.defineProperty(exports, "mintTo", { enumerable: true, get: function () { return mintTo_js_1.mintTo; } });
var mintToBatch_js_1 = require("../../extensions/erc1155/write/mintToBatch.js");
Object.defineProperty(exports, "mintToBatch", { enumerable: true, get: function () { return mintToBatch_js_1.mintToBatch; } });
/**
 * SIGNATURE extension for ERC1155
 */
var sigMint_js_1 = require("../../extensions/erc1155/write/sigMint.js");
Object.defineProperty(exports, "generateMintSignature", { enumerable: true, get: function () { return sigMint_js_1.generateMintSignature; } });
Object.defineProperty(exports, "mintWithSignature", { enumerable: true, get: function () { return sigMint_js_1.mintWithSignature; } });
var updateTokenURI_js_1 = require("../../extensions/erc1155/write/updateTokenURI.js");
Object.defineProperty(exports, "isUpdateTokenURISupported", { enumerable: true, get: function () { return updateTokenURI_js_1.isUpdateTokenURISupported; } });
Object.defineProperty(exports, "updateTokenURI", { enumerable: true, get: function () { return updateTokenURI_js_1.updateTokenURI; } });
//# sourceMappingURL=erc1155.js.map
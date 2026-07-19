"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPrimarySaleRecipient = exports.isSetPrimarySaleRecipientSupported = exports.primarySaleRecipient = exports.isPrimarySaleRecipientSupported = exports.setPlatformFeeInfo = exports.isSetPlatformFeeInfoSupported = exports.isGetPlatformFeeInfoSupported = exports.getPlatformFeeInfo = exports.setRoyaltyInfoForToken = exports.isSetRoyaltyInfoForTokenSupported = exports.setDefaultRoyaltyInfo = exports.isSetDefaultRoyaltyInfoSupported = exports.isGetRoyaltyInfoForTokenSupported = exports.getRoyaltyInfoForToken = exports.isGetDefaultRoyaltyInfoSupported = exports.getDefaultRoyaltyInfo = exports.ownerUpdatedEvent = exports.parseNftUri = exports.setContractMetadata = exports.isSetContractMetadataSupported = exports.symbol = exports.isSymbolSupported = exports.name = exports.isNameSupported = exports.isGetContractMetadataSupported = exports.getContractMetadata = exports.setOwner = exports.owner = exports.isOwnerSupported = exports.multicall = exports.isMulticallSupported = exports.setContractURI = exports.isSetContractURISupported = exports.contractURI = void 0;
// read
var contractURI_js_1 = require("../../extensions/common/__generated__/IContractMetadata/read/contractURI.js");
Object.defineProperty(exports, "contractURI", { enumerable: true, get: function () { return contractURI_js_1.contractURI; } });
// write
var setContractURI_js_1 = require("../../extensions/common/__generated__/IContractMetadata/write/setContractURI.js");
Object.defineProperty(exports, "isSetContractURISupported", { enumerable: true, get: function () { return setContractURI_js_1.isSetContractURISupported; } });
Object.defineProperty(exports, "setContractURI", { enumerable: true, get: function () { return setContractURI_js_1.setContractURI; } });
var multicall_js_1 = require("../../extensions/common/__generated__/IMulticall/write/multicall.js");
Object.defineProperty(exports, "isMulticallSupported", { enumerable: true, get: function () { return multicall_js_1.isMulticallSupported; } });
Object.defineProperty(exports, "multicall", { enumerable: true, get: function () { return multicall_js_1.multicall; } });
var owner_js_1 = require("../../extensions/common/__generated__/IOwnable/read/owner.js");
Object.defineProperty(exports, "isOwnerSupported", { enumerable: true, get: function () { return owner_js_1.isOwnerSupported; } });
Object.defineProperty(exports, "owner", { enumerable: true, get: function () { return owner_js_1.owner; } });
var setOwner_js_1 = require("../../extensions/common/__generated__/IOwnable/write/setOwner.js");
Object.defineProperty(exports, "setOwner", { enumerable: true, get: function () { return setOwner_js_1.setOwner; } });
var getContractMetadata_js_1 = require("../../extensions/common/read/getContractMetadata.js");
Object.defineProperty(exports, "getContractMetadata", { enumerable: true, get: function () { return getContractMetadata_js_1.getContractMetadata; } });
Object.defineProperty(exports, "isGetContractMetadataSupported", { enumerable: true, get: function () { return getContractMetadata_js_1.isGetContractMetadataSupported; } });
var name_js_1 = require("../../extensions/common/read/name.js");
Object.defineProperty(exports, "isNameSupported", { enumerable: true, get: function () { return name_js_1.isNameSupported; } });
Object.defineProperty(exports, "name", { enumerable: true, get: function () { return name_js_1.name; } });
var symbol_js_1 = require("../../extensions/common/read/symbol.js");
Object.defineProperty(exports, "isSymbolSupported", { enumerable: true, get: function () { return symbol_js_1.isSymbolSupported; } });
Object.defineProperty(exports, "symbol", { enumerable: true, get: function () { return symbol_js_1.symbol; } });
var setContractMetadata_js_1 = require("../../extensions/common/write/setContractMetadata.js");
Object.defineProperty(exports, "isSetContractMetadataSupported", { enumerable: true, get: function () { return setContractMetadata_js_1.isSetContractMetadataSupported; } });
Object.defineProperty(exports, "setContractMetadata", { enumerable: true, get: function () { return setContractMetadata_js_1.setContractMetadata; } });
var parseNft_js_1 = require("../../utils/nft/parseNft.js");
Object.defineProperty(exports, "parseNftUri", { enumerable: true, get: function () { return parseNft_js_1.parseNftUri; } });
// events
var OwnerUpdated_js_1 = require("../../extensions/common/__generated__/IOwnable/events/OwnerUpdated.js");
Object.defineProperty(exports, "ownerUpdatedEvent", { enumerable: true, get: function () { return OwnerUpdated_js_1.ownerUpdatedEvent; } });
// --------------------------------------------------------
// Royalty
// --------------------------------------------------------
// read
var getDefaultRoyaltyInfo_js_1 = require("../../extensions/common/__generated__/IRoyalty/read/getDefaultRoyaltyInfo.js");
Object.defineProperty(exports, "getDefaultRoyaltyInfo", { enumerable: true, get: function () { return getDefaultRoyaltyInfo_js_1.getDefaultRoyaltyInfo; } });
Object.defineProperty(exports, "isGetDefaultRoyaltyInfoSupported", { enumerable: true, get: function () { return getDefaultRoyaltyInfo_js_1.isGetDefaultRoyaltyInfoSupported; } });
var getRoyaltyInfoForToken_js_1 = require("../../extensions/common/__generated__/IRoyalty/read/getRoyaltyInfoForToken.js");
Object.defineProperty(exports, "getRoyaltyInfoForToken", { enumerable: true, get: function () { return getRoyaltyInfoForToken_js_1.getRoyaltyInfoForToken; } });
Object.defineProperty(exports, "isGetRoyaltyInfoForTokenSupported", { enumerable: true, get: function () { return getRoyaltyInfoForToken_js_1.isGetRoyaltyInfoForTokenSupported; } });
// write
var setDefaultRoyaltyInfo_js_1 = require("../../extensions/common/__generated__/IRoyalty/write/setDefaultRoyaltyInfo.js");
Object.defineProperty(exports, "isSetDefaultRoyaltyInfoSupported", { enumerable: true, get: function () { return setDefaultRoyaltyInfo_js_1.isSetDefaultRoyaltyInfoSupported; } });
Object.defineProperty(exports, "setDefaultRoyaltyInfo", { enumerable: true, get: function () { return setDefaultRoyaltyInfo_js_1.setDefaultRoyaltyInfo; } });
var setRoyaltyInfoForToken_js_1 = require("../../extensions/common/__generated__/IRoyalty/write/setRoyaltyInfoForToken.js");
Object.defineProperty(exports, "isSetRoyaltyInfoForTokenSupported", { enumerable: true, get: function () { return setRoyaltyInfoForToken_js_1.isSetRoyaltyInfoForTokenSupported; } });
Object.defineProperty(exports, "setRoyaltyInfoForToken", { enumerable: true, get: function () { return setRoyaltyInfoForToken_js_1.setRoyaltyInfoForToken; } });
// --------------------------------------------------------
// Platform Fees
// --------------------------------------------------------
var getPlatformFeeInfo_js_1 = require("../../extensions/common/__generated__/IPlatformFee/read/getPlatformFeeInfo.js");
Object.defineProperty(exports, "getPlatformFeeInfo", { enumerable: true, get: function () { return getPlatformFeeInfo_js_1.getPlatformFeeInfo; } });
Object.defineProperty(exports, "isGetPlatformFeeInfoSupported", { enumerable: true, get: function () { return getPlatformFeeInfo_js_1.isGetPlatformFeeInfoSupported; } });
var setPlatformFeeInfo_js_1 = require("../../extensions/common/__generated__/IPlatformFee/write/setPlatformFeeInfo.js");
Object.defineProperty(exports, "isSetPlatformFeeInfoSupported", { enumerable: true, get: function () { return setPlatformFeeInfo_js_1.isSetPlatformFeeInfoSupported; } });
Object.defineProperty(exports, "setPlatformFeeInfo", { enumerable: true, get: function () { return setPlatformFeeInfo_js_1.setPlatformFeeInfo; } });
// --------------------------------------------------------
// Primary Sale
// --------------------------------------------------------
var primarySaleRecipient_js_1 = require("../../extensions/common/__generated__/IPrimarySale/read/primarySaleRecipient.js");
Object.defineProperty(exports, "isPrimarySaleRecipientSupported", { enumerable: true, get: function () { return primarySaleRecipient_js_1.isPrimarySaleRecipientSupported; } });
Object.defineProperty(exports, "primarySaleRecipient", { enumerable: true, get: function () { return primarySaleRecipient_js_1.primarySaleRecipient; } });
var setPrimarySaleRecipient_js_1 = require("../../extensions/common/__generated__/IPrimarySale/write/setPrimarySaleRecipient.js");
Object.defineProperty(exports, "isSetPrimarySaleRecipientSupported", { enumerable: true, get: function () { return setPrimarySaleRecipient_js_1.isSetPrimarySaleRecipientSupported; } });
Object.defineProperty(exports, "setPrimarySaleRecipient", { enumerable: true, get: function () { return setPrimarySaleRecipient_js_1.setPrimarySaleRecipient; } });
//# sourceMappingURL=common.js.map
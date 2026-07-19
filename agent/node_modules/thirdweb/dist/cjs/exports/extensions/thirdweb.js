"use strict";
// --------------------------------------------------------
// Generic
// --------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.add = exports.getMetadataUri = exports.getAll = exports.count = exports.deployProxyByImplementation = exports.publishContract = exports.getContractPublisher = exports.unpublishContract = exports.setPublisherProfileUri = exports.getPublisherProfileUri = exports.getPublishedUriFromCompilerUri = exports.getPublishedContractVersions = exports.getPublishedContract = exports.getAllPublishedContracts = exports.isContractTypeSupported = exports.contractType = void 0;
// Read
var contractType_js_1 = require("../../extensions/thirdweb/read/contractType.js");
Object.defineProperty(exports, "contractType", { enumerable: true, get: function () { return contractType_js_1.contractType; } });
Object.defineProperty(exports, "isContractTypeSupported", { enumerable: true, get: function () { return contractType_js_1.isContractTypeSupported; } });
// --------------------------------------------------------
// Publisher contract
// --------------------------------------------------------
var getAllPublishedContracts_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/read/getAllPublishedContracts.js");
Object.defineProperty(exports, "getAllPublishedContracts", { enumerable: true, get: function () { return getAllPublishedContracts_js_1.getAllPublishedContracts; } });
var getPublishedContract_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/read/getPublishedContract.js");
Object.defineProperty(exports, "getPublishedContract", { enumerable: true, get: function () { return getPublishedContract_js_1.getPublishedContract; } });
var getPublishedContractVersions_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/read/getPublishedContractVersions.js");
Object.defineProperty(exports, "getPublishedContractVersions", { enumerable: true, get: function () { return getPublishedContractVersions_js_1.getPublishedContractVersions; } });
var getPublishedUriFromCompilerUri_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/read/getPublishedUriFromCompilerUri.js");
Object.defineProperty(exports, "getPublishedUriFromCompilerUri", { enumerable: true, get: function () { return getPublishedUriFromCompilerUri_js_1.getPublishedUriFromCompilerUri; } });
// Read
var getPublisherProfileUri_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/read/getPublisherProfileUri.js");
Object.defineProperty(exports, "getPublisherProfileUri", { enumerable: true, get: function () { return getPublisherProfileUri_js_1.getPublisherProfileUri; } });
// Write
var setPublisherProfileUri_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/write/setPublisherProfileUri.js");
Object.defineProperty(exports, "setPublisherProfileUri", { enumerable: true, get: function () { return setPublisherProfileUri_js_1.setPublisherProfileUri; } });
var unpublishContract_js_1 = require("../../extensions/thirdweb/__generated__/IContractPublisher/write/unpublishContract.js");
Object.defineProperty(exports, "unpublishContract", { enumerable: true, get: function () { return unpublishContract_js_1.unpublishContract; } });
var publish_js_1 = require("../../extensions/thirdweb/write/publish.js");
Object.defineProperty(exports, "getContractPublisher", { enumerable: true, get: function () { return publish_js_1.getContractPublisher; } });
Object.defineProperty(exports, "publishContract", { enumerable: true, get: function () { return publish_js_1.publishContract; } });
// --------------------------------------------------------
// Multichain Registry
// --------------------------------------------------------
// --------------------------------------------------------
// Contract Factory
// --------------------------------------------------------
var deployProxyByImplementation_js_1 = require("../../extensions/thirdweb/__generated__/IContractFactory/write/deployProxyByImplementation.js");
Object.defineProperty(exports, "deployProxyByImplementation", { enumerable: true, get: function () { return deployProxyByImplementation_js_1.deployProxyByImplementation; } });
// Read
var count_js_1 = require("../../extensions/thirdweb/__generated__/ITWMultichainRegistry/read/count.js");
Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_js_1.count; } });
var getAll_js_1 = require("../../extensions/thirdweb/__generated__/ITWMultichainRegistry/read/getAll.js");
Object.defineProperty(exports, "getAll", { enumerable: true, get: function () { return getAll_js_1.getAll; } });
var getMetadataUri_js_1 = require("../../extensions/thirdweb/__generated__/ITWMultichainRegistry/read/getMetadataUri.js");
Object.defineProperty(exports, "getMetadataUri", { enumerable: true, get: function () { return getMetadataUri_js_1.getMetadataUri; } });
// Write
var add_js_1 = require("../../extensions/thirdweb/__generated__/ITWMultichainRegistry/write/add.js");
Object.defineProperty(exports, "add", { enumerable: true, get: function () { return add_js_1.add; } });
var remove_js_1 = require("../../extensions/thirdweb/__generated__/ITWMultichainRegistry/write/remove.js");
Object.defineProperty(exports, "remove", { enumerable: true, get: function () { return remove_js_1.remove; } });
//# sourceMappingURL=thirdweb.js.map
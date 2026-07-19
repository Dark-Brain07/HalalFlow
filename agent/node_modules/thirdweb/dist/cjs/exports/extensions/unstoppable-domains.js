"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveName = exports.resolveAddress = exports.UD_POLYGON_MAINNET = exports.reverseNameOf = exports.namehash = void 0;
var namehash_js_1 = require("../../extensions/unstoppable-domains/__generated__/UnstoppableDomains/read/namehash.js");
// Need this to resolve the tokenId, so that Social SDK can fetch the owner's Avatar from it
Object.defineProperty(exports, "namehash", { enumerable: true, get: function () { return namehash_js_1.namehash; } });
var reverseNameOf_js_1 = require("../../extensions/unstoppable-domains/__generated__/UnstoppableDomains/read/reverseNameOf.js");
Object.defineProperty(exports, "reverseNameOf", { enumerable: true, get: function () { return reverseNameOf_js_1.reverseNameOf; } });
var consts_js_1 = require("../../extensions/unstoppable-domains/consts.js");
Object.defineProperty(exports, "UD_POLYGON_MAINNET", { enumerable: true, get: function () { return consts_js_1.UD_POLYGON_MAINNET; } });
var resolveAddress_js_1 = require("../../extensions/unstoppable-domains/read/resolveAddress.js");
Object.defineProperty(exports, "resolveAddress", { enumerable: true, get: function () { return resolveAddress_js_1.resolveAddress; } });
var resolveName_js_1 = require("../../extensions/unstoppable-domains/read/resolveName.js");
Object.defineProperty(exports, "resolveName", { enumerable: true, get: function () { return resolveName_js_1.resolveName; } });
//# sourceMappingURL=unstoppable-domains.js.map
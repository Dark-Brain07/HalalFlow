"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAvatarRecord = exports.resolveText = exports.resolveName = exports.resolveL2Name = exports.resolveAvatar = exports.resolveAddress = exports.BASENAME_RESOLVER_ADDRESS = exports.BASE_SEPOLIA_BASENAME_RESOLVER_ADDRESS = void 0;
var constants_js_1 = require("../../extensions/ens/constants.js");
Object.defineProperty(exports, "BASE_SEPOLIA_BASENAME_RESOLVER_ADDRESS", { enumerable: true, get: function () { return constants_js_1.BASE_SEPOLIA_BASENAME_RESOLVER_ADDRESS; } });
Object.defineProperty(exports, "BASENAME_RESOLVER_ADDRESS", { enumerable: true, get: function () { return constants_js_1.BASENAME_RESOLVER_ADDRESS; } });
var resolve_address_js_1 = require("../../extensions/ens/resolve-address.js");
Object.defineProperty(exports, "resolveAddress", { enumerable: true, get: function () { return resolve_address_js_1.resolveAddress; } });
var resolve_avatar_js_1 = require("../../extensions/ens/resolve-avatar.js");
Object.defineProperty(exports, "resolveAvatar", { enumerable: true, get: function () { return resolve_avatar_js_1.resolveAvatar; } });
var resolve_l2_name_js_1 = require("../../extensions/ens/resolve-l2-name.js");
Object.defineProperty(exports, "resolveL2Name", { enumerable: true, get: function () { return resolve_l2_name_js_1.resolveL2Name; } });
var resolve_name_js_1 = require("../../extensions/ens/resolve-name.js");
Object.defineProperty(exports, "resolveName", { enumerable: true, get: function () { return resolve_name_js_1.resolveName; } });
var resolve_text_js_1 = require("../../extensions/ens/resolve-text.js");
Object.defineProperty(exports, "resolveText", { enumerable: true, get: function () { return resolve_text_js_1.resolveText; } });
var avatar_js_1 = require("../../utils/ens/avatar.js");
Object.defineProperty(exports, "parseAvatarRecord", { enumerable: true, get: function () { return avatar_js_1.parseAvatarRecord; } });
//# sourceMappingURL=ens.js.map
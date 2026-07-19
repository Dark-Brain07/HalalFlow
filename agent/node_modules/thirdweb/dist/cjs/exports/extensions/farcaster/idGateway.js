"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFor = exports.register = exports.storageRegistry = exports.REGISTER_TYPEHASH = exports.price = exports.idRegistry = exports.setStorageRegistryEvent = void 0;
var SetStorageRegistry_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/events/SetStorageRegistry.js");
Object.defineProperty(exports, "setStorageRegistryEvent", { enumerable: true, get: function () { return SetStorageRegistry_js_1.setStorageRegistryEvent; } });
var idRegistry_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/read/idRegistry.js");
Object.defineProperty(exports, "idRegistry", { enumerable: true, get: function () { return idRegistry_js_1.idRegistry; } });
var price_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/read/price.js");
Object.defineProperty(exports, "price", { enumerable: true, get: function () { return price_js_1.price; } });
var REGISTER_TYPEHASH_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/read/REGISTER_TYPEHASH.js");
Object.defineProperty(exports, "REGISTER_TYPEHASH", { enumerable: true, get: function () { return REGISTER_TYPEHASH_js_1.REGISTER_TYPEHASH; } });
var storageRegistry_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/read/storageRegistry.js");
Object.defineProperty(exports, "storageRegistry", { enumerable: true, get: function () { return storageRegistry_js_1.storageRegistry; } });
var register_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/write/register.js");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return register_js_1.register; } });
var registerFor_js_1 = require("../../../extensions/farcaster/__generated__/IIdGateway/write/registerFor.js");
Object.defineProperty(exports, "registerFor", { enumerable: true, get: function () { return registerFor_js_1.registerFor; } });
//# sourceMappingURL=idGateway.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.verifyEOASignature = exports.verifyContractWalletSignature = exports.serializeErc6492Signature = exports.parseErc6492Signature = exports.isErc6492Signature = exports.signLoginPayload = exports.createAuth = void 0;
var auth_js_1 = require("../auth/auth.js");
Object.defineProperty(exports, "createAuth", { enumerable: true, get: function () { return auth_js_1.createAuth; } });
// meant to be used on the "client" side to sign the login payload with a given account
var sign_login_payload_js_1 = require("../auth/core/sign-login-payload.js");
Object.defineProperty(exports, "signLoginPayload", { enumerable: true, get: function () { return sign_login_payload_js_1.signLoginPayload; } });
var is_erc6492_signature_js_1 = require("../auth/is-erc6492-signature.js");
Object.defineProperty(exports, "isErc6492Signature", { enumerable: true, get: function () { return is_erc6492_signature_js_1.isErc6492Signature; } });
var parse_erc6492_signature_js_1 = require("../auth/parse-erc6492-signature.js");
Object.defineProperty(exports, "parseErc6492Signature", { enumerable: true, get: function () { return parse_erc6492_signature_js_1.parseErc6492Signature; } });
var serialize_erc6492_signature_js_1 = require("../auth/serialize-erc6492-signature.js");
Object.defineProperty(exports, "serializeErc6492Signature", { enumerable: true, get: function () { return serialize_erc6492_signature_js_1.serializeErc6492Signature; } });
var verify_signature_js_1 = require("../auth/verify-signature.js");
Object.defineProperty(exports, "verifyContractWalletSignature", { enumerable: true, get: function () { return verify_signature_js_1.verifyContractWalletSignature; } });
Object.defineProperty(exports, "verifyEOASignature", { enumerable: true, get: function () { return verify_signature_js_1.verifyEOASignature; } });
Object.defineProperty(exports, "verifySignature", { enumerable: true, get: function () { return verify_signature_js_1.verifySignature; } });
//# sourceMappingURL=auth.js.map
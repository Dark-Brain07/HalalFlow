"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeDeploymentAddress = computeDeploymentAddress;
const hex_js_1 = require("../../encoding/hex.js");
const keccak_id_js_1 = require("../keccak-id.js");
const create2Address_js_1 = require("./create2Address.js");
function computeDeploymentAddress(options) {
    const saltHash = options.salt
        ? (0, hex_js_1.isHex)(options.salt) && options.salt.length === 66
            ? options.salt
            : (0, keccak_id_js_1.keccakId)(options.salt)
        : (0, keccak_id_js_1.keccakId)("thirdweb");
    return (0, create2Address_js_1.create2Address)({
        bytecodeHash: options.bytecodeHash,
        input: options.encodedArgs,
        salt: saltHash,
        sender: options.create2FactoryAddress,
    });
}
//# sourceMappingURL=computeDeploymentAddress.js.map
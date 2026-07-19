"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictAddress = predictAddress;
const utils_1 = require("@noble/hashes/utils");
const predictAddress_js_1 = require("../extensions/tokens/__generated__/ERC20Entrypoint/read/predictAddress.js");
const hex_js_1 = require("../utils/encoding/hex.js");
const constants_js_1 = require("./constants.js");
const get_entrypoint_erc20_js_1 = require("./get-entrypoint-erc20.js");
const token_utils_js_1 = require("./token-utils.js");
async function predictAddress(options) {
    const { client, params, launchConfig, account } = options;
    const creator = params.owner || account.address;
    const encodedInitData = await (0, token_utils_js_1.encodeInitParams)({
        client,
        creator,
        params,
    });
    const salt = (0, token_utils_js_1.generateSalt)(options.salt || (0, utils_1.bytesToHex)((0, utils_1.randomBytes)(31)));
    const entrypoint = await (0, get_entrypoint_erc20_js_1.getDeployedEntrypointERC20)(options);
    let hookData = "0x";
    let contractId = (0, hex_js_1.padHex)((0, hex_js_1.toHex)("ERC20Asset"), { size: 32 });
    if (launchConfig?.kind === "pool") {
        hookData = (0, token_utils_js_1.encodePoolConfig)(launchConfig.config);
        contractId = (0, hex_js_1.padHex)((0, hex_js_1.toHex)("ERC20Asset_Pool"), { size: 32 });
    }
    const address = await (0, predictAddress_js_1.predictAddress)({
        contract: entrypoint,
        contractId,
        params: {
            data: encodedInitData,
            hookData,
            developer: options.developerAddress || constants_js_1.DEFAULT_DEVELOPER_ADDRESS,
            salt,
        },
        creator,
    });
    return address;
}
//# sourceMappingURL=predict-address.js.map
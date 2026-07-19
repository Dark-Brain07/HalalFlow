"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenAddressFromReceipt = getTokenAddressFromReceipt;
exports.prepareCreateToken = prepareCreateToken;
const utils_1 = require("@noble/hashes/utils");
const parse_logs_js_1 = require("../event/actions/parse-logs.js");
const Created_js_1 = require("../extensions/tokens/__generated__/ERC20Entrypoint/events/Created.js");
const createById_js_1 = require("../extensions/tokens/__generated__/ERC20Entrypoint/write/createById.js");
const hex_js_1 = require("../utils/encoding/hex.js");
const constants_js_1 = require("./constants.js");
const get_entrypoint_erc20_js_1 = require("./get-entrypoint-erc20.js");
const token_utils_js_1 = require("./token-utils.js");
async function getTokenAddressFromReceipt(receipt) {
    const assetEvent = (0, Created_js_1.createdEvent)();
    const decodedEvent = (0, parse_logs_js_1.parseEventLogs)({
        events: [assetEvent],
        logs: receipt.logs,
    });
    if (decodedEvent.length === 0 || !decodedEvent[0]) {
        throw new Error(`No AssetCreated event found in transaction: ${receipt.transactionHash}`);
    }
    return decodedEvent[0]?.args.asset;
}
async function prepareCreateToken(options) {
    const { client, params, account, launchConfig } = options;
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
    const transaction = (0, createById_js_1.createById)({
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
    return transaction;
}
//# sourceMappingURL=create-token.js.map
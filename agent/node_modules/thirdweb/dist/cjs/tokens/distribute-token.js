"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributeToken = distributeToken;
const distribute_js_1 = require("../extensions/tokens/__generated__/ERC20Entrypoint/write/distribute.js");
const units_js_1 = require("../utils/units.js");
const get_entrypoint_erc20_js_1 = require("./get-entrypoint-erc20.js");
async function distributeToken(options) {
    const entrypoint = await (0, get_entrypoint_erc20_js_1.getDeployedEntrypointERC20)(options);
    if (!entrypoint) {
        throw new Error(`Entrypoint not found on chain: ${options.chain.id}`);
    }
    return (0, distribute_js_1.distribute)({
        asset: options.tokenAddress,
        contents: options.contents.map((a) => {
            return { ...a, amount: (0, units_js_1.toUnits)(a.amount.toString(), 18) };
        }),
        contract: entrypoint,
    });
}
//# sourceMappingURL=distribute-token.js.map
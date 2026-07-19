"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPoolRouterEnabled = isPoolRouterEnabled;
const addresses_js_1 = require("../constants/addresses.js");
const contract_js_1 = require("../contract/contract.js");
const getPoolRouter_js_1 = require("../extensions/tokens/__generated__/ERC20Entrypoint/read/getPoolRouter.js");
const getAdapter_js_1 = require("../extensions/tokens/__generated__/PoolRouter/read/getAdapter.js");
const get_entrypoint_erc20_js_1 = require("./get-entrypoint-erc20.js");
async function isPoolRouterEnabled(options) {
    const entrypoint = await (0, get_entrypoint_erc20_js_1.getDeployedEntrypointERC20)(options);
    if (!entrypoint) {
        return false;
    }
    const poolRouterAddress = await (0, getPoolRouter_js_1.getPoolRouter)({
        contract: entrypoint,
    });
    if (poolRouterAddress === addresses_js_1.ZERO_ADDRESS) {
        return false;
    }
    const poolRouterContract = (0, contract_js_1.getContract)({
        address: poolRouterAddress,
        chain: options.chain,
        client: options.client,
    });
    const [v3Adapter, v4Adapter] = await Promise.all([
        (0, getAdapter_js_1.getAdapter)({
            contract: poolRouterContract,
            adapterType: 1,
        }),
        (0, getAdapter_js_1.getAdapter)({
            contract: poolRouterContract,
            adapterType: 2,
        }),
    ]);
    if (v3Adapter.rewardLocker === addresses_js_1.ZERO_ADDRESS &&
        v4Adapter.rewardLocker === addresses_js_1.ZERO_ADDRESS) {
        return false;
    }
    return true;
}
//# sourceMappingURL=is-router-enabled.js.map
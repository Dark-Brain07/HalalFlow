"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertInsightEnabled = assertInsightEnabled;
const utils_js_1 = require("../chains/utils.js");
async function assertInsightEnabled(chains) {
    const chainIds = await (0, utils_js_1.getInsightEnabledChainIds)();
    const insightEnabled = chains.every((c) => chainIds.includes(c.id));
    if (!insightEnabled) {
        throw new Error(`Insight is not available for chains ${chains
            .filter((c) => !chainIds.includes(c.id))
            .map((c) => c.id)
            .join(", ")}`);
    }
}
//# sourceMappingURL=common.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInvalidateBalances = useInvalidateBalances;
const react_query_1 = require("@tanstack/react-query");
const invalidateWalletBalance_js_1 = require("../../providers/invalidateWalletBalance.js");
/**
 * Invalidate the balances for a given chainId. If no chainId is provided, invalidate all balances.
 * @example
 * ```ts
 * const invalidateBalances = useInvalidateBalances();
 * invalidateBalances();
 * ```
 */
function useInvalidateBalances() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return ({ chainId } = {}) => {
        (0, invalidateWalletBalance_js_1.invalidateWalletBalance)(queryClient, chainId);
    };
}
//# sourceMappingURL=useInvalidateBalances.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBridgeChains = useBridgeChains;
exports.useBridgeChain = useBridgeChain;
exports.useBridgeChainsWithFilters = useBridgeChainsWithFilters;
const react_query_1 = require("@tanstack/react-query");
const index_js_1 = require("../../../../../bridge/index.js");
function useBridgeChains(options) {
    return (0, react_query_1.useQuery)({
        queryKey: ["bridge-chains", options],
        queryFn: async () => {
            const data = await (0, index_js_1.chains)(options);
            const dataCopy = [...data];
            // sort by name, but if name starts with number, put it at the end
            return dataCopy.sort((a, b) => {
                const aStartsWithNumber = a.name[0]?.match(/^\d/);
                const bStartsWithNumber = b.name[0]?.match(/^\d/);
                if (aStartsWithNumber && !bStartsWithNumber) {
                    return 1;
                }
                if (!aStartsWithNumber && bStartsWithNumber) {
                    return -1;
                }
                return a.name.localeCompare(b.name);
            });
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}
function useBridgeChain({ chainId, client, }) {
    const chainQuery = useBridgeChains({ client });
    return {
        data: chainQuery.data?.find((chain) => chain.chainId === chainId),
        isPending: chainQuery.isPending,
    };
}
/**
 * type=origin: Returns all chains that can be used as origin
 * type=destination: Returns all chains that can be used as destination
 * originChainId=X: Returns destination chains reachable from chain X
 * destinationChainId=X: Returns origin chains that can reach chain X
 */
// for fetching "buy" (destination) chains:
// if a "sell" (origin) chain is selected, set originChainId to fetch all "buy" (destination) chains that support given originChainId
// else - set type="destination"
// for fetching "sell" (origin) chains:
// if a "buy" (destination) chain is selected, set destinationChainId to fetch all "sell" (origin) chains that support given destinationChainId
// else - set type="origin"
function useBridgeChainsWithFilters(options) {
    return useBridgeChains({
        client: options.client,
        ...(options.type === "buy"
            ? // type = buy
                options.sellChainId
                    ? { originChainId: options.sellChainId }
                    : { type: "destination" }
            : // type = sell
                options.buyChainId
                    ? { destinationChainId: options.buyChainId }
                    : { type: "origin" }),
    });
}
//# sourceMappingURL=use-bridge-chains.js.map
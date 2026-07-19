"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { waitForReceipt } from "../../../transaction/actions/wait-for-tx-receipt.js";
import { isBaseTransactionOptions } from "../../../transaction/types.js";
import { isObjectWithKeys } from "../../../utils/type-guards.js";
import { structuralSharing } from "../utils/structuralSharing.js";
import { ConnectionManagerCtx } from "./connection-manager.js";
import { invalidateWalletBalance } from "./invalidateWalletBalance.js";
import { SetRootElementContext } from "./RootElementContext.js";
/**
 * @internal
 */
export function ThirdwebProviderCore(props) {
    const [el, setEl] = useState(null);
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            mutations: {
                onSettled: (data, _error, variables) => {
                    if (isBaseTransactionOptions(variables)) {
                        if (isObjectWithKeys(data, ["transactionHash"]) &&
                            isObjectWithKeys(variables, ["client", "chain"])) {
                            waitForReceipt({
                                chain: variables.chain, // We know it exists from the if
                                client: variables.client,
                                transactionHash: data.transactionHash,
                            })
                                .catch((e) => {
                                // swallow errors for receipts, but log
                                console.error("[Transaction Error]", e);
                            })
                                .then(() => {
                                return Promise.all([
                                    queryClient.invalidateQueries({
                                        queryKey: 
                                        // invalidate any readContract queries for this chainId:contractAddress
                                        [
                                            "readContract",
                                            variables.__contract?.chain.id ||
                                                variables.chain.id,
                                            variables.__contract?.address || variables.to,
                                        ],
                                    }),
                                    invalidateWalletBalance(queryClient, variables.__contract?.chain.id || variables.chain.id),
                                ]);
                            });
                        }
                    }
                },
            },
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
                structuralSharing,
            },
        },
    }));
    return (_jsx(ConnectionManagerCtx.Provider, { value: props.manager, children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(SetRootElementContext.Provider, { value: setEl, children: props.children }), el] }) }));
}
//# sourceMappingURL=thirdweb-provider.js.map
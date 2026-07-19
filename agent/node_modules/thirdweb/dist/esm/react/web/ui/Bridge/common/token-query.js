import { useQuery } from "@tanstack/react-query";
import { NATIVE_TOKEN_ADDRESS } from "../../../../../constants/addresses.js";
import { getToken } from "../../../../../pay/convert/get-token.js";
export function useTokenQuery(params) {
    return useQuery({
        enabled: !!params.chainId,
        queryFn: async () => {
            if (!params.chainId) {
                throw new Error("Chain ID is required");
            }
            const tokenAddress = params.tokenAddress || NATIVE_TOKEN_ADDRESS;
            const token = await getToken(params.client, tokenAddress, params.chainId).catch((err) => {
                err.message.includes("not supported") ? undefined : Promise.reject(err);
            });
            if (!token) {
                return {
                    type: "unsupported_token",
                };
            }
            return {
                token: token,
                type: "success",
            };
        },
        queryKey: ["bridge.getToken", params],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}
//# sourceMappingURL=token-query.js.map
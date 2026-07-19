import { useQuery } from "@tanstack/react-query";
import { getFunctionId } from "../../../utils/function-id.js";
import { getWalletInfo } from "../../../wallets/__generated__/getWalletInfo.js";
import { useWalletContext } from "../wallet/provider.js";
/**
 * @internal
 */
export function useWalletName(props) {
    const { id } = useWalletContext();
    const nameQuery = useQuery({
        queryFn: async () => fetchWalletName({ formatFn: props.formatFn, id }),
        queryKey: getQueryKeys({ formatFn: props.formatFn, id }),
        ...props.queryOptions,
    });
    return nameQuery;
}
/**
 * @internal Exported for tests only
 */
export function getQueryKeys(props) {
    if (typeof props.formatFn === "function") {
        return [
            "walletName",
            props.id,
            { resolver: getFunctionId(props.formatFn) },
        ];
    }
    return ["walletName", props.id];
}
/**
 * @internal Exported for tests only
 */
export async function fetchWalletName(props) {
    const info = await getWalletInfo(props.id);
    if (typeof props.formatFn === "function") {
        return props.formatFn(info.name);
    }
    return info.name;
}
//# sourceMappingURL=walletname.js.map
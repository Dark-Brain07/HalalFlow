"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { fontSize } from "../../../../core/design-system/index.js";
import { useChainSymbol } from "../../../../core/hooks/others/useChainQuery.js";
import { isNativeToken, } from "../../ConnectWallet/screens/nativeToken.js";
import { Skeleton } from "../Skeleton.js";
import { Text } from "../text.js";
/**
 * @internal
 */
export function TokenSymbol(props) {
    if (!isNativeToken(props.token)) {
        return (_jsx(Text, { color: props.color || "primaryText", inline: props.inline, size: props.size, children: props.token.symbol }));
    }
    return (_jsx(NativeTokenSymbol, { chain: props.chain, color: props.color, inline: props.inline, size: props.size }));
}
function NativeTokenSymbol(props) {
    const chainSymbolQuery = useChainSymbol(props.chain);
    if (chainSymbolQuery.isLoading) {
        return _jsx(Skeleton, { height: fontSize[props.size], width: "70px" });
    }
    return (_jsx(Text, { color: props.color || "primaryText", inline: props.inline, size: props.size, children: chainSymbolQuery.symbol ?? "ETH" }));
}
//# sourceMappingURL=TokenSymbol.js.map
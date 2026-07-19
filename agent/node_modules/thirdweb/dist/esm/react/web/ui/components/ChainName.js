import { jsx as _jsx } from "react/jsx-runtime";
import { fontSize } from "../../../core/design-system/index.js";
import { useChainName } from "../../../core/hooks/others/useChainQuery.js";
import { Skeleton } from "./Skeleton.js";
import { Text } from "./text.js";
/**
 * @internal
 */
export const ChainName = (props) => {
    const { name } = useChainName(props.chain);
    if (name) {
        return (_jsx(Text, { color: props.color, size: props.size, style: props.style, children: props.short ? shorterChainName(name) : name }));
    }
    return _jsx(Skeleton, { height: fontSize[props.size], width: "50px" });
};
export function shorterChainName(name) {
    const split = name.split(" ");
    const wordsToRemove = new Set(["mainnet", "testnet", "chain"]);
    return split
        .filter((s) => {
        return !wordsToRemove.has(s.toLowerCase());
    })
        .join(" ");
}
//# sourceMappingURL=ChainName.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainName = void 0;
exports.shorterChainName = shorterChainName;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const Skeleton_js_1 = require("./Skeleton.js");
const text_js_1 = require("./text.js");
/**
 * @internal
 */
const ChainName = (props) => {
    const { name } = (0, useChainQuery_js_1.useChainName)(props.chain);
    if (name) {
        return ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: props.color, size: props.size, style: props.style, children: props.short ? shorterChainName(name) : name }));
    }
    return (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize[props.size], width: "50px" });
};
exports.ChainName = ChainName;
function shorterChainName(name) {
    const split = name.split(" ");
    const wordsToRemove = new Set(["mainnet", "testnet", "chain"]);
    return split
        .filter((s) => {
        return !wordsToRemove.has(s.toLowerCase());
    })
        .join(" ");
}
//# sourceMappingURL=ChainName.js.map
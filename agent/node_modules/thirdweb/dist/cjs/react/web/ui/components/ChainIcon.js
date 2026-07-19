"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSrcChainIcon = exports.ChainIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ipfs_js_1 = require("../../../../utils/ipfs.js");
const basic_js_1 = require("./basic.js");
const ChainActiveDot_js_1 = require("./ChainActiveDot.js");
const fallbackChainIcon_js_1 = require("./fallbackChainIcon.js");
const Img_js_1 = require("./Img.js");
/**
 * This component (file) will eventually be replaced with the ChainIcon prebuilt version.
 * @internal
 */
const ChainIcon = (props) => {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            position: "relative",
        }, children: [(0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, fallbackImage: fallbackChainIcon_js_1.fallbackChainIcon, height: props.size, src: (0, exports.getSrcChainIcon)(props), width: props.size }), props.active && ((0, jsx_runtime_1.jsx)(ChainActiveDot_js_1.ChainActiveDot, { className: "tw-chain-active-dot-legacy-chain-icon" }))] }));
};
exports.ChainIcon = ChainIcon;
/**
 * @internal
 */
const getSrcChainIcon = (props) => {
    const url = props.chainIconUrl;
    if (!url) {
        return fallbackChainIcon_js_1.fallbackChainIcon;
    }
    try {
        return (0, ipfs_js_1.resolveScheme)({
            client: props.client,
            uri: url,
        });
    }
    catch {
        return fallbackChainIcon_js_1.fallbackChainIcon;
    }
};
exports.getSrcChainIcon = getSrcChainIcon;
//# sourceMappingURL=ChainIcon.js.map
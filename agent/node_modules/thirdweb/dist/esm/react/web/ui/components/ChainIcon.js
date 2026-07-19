import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { resolveScheme } from "../../../../utils/ipfs.js";
import { Container } from "./basic.js";
import { ChainActiveDot } from "./ChainActiveDot.js";
import { fallbackChainIcon } from "./fallbackChainIcon.js";
import { Img } from "./Img.js";
/**
 * This component (file) will eventually be replaced with the ChainIcon prebuilt version.
 * @internal
 */
export const ChainIcon = (props) => {
    return (_jsxs(Container, { style: {
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            position: "relative",
        }, children: [_jsx(Img, { client: props.client, fallbackImage: fallbackChainIcon, height: props.size, src: getSrcChainIcon(props), width: props.size }), props.active && (_jsx(ChainActiveDot, { className: "tw-chain-active-dot-legacy-chain-icon" }))] }));
};
/**
 * @internal
 */
export const getSrcChainIcon = (props) => {
    const url = props.chainIconUrl;
    if (!url) {
        return fallbackChainIcon;
    }
    try {
        return resolveScheme({
            client: props.client,
            uri: url,
        });
    }
    catch {
        return fallbackChainIcon;
    }
};
//# sourceMappingURL=ChainIcon.js.map
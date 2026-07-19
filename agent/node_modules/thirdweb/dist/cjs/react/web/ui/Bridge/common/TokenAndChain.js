"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainIcon = void 0;
exports.TokenAndChain = TokenAndChain;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_js_1 = require("../../../../../chains/utils.js");
const addresses_js_1 = require("../../../../../constants/addresses.js");
const ipfs_js_1 = require("../../../../../utils/ipfs.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../../core/hooks/others/useChainQuery.js");
const walletIcon_js_1 = require("../../../../core/utils/walletIcon.js");
const nativeToken_js_1 = require("../../ConnectWallet/screens/nativeToken.js");
const basic_js_1 = require("../../components/basic.js");
const ChainName_js_1 = require("../../components/ChainName.js");
const fallbackChainIcon_js_1 = require("../../components/fallbackChainIcon.js");
const Img_js_1 = require("../../components/Img.js");
const text_js_1 = require("../../components/text.js");
function TokenAndChain({ token, client, size, style, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const chain = (0, utils_js_1.getCachedChain)(token.chainId);
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", style: {
            flexWrap: "nowrap",
            ...style,
        }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
                    height: index_js_1.iconSize[size],
                    position: "relative",
                    width: index_js_1.iconSize[size],
                }, children: [(0, jsx_runtime_1.jsx)(TokenIconWithFallback, { client: client, size: size, token: token }), chain.id !== 1 && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                            background: theme.colors.borderColor,
                            border: `1.5px solid ${theme.colors.modalBg}`,
                            borderRadius: "50%",
                            bottom: "-2px",
                            height: size === "lg" || size === "xl" ? index_js_1.iconSize.sm : index_js_1.iconSize.xs,
                            position: "absolute",
                            right: "-2px",
                            width: size === "lg" || size === "xl" ? index_js_1.iconSize.sm : index_js_1.iconSize.xs,
                        }, children: (0, jsx_runtime_1.jsx)(exports.ChainIcon, { chain: chain, client: client, size: size === "xl" || size === "lg" ? "sm" : "xs" }) }))] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "4xs", style: { minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: size === "xl" ? "lg" : "sm", style: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }, weight: 500, trackingTight: true, children: token.name }), (0, jsx_runtime_1.jsx)(ChainName_js_1.ChainName, { chain: chain, client: client, short: true, size: size === "xl" ? "sm" : "xs" })] })] }));
}
function TokenIconWithFallback(props) {
    const chain = (0, utils_js_1.getCachedChain)(props.token.chainId);
    const chainMeta = (0, useChainQuery_js_1.useChainMetadata)(chain).data;
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const tokenImage = (0, react_1.useMemo)(() => {
        if ((0, nativeToken_js_1.isNativeToken)(props.token) ||
            props.token.address === addresses_js_1.NATIVE_TOKEN_ADDRESS) {
            if (chainMeta?.nativeCurrency.symbol === "ETH") {
                return "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png"; // ETH icon
            }
            return chainMeta?.icon?.url;
        }
        return props.token.iconUri;
    }, [props.token, chainMeta?.icon?.url, chainMeta?.nativeCurrency.symbol]);
    return tokenImage ? ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, fallbackImage: walletIcon_js_1.genericTokenIcon, height: index_js_1.iconSize[props.size], src: tokenImage, style: {
            borderRadius: "50%",
        }, width: index_js_1.iconSize[props.size] })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
            alignItems: "center",
            backgroundColor: theme.colors.secondaryButtonBg,
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: "50%",
            display: "flex",
            height: `${index_js_1.iconSize[props.size]}px`,
            justifyContent: "center",
            padding: index_js_1.spacing.xs,
            width: `${index_js_1.iconSize[props.size]}px`,
        }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: props.size === "xl" ? "sm" : "xs", style: { fontWeight: 600 }, children: props.token.symbol.slice(0, 1) }) }));
}
const ChainIcon = (props) => {
    const { url } = (0, useChainQuery_js_1.useChainIconUrl)(props.chain);
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            position: "relative",
        }, children: (0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, fallbackImage: fallbackChainIcon_js_1.fallbackChainIcon, height: index_js_1.iconSize[props.size], src: getSrcChainIcon({
                chainIconUrl: url,
                client: props.client,
            }), width: index_js_1.iconSize[props.size] }) }));
};
exports.ChainIcon = ChainIcon;
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
//# sourceMappingURL=TokenAndChain.js.map
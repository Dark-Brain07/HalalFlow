import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { getCachedChain } from "../../../../../chains/utils.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../../constants/addresses.js";
import { resolveScheme } from "../../../../../utils/ipfs.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, spacing } from "../../../../core/design-system/index.js";
import { useChainIconUrl, useChainMetadata, } from "../../../../core/hooks/others/useChainQuery.js";
import { genericTokenIcon } from "../../../../core/utils/walletIcon.js";
import { isNativeToken } from "../../ConnectWallet/screens/nativeToken.js";
import { Container } from "../../components/basic.js";
import { ChainName } from "../../components/ChainName.js";
import { fallbackChainIcon } from "../../components/fallbackChainIcon.js";
import { Img } from "../../components/Img.js";
import { Text } from "../../components/text.js";
export function TokenAndChain({ token, client, size, style, }) {
    const theme = useCustomTheme();
    const chain = getCachedChain(token.chainId);
    return (_jsxs(Container, { center: "y", flex: "row", gap: "sm", style: {
            flexWrap: "nowrap",
            ...style,
        }, children: [_jsxs(Container, { style: {
                    height: iconSize[size],
                    position: "relative",
                    width: iconSize[size],
                }, children: [_jsx(TokenIconWithFallback, { client: client, size: size, token: token }), chain.id !== 1 && (_jsx(Container, { style: {
                            background: theme.colors.borderColor,
                            border: `1.5px solid ${theme.colors.modalBg}`,
                            borderRadius: "50%",
                            bottom: "-2px",
                            height: size === "lg" || size === "xl" ? iconSize.sm : iconSize.xs,
                            position: "absolute",
                            right: "-2px",
                            width: size === "lg" || size === "xl" ? iconSize.sm : iconSize.xs,
                        }, children: _jsx(ChainIcon, { chain: chain, client: client, size: size === "xl" || size === "lg" ? "sm" : "xs" }) }))] }), _jsxs(Container, { flex: "column", gap: "4xs", style: { minWidth: 0 }, children: [_jsx(Text, { color: "primaryText", size: size === "xl" ? "lg" : "sm", style: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }, weight: 500, trackingTight: true, children: token.name }), _jsx(ChainName, { chain: chain, client: client, short: true, size: size === "xl" ? "sm" : "xs" })] })] }));
}
function TokenIconWithFallback(props) {
    const chain = getCachedChain(props.token.chainId);
    const chainMeta = useChainMetadata(chain).data;
    const theme = useCustomTheme();
    const tokenImage = useMemo(() => {
        if (isNativeToken(props.token) ||
            props.token.address === NATIVE_TOKEN_ADDRESS) {
            if (chainMeta?.nativeCurrency.symbol === "ETH") {
                return "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png"; // ETH icon
            }
            return chainMeta?.icon?.url;
        }
        return props.token.iconUri;
    }, [props.token, chainMeta?.icon?.url, chainMeta?.nativeCurrency.symbol]);
    return tokenImage ? (_jsx(Img, { client: props.client, fallbackImage: genericTokenIcon, height: iconSize[props.size], src: tokenImage, style: {
            borderRadius: "50%",
        }, width: iconSize[props.size] })) : (_jsx(Container, { style: {
            alignItems: "center",
            backgroundColor: theme.colors.secondaryButtonBg,
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: "50%",
            display: "flex",
            height: `${iconSize[props.size]}px`,
            justifyContent: "center",
            padding: spacing.xs,
            width: `${iconSize[props.size]}px`,
        }, children: _jsx(Text, { color: "secondaryText", size: props.size === "xl" ? "sm" : "xs", style: { fontWeight: 600 }, children: props.token.symbol.slice(0, 1) }) }));
}
export const ChainIcon = (props) => {
    const { url } = useChainIconUrl(props.chain);
    return (_jsx(Container, { style: {
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            position: "relative",
        }, children: _jsx(Img, { client: props.client, fallbackImage: fallbackChainIcon, height: iconSize[props.size], src: getSrcChainIcon({
                chainIconUrl: url,
                client: props.client,
            }), width: iconSize[props.size] }) }));
};
const getSrcChainIcon = (props) => {
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
//# sourceMappingURL=TokenAndChain.js.map
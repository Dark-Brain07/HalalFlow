"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenIcon = TokenIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const addresses_js_1 = require("../../../../constants/addresses.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const walletIcon_js_1 = require("../../../core/utils/walletIcon.js");
const CoinsIcon_js_1 = require("../ConnectWallet/icons/CoinsIcon.js");
const nativeToken_js_1 = require("../ConnectWallet/screens/nativeToken.js");
const basic_js_1 = require("./basic.js");
const Img_js_1 = require("./Img.js");
/**
 * @internal
 */
function TokenIcon(props) {
    const chainMeta = (0, useChainQuery_js_1.useChainMetadata)(props.chain).data;
    const tokenImage = (0, react_1.useMemo)(() => {
        if ((0, nativeToken_js_1.isNativeToken)(props.token) ||
            props.token.address === addresses_js_1.NATIVE_TOKEN_ADDRESS) {
            if (chainMeta?.nativeCurrency.symbol === "ETH") {
                return "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png"; // ETH icon
            }
            return chainMeta?.icon?.url;
        }
        return props.token.icon;
    }, [props.token, chainMeta?.icon?.url, chainMeta?.nativeCurrency.symbol]);
    return tokenImage ? ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, fallbackImage: walletIcon_js_1.genericTokenIcon, height: index_js_1.iconSize[props.size], src: tokenImage, width: index_js_1.iconSize[props.size] })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", color: "secondaryText", style: { height: index_js_1.iconSize[props.size], width: index_js_1.iconSize[props.size] }, children: (0, jsx_runtime_1.jsx)(CoinsIcon_js_1.CoinsIcon, { size: index_js_1.iconSize[props.size] }) }));
}
//# sourceMappingURL=TokenIcon.js.map
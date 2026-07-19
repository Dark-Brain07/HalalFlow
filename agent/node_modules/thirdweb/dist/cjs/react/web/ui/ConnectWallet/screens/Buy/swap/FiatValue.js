"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiatValue = FiatValue;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const cryptoToFiat_js_1 = require("../../../../../../../pay/convert/cryptoToFiat.js");
const index_js_1 = require("../../../../../../core/design-system/index.js");
const Skeleton_js_1 = require("../../../../components/Skeleton.js");
const text_js_1 = require("../../../../components/text.js");
const useDebouncedValue_js_1 = require("../../../../hooks/useDebouncedValue.js");
const formatTokenBalance_js_1 = require("../../formatTokenBalance.js");
const nativeToken_js_1 = require("../../nativeToken.js");
function FiatValue(props) {
    const deferredTokenAmount = (0, useDebouncedValue_js_1.useDebouncedValue)(props.tokenAmount, 500);
    const cryptoToFiatQuery = (0, react_query_1.useQuery)({
        queryFn: () => (0, cryptoToFiat_js_1.convertCryptoToFiat)({
            chain: props.chain,
            client: props.client,
            fromAmount: Number(deferredTokenAmount),
            fromTokenAddress: (0, nativeToken_js_1.getTokenAddress)(props.token),
            to: props.currency || "USD",
        }),
        queryKey: [
            "cryptoToFiat",
            props.chain.id,
            (0, nativeToken_js_1.getTokenAddress)(props.token),
            deferredTokenAmount,
            props.currency,
        ],
    });
    if (cryptoToFiatQuery.isLoading) {
        return (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.lg, width: "50px" });
    }
    return cryptoToFiatQuery.data?.result ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { ...props, trackingTight: true, children: (0, formatTokenBalance_js_1.formatCurrencyAmount)(props.currency || "USD", cryptoToFiatQuery.data.result) })) : null;
}
//# sourceMappingURL=FiatValue.js.map
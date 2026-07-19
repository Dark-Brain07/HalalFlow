import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { convertCryptoToFiat } from "../../../../../../../pay/convert/cryptoToFiat.js";
import { fontSize } from "../../../../../../core/design-system/index.js";
import { Skeleton } from "../../../../components/Skeleton.js";
import { Text } from "../../../../components/text.js";
import { useDebouncedValue } from "../../../../hooks/useDebouncedValue.js";
import { formatCurrencyAmount } from "../../formatTokenBalance.js";
import { getTokenAddress } from "../../nativeToken.js";
export function FiatValue(props) {
    const deferredTokenAmount = useDebouncedValue(props.tokenAmount, 500);
    const cryptoToFiatQuery = useQuery({
        queryFn: () => convertCryptoToFiat({
            chain: props.chain,
            client: props.client,
            fromAmount: Number(deferredTokenAmount),
            fromTokenAddress: getTokenAddress(props.token),
            to: props.currency || "USD",
        }),
        queryKey: [
            "cryptoToFiat",
            props.chain.id,
            getTokenAddress(props.token),
            deferredTokenAmount,
            props.currency,
        ],
    });
    if (cryptoToFiatQuery.isLoading) {
        return _jsx(Skeleton, { height: fontSize.lg, width: "50px" });
    }
    return cryptoToFiatQuery.data?.result ? (_jsx(Text, { ...props, trackingTight: true, children: formatCurrencyAmount(props.currency || "USD", cryptoToFiatQuery.data.result) })) : null;
}
//# sourceMappingURL=FiatValue.js.map
import { jsx as _jsx } from "react/jsx-runtime";
import { PaymentSelection } from "../../react/web/ui/Bridge/payment-selection/PaymentSelection.js";
import en from "../../react/web/ui/ConnectWallet/locale/en.js";
import { ModalThemeWrapper, storyClient } from "../utils.js";
import { USDC } from "./fixtures.js";
const meta = {
    args: {
        client: storyClient,
        onBack: () => {
            alert("Back");
        },
        connectLocale: en,
        destinationAmount: "1",
        destinationToken: USDC,
        onError: (error) => console.error("Error:", error),
        onPaymentMethodSelected: () => { },
        country: "US",
        connectOptions: undefined,
        currency: "USD",
        paymentMethods: ["crypto", "card"],
        receiverAddress: "0x0000000000000000000000000000000000000000",
        feePayer: undefined,
        supportedTokens: undefined,
    },
    decorators: [
        (Story) => (_jsx(ModalThemeWrapper, { children: _jsx(Story, {}) })),
    ],
    component: PaymentSelection,
    title: "Bridge/screens/PaymentSelection",
};
export default meta;
export const OnlyCryptoMethodEnabled = {
    args: {
        paymentMethods: ["crypto"],
    },
};
export const OnlyFiatMethodEnabled = {
    args: {
        paymentMethods: ["card"],
    },
};
//# sourceMappingURL=PaymentSelection.stories.js.map
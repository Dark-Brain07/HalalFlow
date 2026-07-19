"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSelection = PaymentSelection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const pay_js_1 = require("../../../../../analytics/track/pay.js");
const utils_js_1 = require("../../../../../chains/utils.js");
const units_js_1 = require("../../../../../utils/units.js");
const usePaymentMethods_js_1 = require("../../../../core/hooks/usePaymentMethods.js");
const useActiveWallet_js_1 = require("../../../../core/hooks/wallets/useActiveWallet.js");
const useConnectedWallets_js_1 = require("../../../../core/hooks/wallets/useConnectedWallets.js");
const WalletSwitcherConnectionScreen_js_1 = require("../../ConnectWallet/screens/WalletSwitcherConnectionScreen.js");
const basic_js_1 = require("../../components/basic.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const FiatProviderSelection_js_1 = require("./FiatProviderSelection.js");
const TokenSelection_js_1 = require("./TokenSelection.js");
const WalletFiatSelection_js_1 = require("./WalletFiatSelection.js");
function PaymentSelection({ destinationToken, client, destinationAmount, receiverAddress, onPaymentMethodSelected, onError, onBack, connectOptions, connectLocale, paymentMethods, supportedTokens, feePayer, currency, country, }) {
    const connectedWallets = (0, useConnectedWallets_js_1.useConnectedWallets)();
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const initialStep = paymentMethods.length === 1 && paymentMethods[0] === "card"
        ? {
            type: "fiatProviderSelection",
        }
        : {
            type: "walletSelection",
        };
    const [currentStep, setCurrentStep] = (0, react_1.useState)(initialStep);
    const payerWallet = currentStep.type === "tokenSelection"
        ? currentStep.selectedWallet
        : activeWallet;
    const { data: suitableTokenPaymentMethods, isLoading: paymentMethodsLoading, error: paymentMethodsError, } = (0, usePaymentMethods_js_1.usePaymentMethods)({
        client,
        destinationAmount,
        destinationToken,
        payerWallet,
        supportedTokens,
    });
    // Handle error from usePaymentMethods
    (0, react_1.useEffect)(() => {
        if (paymentMethodsError) {
            onError(paymentMethodsError);
        }
    }, [paymentMethodsError, onError]);
    const handlePaymentMethodSelected = (paymentMethod) => {
        try {
            onPaymentMethodSelected(paymentMethod);
        }
        catch (error) {
            onError(error);
        }
    };
    const handleWalletSelected = (wallet) => {
        (0, pay_js_1.trackPayEvent)({
            client,
            event: "ub:ui:token_selection",
        });
        setCurrentStep({ selectedWallet: wallet, type: "tokenSelection" });
    };
    const handleConnectWallet = async () => {
        setCurrentStep({ type: "walletConnection" });
    };
    const handleFiatSelected = () => {
        (0, pay_js_1.trackPayEvent)({
            client,
            event: "ub:ui:fiat_provider_selection",
        });
        setCurrentStep({ type: "fiatProviderSelection" });
    };
    const handleBackToWalletSelection = () => {
        setCurrentStep({ type: "walletSelection" });
    };
    const handleOnrampProviderSelected = (provider) => {
        const recipientAddress = receiverAddress || payerWallet?.getAccount()?.address;
        if (!recipientAddress) {
            onError(new Error("No recipient address available for fiat payment"));
            return;
        }
        const fiatPaymentMethod = {
            currency: currency || "USD",
            onramp: provider,
            payerWallet,
            type: "fiat",
        };
        handlePaymentMethodSelected(fiatPaymentMethod);
    };
    const getStepTitle = () => {
        switch (currentStep.type) {
            case "walletSelection":
                return "Choose Payment Method";
            case "tokenSelection":
                return "Select Token";
            case "fiatProviderSelection":
                return "Select Payment Provider";
            case "walletConnection":
                return "Connect Wallet";
        }
    };
    const getBackHandler = () => {
        if (paymentMethods.length === 1 && paymentMethods[0] === "card") {
            return onBack;
        }
        switch (currentStep.type) {
            case "walletSelection":
                return onBack;
            case "tokenSelection":
            case "fiatProviderSelection":
            case "walletConnection":
                return handleBackToWalletSelection;
        }
    };
    // Handle rendering WalletSwitcherConnectionScreen
    if (currentStep.type === "walletConnection") {
        const destinationChain = destinationToken
            ? (0, utils_js_1.defineChain)(destinationToken.chainId)
            : undefined;
        const chains = destinationChain
            ? [destinationChain, ...(connectOptions?.chains || [])]
            : connectOptions?.chains;
        return ((0, jsx_runtime_1.jsx)(WalletSwitcherConnectionScreen_js_1.WalletSwitcherConnectionScreen, { accountAbstraction: connectOptions?.accountAbstraction, appMetadata: connectOptions?.appMetadata, chain: destinationChain || connectOptions?.chain, chains: chains, client: client, connectLocale: connectLocale, hiddenWallets: [], isEmbed: false, onBack: handleBackToWalletSelection, onSelect: handleWalletSelected, recommendedWallets: connectOptions?.recommendedWallets, showAllWallets: connectOptions?.showAllWallets === undefined
                ? true
                : connectOptions?.showAllWallets, walletConnect: connectOptions?.walletConnect, wallets: connectOptions?.wallets?.filter((w) => w.id !== "inApp") }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", px: "md", pt: "md+", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: getBackHandler(), title: getStepTitle() }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", style: { minHeight: "300px" }, children: [currentStep.type === "walletSelection" && ((0, jsx_runtime_1.jsx)(WalletFiatSelection_js_1.WalletFiatSelection, { client: client, connectedWallets: connectedWallets, onConnectWallet: handleConnectWallet, onFiatSelected: handleFiatSelected, onWalletSelected: handleWalletSelected, paymentMethods: paymentMethods })), currentStep.type === "tokenSelection" && ((0, jsx_runtime_1.jsx)(TokenSelection_js_1.TokenSelection, { client: client, destinationAmount: (0, units_js_1.toUnits)(destinationAmount, destinationToken.decimals), destinationToken: destinationToken, feePayer: feePayer, onBack: handleBackToWalletSelection, onPaymentMethodSelected: handlePaymentMethodSelected, paymentMethods: suitableTokenPaymentMethods, paymentMethodsLoading: paymentMethodsLoading, currency: currency })), currentStep.type === "fiatProviderSelection" && ((0, jsx_runtime_1.jsx)(FiatProviderSelection_js_1.FiatProviderSelection, { country: country, client: client, onProviderSelected: handleOnrampProviderSelected, toAddress: receiverAddress || payerWallet?.getAccount()?.address || "", toAmount: destinationAmount, toChainId: destinationToken.chainId, toTokenAddress: destinationToken.address, currency: currency }))] })] }));
}
//# sourceMappingURL=PaymentSelection.js.map
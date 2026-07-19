"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { trackPayEvent } from "../../../../../analytics/track/pay.js";
import { defineChain } from "../../../../../chains/utils.js";
import { toUnits } from "../../../../../utils/units.js";
import { usePaymentMethods } from "../../../../core/hooks/usePaymentMethods.js";
import { useActiveWallet } from "../../../../core/hooks/wallets/useActiveWallet.js";
import { useConnectedWallets } from "../../../../core/hooks/wallets/useConnectedWallets.js";
import { WalletSwitcherConnectionScreen } from "../../ConnectWallet/screens/WalletSwitcherConnectionScreen.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { Spacer } from "../../components/Spacer.js";
import { FiatProviderSelection } from "./FiatProviderSelection.js";
import { TokenSelection } from "./TokenSelection.js";
import { WalletFiatSelection } from "./WalletFiatSelection.js";
export function PaymentSelection({ destinationToken, client, destinationAmount, receiverAddress, onPaymentMethodSelected, onError, onBack, connectOptions, connectLocale, paymentMethods, supportedTokens, feePayer, currency, country, }) {
    const connectedWallets = useConnectedWallets();
    const activeWallet = useActiveWallet();
    const initialStep = paymentMethods.length === 1 && paymentMethods[0] === "card"
        ? {
            type: "fiatProviderSelection",
        }
        : {
            type: "walletSelection",
        };
    const [currentStep, setCurrentStep] = useState(initialStep);
    const payerWallet = currentStep.type === "tokenSelection"
        ? currentStep.selectedWallet
        : activeWallet;
    const { data: suitableTokenPaymentMethods, isLoading: paymentMethodsLoading, error: paymentMethodsError, } = usePaymentMethods({
        client,
        destinationAmount,
        destinationToken,
        payerWallet,
        supportedTokens,
    });
    // Handle error from usePaymentMethods
    useEffect(() => {
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
        trackPayEvent({
            client,
            event: "ub:ui:token_selection",
        });
        setCurrentStep({ selectedWallet: wallet, type: "tokenSelection" });
    };
    const handleConnectWallet = async () => {
        setCurrentStep({ type: "walletConnection" });
    };
    const handleFiatSelected = () => {
        trackPayEvent({
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
            ? defineChain(destinationToken.chainId)
            : undefined;
        const chains = destinationChain
            ? [destinationChain, ...(connectOptions?.chains || [])]
            : connectOptions?.chains;
        return (_jsx(WalletSwitcherConnectionScreen, { accountAbstraction: connectOptions?.accountAbstraction, appMetadata: connectOptions?.appMetadata, chain: destinationChain || connectOptions?.chain, chains: chains, client: client, connectLocale: connectLocale, hiddenWallets: [], isEmbed: false, onBack: handleBackToWalletSelection, onSelect: handleWalletSelected, recommendedWallets: connectOptions?.recommendedWallets, showAllWallets: connectOptions?.showAllWallets === undefined
                ? true
                : connectOptions?.showAllWallets, walletConnect: connectOptions?.walletConnect, wallets: connectOptions?.wallets?.filter((w) => w.id !== "inApp") }));
    }
    return (_jsxs(Container, { flex: "column", px: "md", pt: "md+", children: [_jsx(ModalHeader, { onBack: getBackHandler(), title: getStepTitle() }), _jsx(Spacer, { y: "lg" }), _jsxs(Container, { flex: "column", style: { minHeight: "300px" }, children: [currentStep.type === "walletSelection" && (_jsx(WalletFiatSelection, { client: client, connectedWallets: connectedWallets, onConnectWallet: handleConnectWallet, onFiatSelected: handleFiatSelected, onWalletSelected: handleWalletSelected, paymentMethods: paymentMethods })), currentStep.type === "tokenSelection" && (_jsx(TokenSelection, { client: client, destinationAmount: toUnits(destinationAmount, destinationToken.decimals), destinationToken: destinationToken, feePayer: feePayer, onBack: handleBackToWalletSelection, onPaymentMethodSelected: handlePaymentMethodSelected, paymentMethods: suitableTokenPaymentMethods, paymentMethodsLoading: paymentMethodsLoading, currency: currency })), currentStep.type === "fiatProviderSelection" && (_jsx(FiatProviderSelection, { country: country, client: client, onProviderSelected: handleOnrampProviderSelected, toAddress: receiverAddress || payerWallet?.getAccount()?.address || "", toAmount: destinationAmount, toChainId: destinationToken.chainId, toTokenAddress: destinationToken.address, currency: currency }))] })] }));
}
//# sourceMappingURL=PaymentSelection.js.map
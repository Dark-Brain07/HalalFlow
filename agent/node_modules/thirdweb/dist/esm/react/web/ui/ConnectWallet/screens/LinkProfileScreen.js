"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { isEcosystemWallet } from "../../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { iconSize } from "../../../../core/design-system/index.js";
import { useActiveWallet } from "../../../../core/hooks/wallets/useActiveWallet.js";
import { useActiveWalletChain } from "../../../../core/hooks/wallets/useActiveWalletChain.js";
import { useAdminWallet } from "../../../../core/hooks/wallets/useAdminWallet.js";
import EcosystemWalletConnectUI from "../../../wallets/ecosystem/EcosystemWalletConnectUI.js";
import { LoadingScreen } from "../../../wallets/shared/LoadingScreen.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Text } from "../../components/text.js";
const InAppWalletConnectUI = /* @__PURE__ */ lazy(() => import("../../../wallets/in-app/InAppWalletConnectUI.js"));
/**
 * @internal
 */
export function LinkProfileScreen(props) {
    const adminWallet = useAdminWallet();
    const activeWallet = useActiveWallet();
    const chain = useActiveWalletChain();
    const queryClient = useQueryClient();
    const wallet = adminWallet || activeWallet;
    if (!wallet) {
        return _jsx(LoadingScreen, {});
    }
    if (wallet.id === "inApp") {
        return (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(InAppWalletConnectUI, { chain: chain, client: props.client, connectLocale: props.locale, done: () => {
                    setTimeout(() => {
                        queryClient.invalidateQueries({ queryKey: ["profiles"] });
                    }, 500);
                    props.onBack();
                }, goBack: props.onBack, isLinking: true, meta: {
                    showThirdwebBranding: false,
                    title: props.locale.manageWallet.linkProfile,
                }, size: "compact", wallet: wallet, walletConnect: props.walletConnect }) }));
    }
    if (isEcosystemWallet(wallet)) {
        return (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(EcosystemWalletConnectUI, { chain: chain, client: props.client, connectLocale: props.locale, done: () => {
                    setTimeout(() => {
                        queryClient.invalidateQueries({ queryKey: ["profiles"] });
                    }, 500);
                    props.onBack();
                }, goBack: props.onBack, isLinking: true, meta: {
                    showThirdwebBranding: false,
                    title: props.locale.manageWallet.linkProfile,
                }, size: "compact", wallet: wallet, walletConnect: props.walletConnect }) }));
    }
    return (_jsxs(Container, { style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.locale.manageWallet.linkProfile }) }), _jsx(Line, {}), _jsxs(Container, { center: "both", color: "secondaryText", flex: "column", gap: "md", px: "xl", style: {
                    flex: "1",
                    minHeight: "250px",
                }, children: [_jsx(CrossCircledIcon, { height: iconSize.xl, width: iconSize.xl }), _jsx(Text, { center: true, children: "This wallet does not support account linking" })] })] }));
}
//# sourceMappingURL=LinkProfileScreen.js.map
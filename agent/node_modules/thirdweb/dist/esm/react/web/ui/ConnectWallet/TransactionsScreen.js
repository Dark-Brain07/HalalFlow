"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { formatExplorerAddressUrl } from "../../../../utils/url.js";
import { iconSize } from "../../../core/design-system/index.js";
import { useChainExplorers } from "../../../core/hooks/others/useChainQuery.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../core/hooks/wallets/useActiveWallet.js";
import { useActiveWalletChain } from "../../../core/hooks/wallets/useActiveWalletChain.js";
import { LoadingScreen } from "../../wallets/shared/LoadingScreen.js";
import { Container, Line, ModalHeader } from "../components/basic.js";
import { ButtonLink } from "../components/buttons.js";
import { Spacer } from "../components/Spacer.js";
import { WalletTransactionHistory } from "./screens/WalletTransactionHistory.js";
/**
 * @internal
 */
export function TransactionsScreen(props) {
    const activeChain = useActiveWalletChain();
    const activeWallet = useActiveWallet();
    const activeAccount = useActiveAccount();
    const chainExplorers = useChainExplorers(activeChain);
    const payer = activeChain && activeAccount && activeWallet
        ? { account: activeAccount, chain: activeChain, wallet: activeWallet }
        : undefined;
    if (!payer) {
        return _jsx(LoadingScreen, {});
    }
    return (_jsxs(Container, { animate: "fadein", children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.locale.transactions }) }), _jsx(Line, {}), _jsxs(Container, { px: "lg", scrollY: true, style: {
                    minHeight: "330px",
                }, children: [_jsx(Spacer, { y: "md" }), _jsx(WalletTransactionHistory, { address: payer.account.address, client: props.client, locale: props.locale })] }), _jsx(Line, {}), _jsx(Container, { p: "lg", children: _jsxs(ButtonLink, { as: "a", fullWidth: true, gap: "xs", href: formatExplorerAddressUrl(chainExplorers.explorers[0]?.url ?? "", activeAccount?.address ?? ""), style: {
                        color: "inherit",
                        textDecoration: "none",
                    }, target: "_blank", variant: "outline", children: ["View on Explorer", _jsx(ExternalLinkIcon, { height: iconSize.sm, width: iconSize.sm })] }) })] }));
}
//# sourceMappingURL=TransactionsScreen.js.map
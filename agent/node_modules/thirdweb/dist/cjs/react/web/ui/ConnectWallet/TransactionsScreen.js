"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsScreen = TransactionsScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const url_js_1 = require("../../../../utils/url.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const useActiveWalletChain_js_1 = require("../../../core/hooks/wallets/useActiveWalletChain.js");
const LoadingScreen_js_1 = require("../../wallets/shared/LoadingScreen.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const Spacer_js_1 = require("../components/Spacer.js");
const WalletTransactionHistory_js_1 = require("./screens/WalletTransactionHistory.js");
/**
 * @internal
 */
function TransactionsScreen(props) {
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const chainExplorers = (0, useChainQuery_js_1.useChainExplorers)(activeChain);
    const payer = activeChain && activeAccount && activeWallet
        ? { account: activeAccount, chain: activeChain, wallet: activeWallet }
        : undefined;
    if (!payer) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.locale.transactions }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "lg", scrollY: true, style: {
                    minHeight: "330px",
                }, children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(WalletTransactionHistory_js_1.WalletTransactionHistory, { address: payer.account.address, client: props.client, locale: props.locale })] }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsxs)(buttons_js_1.ButtonLink, { as: "a", fullWidth: true, gap: "xs", href: (0, url_js_1.formatExplorerAddressUrl)(chainExplorers.explorers[0]?.url ?? "", activeAccount?.address ?? ""), style: {
                        color: "inherit",
                        textDecoration: "none",
                    }, target: "_blank", variant: "outline", children: ["View on Explorer", (0, jsx_runtime_1.jsx)(react_icons_1.ExternalLinkIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm })] }) })] }));
}
//# sourceMappingURL=TransactionsScreen.js.map
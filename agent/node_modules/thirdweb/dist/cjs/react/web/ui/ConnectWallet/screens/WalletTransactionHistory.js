"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionHistory = WalletTransactionHistory;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const react_icons_1 = require("@radix-ui/react-icons");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const ethereum_js_1 = require("../../../../../chains/chain-definitions/ethereum.js");
const utils_js_1 = require("../../../../../chains/utils.js");
const transaction_store_js_1 = require("../../../../../transaction/transaction-store.js");
const address_js_1 = require("../../../../../utils/address.js");
const url_js_1 = require("../../../../../utils/url.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useWaitForReceipt_js_1 = require("../../../../core/hooks/contract/useWaitForReceipt.js");
const useChainQuery_js_1 = require("../../../../core/hooks/others/useChainQuery.js");
const useActiveWalletChain_js_1 = require("../../../../core/hooks/wallets/useActiveWalletChain.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const ChainIcon_js_1 = require("../../components/ChainIcon.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const text_js_1 = require("../../components/text.js");
function WalletTransactionHistory(props) {
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const chainExplorers = (0, useChainQuery_js_1.useChainExplorers)(activeChain);
    const transactionStore = (0, transaction_store_js_1.getTransactionStore)(props.address);
    const reverseChronologicalTransactions = (0, react_1.useSyncExternalStore)(transactionStore.subscribe, transactionStore.getValue);
    const historicalTxQuery = (0, react_query_1.useQuery)({
        enabled: !!activeChain,
        queryFn: () => (0, transaction_store_js_1.getPastTransactions)({
            chain: activeChain || ethereum_js_1.ethereum,
            client: props.client,
            walletAddress: props.address,
        }),
        queryKey: ["transactions", props.address, activeChain],
    });
    const transactions = [
        ...[...reverseChronologicalTransactions].reverse(),
        ...(historicalTxQuery.data || []),
    ];
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", fullHeight: true, scrollY: true, style: {
            maxHeight: "370px",
            minHeight: "250px",
            paddingBottom: index_js_1.spacing.lg,
        }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, flex: "column", gap: "xs", children: [historicalTxQuery.isLoading && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", color: "secondaryText", flex: "column", gap: "md", style: {
                        flex: "1",
                        minHeight: "250px",
                    }, children: [(0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "secondaryText", size: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { children: "Loading recent transactions..." })] })), !historicalTxQuery.isLoading && transactions.length === 0 ? ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", color: "secondaryText", flex: "column", gap: "md", style: {
                        flex: "1",
                        minHeight: "250px",
                    }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.CrossCircledIcon, { height: index_js_1.iconSize.xl, width: index_js_1.iconSize.xl }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { children: "No Transactions" })] })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", flex: "column", gap: "xs", style: { minHeight: "250px" }, children: transactions.map((tx) => {
                        return ((0, jsx_runtime_1.jsx)(TransactionButton, { client: props.client, explorerUrl: chainExplorers.explorers[0]?.url, tx: tx }, tx.transactionHash));
                    }) }))] }) }));
}
function TransactionButton(props) {
    const { data: fetchedReceipt, isLoading, error, } = (0, useWaitForReceipt_js_1.useWaitForReceipt)({
        chain: (0, utils_js_1.getCachedChain)(props.tx.chainId),
        client: props.client,
        queryOptions: {
            enabled: props.tx.receipt === undefined,
        },
        transactionHash: props.tx.transactionHash,
    });
    const chainIconQuery = (0, useChainQuery_js_1.useChainIconUrl)((0, utils_js_1.getCachedChain)(props.tx.chainId));
    const receipt = props.tx.receipt ?? fetchedReceipt;
    const decoded = props.tx.decoded;
    const content = ((0, jsx_runtime_1.jsxs)(TxButton, { fullWidth: true, style: {
            paddingBlock: index_js_1.spacing.sm,
        }, variant: "secondary", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "md", style: {
                    flex: 1,
                }, children: [(0, jsx_runtime_1.jsx)(ChainIcon_js_1.ChainIcon, { chainIconUrl: chainIconQuery.url, client: props.client, size: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "row", gap: "xs", style: {
                                    justifyContent: "space-between",
                                }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: decoded ? decoded.name : `Transaction Sent` }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxs" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "row", gap: "xxs", style: {
                                    justifyContent: "space-between",
                                }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: receipt?.to
                                        ? (0, address_js_1.shortenHex)(receipt?.to, 4)
                                        : (0, address_js_1.shortenHex)(props.tx.transactionHash, 4) }) })] })] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "xxs", children: [isLoading && (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "primaryText", size: "sm" }), !isLoading && receipt && receipt.status === "success" && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "success", size: "md", children: (0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { height: index_js_1.iconSize.md, width: index_js_1.iconSize.md }) })), (error || (!isLoading && receipt && receipt.status !== "success")) && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "danger", size: "md", children: (0, jsx_runtime_1.jsx)(react_icons_1.CrossCircledIcon, { height: index_js_1.iconSize.md, width: index_js_1.iconSize.md }) }))] })] }));
    if (props.explorerUrl) {
        return ((0, jsx_runtime_1.jsx)("a", { href: (0, url_js_1.formatExplorerTxUrl)(props.explorerUrl, props.tx.transactionHash), rel: "noreferrer", target: "_blank", children: content }));
    }
    return content;
}
const TxButton = /* @__PURE__ */ (0, styled_1.default)(buttons_js_1.Button)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        background: theme.colors.tertiaryBg,
        height: "62px",
    };
});
//# sourceMappingURL=WalletTransactionHistory.js.map
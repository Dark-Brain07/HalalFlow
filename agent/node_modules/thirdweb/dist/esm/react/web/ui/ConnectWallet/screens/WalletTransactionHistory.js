"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";
import { ethereum } from "../../../../../chains/chain-definitions/ethereum.js";
import { getCachedChain } from "../../../../../chains/utils.js";
import { getPastTransactions, getTransactionStore, } from "../../../../../transaction/transaction-store.js";
import { shortenHex } from "../../../../../utils/address.js";
import { formatExplorerTxUrl } from "../../../../../utils/url.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, spacing } from "../../../../core/design-system/index.js";
import { useWaitForReceipt } from "../../../../core/hooks/contract/useWaitForReceipt.js";
import { useChainExplorers, useChainIconUrl, } from "../../../../core/hooks/others/useChainQuery.js";
import { useActiveWalletChain } from "../../../../core/hooks/wallets/useActiveWalletChain.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { ChainIcon } from "../../components/ChainIcon.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { Text } from "../../components/text.js";
export function WalletTransactionHistory(props) {
    const activeChain = useActiveWalletChain();
    const chainExplorers = useChainExplorers(activeChain);
    const transactionStore = getTransactionStore(props.address);
    const reverseChronologicalTransactions = useSyncExternalStore(transactionStore.subscribe, transactionStore.getValue);
    const historicalTxQuery = useQuery({
        enabled: !!activeChain,
        queryFn: () => getPastTransactions({
            chain: activeChain || ethereum,
            client: props.client,
            walletAddress: props.address,
        }),
        queryKey: ["transactions", props.address, activeChain],
    });
    const transactions = [
        ...[...reverseChronologicalTransactions].reverse(),
        ...(historicalTxQuery.data || []),
    ];
    return (_jsx(Container, { flex: "column", fullHeight: true, scrollY: true, style: {
            maxHeight: "370px",
            minHeight: "250px",
            paddingBottom: spacing.lg,
        }, children: _jsxs(Container, { expand: true, flex: "column", gap: "xs", children: [historicalTxQuery.isLoading && (_jsxs(Container, { center: "both", color: "secondaryText", flex: "column", gap: "md", style: {
                        flex: "1",
                        minHeight: "250px",
                    }, children: [_jsx(Spinner, { color: "secondaryText", size: "md" }), _jsx(Text, { children: "Loading recent transactions..." })] })), !historicalTxQuery.isLoading && transactions.length === 0 ? (_jsxs(Container, { center: "both", color: "secondaryText", flex: "column", gap: "md", style: {
                        flex: "1",
                        minHeight: "250px",
                    }, children: [_jsx(CrossCircledIcon, { height: iconSize.xl, width: iconSize.xl }), _jsx(Text, { children: "No Transactions" })] })) : (_jsx(Container, { animate: "fadein", flex: "column", gap: "xs", style: { minHeight: "250px" }, children: transactions.map((tx) => {
                        return (_jsx(TransactionButton, { client: props.client, explorerUrl: chainExplorers.explorers[0]?.url, tx: tx }, tx.transactionHash));
                    }) }))] }) }));
}
function TransactionButton(props) {
    const { data: fetchedReceipt, isLoading, error, } = useWaitForReceipt({
        chain: getCachedChain(props.tx.chainId),
        client: props.client,
        queryOptions: {
            enabled: props.tx.receipt === undefined,
        },
        transactionHash: props.tx.transactionHash,
    });
    const chainIconQuery = useChainIconUrl(getCachedChain(props.tx.chainId));
    const receipt = props.tx.receipt ?? fetchedReceipt;
    const decoded = props.tx.decoded;
    const content = (_jsxs(TxButton, { fullWidth: true, style: {
            paddingBlock: spacing.sm,
        }, variant: "secondary", children: [_jsxs(Container, { center: "y", flex: "row", gap: "md", style: {
                    flex: 1,
                }, children: [_jsx(ChainIcon, { chainIconUrl: chainIconQuery.url, client: props.client, size: iconSize.lg }), _jsxs("div", { style: {
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                        }, children: [_jsx(Container, { center: "y", flex: "row", gap: "xs", style: {
                                    justifyContent: "space-between",
                                }, children: _jsx(Text, { color: "primaryText", size: "sm", children: decoded ? decoded.name : `Transaction Sent` }) }), _jsx(Spacer, { y: "xxs" }), _jsx(Container, { center: "y", flex: "row", gap: "xxs", style: {
                                    justifyContent: "space-between",
                                }, children: _jsx(Text, { color: "secondaryText", size: "xs", children: receipt?.to
                                        ? shortenHex(receipt?.to, 4)
                                        : shortenHex(props.tx.transactionHash, 4) }) })] })] }), _jsxs(Container, { center: "y", flex: "row", gap: "xxs", children: [isLoading && _jsx(Spinner, { color: "primaryText", size: "sm" }), !isLoading && receipt && receipt.status === "success" && (_jsx(Text, { color: "success", size: "md", children: _jsx(CheckIcon, { height: iconSize.md, width: iconSize.md }) })), (error || (!isLoading && receipt && receipt.status !== "success")) && (_jsx(Text, { color: "danger", size: "md", children: _jsx(CrossCircledIcon, { height: iconSize.md, width: iconSize.md }) }))] })] }));
    if (props.explorerUrl) {
        return (_jsx("a", { href: formatExplorerTxUrl(props.explorerUrl, props.tx.transactionHash), rel: "noreferrer", target: "_blank", children: content }));
    }
    return content;
}
const TxButton = /* @__PURE__ */ styled(Button)(() => {
    const theme = useCustomTheme();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        background: theme.colors.tertiaryBg,
        height: "62px",
    };
});
//# sourceMappingURL=WalletTransactionHistory.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Buy, Sell } from "../../../../../bridge/index.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../../constants/addresses.js";
import { getAddress } from "../../../../../utils/address.js";
import { toTokens, toUnits } from "../../../../../utils/units.js";
import { getDefaultWalletsForBridgeComponents } from "../../../../../wallets/defaultWallets.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { ConnectButton } from "../../ConnectWallet/ConnectButton.js";
import { onModalUnmount } from "../../ConnectWallet/constants.js";
import { DetailsModal } from "../../ConnectWallet/Details.js";
import { ArrowUpDownIcon } from "../../ConnectWallet/icons/ArrowUpDownIcon.js";
import connectLocaleEn from "../../ConnectWallet/locale/en.js";
import { PoweredByThirdweb } from "../../ConnectWallet/PoweredByTW.js";
import { formatCurrencyAmount, formatTokenAmount, } from "../../ConnectWallet/screens/formatTokenBalance.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Modal } from "../../components/Modal.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { Text } from "../../components/text.js";
import { useIsMobile } from "../../hooks/useisMobile.js";
import { ActiveWalletDetails } from "../common/active-wallet-details.js";
import { DecimalInput } from "../common/decimal-input.js";
import { SelectedTokenButton } from "../common/selected-token-button.js";
import { useTokenBalance } from "../common/token-balance.js";
import { useTokenPrice } from "./hooks.js";
import { SelectToken } from "./select-token-ui.js";
import { useBridgeChain } from "./use-bridge-chains.js";
/**
 * @internal
 */
export function SwapUI(props) {
    const [modalState, setModalState] = useState({
        screen: "select-buy-token",
        isOpen: false,
    });
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const isMobile = useIsMobile();
    // Token Prices ----------------------------------------------------------------------------
    const buyTokenQuery = useTokenPrice({
        token: props.buyToken,
        client: props.client,
    });
    const sellTokenQuery = useTokenPrice({
        token: props.sellToken,
        client: props.client,
    });
    const buyTokenWithPrices = buyTokenQuery.data;
    const sellTokenWithPrices = sellTokenQuery.data;
    // Swap Quote ----------------------------------------------------------------------------
    const preparedResultQuery = useSwapQuote({
        amountSelection: props.amountSelection,
        buyTokenWithPrices: buyTokenWithPrices,
        sellTokenWithPrices: sellTokenWithPrices,
        activeWalletInfo: props.activeWalletInfo,
        client: props.client,
    });
    // Amount and Amount.fetching ------------------------------------------------------------
    const sellTokenAmount = props.amountSelection.type === "sell"
        ? props.amountSelection.amount
        : preparedResultQuery.data &&
            props.amountSelection.type === "buy" &&
            sellTokenWithPrices
            ? toTokens(preparedResultQuery.data.result.originAmount, sellTokenWithPrices.decimals)
            : "";
    const buyTokenAmount = props.amountSelection.type === "buy"
        ? props.amountSelection.amount
        : preparedResultQuery.data &&
            props.amountSelection.type === "sell" &&
            buyTokenWithPrices
            ? toTokens(preparedResultQuery.data.result.destinationAmount, buyTokenWithPrices.decimals)
            : "";
    // when buy amount is set, the sell amount is fetched
    const isBuyAmountFetching = props.amountSelection.type === "sell" && preparedResultQuery.isFetching;
    const isSellAmountFetching = props.amountSelection.type === "buy" && preparedResultQuery.isFetching;
    // token balances ------------------------------------------------------------
    const sellTokenBalanceQuery = useTokenBalance({
        chainId: sellTokenWithPrices?.chainId,
        tokenAddress: sellTokenWithPrices?.address,
        client: props.client,
        walletAddress: props.activeWalletInfo?.activeAccount.address,
    });
    const buyTokenBalanceQuery = useTokenBalance({
        chainId: buyTokenWithPrices?.chainId,
        tokenAddress: buyTokenWithPrices?.address,
        client: props.client,
        walletAddress: props.activeWalletInfo?.activeAccount.address,
    });
    const notEnoughBalance = !!(sellTokenBalanceQuery.data &&
        sellTokenWithPrices &&
        props.amountSelection.amount &&
        !!sellTokenAmount &&
        sellTokenBalanceQuery.data.value <
            Number(toUnits(sellTokenAmount, sellTokenWithPrices.decimals)));
    // ----------------------------------------------------------------------------
    const disableContinue = !preparedResultQuery.data ||
        preparedResultQuery.isFetching ||
        notEnoughBalance;
    return (_jsxs(Container, { p: "md", children: [_jsxs(Modal, { hide: false, autoFocusCrossIcon: false, className: "tw-modal__swap-widget", size: isMobile ? "compact" : "wide", title: "Select Token", open: modalState.isOpen, crossContainerStyles: {
                    right: spacing.md,
                    top: spacing["md+"],
                    transform: "none",
                }, setOpen: (v) => {
                    if (!v) {
                        setModalState((v) => ({
                            ...v,
                            isOpen: false,
                        }));
                    }
                }, children: [modalState.screen === "select-buy-token" && (_jsx(SelectToken, { type: "buy", selections: {
                            buyChainId: props.buyToken?.chainId,
                            sellChainId: props.sellToken?.chainId,
                        }, activeWalletInfo: props.activeWalletInfo, onClose: () => {
                            setModalState((v) => ({
                                ...v,
                                isOpen: false,
                            }));
                        }, client: props.client, selectedToken: props.buyToken, currency: props.currency, setSelectedToken: (token) => {
                            props.setBuyToken(token);
                            // if buy token is same as sell token, unset sell token
                            if (props.sellToken &&
                                token.tokenAddress.toLowerCase() ===
                                    props.sellToken.tokenAddress.toLowerCase() &&
                                token.chainId === props.sellToken.chainId) {
                                props.setSellToken(undefined);
                            }
                            // if sell token is not selected, set it as native token of the buy token's chain if buy token is not a native token itself
                            if (!props.sellToken &&
                                token.tokenAddress.toLowerCase() !==
                                    NATIVE_TOKEN_ADDRESS.toLowerCase()) {
                                props.setSellToken({
                                    tokenAddress: getAddress(NATIVE_TOKEN_ADDRESS),
                                    chainId: token.chainId,
                                });
                            }
                        } })), modalState.screen === "select-sell-token" && (_jsx(SelectToken, { onClose: () => {
                            setModalState((v) => ({
                                ...v,
                                isOpen: false,
                            }));
                        }, client: props.client, selectedToken: props.sellToken, currency: props.currency, setSelectedToken: (token) => {
                            props.setSellToken(token);
                            // if sell token is same as buy token, unset buy token
                            if (props.buyToken &&
                                token.tokenAddress.toLowerCase() ===
                                    props.buyToken.tokenAddress.toLowerCase() &&
                                token.chainId === props.buyToken.chainId) {
                                props.setBuyToken(undefined);
                            }
                            // if buy token is not selected, set it as native token of the sell token's chain if sell token is not a native token itself
                            if (!props.buyToken &&
                                token.tokenAddress.toLowerCase() !==
                                    NATIVE_TOKEN_ADDRESS.toLowerCase()) {
                                // set the buy token after a delay to avoid updating the "selections" prop passed to the <SelectToken> component and trigger unnecessay fetch of chains query that will never be used
                                // we have to do this because the modal does not close immediately onClose - it has a fade out animation
                                onModalUnmount(() => {
                                    props.setBuyToken({
                                        tokenAddress: getAddress(NATIVE_TOKEN_ADDRESS),
                                        chainId: token.chainId,
                                    });
                                });
                            }
                        }, activeWalletInfo: props.activeWalletInfo, type: "sell", selections: {
                            buyChainId: props.buyToken?.chainId,
                            sellChainId: props.sellToken?.chainId,
                        } }))] }), detailsModalOpen && (_jsx(DetailsModal, { client: props.client, locale: connectLocaleEn, detailsModal: undefined, theme: props.theme, closeModal: () => {
                    setDetailsModalOpen(false);
                }, onDisconnect: () => {
                    props.onDisconnect?.();
                }, chains: [], connectOptions: props.connectOptions })), _jsx(TokenSection, { selection: {
                    buyChainId: props.buyToken?.chainId,
                    sellChainId: props.sellToken?.chainId,
                }, onMaxClick: () => {
                    if (sellTokenBalanceQuery.data) {
                        props.setAmountSelection({
                            type: "sell",
                            amount: sellTokenBalanceQuery.data.displayValue,
                        });
                    }
                }, activeWalletInfo: props.activeWalletInfo, isConnected: !!props.activeWalletInfo, balance: {
                    data: sellTokenBalanceQuery.data?.value,
                    isFetching: sellTokenBalanceQuery.isFetching,
                }, amount: {
                    data: sellTokenAmount,
                    isFetching: isSellAmountFetching,
                }, type: "sell", setAmount: (value) => {
                    props.setAmountSelection({ type: "sell", amount: value });
                }, selectedToken: props.sellToken
                    ? {
                        data: sellTokenQuery.data,
                        isFetching: sellTokenQuery.isFetching,
                        isError: sellTokenQuery.isError,
                    }
                    : undefined, client: props.client, currency: props.currency, onSelectToken: () => setModalState({
                    screen: "select-sell-token",
                    isOpen: true,
                }), onWalletClick: () => {
                    setDetailsModalOpen(true);
                } }), _jsx(SwitchButton, { onClick: () => {
                    // switch tokens
                    const temp = props.sellToken;
                    props.setSellToken(props.buyToken);
                    props.setBuyToken(temp);
                    props.setAmountSelection({
                        type: props.amountSelection.type === "buy" ? "sell" : "buy",
                        amount: props.amountSelection.amount,
                    });
                } }), _jsx(TokenSection, { selection: {
                    buyChainId: props.buyToken?.chainId,
                    sellChainId: props.sellToken?.chainId,
                }, onMaxClick: undefined, onWalletClick: () => {
                    setDetailsModalOpen(true);
                }, activeWalletInfo: props.activeWalletInfo, isConnected: !!props.activeWalletInfo, balance: {
                    data: buyTokenBalanceQuery.data?.value,
                    isFetching: buyTokenBalanceQuery.isFetching,
                }, amount: {
                    data: buyTokenAmount,
                    isFetching: isBuyAmountFetching,
                }, type: "buy", selectedToken: props.buyToken
                    ? {
                        data: buyTokenQuery.data,
                        isFetching: buyTokenQuery.isFetching,
                        isError: buyTokenQuery.isError,
                    }
                    : undefined, setAmount: (value) => {
                    props.setAmountSelection({ type: "buy", amount: value });
                }, client: props.client, currency: props.currency, onSelectToken: () => setModalState({
                    screen: "select-buy-token",
                    isOpen: true,
                }) }), preparedResultQuery.error ||
                buyTokenQuery.isError ||
                sellTokenQuery.isError ? (_jsx(Text, { size: "sm", color: "danger", multiline: true, center: true, style: {
                    paddingBlock: spacing.md,
                }, children: preparedResultQuery.error
                    ? preparedResultQuery.error.message || "Failed to get a quote"
                    : buyTokenQuery.isError
                        ? "Failed to fetch buy token details"
                        : sellTokenQuery.isError
                            ? "Failed to fetch sell token details"
                            : "Failed to get a quote" })) : (_jsx(Spacer, { y: "md" })), !props.activeWalletInfo ? (_jsx(ConnectButton, { client: props.client, connectButton: {
                    label: "Swap",
                    style: {
                        width: "100%",
                        borderRadius: radius.full,
                    },
                }, theme: props.theme, ...props.connectOptions, wallets: props.connectOptions?.wallets ||
                    getDefaultWalletsForBridgeComponents({
                        appMetadata: props.connectOptions?.appMetadata,
                        chains: props.connectOptions?.chains,
                    }) })) : (_jsxs(Button, { disabled: disableContinue, fullWidth: true, onClick: () => {
                    if (preparedResultQuery.data &&
                        buyTokenWithPrices &&
                        sellTokenWithPrices &&
                        sellTokenBalanceQuery.data &&
                        preparedResultQuery.data.type === "preparedResult") {
                        props.onSwap({
                            result: preparedResultQuery.data.result,
                            request: preparedResultQuery.data.request,
                            buyToken: buyTokenWithPrices,
                            sellToken: sellTokenWithPrices,
                            sellTokenBalance: sellTokenBalanceQuery.data.value,
                            mode: props.amountSelection.type,
                        });
                    }
                }, gap: "xs", style: {
                    fontSize: fontSize.md,
                    borderRadius: radius.full,
                    opacity: disableContinue ? 0.5 : 1,
                }, variant: "primary", children: [preparedResultQuery.isFetching && _jsx(Spinner, { size: "sm" }), preparedResultQuery.isFetching
                        ? "Fetching Quote"
                        : notEnoughBalance
                            ? "Insufficient Balance"
                            : "Swap"] })), props.showThirdwebBranding ? (_jsxs("div", { children: [_jsx(Spacer, { y: "md" }), _jsx(PoweredByThirdweb, { link: "https://thirdweb.com/monetize/bridge" })] })) : null] }));
}
function useSwapQuote(params) {
    const { amountSelection, buyTokenWithPrices, sellTokenWithPrices, activeWalletInfo, client, } = params;
    return useQuery({
        queryKey: [
            "swap-quote",
            amountSelection,
            buyTokenWithPrices,
            sellTokenWithPrices,
            activeWalletInfo?.activeAccount.address,
        ],
        retry: false,
        enabled: !!buyTokenWithPrices && !!sellTokenWithPrices && !!amountSelection.amount,
        queryFn: async () => {
            if (!buyTokenWithPrices ||
                !sellTokenWithPrices ||
                !amountSelection.amount) {
                throw new Error("Invalid state");
            }
            if (!activeWalletInfo) {
                if (amountSelection.type === "buy") {
                    const res = await Buy.quote({
                        amount: toUnits(amountSelection.amount, buyTokenWithPrices.decimals),
                        // origin = sell
                        originChainId: sellTokenWithPrices.chainId,
                        originTokenAddress: sellTokenWithPrices.address,
                        // destination = buy
                        destinationChainId: buyTokenWithPrices.chainId,
                        destinationTokenAddress: buyTokenWithPrices.address,
                        client: client,
                    });
                    return {
                        type: "quote",
                        result: res,
                    };
                }
                const res = await Sell.quote({
                    amount: toUnits(amountSelection.amount, sellTokenWithPrices.decimals),
                    // origin = sell
                    originChainId: sellTokenWithPrices.chainId,
                    originTokenAddress: sellTokenWithPrices.address,
                    // destination = buy
                    destinationChainId: buyTokenWithPrices.chainId,
                    destinationTokenAddress: buyTokenWithPrices.address,
                    client: client,
                });
                return {
                    type: "quote",
                    result: res,
                };
            }
            if (amountSelection.type === "buy") {
                const buyRequestOptions = {
                    amount: toUnits(amountSelection.amount, buyTokenWithPrices.decimals),
                    // origin = sell
                    originChainId: sellTokenWithPrices.chainId,
                    originTokenAddress: sellTokenWithPrices.address,
                    // destination = buy
                    destinationChainId: buyTokenWithPrices.chainId,
                    destinationTokenAddress: buyTokenWithPrices.address,
                    client: client,
                    receiver: activeWalletInfo.activeAccount.address,
                    sender: activeWalletInfo.activeAccount.address,
                };
                const buyRequest = {
                    type: "buy",
                    ...buyRequestOptions,
                };
                const res = await Buy.prepare(buyRequest);
                return {
                    type: "preparedResult",
                    result: { type: "buy", ...res },
                    request: buyRequest,
                };
            }
            else if (amountSelection.type === "sell") {
                const sellRequestOptions = {
                    amount: toUnits(amountSelection.amount, sellTokenWithPrices.decimals),
                    // origin = sell
                    originChainId: sellTokenWithPrices.chainId,
                    originTokenAddress: sellTokenWithPrices.address,
                    // destination = buy
                    destinationChainId: buyTokenWithPrices.chainId,
                    destinationTokenAddress: buyTokenWithPrices.address,
                    client: client,
                    receiver: activeWalletInfo.activeAccount.address,
                    sender: activeWalletInfo.activeAccount.address,
                };
                const res = await Sell.prepare(sellRequestOptions);
                const sellRequest = {
                    type: "sell",
                    ...sellRequestOptions,
                };
                return {
                    type: "preparedResult",
                    result: { type: "sell", ...res },
                    request: sellRequest,
                };
            }
            throw new Error("Invalid amount selection type");
        },
        refetchInterval: 20000,
    });
}
function TokenSection(props) {
    const theme = useCustomTheme();
    const chainQuery = useBridgeChain({
        chainId: props.selectedToken?.data?.chainId,
        client: props.client,
    });
    const chain = chainQuery.data;
    const fiatPricePerToken = props.selectedToken?.data?.prices[props.currency];
    const totalFiatValue = !props.amount.data
        ? undefined
        : fiatPricePerToken
            ? fiatPricePerToken * Number(props.amount.data)
            : undefined;
    return (_jsxs(Container, { style: {
            borderRadius: radius.xl,
            borderWidth: 1,
            borderStyle: "solid",
            position: "relative",
            overflow: "hidden",
        }, borderColor: "borderColor", children: [_jsx(Container, { bg: "tertiaryBg", style: {
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    zIndex: 0,
                } }), _jsxs(Container, { style: {
                    position: "relative",
                    zIndex: 1,
                }, children: [_jsxs(Container, { px: "md", py: "sm", relative: true, style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [_jsx(Container, { flex: "row", center: "y", gap: "3xs", color: "secondaryText", children: _jsx(Text, { size: "xs", color: "primaryText", style: {
                                        letterSpacing: "0.07em",
                                    }, children: props.type === "buy" ? "BUY" : "SELL" }) }), props.activeWalletInfo && (_jsx(ActiveWalletDetails, { activeWalletInfo: props.activeWalletInfo, client: props.client, onClick: props.onWalletClick }))] }), _jsxs(Container, { bg: "tertiaryBg", style: {
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: radius.xl,
                            borderTop: `1px solid ${theme.colors.borderColor}`,
                        }, children: [_jsx(SelectedTokenButton, { selectedToken: props.selectedToken, client: props.client, onSelectToken: props.onSelectToken, chain: chain }), _jsxs(Container, { px: "md", py: "md", children: [_jsxs(Container, { flex: "row", gap: "xs", center: "y", style: {
                                            flexWrap: "nowrap",
                                        }, children: [props.amount.isFetching ? (_jsx("div", { style: { flexGrow: 1 }, children: _jsx(Skeleton, { height: "30px", width: "140px", style: {
                                                        borderRadius: radius.lg,
                                                    } }) })) : (_jsx(DecimalInput, { value: props.amount.data, setValue: props.setAmount, style: {
                                                    border: "none",
                                                    boxShadow: "none",
                                                    fontSize: fontSize.xl,
                                                    fontWeight: 500,
                                                    paddingInline: 0,
                                                    paddingBlock: 0,
                                                    letterSpacing: "-0.025em",
                                                    height: "30px",
                                                } })), props.activeWalletInfo &&
                                                props.onMaxClick &&
                                                props.selectedToken && (_jsx(Button, { variant: "outline", style: {
                                                    paddingInline: spacing.xs,
                                                    paddingBlock: spacing.xxs,
                                                    borderRadius: radius.full,
                                                    fontSize: fontSize.xs,
                                                    fontWeight: 400,
                                                }, onClick: props.onMaxClick, children: "Max" }))] }), _jsx(Spacer, { y: "sm" }), _jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            justifyContent: "space-between",
                                        }, children: [_jsx("div", { style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "3px",
                                                }, children: props.amount.isFetching ? (_jsx(Skeleton, { height: fontSize.xs, width: "50px" })) : (_jsx(Text, { size: "xs", color: "secondaryText", children: formatCurrencyAmount(props.currency, totalFiatValue || 0) })) }), props.isConnected && props.selectedToken && (_jsx("div", { children: props.balance.data === undefined ||
                                                    props.selectedToken.data === undefined ? (_jsx(Skeleton, { height: fontSize.xs, width: "100px" })) : (_jsxs("div", { style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "3px",
                                                    }, children: [_jsx(Text, { size: "xs", color: "secondaryText", children: "Balance:" }), _jsx(Text, { size: "xs", color: "primaryText", children: formatTokenAmount(props.balance.data, props.selectedToken.data.decimals, 5) })] })) }))] })] })] })] })] }));
}
function SwitchButton(props) {
    return (_jsx("div", { style: {
            display: "flex",
            justifyContent: "center",
            marginBlock: `-13px`,
            zIndex: 2,
            position: "relative",
        }, children: _jsx(SwitchButtonInner, { variant: "ghost-solid", onClick: (e) => {
                props.onClick();
                const node = e.currentTarget.querySelector("svg");
                if (node) {
                    node.style.transform = "rotate(180deg)";
                    node.style.transition = "transform 300ms ease";
                    setTimeout(() => {
                        node.style.transition = "";
                        node.style.transform = "rotate(0deg)";
                    }, 300);
                }
            }, children: _jsx(ArrowUpDownIcon, { size: iconSize["sm+"] }) }) }));
}
const SwitchButtonInner = /* @__PURE__ */ styled(Button)(() => {
    const theme = useCustomTheme();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        borderRadius: radius.full,
        padding: spacing.xs,
        color: theme.colors.primaryText,
        background: theme.colors.modalBg,
        border: `1px solid ${theme.colors.borderColor}`,
    };
});
//# sourceMappingURL=swap-ui.js.map
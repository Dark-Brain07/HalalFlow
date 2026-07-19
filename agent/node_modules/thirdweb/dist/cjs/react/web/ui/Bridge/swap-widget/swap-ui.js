"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapUI = SwapUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const index_js_1 = require("../../../../../bridge/index.js");
const addresses_js_1 = require("../../../../../constants/addresses.js");
const address_js_1 = require("../../../../../utils/address.js");
const units_js_1 = require("../../../../../utils/units.js");
const defaultWallets_js_1 = require("../../../../../wallets/defaultWallets.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_2 = require("../../../../core/design-system/index.js");
const ConnectButton_js_1 = require("../../ConnectWallet/ConnectButton.js");
const constants_js_1 = require("../../ConnectWallet/constants.js");
const Details_js_1 = require("../../ConnectWallet/Details.js");
const ArrowUpDownIcon_js_1 = require("../../ConnectWallet/icons/ArrowUpDownIcon.js");
const en_js_1 = require("../../ConnectWallet/locale/en.js");
const PoweredByTW_js_1 = require("../../ConnectWallet/PoweredByTW.js");
const formatTokenBalance_js_1 = require("../../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Modal_js_1 = require("../../components/Modal.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const text_js_1 = require("../../components/text.js");
const useisMobile_js_1 = require("../../hooks/useisMobile.js");
const active_wallet_details_js_1 = require("../common/active-wallet-details.js");
const decimal_input_js_1 = require("../common/decimal-input.js");
const selected_token_button_js_1 = require("../common/selected-token-button.js");
const token_balance_js_1 = require("../common/token-balance.js");
const hooks_js_1 = require("./hooks.js");
const select_token_ui_js_1 = require("./select-token-ui.js");
const use_bridge_chains_js_1 = require("./use-bridge-chains.js");
/**
 * @internal
 */
function SwapUI(props) {
    const [modalState, setModalState] = (0, react_1.useState)({
        screen: "select-buy-token",
        isOpen: false,
    });
    const [detailsModalOpen, setDetailsModalOpen] = (0, react_1.useState)(false);
    const isMobile = (0, useisMobile_js_1.useIsMobile)();
    // Token Prices ----------------------------------------------------------------------------
    const buyTokenQuery = (0, hooks_js_1.useTokenPrice)({
        token: props.buyToken,
        client: props.client,
    });
    const sellTokenQuery = (0, hooks_js_1.useTokenPrice)({
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
            ? (0, units_js_1.toTokens)(preparedResultQuery.data.result.originAmount, sellTokenWithPrices.decimals)
            : "";
    const buyTokenAmount = props.amountSelection.type === "buy"
        ? props.amountSelection.amount
        : preparedResultQuery.data &&
            props.amountSelection.type === "sell" &&
            buyTokenWithPrices
            ? (0, units_js_1.toTokens)(preparedResultQuery.data.result.destinationAmount, buyTokenWithPrices.decimals)
            : "";
    // when buy amount is set, the sell amount is fetched
    const isBuyAmountFetching = props.amountSelection.type === "sell" && preparedResultQuery.isFetching;
    const isSellAmountFetching = props.amountSelection.type === "buy" && preparedResultQuery.isFetching;
    // token balances ------------------------------------------------------------
    const sellTokenBalanceQuery = (0, token_balance_js_1.useTokenBalance)({
        chainId: sellTokenWithPrices?.chainId,
        tokenAddress: sellTokenWithPrices?.address,
        client: props.client,
        walletAddress: props.activeWalletInfo?.activeAccount.address,
    });
    const buyTokenBalanceQuery = (0, token_balance_js_1.useTokenBalance)({
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
            Number((0, units_js_1.toUnits)(sellTokenAmount, sellTokenWithPrices.decimals)));
    // ----------------------------------------------------------------------------
    const disableContinue = !preparedResultQuery.data ||
        preparedResultQuery.isFetching ||
        notEnoughBalance;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "md", children: [(0, jsx_runtime_1.jsxs)(Modal_js_1.Modal, { hide: false, autoFocusCrossIcon: false, className: "tw-modal__swap-widget", size: isMobile ? "compact" : "wide", title: "Select Token", open: modalState.isOpen, crossContainerStyles: {
                    right: index_js_2.spacing.md,
                    top: index_js_2.spacing["md+"],
                    transform: "none",
                }, setOpen: (v) => {
                    if (!v) {
                        setModalState((v) => ({
                            ...v,
                            isOpen: false,
                        }));
                    }
                }, children: [modalState.screen === "select-buy-token" && ((0, jsx_runtime_1.jsx)(select_token_ui_js_1.SelectToken, { type: "buy", selections: {
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
                                    addresses_js_1.NATIVE_TOKEN_ADDRESS.toLowerCase()) {
                                props.setSellToken({
                                    tokenAddress: (0, address_js_1.getAddress)(addresses_js_1.NATIVE_TOKEN_ADDRESS),
                                    chainId: token.chainId,
                                });
                            }
                        } })), modalState.screen === "select-sell-token" && ((0, jsx_runtime_1.jsx)(select_token_ui_js_1.SelectToken, { onClose: () => {
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
                                    addresses_js_1.NATIVE_TOKEN_ADDRESS.toLowerCase()) {
                                // set the buy token after a delay to avoid updating the "selections" prop passed to the <SelectToken> component and trigger unnecessay fetch of chains query that will never be used
                                // we have to do this because the modal does not close immediately onClose - it has a fade out animation
                                (0, constants_js_1.onModalUnmount)(() => {
                                    props.setBuyToken({
                                        tokenAddress: (0, address_js_1.getAddress)(addresses_js_1.NATIVE_TOKEN_ADDRESS),
                                        chainId: token.chainId,
                                    });
                                });
                            }
                        }, activeWalletInfo: props.activeWalletInfo, type: "sell", selections: {
                            buyChainId: props.buyToken?.chainId,
                            sellChainId: props.sellToken?.chainId,
                        } }))] }), detailsModalOpen && ((0, jsx_runtime_1.jsx)(Details_js_1.DetailsModal, { client: props.client, locale: en_js_1.default, detailsModal: undefined, theme: props.theme, closeModal: () => {
                    setDetailsModalOpen(false);
                }, onDisconnect: () => {
                    props.onDisconnect?.();
                }, chains: [], connectOptions: props.connectOptions })), (0, jsx_runtime_1.jsx)(TokenSection, { selection: {
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
                } }), (0, jsx_runtime_1.jsx)(SwitchButton, { onClick: () => {
                    // switch tokens
                    const temp = props.sellToken;
                    props.setSellToken(props.buyToken);
                    props.setBuyToken(temp);
                    props.setAmountSelection({
                        type: props.amountSelection.type === "buy" ? "sell" : "buy",
                        amount: props.amountSelection.amount,
                    });
                } }), (0, jsx_runtime_1.jsx)(TokenSection, { selection: {
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
                sellTokenQuery.isError ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "danger", multiline: true, center: true, style: {
                    paddingBlock: index_js_2.spacing.md,
                }, children: preparedResultQuery.error
                    ? preparedResultQuery.error.message || "Failed to get a quote"
                    : buyTokenQuery.isError
                        ? "Failed to fetch buy token details"
                        : sellTokenQuery.isError
                            ? "Failed to fetch sell token details"
                            : "Failed to get a quote" })) : ((0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })), !props.activeWalletInfo ? ((0, jsx_runtime_1.jsx)(ConnectButton_js_1.ConnectButton, { client: props.client, connectButton: {
                    label: "Swap",
                    style: {
                        width: "100%",
                        borderRadius: index_js_2.radius.full,
                    },
                }, theme: props.theme, ...props.connectOptions, wallets: props.connectOptions?.wallets ||
                    (0, defaultWallets_js_1.getDefaultWalletsForBridgeComponents)({
                        appMetadata: props.connectOptions?.appMetadata,
                        chains: props.connectOptions?.chains,
                    }) })) : ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { disabled: disableContinue, fullWidth: true, onClick: () => {
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
                    fontSize: index_js_2.fontSize.md,
                    borderRadius: index_js_2.radius.full,
                    opacity: disableContinue ? 0.5 : 1,
                }, variant: "primary", children: [preparedResultQuery.isFetching && (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { size: "sm" }), preparedResultQuery.isFetching
                        ? "Fetching Quote"
                        : notEnoughBalance
                            ? "Insufficient Balance"
                            : "Swap"] })), props.showThirdwebBranding ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, { link: "https://thirdweb.com/monetize/bridge" })] })) : null] }));
}
function useSwapQuote(params) {
    const { amountSelection, buyTokenWithPrices, sellTokenWithPrices, activeWalletInfo, client, } = params;
    return (0, react_query_1.useQuery)({
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
                    const res = await index_js_1.Buy.quote({
                        amount: (0, units_js_1.toUnits)(amountSelection.amount, buyTokenWithPrices.decimals),
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
                const res = await index_js_1.Sell.quote({
                    amount: (0, units_js_1.toUnits)(amountSelection.amount, sellTokenWithPrices.decimals),
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
                    amount: (0, units_js_1.toUnits)(amountSelection.amount, buyTokenWithPrices.decimals),
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
                const res = await index_js_1.Buy.prepare(buyRequest);
                return {
                    type: "preparedResult",
                    result: { type: "buy", ...res },
                    request: buyRequest,
                };
            }
            else if (amountSelection.type === "sell") {
                const sellRequestOptions = {
                    amount: (0, units_js_1.toUnits)(amountSelection.amount, sellTokenWithPrices.decimals),
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
                const res = await index_js_1.Sell.prepare(sellRequestOptions);
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
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const chainQuery = (0, use_bridge_chains_js_1.useBridgeChain)({
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
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            borderRadius: index_js_2.radius.xl,
            borderWidth: 1,
            borderStyle: "solid",
            position: "relative",
            overflow: "hidden",
        }, borderColor: "borderColor", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "tertiaryBg", style: {
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    zIndex: 0,
                } }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
                    position: "relative",
                    zIndex: 1,
                }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "md", py: "sm", relative: true, style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", center: "y", gap: "3xs", color: "secondaryText", children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "primaryText", style: {
                                        letterSpacing: "0.07em",
                                    }, children: props.type === "buy" ? "BUY" : "SELL" }) }), props.activeWalletInfo && ((0, jsx_runtime_1.jsx)(active_wallet_details_js_1.ActiveWalletDetails, { activeWalletInfo: props.activeWalletInfo, client: props.client, onClick: props.onWalletClick }))] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { bg: "tertiaryBg", style: {
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: index_js_2.radius.xl,
                            borderTop: `1px solid ${theme.colors.borderColor}`,
                        }, children: [(0, jsx_runtime_1.jsx)(selected_token_button_js_1.SelectedTokenButton, { selectedToken: props.selectedToken, client: props.client, onSelectToken: props.onSelectToken, chain: chain }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "md", py: "md", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "xs", center: "y", style: {
                                            flexWrap: "nowrap",
                                        }, children: [props.amount.isFetching ? ((0, jsx_runtime_1.jsx)("div", { style: { flexGrow: 1 }, children: (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "30px", width: "140px", style: {
                                                        borderRadius: index_js_2.radius.lg,
                                                    } }) })) : ((0, jsx_runtime_1.jsx)(decimal_input_js_1.DecimalInput, { value: props.amount.data, setValue: props.setAmount, style: {
                                                    border: "none",
                                                    boxShadow: "none",
                                                    fontSize: index_js_2.fontSize.xl,
                                                    fontWeight: 500,
                                                    paddingInline: 0,
                                                    paddingBlock: 0,
                                                    letterSpacing: "-0.025em",
                                                    height: "30px",
                                                } })), props.activeWalletInfo &&
                                                props.onMaxClick &&
                                                props.selectedToken && ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { variant: "outline", style: {
                                                    paddingInline: index_js_2.spacing.xs,
                                                    paddingBlock: index_js_2.spacing.xxs,
                                                    borderRadius: index_js_2.radius.full,
                                                    fontSize: index_js_2.fontSize.xs,
                                                    fontWeight: 400,
                                                }, onClick: props.onMaxClick, children: "Max" }))] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            justifyContent: "space-between",
                                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "3px",
                                                }, children: props.amount.isFetching ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_2.fontSize.xs, width: "50px" })) : ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "secondaryText", children: (0, formatTokenBalance_js_1.formatCurrencyAmount)(props.currency, totalFiatValue || 0) })) }), props.isConnected && props.selectedToken && ((0, jsx_runtime_1.jsx)("div", { children: props.balance.data === undefined ||
                                                    props.selectedToken.data === undefined ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_2.fontSize.xs, width: "100px" })) : ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "3px",
                                                    }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "secondaryText", children: "Balance:" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "primaryText", children: (0, formatTokenBalance_js_1.formatTokenAmount)(props.balance.data, props.selectedToken.data.decimals, 5) })] })) }))] })] })] })] })] }));
}
function SwitchButton(props) {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: "flex",
            justifyContent: "center",
            marginBlock: `-13px`,
            zIndex: 2,
            position: "relative",
        }, children: (0, jsx_runtime_1.jsx)(SwitchButtonInner, { variant: "ghost-solid", onClick: (e) => {
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
            }, children: (0, jsx_runtime_1.jsx)(ArrowUpDownIcon_js_1.ArrowUpDownIcon, { size: index_js_2.iconSize["sm+"] }) }) }));
}
const SwitchButtonInner = /* @__PURE__ */ (0, styled_1.default)(buttons_js_1.Button)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        borderRadius: index_js_2.radius.full,
        padding: index_js_2.spacing.xs,
        color: theme.colors.primaryText,
        background: theme.colors.modalBg,
        border: `1px solid ${theme.colors.borderColor}`,
    };
});
//# sourceMappingURL=swap-ui.js.map
"use strict";
/** biome-ignore-all lint/a11y/useSemanticElements: FIXME */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundWallet = FundWallet;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const type_js_1 = require("../../../../pay/convert/type.js");
const address_js_1 = require("../../../../utils/address.js");
const defaultWallets_js_1 = require("../../../../wallets/defaultWallets.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const ConnectButton_js_1 = require("../ConnectWallet/ConnectButton.js");
const Details_js_1 = require("../ConnectWallet/Details.js");
const WalletDotIcon_js_1 = require("../ConnectWallet/icons/WalletDotIcon.js");
const en_js_1 = require("../ConnectWallet/locale/en.js");
const PoweredByTW_js_1 = require("../ConnectWallet/PoweredByTW.js");
const formatTokenBalance_js_1 = require("../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const CopyIcon_js_1 = require("../components/CopyIcon.js");
const Modal_js_1 = require("../components/Modal.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const Spacer_js_1 = require("../components/Spacer.js");
const text_js_1 = require("../components/text.js");
const useisMobile_js_1 = require("../hooks/useisMobile.js");
const active_wallet_details_js_1 = require("./common/active-wallet-details.js");
const decimal_input_js_1 = require("./common/decimal-input.js");
const selected_token_button_js_1 = require("./common/selected-token-button.js");
const token_balance_js_1 = require("./common/token-balance.js");
const token_query_js_1 = require("./common/token-query.js");
// import { TokenAndChain } from "./common/TokenAndChain.js";
const WithHeader_js_1 = require("./common/WithHeader.js");
const hooks_js_1 = require("./swap-widget/hooks.js");
const select_token_ui_js_1 = require("./swap-widget/select-token-ui.js");
const use_bridge_chains_js_1 = require("./swap-widget/use-bridge-chains.js");
function FundWallet(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const activeWalletInfo = (0, hooks_js_1.useActiveWalletInfo)();
    const receiver = props.receiverAddress ?? activeWalletInfo?.activeAccount?.address;
    const [detailsModalOpen, setDetailsModalOpen] = (0, react_1.useState)(false);
    const [isTokenSelectionOpen, setIsTokenSelectionOpen] = (0, react_1.useState)(false);
    const isReceiverDifferentFromActiveWallet = props.receiverAddress &&
        (0, address_js_1.isAddress)(props.receiverAddress) &&
        (activeWalletInfo?.activeAccount?.address
            ? (0, address_js_1.checksumAddress)(props.receiverAddress) !==
                (0, address_js_1.checksumAddress)(activeWalletInfo?.activeAccount?.address)
            : true);
    const tokenQuery = (0, token_query_js_1.useTokenQuery)({
        tokenAddress: props.selectedToken?.tokenAddress,
        chainId: props.selectedToken?.chainId,
        client: props.client,
    });
    const destinationToken = tokenQuery.data?.type === "success" ? tokenQuery.data.token : undefined;
    const tokenBalanceQuery = (0, token_balance_js_1.useTokenBalance)({
        chainId: props.selectedToken?.chainId,
        tokenAddress: props.selectedToken?.tokenAddress,
        client: props.client,
        walletAddress: activeWalletInfo?.activeAccount?.address,
    });
    const actionLabel = isReceiverDifferentFromActiveWallet ? "Pay" : "Buy";
    const isMobile = (0, useisMobile_js_1.useIsMobile)();
    // if no receiver address is set - wallet must be connected because the user's wallet is the receiver
    const showConnectButton = !props.receiverAddress && !activeWalletInfo;
    return ((0, jsx_runtime_1.jsxs)(WithHeader_js_1.WithHeader, { client: props.client, title: props.metadata.title, description: props.metadata.description, image: props.metadata.image, children: [detailsModalOpen && ((0, jsx_runtime_1.jsx)(Details_js_1.DetailsModal, { client: props.client, locale: en_js_1.default, detailsModal: {
                    hideBuyFunds: true,
                }, theme: props.theme, closeModal: () => {
                    setDetailsModalOpen(false);
                }, onDisconnect: () => {
                    props.onDisconnect?.();
                }, chains: [], connectOptions: props.connectOptions })), (0, jsx_runtime_1.jsx)(Modal_js_1.Modal, { hide: false, className: "tw-modal__buy-widget", size: isMobile ? "compact" : "wide", title: "Select Token", open: isTokenSelectionOpen, crossContainerStyles: {
                    right: index_js_1.spacing.md,
                    top: index_js_1.spacing["md+"],
                    transform: "none",
                }, setOpen: (v) => setIsTokenSelectionOpen(v), autoFocusCrossIcon: false, children: (0, jsx_runtime_1.jsx)(select_token_ui_js_1.SelectToken, { type: "buy", currency: props.currency, selections: {
                        buyChainId: props.selectedToken?.chainId,
                        sellChainId: undefined,
                    }, activeWalletInfo: activeWalletInfo, onClose: () => setIsTokenSelectionOpen(false), client: props.client, selectedToken: props.selectedToken, setSelectedToken: (token) => {
                        props.setSelectedToken(token);
                        setIsTokenSelectionOpen(false);
                    } }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [(0, jsx_runtime_1.jsx)(TokenSection, { title: actionLabel, presetOptions: props.presetOptions, amountSelection: props.amountSelection, setAmount: props.setAmountSelection, activeWalletInfo: activeWalletInfo, selectedToken: props.selectedToken
                            ? {
                                data: tokenQuery.data?.type === "success"
                                    ? tokenQuery.data.token
                                    : undefined,
                                isFetching: tokenQuery.isFetching,
                                isError: tokenQuery.isError ||
                                    tokenQuery.data?.type === "unsupported_token",
                            }
                            : undefined, balance: {
                            data: tokenBalanceQuery.data,
                            isFetching: tokenBalanceQuery.isFetching,
                        }, client: props.client, isConnected: !!activeWalletInfo, onSelectToken: () => {
                            setIsTokenSelectionOpen(true);
                        }, onWalletClick: () => {
                            setDetailsModalOpen(true);
                        }, currency: props.currency, amountEditable: props.amountEditable, tokenEditable: props.tokenEditable }), receiver && isReceiverDifferentFromActiveWallet && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ArrowSection, {}), (0, jsx_runtime_1.jsx)(ReceiverWalletSection, { address: receiver, client: props.client })] }))] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (tokenQuery.isError ||
                tokenQuery.data?.type === "unsupported_token") && ((0, jsx_runtime_1.jsx)("div", { style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: index_js_1.radius.full,
                    padding: index_js_1.spacing.xs,
                    marginBottom: index_js_1.spacing.md,
                }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "danger", center: true, children: "Failed to fetch token details" }) })), showConnectButton ? ((0, jsx_runtime_1.jsx)(ConnectButton_js_1.ConnectButton, { client: props.client, connectButton: {
                    label: props.buttonLabel || actionLabel,
                    style: {
                        width: "100%",
                        borderRadius: index_js_1.radius.full,
                    },
                }, theme: theme, ...props.connectOptions, autoConnect: false, wallets: props.connectOptions?.wallets ||
                    (0, defaultWallets_js_1.getDefaultWalletsForBridgeComponents)({
                        appMetadata: props.connectOptions?.appMetadata,
                        chains: props.connectOptions?.chains,
                    }) })) : ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { disabled: !receiver, fullWidth: true, onClick: () => {
                    if (!receiver || !destinationToken) {
                        return;
                    }
                    const fiatPricePerToken = destinationToken.prices[props.currency];
                    const { tokenValue } = getAmounts(props.amountSelection, fiatPricePerToken);
                    if (!tokenValue) {
                        return;
                    }
                    props.onContinue(String(tokenValue), destinationToken, (0, address_js_1.getAddress)(receiver));
                }, style: {
                    fontSize: index_js_1.fontSize.md,
                    borderRadius: index_js_1.radius.full,
                }, variant: "primary", children: props.buttonLabel || actionLabel })), props.showThirdwebBranding ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, { link: "https://playground.thirdweb.com/payments/fund-wallet" })] })) : ((0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxs" })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })] }));
}
function getAmounts(amountSelection, fiatPricePerToken) {
    const fiatValue = amountSelection.type === "usd"
        ? amountSelection.value
        : fiatPricePerToken
            ? fiatPricePerToken * Number(amountSelection.value)
            : undefined;
    const tokenValue = amountSelection.type === "token"
        ? amountSelection.value
        : fiatPricePerToken
            ? Number(amountSelection.value) / fiatPricePerToken
            : undefined;
    return {
        fiatValue,
        tokenValue,
    };
}
function TokenSection(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const chainQuery = (0, use_bridge_chains_js_1.useBridgeChain)({
        chainId: props.selectedToken?.data?.chainId,
        client: props.client,
    });
    const chain = chainQuery.data;
    const fiatPricePerToken = props.selectedToken?.data?.prices[props.currency];
    const { fiatValue, tokenValue } = getAmounts(props.amountSelection, fiatPricePerToken);
    return ((0, jsx_runtime_1.jsxs)(SectionContainer, { header: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", center: "y", gap: "3xs", color: "secondaryText", children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "primaryText", style: {
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                        }, children: props.title }) }), props.activeWalletInfo && ((0, jsx_runtime_1.jsx)(active_wallet_details_js_1.ActiveWalletDetails, { activeWalletInfo: props.activeWalletInfo, client: props.client, onClick: props.onWalletClick }))] }), children: [(0, jsx_runtime_1.jsx)(selected_token_button_js_1.SelectedTokenButton, { selectedToken: props.selectedToken, client: props.client, onSelectToken: props.onSelectToken, chain: chain, disabled: props.tokenEditable === false }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "md", py: "md", children: [(0, jsx_runtime_1.jsx)(decimal_input_js_1.DecimalInput, { value: tokenValue ? String(tokenValue) : "", setValue: (value) => {
                            props.setAmount({
                                type: "token",
                                value,
                            });
                        }, disabled: props.amountEditable === false, style: {
                            border: "none",
                            boxShadow: "none",
                            fontSize: index_js_1.fontSize.xl,
                            fontWeight: 500,
                            paddingInline: 0,
                            paddingBlock: 0,
                            letterSpacing: "-0.025em",
                        } }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "md", color: "secondaryText", style: {
                                    flexShrink: 0,
                                }, children: (0, type_js_1.getFiatSymbol)(props.currency) }), props.selectedToken?.isFetching ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { width: "120px", height: "20px", style: {
                                    transform: "translateX(4px)",
                                } })) : ((0, jsx_runtime_1.jsx)(decimal_input_js_1.DecimalInput, { value: String(fiatValue || 0), setValue: (value) => {
                                    props.setAmount({
                                        type: "usd",
                                        value,
                                    });
                                }, disabled: props.amountEditable === false, style: {
                                    border: "none",
                                    boxShadow: "none",
                                    fontSize: index_js_1.fontSize.md,
                                    fontWeight: 400,
                                    color: theme.colors.secondaryText,
                                    paddingInline: 0,
                                    height: "20px",
                                    paddingBlock: 0,
                                } }))] }), props.amountEditable && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", gap: "xxs", children: props.presetOptions.map((amount) => ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { disabled: !props.selectedToken?.data || props.amountEditable === false, onClick: () => props.setAmount({
                                        type: "usd",
                                        value: String(amount),
                                    }), style: {
                                        backgroundColor: "transparent",
                                        color: theme.colors.secondaryText,
                                        fontSize: index_js_1.fontSize.xs,
                                        fontWeight: 400,
                                        borderRadius: index_js_1.radius.full,
                                        gap: "0.5px",
                                        padding: `${index_js_1.spacing.xxs} ${index_js_1.spacing.sm}`,
                                    }, variant: "outline", children: [(0, jsx_runtime_1.jsx)("span", { children: (0, type_js_1.getFiatSymbol)(props.currency) }), (0, jsx_runtime_1.jsx)("span", { children: amount })] }, amount))) })] }))] }), props.isConnected && props.selectedToken && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", py: "md", style: {
                    borderTop: `1px dashed ${theme.colors.borderColor}`,
                    justifyContent: "start",
                }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "3px",
                    }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "secondaryText", children: "Current Balance" }), props.balance.data === undefined ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.xs, width: "100px" })) : ((0, jsx_runtime_1.jsxs)(text_js_1.Text, { size: "xs", color: "primaryText", children: [(0, formatTokenBalance_js_1.formatTokenAmount)(props.balance.data.value, props.balance.data.decimals, 5), " ", props.balance.data.symbol] }))] }) }))] }));
}
function ReceiverWalletSection(props) {
    const ensNameQuery = (0, wallet_js_1.useEnsName)({
        address: props.address,
        client: props.client,
    });
    return ((0, jsx_runtime_1.jsx)(SectionContainer, { header: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "primaryText", style: {
                letterSpacing: "0.07em",
                textTransform: "uppercase",
            }, children: "To" }), children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "md", py: "md", flex: "row", center: "y", gap: "xs", color: "secondaryText", children: [(0, jsx_runtime_1.jsx)(WalletDotIcon_js_1.WalletDotIcon, { size: index_js_1.iconSize.xs, color: "secondaryText" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "primaryText", children: ensNameQuery.data || (0, address_js_1.shortenAddress)(props.address) }), (0, jsx_runtime_1.jsx)(CopyIcon_js_1.CopyIcon, { text: props.address, tip: "Copy address", iconSize: 14 })] }) }));
}
function SectionContainer(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            borderRadius: index_js_1.radius.xl,
            borderWidth: 1,
            borderStyle: "solid",
            position: "relative",
            overflow: "hidden",
        }, borderColor: "borderColor", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "tertiaryBg", style: {
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    zIndex: 0,
                } }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                    position: "relative",
                    zIndex: 1,
                }, children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", py: "sm", relative: true, children: props.header }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "tertiaryBg", style: {
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: index_js_1.radius.xl,
                    borderTop: `1px solid ${theme.colors.borderColor}`,
                }, children: props.children })] }));
}
function ArrowSection() {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: "flex",
            justifyContent: "center",
            marginBlock: `-13px`,
            zIndex: 2,
            position: "relative",
        }, children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "xs", center: "both", flex: "row", color: "primaryText", bg: "modalBg", borderColor: "borderColor", style: {
                borderRadius: index_js_1.radius.full,
                borderWidth: 1,
                borderStyle: "solid",
            }, children: (0, jsx_runtime_1.jsx)(react_icons_1.ArrowDownIcon, { width: index_js_1.iconSize["sm+"], height: index_js_1.iconSize["sm+"] }) }) }));
}
//# sourceMappingURL=FundWallet.js.map
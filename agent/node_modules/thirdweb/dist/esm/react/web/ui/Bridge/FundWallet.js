/** biome-ignore-all lint/a11y/useSemanticElements: FIXME */
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { getFiatSymbol, } from "../../../../pay/convert/type.js";
import { checksumAddress, getAddress, isAddress, shortenAddress, } from "../../../../utils/address.js";
import { getDefaultWalletsForBridgeComponents } from "../../../../wallets/defaultWallets.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { useEnsName } from "../../../core/utils/wallet.js";
import { ConnectButton } from "../ConnectWallet/ConnectButton.js";
import { DetailsModal } from "../ConnectWallet/Details.js";
import { WalletDotIcon } from "../ConnectWallet/icons/WalletDotIcon.js";
import connectLocaleEn from "../ConnectWallet/locale/en.js";
import { PoweredByThirdweb } from "../ConnectWallet/PoweredByTW.js";
import { formatTokenAmount } from "../ConnectWallet/screens/formatTokenBalance.js";
import { Container } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { CopyIcon } from "../components/CopyIcon.js";
import { Modal } from "../components/Modal.js";
import { Skeleton } from "../components/Skeleton.js";
import { Spacer } from "../components/Spacer.js";
import { Text } from "../components/text.js";
import { useIsMobile } from "../hooks/useisMobile.js";
import { ActiveWalletDetails } from "./common/active-wallet-details.js";
import { DecimalInput } from "./common/decimal-input.js";
import { SelectedTokenButton } from "./common/selected-token-button.js";
import { useTokenBalance } from "./common/token-balance.js";
import { useTokenQuery } from "./common/token-query.js";
// import { TokenAndChain } from "./common/TokenAndChain.js";
import { WithHeader } from "./common/WithHeader.js";
import { useActiveWalletInfo } from "./swap-widget/hooks.js";
import { SelectToken } from "./swap-widget/select-token-ui.js";
import { useBridgeChain } from "./swap-widget/use-bridge-chains.js";
export function FundWallet(props) {
    const theme = useCustomTheme();
    const activeWalletInfo = useActiveWalletInfo();
    const receiver = props.receiverAddress ?? activeWalletInfo?.activeAccount?.address;
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isTokenSelectionOpen, setIsTokenSelectionOpen] = useState(false);
    const isReceiverDifferentFromActiveWallet = props.receiverAddress &&
        isAddress(props.receiverAddress) &&
        (activeWalletInfo?.activeAccount?.address
            ? checksumAddress(props.receiverAddress) !==
                checksumAddress(activeWalletInfo?.activeAccount?.address)
            : true);
    const tokenQuery = useTokenQuery({
        tokenAddress: props.selectedToken?.tokenAddress,
        chainId: props.selectedToken?.chainId,
        client: props.client,
    });
    const destinationToken = tokenQuery.data?.type === "success" ? tokenQuery.data.token : undefined;
    const tokenBalanceQuery = useTokenBalance({
        chainId: props.selectedToken?.chainId,
        tokenAddress: props.selectedToken?.tokenAddress,
        client: props.client,
        walletAddress: activeWalletInfo?.activeAccount?.address,
    });
    const actionLabel = isReceiverDifferentFromActiveWallet ? "Pay" : "Buy";
    const isMobile = useIsMobile();
    // if no receiver address is set - wallet must be connected because the user's wallet is the receiver
    const showConnectButton = !props.receiverAddress && !activeWalletInfo;
    return (_jsxs(WithHeader, { client: props.client, title: props.metadata.title, description: props.metadata.description, image: props.metadata.image, children: [detailsModalOpen && (_jsx(DetailsModal, { client: props.client, locale: connectLocaleEn, detailsModal: {
                    hideBuyFunds: true,
                }, theme: props.theme, closeModal: () => {
                    setDetailsModalOpen(false);
                }, onDisconnect: () => {
                    props.onDisconnect?.();
                }, chains: [], connectOptions: props.connectOptions })), _jsx(Modal, { hide: false, className: "tw-modal__buy-widget", size: isMobile ? "compact" : "wide", title: "Select Token", open: isTokenSelectionOpen, crossContainerStyles: {
                    right: spacing.md,
                    top: spacing["md+"],
                    transform: "none",
                }, setOpen: (v) => setIsTokenSelectionOpen(v), autoFocusCrossIcon: false, children: _jsx(SelectToken, { type: "buy", currency: props.currency, selections: {
                        buyChainId: props.selectedToken?.chainId,
                        sellChainId: undefined,
                    }, activeWalletInfo: activeWalletInfo, onClose: () => setIsTokenSelectionOpen(false), client: props.client, selectedToken: props.selectedToken, setSelectedToken: (token) => {
                        props.setSelectedToken(token);
                        setIsTokenSelectionOpen(false);
                    } }) }), _jsxs(Container, { flex: "column", children: [_jsx(TokenSection, { title: actionLabel, presetOptions: props.presetOptions, amountSelection: props.amountSelection, setAmount: props.setAmountSelection, activeWalletInfo: activeWalletInfo, selectedToken: props.selectedToken
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
                        }, currency: props.currency, amountEditable: props.amountEditable, tokenEditable: props.tokenEditable }), receiver && isReceiverDifferentFromActiveWallet && (_jsxs(_Fragment, { children: [_jsx(ArrowSection, {}), _jsx(ReceiverWalletSection, { address: receiver, client: props.client })] }))] }), _jsx(Spacer, { y: "md" }), (tokenQuery.isError ||
                tokenQuery.data?.type === "unsupported_token") && (_jsx("div", { style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: radius.full,
                    padding: spacing.xs,
                    marginBottom: spacing.md,
                }, children: _jsx(Text, { size: "sm", color: "danger", center: true, children: "Failed to fetch token details" }) })), showConnectButton ? (_jsx(ConnectButton, { client: props.client, connectButton: {
                    label: props.buttonLabel || actionLabel,
                    style: {
                        width: "100%",
                        borderRadius: radius.full,
                    },
                }, theme: theme, ...props.connectOptions, autoConnect: false, wallets: props.connectOptions?.wallets ||
                    getDefaultWalletsForBridgeComponents({
                        appMetadata: props.connectOptions?.appMetadata,
                        chains: props.connectOptions?.chains,
                    }) })) : (_jsx(Button, { disabled: !receiver, fullWidth: true, onClick: () => {
                    if (!receiver || !destinationToken) {
                        return;
                    }
                    const fiatPricePerToken = destinationToken.prices[props.currency];
                    const { tokenValue } = getAmounts(props.amountSelection, fiatPricePerToken);
                    if (!tokenValue) {
                        return;
                    }
                    props.onContinue(String(tokenValue), destinationToken, getAddress(receiver));
                }, style: {
                    fontSize: fontSize.md,
                    borderRadius: radius.full,
                }, variant: "primary", children: props.buttonLabel || actionLabel })), props.showThirdwebBranding ? (_jsxs("div", { children: [_jsx(Spacer, { y: "md" }), _jsx(PoweredByThirdweb, { link: "https://playground.thirdweb.com/payments/fund-wallet" })] })) : (_jsx(Spacer, { y: "xxs" })), _jsx(Spacer, { y: "md" })] }));
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
    const theme = useCustomTheme();
    const chainQuery = useBridgeChain({
        chainId: props.selectedToken?.data?.chainId,
        client: props.client,
    });
    const chain = chainQuery.data;
    const fiatPricePerToken = props.selectedToken?.data?.prices[props.currency];
    const { fiatValue, tokenValue } = getAmounts(props.amountSelection, fiatPricePerToken);
    return (_jsxs(SectionContainer, { header: _jsxs("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }, children: [_jsx(Container, { flex: "row", center: "y", gap: "3xs", color: "secondaryText", children: _jsx(Text, { size: "xs", color: "primaryText", style: {
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                        }, children: props.title }) }), props.activeWalletInfo && (_jsx(ActiveWalletDetails, { activeWalletInfo: props.activeWalletInfo, client: props.client, onClick: props.onWalletClick }))] }), children: [_jsx(SelectedTokenButton, { selectedToken: props.selectedToken, client: props.client, onSelectToken: props.onSelectToken, chain: chain, disabled: props.tokenEditable === false }), _jsxs(Container, { px: "md", py: "md", children: [_jsx(DecimalInput, { value: tokenValue ? String(tokenValue) : "", setValue: (value) => {
                            props.setAmount({
                                type: "token",
                                value,
                            });
                        }, disabled: props.amountEditable === false, style: {
                            border: "none",
                            boxShadow: "none",
                            fontSize: fontSize.xl,
                            fontWeight: 500,
                            paddingInline: 0,
                            paddingBlock: 0,
                            letterSpacing: "-0.025em",
                        } }), _jsx(Spacer, { y: "xs" }), _jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                        }, children: [_jsx(Text, { size: "md", color: "secondaryText", style: {
                                    flexShrink: 0,
                                }, children: getFiatSymbol(props.currency) }), props.selectedToken?.isFetching ? (_jsx(Skeleton, { width: "120px", height: "20px", style: {
                                    transform: "translateX(4px)",
                                } })) : (_jsx(DecimalInput, { value: String(fiatValue || 0), setValue: (value) => {
                                    props.setAmount({
                                        type: "usd",
                                        value,
                                    });
                                }, disabled: props.amountEditable === false, style: {
                                    border: "none",
                                    boxShadow: "none",
                                    fontSize: fontSize.md,
                                    fontWeight: 400,
                                    color: theme.colors.secondaryText,
                                    paddingInline: 0,
                                    height: "20px",
                                    paddingBlock: 0,
                                } }))] }), props.amountEditable && (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "md" }), _jsx(Container, { flex: "row", gap: "xxs", children: props.presetOptions.map((amount) => (_jsxs(Button, { disabled: !props.selectedToken?.data || props.amountEditable === false, onClick: () => props.setAmount({
                                        type: "usd",
                                        value: String(amount),
                                    }), style: {
                                        backgroundColor: "transparent",
                                        color: theme.colors.secondaryText,
                                        fontSize: fontSize.xs,
                                        fontWeight: 400,
                                        borderRadius: radius.full,
                                        gap: "0.5px",
                                        padding: `${spacing.xxs} ${spacing.sm}`,
                                    }, variant: "outline", children: [_jsx("span", { children: getFiatSymbol(props.currency) }), _jsx("span", { children: amount })] }, amount))) })] }))] }), props.isConnected && props.selectedToken && (_jsx(Container, { px: "md", py: "md", style: {
                    borderTop: `1px dashed ${theme.colors.borderColor}`,
                    justifyContent: "start",
                }, children: _jsxs("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "3px",
                    }, children: [_jsx(Text, { size: "xs", color: "secondaryText", children: "Current Balance" }), props.balance.data === undefined ? (_jsx(Skeleton, { height: fontSize.xs, width: "100px" })) : (_jsxs(Text, { size: "xs", color: "primaryText", children: [formatTokenAmount(props.balance.data.value, props.balance.data.decimals, 5), " ", props.balance.data.symbol] }))] }) }))] }));
}
function ReceiverWalletSection(props) {
    const ensNameQuery = useEnsName({
        address: props.address,
        client: props.client,
    });
    return (_jsx(SectionContainer, { header: _jsx(Text, { size: "xs", color: "primaryText", style: {
                letterSpacing: "0.07em",
                textTransform: "uppercase",
            }, children: "To" }), children: _jsxs(Container, { px: "md", py: "md", flex: "row", center: "y", gap: "xs", color: "secondaryText", children: [_jsx(WalletDotIcon, { size: iconSize.xs, color: "secondaryText" }), _jsx(Text, { size: "sm", color: "primaryText", children: ensNameQuery.data || shortenAddress(props.address) }), _jsx(CopyIcon, { text: props.address, tip: "Copy address", iconSize: 14 })] }) }));
}
function SectionContainer(props) {
    const theme = useCustomTheme();
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
                } }), _jsx(Container, { style: {
                    position: "relative",
                    zIndex: 1,
                }, children: _jsx(Container, { px: "md", py: "sm", relative: true, children: props.header }) }), _jsx(Container, { bg: "tertiaryBg", style: {
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: radius.xl,
                    borderTop: `1px solid ${theme.colors.borderColor}`,
                }, children: props.children })] }));
}
function ArrowSection() {
    return (_jsx("div", { style: {
            display: "flex",
            justifyContent: "center",
            marginBlock: `-13px`,
            zIndex: 2,
            position: "relative",
        }, children: _jsx(Container, { p: "xs", center: "both", flex: "row", color: "primaryText", bg: "modalBg", borderColor: "borderColor", style: {
                borderRadius: radius.full,
                borderWidth: 1,
                borderStyle: "solid",
            }, children: _jsx(ArrowDownIcon, { width: iconSize["sm+"], height: iconSize["sm+"] }) }) }));
}
//# sourceMappingURL=FundWallet.js.map
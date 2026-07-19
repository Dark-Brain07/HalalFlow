import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PlusIcon } from "@radix-ui/react-icons";
import { useCallback, useMemo, useState } from "react";
import { isNativeTokenAddress } from "../../../../../constants/addresses.js";
import { shortenAddress } from "../../../../../utils/address.js";
import { toTokens } from "../../../../../utils/units.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { CoinsIcon } from "../../ConnectWallet/icons/CoinsIcon.js";
import { InfoIcon } from "../../ConnectWallet/icons/InfoIcon.js";
import { WalletDotIcon } from "../../ConnectWallet/icons/WalletDotIcon.js";
import { formatCurrencyAmount } from "../../ConnectWallet/screens/formatTokenBalance.js";
import { Container, Line, ModalHeader, noScrollBar, } from "../../components/basic.js";
import { Button, IconButton } from "../../components/buttons.js";
import { CopyIcon } from "../../components/CopyIcon.js";
import { Img } from "../../components/Img.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { Link, Text } from "../../components/text.js";
import { StyledDiv } from "../../design-system/elements.js";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { useIsMobile } from "../../hooks/useisMobile.js";
import { useTokenPrice } from "./hooks.js";
import { SearchInput } from "./SearchInput.js";
import { SelectChainButton } from "./SelectChainButton.js";
import { SelectBridgeChain } from "./select-chain.js";
import { useBridgeChainsWithFilters } from "./use-bridge-chains.js";
import { useTokenBalances, useTokens, } from "./use-tokens.js";
import { tokenAmountFormatter } from "./utils.js";
function findChain(chains, activeChainId) {
    if (!activeChainId) {
        return undefined;
    }
    return chains.find((chain) => chain.chainId === activeChainId);
}
const INITIAL_LIMIT = 100;
/**
 * @internal
 */
export function SelectToken(props) {
    const chainQuery = useBridgeChainsWithFilters({
        client: props.client,
        type: props.type,
        buyChainId: props.selections.buyChainId,
        sellChainId: props.selections.sellChainId,
    });
    const [search, _setSearch] = useState("");
    const debouncedSearch = useDebouncedValue(search, 500);
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const setSearch = useCallback((search) => {
        _setSearch(search);
        setLimit(INITIAL_LIMIT);
    }, []);
    const [_selectedChain, setSelectedChain] = useState(undefined);
    const selectedChain = _selectedChain ||
        (chainQuery.data
            ? findChain(chainQuery.data, props.selectedToken?.chainId) ||
                findChain(chainQuery.data, props.activeWalletInfo?.activeChain.id) ||
                findChain(chainQuery.data, 1)
            : undefined);
    // all tokens
    const tokensQuery = useTokens({
        client: props.client,
        chainId: selectedChain?.chainId,
        search: debouncedSearch,
        limit,
        offset: 0,
    });
    // owned tokens
    const ownedTokensQuery = useTokenBalances({
        client: props.client,
        chainId: selectedChain?.chainId,
        limit,
        page: 1,
        walletAddress: props.activeWalletInfo?.activeAccount.address,
    });
    const filteredOwnedTokens = useMemo(() => {
        return ownedTokensQuery.data?.tokens?.filter((token) => {
            return (token.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                token.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                token.token_address
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase()));
        });
    }, [ownedTokensQuery.data?.tokens, debouncedSearch]);
    const isFetching = tokensQuery.isFetching || ownedTokensQuery.isFetching;
    return (_jsx(SelectTokenUI, { ...props, ownedTokens: filteredOwnedTokens || [], allTokens: tokensQuery.data || [], isFetching: isFetching, selectedChain: selectedChain, setSelectedChain: setSelectedChain, search: search, setSearch: setSearch, selectedToken: props.selectedToken, setSelectedToken: props.setSelectedToken, showMore: tokensQuery.data?.length === limit
            ? () => {
                setLimit(limit + INITIAL_LIMIT);
            }
            : undefined }));
}
function SelectTokenUI(props) {
    const isMobile = useIsMobile();
    const [screen, setScreen] = useState("select-token");
    // show tokens with icons first
    const sortedOwnedTokens = useMemo(() => {
        return props.ownedTokens.sort((a, b) => {
            if (a.icon_uri && !b.icon_uri) {
                return -1;
            }
            if (!a.icon_uri && b.icon_uri) {
                return 1;
            }
            return 0;
        });
    }, [props.ownedTokens]);
    const otherTokens = useMemo(() => {
        const ownedTokenSet = new Set(sortedOwnedTokens.map((t) => `${t.token_address}-${t.chain_id}`.toLowerCase()));
        return props.allTokens.filter((token) => !ownedTokenSet.has(`${token.address}-${token.chainId}`.toLowerCase()));
    }, [props.allTokens, sortedOwnedTokens]);
    // show tokens with icons first
    const sortedOtherTokens = useMemo(() => {
        return otherTokens.sort((a, b) => {
            if (a.iconUri && !b.iconUri) {
                return -1;
            }
            if (!a.iconUri && b.iconUri) {
                return 1;
            }
            return 0;
        });
    }, [otherTokens]);
    // desktop
    if (!isMobile) {
        return (_jsxs(Container, { style: {
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                height: "100%",
            }, children: [_jsx(LeftContainer, { children: _jsx(SelectBridgeChain, { type: props.type, selections: props.selections, onBack: () => setScreen("select-token"), client: props.client, isMobile: false, onSelectChain: (chain) => {
                            props.setSelectedChain(chain);
                            setScreen("select-token");
                        }, selectedChain: props.selectedChain }) }), _jsx(Container, { flex: "column", relative: true, scrollY: true, children: _jsx(TokenSelectionScreen, { onSelectToken: (token) => {
                            props.setSelectedToken(token);
                            props.onClose();
                        }, isMobile: false, selectedToken: props.selectedToken, isFetching: props.isFetching, ownedTokens: props.ownedTokens, otherTokens: sortedOtherTokens, showMore: props.showMore, selectedChain: props.selectedChain, onSelectChain: () => setScreen("select-chain"), client: props.client, search: props.search, setSearch: props.setSearch, currency: props.currency }, props.selectedChain?.chainId) })] }));
    }
    if (screen === "select-token") {
        return (_jsx(TokenSelectionScreen, { onSelectToken: (token) => {
                props.setSelectedToken(token);
                props.onClose();
            }, selectedToken: props.selectedToken, isFetching: props.isFetching, ownedTokens: props.ownedTokens, otherTokens: sortedOtherTokens, showMore: props.showMore, selectedChain: props.selectedChain, isMobile: true, onSelectChain: () => setScreen("select-chain"), client: props.client, search: props.search, setSearch: props.setSearch, currency: props.currency }, props.selectedChain?.chainId));
    }
    if (screen === "select-chain") {
        return (_jsx(SelectBridgeChain, { isMobile: true, onBack: () => setScreen("select-token"), client: props.client, onSelectChain: (chain) => {
                props.setSelectedChain(chain);
                setScreen("select-token");
            }, selectedChain: props.selectedChain, type: props.type, selections: props.selections }));
    }
    return null;
}
function TokenButtonSkeleton() {
    return (_jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            padding: `${spacing.xs} ${spacing.xs}`,
            height: "70px",
        }, children: [_jsx(Skeleton, { height: `${iconSize.lg}px`, width: `${iconSize.lg}px` }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: [_jsx(Skeleton, { height: fontSize.sm, width: "100px" }), _jsx(Skeleton, { height: fontSize.md, width: "200px" })] })] }));
}
function TokenButton(props) {
    const theme = useCustomTheme();
    const tokenBalanceInUnits = "balance" in props.token
        ? toTokens(BigInt(props.token.balance), props.token.decimals)
        : undefined;
    const usdValue = "balance" in props.token
        ? props.token.price_data.price_usd * Number(tokenBalanceInUnits)
        : undefined;
    const tokenAddress = "balance" in props.token ? props.token.token_address : props.token.address;
    const chainId = "balance" in props.token ? props.token.chain_id : props.token.chainId;
    return (_jsxs(Button, { variant: props.isSelected ? "secondary" : "ghost-solid", fullWidth: true, style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: fontSize.md,
            border: "1px solid transparent",
            padding: `${spacing.xs} ${spacing.xs}`,
            textAlign: "left",
            lineHeight: "1.5",
            borderRadius: radius.lg,
        }, gap: "sm", onClick: async () => {
            props.onSelect({
                tokenAddress,
                chainId,
            });
        }, children: [_jsx(Img, { src: ("balance" in props.token
                    ? props.token.icon_uri
                    : props.token.iconUri) || "", client: props.client, width: iconSize.lg, height: iconSize.lg, style: {
                    flexShrink: 0,
                    borderRadius: radius.full,
                }, fallback: _jsx(Container, { color: "secondaryText", children: _jsx(Container, { style: {
                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                            borderRadius: radius.full,
                            width: `${iconSize.lg}px`,
                            height: `${iconSize.lg}px`,
                        } }) }) }), _jsxs("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing["3xs"],
                    flex: 1,
                }, children: [_jsxs(Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            width: "100%",
                        }, children: [_jsx(Text, { size: "md", color: "primaryText", weight: 500, style: {
                                    maxWidth: "200px",
                                    whiteSpace: "nowrap",
                                }, children: props.token.symbol }), "balance" in props.token && (_jsx(Text, { size: "md", color: "primaryText", children: tokenAmountFormatter.format(Number(toTokens(BigInt(props.token.balance), props.token.decimals))) }))] }), _jsxs(Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            width: "100%",
                        }, children: [_jsx(Text, { size: "xs", color: "secondaryText", style: {
                                    whiteSpace: "nowrap",
                                    maxWidth: "200px",
                                }, children: props.token.name }), usdValue && (_jsx(Container, { flex: "row", children: _jsxs(Text, { size: "xs", color: "secondaryText", weight: 400, children: ["$", usdValue.toFixed(2)] }) }))] })] }), _jsx(IconButton, { onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.onInfoClick(tokenAddress, chainId);
                }, style: {
                    padding: spacing.xxs,
                    borderRadius: radius.full,
                }, children: _jsx(InfoIcon, { size: iconSize.sm }) })] }));
}
function TokenInfoScreen(props) {
    const theme = useCustomTheme();
    const tokenQuery = useTokenPrice({
        token: {
            tokenAddress: props.tokenAddress,
            chainId: props.chainId,
        },
        client: props.client,
    });
    const token = tokenQuery.data;
    const isNativeToken = isNativeTokenAddress(props.tokenAddress);
    const explorerLink = isNativeToken
        ? `https://thirdweb.com/${props.chainId}`
        : `https://thirdweb.com/${props.chainId}/${props.tokenAddress}`;
    return (_jsxs(Container, { flex: "column", expand: true, style: { minHeight: "450px" }, animate: "fadein", children: [_jsx(Container, { px: "md", py: "md+", children: _jsx(ModalHeader, { onBack: props.onBack, title: "Token Details" }) }), _jsx(Line, { dashed: true }), tokenQuery.isPending ? (_jsx(Container, { flex: "column", center: "both", expand: true, children: _jsx(Spinner, { size: "lg", color: "secondaryText" }) })) : !token ? (_jsx(Container, { flex: "column", center: "both", expand: true, children: _jsx(Text, { size: "sm", color: "secondaryText", children: "Token not found" }) })) : (_jsxs(Container, { flex: "column", gap: "md", px: "md", py: "lg", children: [_jsxs(Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [_jsx(Text, { size: "sm", color: "secondaryText", children: "Name" }), _jsxs(Container, { flex: "row", gap: "xxs", center: "y", children: [_jsx(Img, { src: token.iconUri || "", client: props.client, width: iconSize.sm, height: iconSize.sm, style: {
                                            borderRadius: radius.full,
                                        }, fallback: _jsx(Container, { style: {
                                                background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                                borderRadius: radius.full,
                                                width: `${iconSize.sm}px`,
                                                height: `${iconSize.sm}px`,
                                            } }) }), _jsx(Text, { size: "sm", color: "primaryText", weight: 500, style: {
                                            maxWidth: "200px",
                                            whiteSpace: "nowrap",
                                        }, children: token.name })] })] }), _jsx(TokenInfoRow, { label: "Symbol", value: token.symbol }), "prices" in token && (_jsx(TokenInfoRow, { label: "Price", value: token.prices[props.currency]
                            ? formatCurrencyAmount(props.currency, token.prices[props.currency])
                            : "N/A" })), !!token.marketCapUsd && (_jsx(TokenInfoRow, { label: "Market Cap", value: formatCurrencyAmount(props.currency, token.marketCapUsd) })), !!token.volume24hUsd && (_jsx(TokenInfoRow, { label: "Volume (24h)", value: formatCurrencyAmount(props.currency, token.volume24hUsd) })), _jsxs(Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [_jsx(Text, { size: "sm", color: "secondaryText", children: "Contract Address" }), _jsxs(Container, { flex: "row", gap: "3xs", center: "y", children: [!isNativeToken && (_jsx(CopyIcon, { text: props.tokenAddress, iconSize: 13, tip: "Copy Address" })), _jsx(Link, { href: explorerLink, target: "_blank", rel: "noreferrer", color: "accentText", hoverColor: "primaryText", weight: 500, size: "sm", children: isNativeToken
                                            ? "Native Currency"
                                            : shortenAddress(props.tokenAddress) })] })] })] }))] }));
}
function TokenInfoRow(props) {
    return (_jsxs(Container, { flex: "row", style: {
            justifyContent: "space-between",
            alignItems: "center",
        }, children: [_jsx(Text, { size: "sm", color: "secondaryText", children: props.label }), _jsx(Text, { size: "sm", color: "primaryText", weight: 500, style: {
                    maxWidth: "200px",
                    whiteSpace: "nowrap",
                }, children: props.value })] }));
}
function TokenSelectionScreen(props) {
    const [tokenInfoScreen, setTokenInfoScreen] = useState(null);
    const noTokensFound = !props.isFetching &&
        props.otherTokens.length === 0 &&
        props.ownedTokens.length === 0;
    if (tokenInfoScreen) {
        return (_jsx(TokenInfoScreen, { tokenAddress: tokenInfoScreen.tokenAddress, chainId: tokenInfoScreen.chainId, client: props.client, onBack: () => setTokenInfoScreen(null), currency: props.currency }));
    }
    return (_jsxs(Container, { fullHeight: true, flex: "column", children: [_jsxs(Container, { px: "md", pt: "md+", children: [_jsx(Text, { size: "lg", weight: 600, color: "primaryText", trackingTight: true, children: "Select Token" }), _jsx(Spacer, { y: "3xs" }), _jsx(Text, { size: "sm", color: "secondaryText", multiline: true, style: {
                            textWrap: "pretty",
                        }, children: "Select a token from the list or use the search" })] }), !props.selectedChain && (_jsx(Container, { flex: "column", center: "both", expand: true, style: {
                    minHeight: "300px",
                }, children: _jsx(Spinner, { color: "secondaryText", size: "lg" }) })), props.selectedChain && (_jsxs(_Fragment, { children: [props.isMobile ? (_jsx(Container, { p: "md", children: _jsx(SelectChainButton, { onClick: props.onSelectChain, selectedChain: props.selectedChain, client: props.client }) })) : (_jsx(Spacer, { y: "md" })), _jsx(Container, { px: "md", children: _jsx(SearchInput, { value: props.search, onChange: props.setSearch, placeholder: "Search by token or address", autoFocus: !props.isMobile }) }), _jsx(Spacer, { y: "xs" }), _jsxs(Container, { pb: "md", px: "md", expand: true, gap: "xxs", flex: "column", style: {
                            minHeight: "300px",
                            maxHeight: props.isMobile ? "450px" : "none",
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            paddingBottom: spacing.md,
                        }, children: [props.isFetching &&
                                new Array(20).fill(0).map((_, i) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: ok
                                _jsx(TokenButtonSkeleton, {}, i))), !props.isFetching && props.ownedTokens.length > 0 && (_jsxs(Container, { px: "xs", py: "xs", flex: "row", gap: "xs", center: "y", color: "secondaryText", children: [_jsx(WalletDotIcon, { size: "14" }), _jsx(Text, { size: "sm", color: "secondaryText", style: {
                                            overflow: "unset",
                                        }, children: "Your Tokens" })] })), !props.isFetching &&
                                props.ownedTokens.map((token) => (_jsx(TokenButton, { token: token, client: props.client, onSelect: props.onSelectToken, onInfoClick: (tokenAddress, chainId) => setTokenInfoScreen({ tokenAddress, chainId }), isSelected: !!props.selectedToken &&
                                        props.selectedToken.tokenAddress.toLowerCase() ===
                                            token.token_address.toLowerCase() &&
                                        token.chain_id === props.selectedToken.chainId }, token.token_address))), !props.isFetching && props.ownedTokens.length > 0 && (_jsxs(Container, { px: "xs", py: "xs", flex: "row", gap: "xs", center: "y", color: "secondaryText", style: {
                                    marginTop: spacing.sm,
                                }, children: [_jsx(CoinsIcon, { size: "14" }), _jsx(Text, { size: "sm", color: "secondaryText", style: {
                                            overflow: "unset",
                                        }, children: "Other Tokens" })] })), !props.isFetching &&
                                props.otherTokens.map((token) => (_jsx(TokenButton, { token: token, client: props.client, onSelect: props.onSelectToken, onInfoClick: (tokenAddress, chainId) => setTokenInfoScreen({ tokenAddress, chainId }), isSelected: !!props.selectedToken &&
                                        props.selectedToken.tokenAddress.toLowerCase() ===
                                            token.address.toLowerCase() &&
                                        token.chainId === props.selectedToken.chainId }, token.address))), props.showMore && (_jsxs(Button, { variant: "outline", fullWidth: true, style: {
                                    borderRadius: radius.full,
                                }, gap: "xs", onClick: () => {
                                    props.showMore?.();
                                }, children: [_jsx(PlusIcon, { width: iconSize.sm, height: iconSize.sm }), "Load More"] })), noTokensFound && (_jsx("div", { style: {
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Text, { size: "sm", color: "secondaryText", children: "No Tokens Found" }) }))] })] }))] }));
}
const LeftContainer = /* @__PURE__ */ StyledDiv((_) => {
    const theme = useCustomTheme();
    return {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        ...noScrollBar,
        borderRight: `1px solid ${theme.colors.separatorLine}`,
        position: "relative",
    };
});
//# sourceMappingURL=select-token-ui.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectToken = SelectToken;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const addresses_js_1 = require("../../../../../constants/addresses.js");
const address_js_1 = require("../../../../../utils/address.js");
const units_js_1 = require("../../../../../utils/units.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const CoinsIcon_js_1 = require("../../ConnectWallet/icons/CoinsIcon.js");
const InfoIcon_js_1 = require("../../ConnectWallet/icons/InfoIcon.js");
const WalletDotIcon_js_1 = require("../../ConnectWallet/icons/WalletDotIcon.js");
const formatTokenBalance_js_1 = require("../../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const CopyIcon_js_1 = require("../../components/CopyIcon.js");
const Img_js_1 = require("../../components/Img.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const text_js_1 = require("../../components/text.js");
const elements_js_1 = require("../../design-system/elements.js");
const useDebouncedValue_js_1 = require("../../hooks/useDebouncedValue.js");
const useisMobile_js_1 = require("../../hooks/useisMobile.js");
const hooks_js_1 = require("./hooks.js");
const SearchInput_js_1 = require("./SearchInput.js");
const SelectChainButton_js_1 = require("./SelectChainButton.js");
const select_chain_js_1 = require("./select-chain.js");
const use_bridge_chains_js_1 = require("./use-bridge-chains.js");
const use_tokens_js_1 = require("./use-tokens.js");
const utils_js_1 = require("./utils.js");
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
function SelectToken(props) {
    const chainQuery = (0, use_bridge_chains_js_1.useBridgeChainsWithFilters)({
        client: props.client,
        type: props.type,
        buyChainId: props.selections.buyChainId,
        sellChainId: props.selections.sellChainId,
    });
    const [search, _setSearch] = (0, react_1.useState)("");
    const debouncedSearch = (0, useDebouncedValue_js_1.useDebouncedValue)(search, 500);
    const [limit, setLimit] = (0, react_1.useState)(INITIAL_LIMIT);
    const setSearch = (0, react_1.useCallback)((search) => {
        _setSearch(search);
        setLimit(INITIAL_LIMIT);
    }, []);
    const [_selectedChain, setSelectedChain] = (0, react_1.useState)(undefined);
    const selectedChain = _selectedChain ||
        (chainQuery.data
            ? findChain(chainQuery.data, props.selectedToken?.chainId) ||
                findChain(chainQuery.data, props.activeWalletInfo?.activeChain.id) ||
                findChain(chainQuery.data, 1)
            : undefined);
    // all tokens
    const tokensQuery = (0, use_tokens_js_1.useTokens)({
        client: props.client,
        chainId: selectedChain?.chainId,
        search: debouncedSearch,
        limit,
        offset: 0,
    });
    // owned tokens
    const ownedTokensQuery = (0, use_tokens_js_1.useTokenBalances)({
        client: props.client,
        chainId: selectedChain?.chainId,
        limit,
        page: 1,
        walletAddress: props.activeWalletInfo?.activeAccount.address,
    });
    const filteredOwnedTokens = (0, react_1.useMemo)(() => {
        return ownedTokensQuery.data?.tokens?.filter((token) => {
            return (token.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                token.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                token.token_address
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase()));
        });
    }, [ownedTokensQuery.data?.tokens, debouncedSearch]);
    const isFetching = tokensQuery.isFetching || ownedTokensQuery.isFetching;
    return ((0, jsx_runtime_1.jsx)(SelectTokenUI, { ...props, ownedTokens: filteredOwnedTokens || [], allTokens: tokensQuery.data || [], isFetching: isFetching, selectedChain: selectedChain, setSelectedChain: setSelectedChain, search: search, setSearch: setSearch, selectedToken: props.selectedToken, setSelectedToken: props.setSelectedToken, showMore: tokensQuery.data?.length === limit
            ? () => {
                setLimit(limit + INITIAL_LIMIT);
            }
            : undefined }));
}
function SelectTokenUI(props) {
    const isMobile = (0, useisMobile_js_1.useIsMobile)();
    const [screen, setScreen] = (0, react_1.useState)("select-token");
    // show tokens with icons first
    const sortedOwnedTokens = (0, react_1.useMemo)(() => {
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
    const otherTokens = (0, react_1.useMemo)(() => {
        const ownedTokenSet = new Set(sortedOwnedTokens.map((t) => `${t.token_address}-${t.chain_id}`.toLowerCase()));
        return props.allTokens.filter((token) => !ownedTokenSet.has(`${token.address}-${token.chainId}`.toLowerCase()));
    }, [props.allTokens, sortedOwnedTokens]);
    // show tokens with icons first
    const sortedOtherTokens = (0, react_1.useMemo)(() => {
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
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                height: "100%",
            }, children: [(0, jsx_runtime_1.jsx)(LeftContainer, { children: (0, jsx_runtime_1.jsx)(select_chain_js_1.SelectBridgeChain, { type: props.type, selections: props.selections, onBack: () => setScreen("select-token"), client: props.client, isMobile: false, onSelectChain: (chain) => {
                            props.setSelectedChain(chain);
                            setScreen("select-token");
                        }, selectedChain: props.selectedChain }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", relative: true, scrollY: true, children: (0, jsx_runtime_1.jsx)(TokenSelectionScreen, { onSelectToken: (token) => {
                            props.setSelectedToken(token);
                            props.onClose();
                        }, isMobile: false, selectedToken: props.selectedToken, isFetching: props.isFetching, ownedTokens: props.ownedTokens, otherTokens: sortedOtherTokens, showMore: props.showMore, selectedChain: props.selectedChain, onSelectChain: () => setScreen("select-chain"), client: props.client, search: props.search, setSearch: props.setSearch, currency: props.currency }, props.selectedChain?.chainId) })] }));
    }
    if (screen === "select-token") {
        return ((0, jsx_runtime_1.jsx)(TokenSelectionScreen, { onSelectToken: (token) => {
                props.setSelectedToken(token);
                props.onClose();
            }, selectedToken: props.selectedToken, isFetching: props.isFetching, ownedTokens: props.ownedTokens, otherTokens: sortedOtherTokens, showMore: props.showMore, selectedChain: props.selectedChain, isMobile: true, onSelectChain: () => setScreen("select-chain"), client: props.client, search: props.search, setSearch: props.setSearch, currency: props.currency }, props.selectedChain?.chainId));
    }
    if (screen === "select-chain") {
        return ((0, jsx_runtime_1.jsx)(select_chain_js_1.SelectBridgeChain, { isMobile: true, onBack: () => setScreen("select-token"), client: props.client, onSelectChain: (chain) => {
                props.setSelectedChain(chain);
                setScreen("select-token");
            }, selectedChain: props.selectedChain, type: props.type, selections: props.selections }));
    }
    return null;
}
function TokenButtonSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: index_js_1.spacing.sm,
            padding: `${index_js_1.spacing.xs} ${index_js_1.spacing.xs}`,
            height: "70px",
        }, children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: `${index_js_1.iconSize.lg}px`, width: `${index_js_1.iconSize.lg}px` }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.sm, width: "100px" }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md, width: "200px" })] })] }));
}
function TokenButton(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const tokenBalanceInUnits = "balance" in props.token
        ? (0, units_js_1.toTokens)(BigInt(props.token.balance), props.token.decimals)
        : undefined;
    const usdValue = "balance" in props.token
        ? props.token.price_data.price_usd * Number(tokenBalanceInUnits)
        : undefined;
    const tokenAddress = "balance" in props.token ? props.token.token_address : props.token.address;
    const chainId = "balance" in props.token ? props.token.chain_id : props.token.chainId;
    return ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { variant: props.isSelected ? "secondary" : "ghost-solid", fullWidth: true, style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: index_js_1.fontSize.md,
            border: "1px solid transparent",
            padding: `${index_js_1.spacing.xs} ${index_js_1.spacing.xs}`,
            textAlign: "left",
            lineHeight: "1.5",
            borderRadius: index_js_1.radius.lg,
        }, gap: "sm", onClick: async () => {
            props.onSelect({
                tokenAddress,
                chainId,
            });
        }, children: [(0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: ("balance" in props.token
                    ? props.token.icon_uri
                    : props.token.iconUri) || "", client: props.client, width: index_js_1.iconSize.lg, height: index_js_1.iconSize.lg, style: {
                    flexShrink: 0,
                    borderRadius: index_js_1.radius.full,
                }, fallback: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { color: "secondaryText", children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                            borderRadius: index_js_1.radius.full,
                            width: `${index_js_1.iconSize.lg}px`,
                            height: `${index_js_1.iconSize.lg}px`,
                        } }) }) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: index_js_1.spacing["3xs"],
                    flex: 1,
                }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            width: "100%",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "md", color: "primaryText", weight: 500, style: {
                                    maxWidth: "200px",
                                    whiteSpace: "nowrap",
                                }, children: props.token.symbol }), "balance" in props.token && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "md", color: "primaryText", children: utils_js_1.tokenAmountFormatter.format(Number((0, units_js_1.toTokens)(BigInt(props.token.balance), props.token.decimals))) }))] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            width: "100%",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "secondaryText", style: {
                                    whiteSpace: "nowrap",
                                    maxWidth: "200px",
                                }, children: props.token.name }), usdValue && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", children: (0, jsx_runtime_1.jsxs)(text_js_1.Text, { size: "xs", color: "secondaryText", weight: 400, children: ["$", usdValue.toFixed(2)] }) }))] })] }), (0, jsx_runtime_1.jsx)(buttons_js_1.IconButton, { onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.onInfoClick(tokenAddress, chainId);
                }, style: {
                    padding: index_js_1.spacing.xxs,
                    borderRadius: index_js_1.radius.full,
                }, children: (0, jsx_runtime_1.jsx)(InfoIcon_js_1.InfoIcon, { size: index_js_1.iconSize.sm }) })] }));
}
function TokenInfoScreen(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const tokenQuery = (0, hooks_js_1.useTokenPrice)({
        token: {
            tokenAddress: props.tokenAddress,
            chainId: props.chainId,
        },
        client: props.client,
    });
    const token = tokenQuery.data;
    const isNativeToken = (0, addresses_js_1.isNativeTokenAddress)(props.tokenAddress);
    const explorerLink = isNativeToken
        ? `https://thirdweb.com/${props.chainId}`
        : `https://thirdweb.com/${props.chainId}/${props.tokenAddress}`;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", expand: true, style: { minHeight: "450px" }, animate: "fadein", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", py: "md+", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Token Details" }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), tokenQuery.isPending ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", center: "both", expand: true, children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { size: "lg", color: "secondaryText" }) })) : !token ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", center: "both", expand: true, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", children: "Token not found" }) })) : ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "md", px: "md", py: "lg", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", children: "Name" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "xxs", center: "y", children: [(0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: token.iconUri || "", client: props.client, width: index_js_1.iconSize.sm, height: index_js_1.iconSize.sm, style: {
                                            borderRadius: index_js_1.radius.full,
                                        }, fallback: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                                background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                                borderRadius: index_js_1.radius.full,
                                                width: `${index_js_1.iconSize.sm}px`,
                                                height: `${index_js_1.iconSize.sm}px`,
                                            } }) }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "primaryText", weight: 500, style: {
                                            maxWidth: "200px",
                                            whiteSpace: "nowrap",
                                        }, children: token.name })] })] }), (0, jsx_runtime_1.jsx)(TokenInfoRow, { label: "Symbol", value: token.symbol }), "prices" in token && ((0, jsx_runtime_1.jsx)(TokenInfoRow, { label: "Price", value: token.prices[props.currency]
                            ? (0, formatTokenBalance_js_1.formatCurrencyAmount)(props.currency, token.prices[props.currency])
                            : "N/A" })), !!token.marketCapUsd && ((0, jsx_runtime_1.jsx)(TokenInfoRow, { label: "Market Cap", value: (0, formatTokenBalance_js_1.formatCurrencyAmount)(props.currency, token.marketCapUsd) })), !!token.volume24hUsd && ((0, jsx_runtime_1.jsx)(TokenInfoRow, { label: "Volume (24h)", value: (0, formatTokenBalance_js_1.formatCurrencyAmount)(props.currency, token.volume24hUsd) })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", children: "Contract Address" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "3xs", center: "y", children: [!isNativeToken && ((0, jsx_runtime_1.jsx)(CopyIcon_js_1.CopyIcon, { text: props.tokenAddress, iconSize: 13, tip: "Copy Address" })), (0, jsx_runtime_1.jsx)(text_js_1.Link, { href: explorerLink, target: "_blank", rel: "noreferrer", color: "accentText", hoverColor: "primaryText", weight: 500, size: "sm", children: isNativeToken
                                            ? "Native Currency"
                                            : (0, address_js_1.shortenAddress)(props.tokenAddress) })] })] })] }))] }));
}
function TokenInfoRow(props) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
            justifyContent: "space-between",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", children: props.label }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "primaryText", weight: 500, style: {
                    maxWidth: "200px",
                    whiteSpace: "nowrap",
                }, children: props.value })] }));
}
function TokenSelectionScreen(props) {
    const [tokenInfoScreen, setTokenInfoScreen] = (0, react_1.useState)(null);
    const noTokensFound = !props.isFetching &&
        props.otherTokens.length === 0 &&
        props.ownedTokens.length === 0;
    if (tokenInfoScreen) {
        return ((0, jsx_runtime_1.jsx)(TokenInfoScreen, { tokenAddress: tokenInfoScreen.tokenAddress, chainId: tokenInfoScreen.chainId, client: props.client, onBack: () => setTokenInfoScreen(null), currency: props.currency }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { fullHeight: true, flex: "column", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "md", pt: "md+", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "lg", weight: 600, color: "primaryText", trackingTight: true, children: "Select Token" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "3xs" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", multiline: true, style: {
                            textWrap: "pretty",
                        }, children: "Select a token from the list or use the search" })] }), !props.selectedChain && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", center: "both", expand: true, style: {
                    minHeight: "300px",
                }, children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "secondaryText", size: "lg" }) })), props.selectedChain && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.isMobile ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "md", children: (0, jsx_runtime_1.jsx)(SelectChainButton_js_1.SelectChainButton, { onClick: props.onSelectChain, selectedChain: props.selectedChain, client: props.client }) })) : ((0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", children: (0, jsx_runtime_1.jsx)(SearchInput_js_1.SearchInput, { value: props.search, onChange: props.setSearch, placeholder: "Search by token or address", autoFocus: !props.isMobile }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { pb: "md", px: "md", expand: true, gap: "xxs", flex: "column", style: {
                            minHeight: "300px",
                            maxHeight: props.isMobile ? "450px" : "none",
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            paddingBottom: index_js_1.spacing.md,
                        }, children: [props.isFetching &&
                                new Array(20).fill(0).map((_, i) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: ok
                                (0, jsx_runtime_1.jsx)(TokenButtonSkeleton, {}, i))), !props.isFetching && props.ownedTokens.length > 0 && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "xs", py: "xs", flex: "row", gap: "xs", center: "y", color: "secondaryText", children: [(0, jsx_runtime_1.jsx)(WalletDotIcon_js_1.WalletDotIcon, { size: "14" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", style: {
                                            overflow: "unset",
                                        }, children: "Your Tokens" })] })), !props.isFetching &&
                                props.ownedTokens.map((token) => ((0, jsx_runtime_1.jsx)(TokenButton, { token: token, client: props.client, onSelect: props.onSelectToken, onInfoClick: (tokenAddress, chainId) => setTokenInfoScreen({ tokenAddress, chainId }), isSelected: !!props.selectedToken &&
                                        props.selectedToken.tokenAddress.toLowerCase() ===
                                            token.token_address.toLowerCase() &&
                                        token.chain_id === props.selectedToken.chainId }, token.token_address))), !props.isFetching && props.ownedTokens.length > 0 && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "xs", py: "xs", flex: "row", gap: "xs", center: "y", color: "secondaryText", style: {
                                    marginTop: index_js_1.spacing.sm,
                                }, children: [(0, jsx_runtime_1.jsx)(CoinsIcon_js_1.CoinsIcon, { size: "14" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", style: {
                                            overflow: "unset",
                                        }, children: "Other Tokens" })] })), !props.isFetching &&
                                props.otherTokens.map((token) => ((0, jsx_runtime_1.jsx)(TokenButton, { token: token, client: props.client, onSelect: props.onSelectToken, onInfoClick: (tokenAddress, chainId) => setTokenInfoScreen({ tokenAddress, chainId }), isSelected: !!props.selectedToken &&
                                        props.selectedToken.tokenAddress.toLowerCase() ===
                                            token.address.toLowerCase() &&
                                        token.chainId === props.selectedToken.chainId }, token.address))), props.showMore && ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { variant: "outline", fullWidth: true, style: {
                                    borderRadius: index_js_1.radius.full,
                                }, gap: "xs", onClick: () => {
                                    props.showMore?.();
                                }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.PlusIcon, { width: index_js_1.iconSize.sm, height: index_js_1.iconSize.sm }), "Load More"] })), noTokensFound && ((0, jsx_runtime_1.jsx)("div", { style: {
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", color: "secondaryText", children: "No Tokens Found" }) }))] })] }))] }));
}
const LeftContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        ...basic_js_1.noScrollBar,
        borderRight: `1px solid ${theme.colors.separatorLine}`,
        position: "relative",
    };
});
//# sourceMappingURL=select-token-ui.js.map
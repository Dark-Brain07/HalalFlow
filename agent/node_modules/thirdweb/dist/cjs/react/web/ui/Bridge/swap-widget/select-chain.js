"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectBridgeChain = SelectBridgeChain;
exports.SelectBridgeChainUI = SelectBridgeChainUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Img_js_1 = require("../../components/Img.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const SearchInput_js_1 = require("./SearchInput.js");
const use_bridge_chains_js_1 = require("./use-bridge-chains.js");
const utils_js_1 = require("./utils.js");
/**
 * @internal
 */
function SelectBridgeChain(props) {
    const chainQuery = (0, use_bridge_chains_js_1.useBridgeChainsWithFilters)({
        client: props.client,
        type: props.type,
        buyChainId: props.selections.buyChainId,
        sellChainId: props.selections.sellChainId,
    });
    return ((0, jsx_runtime_1.jsx)(SelectBridgeChainUI, { ...props, isPending: chainQuery.isPending, onSelectChain: props.onSelectChain, chains: chainQuery.data ?? [] }));
}
/**
 * @internal
 */
function SelectBridgeChainUI(props) {
    const [search, setSearch] = (0, react_1.useState)("");
    const [initiallySelectedChain] = (0, react_1.useState)(props.selectedChain);
    // put the initially selected chain first
    const sortedChains = (0, react_1.useMemo)(() => {
        if (initiallySelectedChain) {
            return [
                initiallySelectedChain,
                ...props.chains.filter((chain) => chain.chainId !== initiallySelectedChain.chainId),
            ];
        }
        return props.chains;
    }, [props.chains, initiallySelectedChain]);
    const filteredChains = sortedChains.filter((chain) => {
        return chain.name.toLowerCase().includes(search.toLowerCase());
    });
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { fullHeight: true, flex: "column", children: [props.isMobile && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", py: "md+", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Select Chain" }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {})] })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", style: {
                    paddingBottom: 0,
                }, children: (0, jsx_runtime_1.jsx)(SearchInput_js_1.SearchInput, { value: search, onChange: setSearch, placeholder: "Search Chain" }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, px: "md", gap: props.isMobile ? undefined : "xxs", flex: "column", style: {
                    maxHeight: props.isMobile ? "400px" : "none",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    paddingBottom: index_js_1.spacing.md,
                }, children: [filteredChains.map((chain) => ((0, jsx_runtime_1.jsx)(ChainButton, { chain: chain, client: props.client, onClick: () => props.onSelectChain(chain), isSelected: chain.chainId === props.selectedChain?.chainId, isMobile: props.isMobile }, chain.chainId))), props.isPending &&
                        new Array(20).fill(0).map(() => (
                        // biome-ignore lint/correctness/useJsxKeyInIterable: ok
                        (0, jsx_runtime_1.jsx)(ChainButtonSkeleton, { isMobile: props.isMobile }))), filteredChains.length === 0 && !props.isPending && ((0, jsx_runtime_1.jsx)("div", { style: {
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: (0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "secondaryText", size: "md", center: true, multiline: true, children: ["No chains found for \"", search, "\""] }) }))] })] }));
}
function ChainButtonSkeleton(props) {
    const iconSizeValue = props.isMobile ? index_js_1.iconSize.lg : index_js_1.iconSize.md;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: index_js_1.spacing.sm,
            padding: props.isMobile
                ? `${index_js_1.spacing.sm} ${index_js_1.spacing.sm}`
                : `${index_js_1.spacing.xs} ${index_js_1.spacing.xs}`,
        }, children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: `${iconSizeValue}px`, width: `${iconSizeValue}px` }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: props.isMobile ? index_js_1.fontSize.md : index_js_1.fontSize.sm, width: "160px" })] }));
}
function ChainButton(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const iconSizeValue = props.isMobile ? index_js_1.iconSize.lg : index_js_1.iconSize.md;
    return ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { variant: props.isSelected ? "secondary" : "ghost-solid", fullWidth: true, style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: props.isMobile ? index_js_1.fontSize.md : index_js_1.fontSize.sm,
            border: "1px solid transparent",
            padding: !props.isMobile ? `${index_js_1.spacing.xs} ${index_js_1.spacing.xs}` : undefined,
        }, onClick: props.onClick, gap: "sm", children: [(0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: props.chain.icon || "", client: props.client, width: iconSizeValue, height: iconSizeValue, style: {
                    borderRadius: index_js_1.radius.full,
                }, fallback: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { color: "secondaryText", children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                            borderRadius: index_js_1.radius.full,
                            width: `${iconSizeValue}px`,
                            height: `${iconSizeValue}px`,
                        } }) }) }), (0, utils_js_1.cleanedChainName)(props.chain.name)] }));
}
//# sourceMappingURL=select-chain.js.map
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Img } from "../../components/Img.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { SearchInput } from "./SearchInput.js";
import { useBridgeChainsWithFilters } from "./use-bridge-chains.js";
import { cleanedChainName } from "./utils.js";
/**
 * @internal
 */
export function SelectBridgeChain(props) {
    const chainQuery = useBridgeChainsWithFilters({
        client: props.client,
        type: props.type,
        buyChainId: props.selections.buyChainId,
        sellChainId: props.selections.sellChainId,
    });
    return (_jsx(SelectBridgeChainUI, { ...props, isPending: chainQuery.isPending, onSelectChain: props.onSelectChain, chains: chainQuery.data ?? [] }));
}
/**
 * @internal
 */
export function SelectBridgeChainUI(props) {
    const [search, setSearch] = useState("");
    const [initiallySelectedChain] = useState(props.selectedChain);
    // put the initially selected chain first
    const sortedChains = useMemo(() => {
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
    return (_jsxs(Container, { fullHeight: true, flex: "column", children: [props.isMobile && (_jsxs(_Fragment, { children: [_jsx(Container, { px: "md", py: "md+", children: _jsx(ModalHeader, { onBack: props.onBack, title: "Select Chain" }) }), _jsx(Line, {})] })), _jsx(Spacer, { y: "md" }), _jsx(Container, { px: "md", style: {
                    paddingBottom: 0,
                }, children: _jsx(SearchInput, { value: search, onChange: setSearch, placeholder: "Search Chain" }) }), _jsx(Spacer, { y: "sm" }), _jsxs(Container, { expand: true, px: "md", gap: props.isMobile ? undefined : "xxs", flex: "column", style: {
                    maxHeight: props.isMobile ? "400px" : "none",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    paddingBottom: spacing.md,
                }, children: [filteredChains.map((chain) => (_jsx(ChainButton, { chain: chain, client: props.client, onClick: () => props.onSelectChain(chain), isSelected: chain.chainId === props.selectedChain?.chainId, isMobile: props.isMobile }, chain.chainId))), props.isPending &&
                        new Array(20).fill(0).map(() => (
                        // biome-ignore lint/correctness/useJsxKeyInIterable: ok
                        _jsx(ChainButtonSkeleton, { isMobile: props.isMobile }))), filteredChains.length === 0 && !props.isPending && (_jsx("div", { style: {
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsxs(Text, { color: "secondaryText", size: "md", center: true, multiline: true, children: ["No chains found for \"", search, "\""] }) }))] })] }));
}
function ChainButtonSkeleton(props) {
    const iconSizeValue = props.isMobile ? iconSize.lg : iconSize.md;
    return (_jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            padding: props.isMobile
                ? `${spacing.sm} ${spacing.sm}`
                : `${spacing.xs} ${spacing.xs}`,
        }, children: [_jsx(Skeleton, { height: `${iconSizeValue}px`, width: `${iconSizeValue}px` }), _jsx(Skeleton, { height: props.isMobile ? fontSize.md : fontSize.sm, width: "160px" })] }));
}
function ChainButton(props) {
    const theme = useCustomTheme();
    const iconSizeValue = props.isMobile ? iconSize.lg : iconSize.md;
    return (_jsxs(Button, { variant: props.isSelected ? "secondary" : "ghost-solid", fullWidth: true, style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: props.isMobile ? fontSize.md : fontSize.sm,
            border: "1px solid transparent",
            padding: !props.isMobile ? `${spacing.xs} ${spacing.xs}` : undefined,
        }, onClick: props.onClick, gap: "sm", children: [_jsx(Img, { src: props.chain.icon || "", client: props.client, width: iconSizeValue, height: iconSizeValue, style: {
                    borderRadius: radius.full,
                }, fallback: _jsx(Container, { color: "secondaryText", children: _jsx(Container, { style: {
                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                            borderRadius: radius.full,
                            width: `${iconSizeValue}px`,
                            height: `${iconSizeValue}px`,
                        } }) }) }), cleanedChainName(props.chain.name)] }));
}
//# sourceMappingURL=select-chain.js.map
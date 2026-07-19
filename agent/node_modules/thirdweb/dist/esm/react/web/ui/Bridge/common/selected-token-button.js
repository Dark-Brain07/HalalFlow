import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Img } from "../../components/Img.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Text } from "../../components/text.js";
import { cleanedChainName } from "../swap-widget/utils.js";
export function SelectedTokenButton(props) {
    const theme = useCustomTheme();
    return (_jsxs(Button, { variant: "ghost-solid", hoverBg: props.disabled ? undefined : "secondaryButtonBg", fullWidth: true, onClick: props.onSelectToken, gap: "sm", disabled: props.disabled, style: {
            borderBottom: `1px dashed ${theme.colors.borderColor}`,
            justifyContent: "space-between",
            paddingInline: spacing.md,
            paddingBlock: spacing.md,
            borderRadius: 0,
            background: props.disabled ? "transparent" : undefined,
            cursor: props.disabled ? "default" : "pointer",
            opacity: 1,
        }, children: [_jsxs(Container, { gap: "sm", flex: "row", center: "y", children: [_jsxs(Container, { relative: true, color: "secondaryText", children: [props.selectedToken && !props.selectedToken.isError ? (_jsx(Img, { src: props.selectedToken?.data === undefined
                                    ? undefined
                                    : props.selectedToken.data.iconUri || "", client: props.client, width: "40", height: "40", fallback: _jsx(Container, { style: {
                                        background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                        borderRadius: radius.full,
                                        width: "40px",
                                        height: "40px",
                                    } }), style: {
                                    objectFit: "cover",
                                    borderRadius: radius.full,
                                } }, props.selectedToken?.data?.iconUri)) : (_jsx(Container, { style: {
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                    borderRadius: radius.full,
                                    width: "40px",
                                    height: "40px",
                                } })), props.chain && (_jsx(Container, { bg: "modalBg", style: {
                                    padding: "2px",
                                    position: "absolute",
                                    bottom: -2,
                                    right: -2,
                                    display: "flex",
                                    borderRadius: radius.full,
                                }, children: _jsx(Img, { src: props.chain?.icon || "", client: props.client, width: iconSize.sm, height: iconSize.sm, style: {
                                        borderRadius: radius.full,
                                    }, fallback: _jsx(Container, { style: {
                                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                            borderRadius: radius.full,
                                            width: `${iconSize.sm}px`,
                                            height: `${iconSize.sm}px`,
                                        } }) }) }))] }), props.selectedToken && !props.selectedToken.isError ? (_jsxs(Container, { flex: "column", style: { gap: "3px" }, children: [props.selectedToken?.isFetching ? (_jsx(Skeleton, { width: "60px", height: fontSize.md })) : (_jsx(Text, { size: "md", color: "primaryText", weight: 500, style: {
                                    whiteSpace: "nowrap",
                                    maxWidth: "200px",
                                }, children: props.selectedToken?.data?.symbol })), props.chain ? (_jsx(Text, { size: "xs", color: "secondaryText", style: {
                                    whiteSpace: "nowrap",
                                }, children: cleanedChainName(props.chain.name) })) : (_jsx(Skeleton, { width: "140px", height: fontSize.sm }))] })) : (_jsxs(Container, { flex: "column", style: { gap: "3px" }, children: [_jsx(Text, { size: "md", color: "primaryText", weight: 500, children: "Select Token" }), _jsx(Text, { size: "xs", color: "secondaryText", children: "Required" })] }))] }), !props.disabled && (_jsx(Container, { color: "secondaryText", flex: "row", center: "both", borderColor: "borderColor", style: {
                    borderRadius: radius.full,
                    borderWidth: 1,
                    borderStyle: "solid",
                    padding: spacing.xs,
                }, children: _jsx(ChevronDownIcon, { width: iconSize.sm, height: iconSize.sm }) }))] }));
}
//# sourceMappingURL=selected-token-button.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedTokenButton = SelectedTokenButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Img_js_1 = require("../../components/Img.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const text_js_1 = require("../../components/text.js");
const utils_js_1 = require("../swap-widget/utils.js");
function SelectedTokenButton(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { variant: "ghost-solid", hoverBg: props.disabled ? undefined : "secondaryButtonBg", fullWidth: true, onClick: props.onSelectToken, gap: "sm", disabled: props.disabled, style: {
            borderBottom: `1px dashed ${theme.colors.borderColor}`,
            justifyContent: "space-between",
            paddingInline: index_js_1.spacing.md,
            paddingBlock: index_js_1.spacing.md,
            borderRadius: 0,
            background: props.disabled ? "transparent" : undefined,
            cursor: props.disabled ? "default" : "pointer",
            opacity: 1,
        }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { gap: "sm", flex: "row", center: "y", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { relative: true, color: "secondaryText", children: [props.selectedToken && !props.selectedToken.isError ? ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: props.selectedToken?.data === undefined
                                    ? undefined
                                    : props.selectedToken.data.iconUri || "", client: props.client, width: "40", height: "40", fallback: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                        background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                        borderRadius: index_js_1.radius.full,
                                        width: "40px",
                                        height: "40px",
                                    } }), style: {
                                    objectFit: "cover",
                                    borderRadius: index_js_1.radius.full,
                                } }, props.selectedToken?.data?.iconUri)) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                    borderRadius: index_js_1.radius.full,
                                    width: "40px",
                                    height: "40px",
                                } })), props.chain && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "modalBg", style: {
                                    padding: "2px",
                                    position: "absolute",
                                    bottom: -2,
                                    right: -2,
                                    display: "flex",
                                    borderRadius: index_js_1.radius.full,
                                }, children: (0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: props.chain?.icon || "", client: props.client, width: index_js_1.iconSize.sm, height: index_js_1.iconSize.sm, style: {
                                        borderRadius: index_js_1.radius.full,
                                    }, fallback: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                            borderRadius: index_js_1.radius.full,
                                            width: `${index_js_1.iconSize.sm}px`,
                                            height: `${index_js_1.iconSize.sm}px`,
                                        } }) }) }))] }), props.selectedToken && !props.selectedToken.isError ? ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", style: { gap: "3px" }, children: [props.selectedToken?.isFetching ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { width: "60px", height: index_js_1.fontSize.md })) : ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "md", color: "primaryText", weight: 500, style: {
                                    whiteSpace: "nowrap",
                                    maxWidth: "200px",
                                }, children: props.selectedToken?.data?.symbol })), props.chain ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "secondaryText", style: {
                                    whiteSpace: "nowrap",
                                }, children: (0, utils_js_1.cleanedChainName)(props.chain.name) })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { width: "140px", height: index_js_1.fontSize.sm }))] })) : ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", style: { gap: "3px" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "md", color: "primaryText", weight: 500, children: "Select Token" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", color: "secondaryText", children: "Required" })] }))] }), !props.disabled && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { color: "secondaryText", flex: "row", center: "both", borderColor: "borderColor", style: {
                    borderRadius: index_js_1.radius.full,
                    borderWidth: 1,
                    borderStyle: "solid",
                    padding: index_js_1.spacing.xs,
                }, children: (0, jsx_runtime_1.jsx)(react_icons_1.ChevronDownIcon, { width: index_js_1.iconSize.sm, height: index_js_1.iconSize.sm }) }))] }));
}
//# sourceMappingURL=selected-token-button.js.map
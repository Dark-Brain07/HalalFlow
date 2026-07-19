"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithHeader = WithHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const ipfs_js_1 = require("../../../../../utils/ipfs.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
function WithHeader(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [props.image && ((0, jsx_runtime_1.jsx)("div", { className: "tw-header-image", style: {
                    aspectRatio: "16/9",
                    backgroundColor: theme.colors.tertiaryBg,
                    backgroundImage: `url(${getUrl(props.client, props.image)})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: `${index_js_1.radius.md} ${index_js_1.radius.md} 0 0`,
                    marginBottom: index_js_1.spacing.xxs,
                    overflow: "hidden",
                    width: "100%",
                } })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", px: "md", children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (props.title || props.description) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.title && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "lg", weight: 500, trackingTight: true, children: props.title })), props.description && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxs" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", multiline: true, children: props.description })] })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })] })), props.children] })] }));
}
function getUrl(client, uri) {
    if (!uri.startsWith("ipfs://")) {
        return uri;
    }
    return (0, ipfs_js_1.resolveScheme)({
        client,
        uri,
    });
}
//# sourceMappingURL=WithHeader.js.map
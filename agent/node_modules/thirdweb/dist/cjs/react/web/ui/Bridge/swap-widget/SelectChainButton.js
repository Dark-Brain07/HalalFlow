"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectChainButton = SelectChainButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const index_js_1 = require("../../../../core/design-system/index.js");
const buttons_js_1 = require("../../components/buttons.js");
const Img_js_1 = require("../../components/Img.js");
const utils_js_1 = require("./utils.js");
function SelectChainButton(props) {
    return ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { variant: "outline", bg: "tertiaryBg", fullWidth: true, style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: index_js_1.fontSize.md,
            padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.sm}`,
            borderRadius: index_js_1.radius.lg,
            minHeight: "48px",
        }, gap: "sm", onClick: props.onClick, children: [(0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: props.selectedChain.icon, client: props.client, width: index_js_1.iconSize.lg, height: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsxs)("span", { children: [" ", (0, utils_js_1.cleanedChainName)(props.selectedChain.name), " "] }), (0, jsx_runtime_1.jsx)(react_icons_1.ChevronDownIcon, { width: index_js_1.iconSize.sm, height: index_js_1.iconSize.sm, style: { marginLeft: "auto" } })] }));
}
//# sourceMappingURL=SelectChainButton.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTypeRowButton = WalletTypeRowButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../core/design-system/index.js");
const text_js_1 = require("../../ui/components/text.js");
const badge_js_1 = require("../components/badge.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
function WalletTypeRowButton(props) {
    return ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { disabled: props.disabled, className: props.className, fullWidth: true, onClick: () => {
            props.onClick();
        }, style: {
            display: "flex",
            justifyContent: "flex-start",
            padding: index_js_1.spacing.sm,
            position: "relative",
        }, variant: "outline", children: [props.lastUsedBadge && (0, jsx_runtime_1.jsx)(badge_js_1.LastUsedBadge, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", color: "accentText", flex: "row", gap: "sm", children: [(0, jsx_runtime_1.jsx)(props.icon, { size: index_js_1.iconSize.md }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", children: props.title })] })] }));
}
//# sourceMappingURL=WalletTypeRowButton.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAST_USED_BADGE_VERTICAL_RESERVED_SPACE = void 0;
exports.LastUsedBadge = LastUsedBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../core/design-system/index.js");
const basic_js_1 = require("./basic.js");
const text_js_1 = require("./text.js");
function Badge(props) {
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "modalBg", color: "secondaryText", borderColor: "borderColor", flex: "row", center: "y", style: {
            borderRadius: index_js_1.radius.full,
            padding: `${index_js_1.spacing["3xs"]} ${index_js_1.spacing.xs}`,
            borderWidth: "1px",
            borderStyle: "solid",
        }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { style: {
                fontSize: 10,
                whiteSpace: "nowrap",
            }, children: props.text }) }));
}
function LastUsedBadge() {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            position: "absolute",
            top: -10,
            right: -10,
            zIndex: 1,
            pointerEvents: "none",
            cursor: "default",
        }, children: (0, jsx_runtime_1.jsx)(Badge, { text: "Last used" }) }));
}
exports.LAST_USED_BADGE_VERTICAL_RESERVED_SPACE = 12;
//# sourceMappingURL=badge.js.map
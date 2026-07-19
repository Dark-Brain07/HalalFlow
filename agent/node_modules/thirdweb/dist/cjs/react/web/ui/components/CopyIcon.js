"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const index_js_1 = require("../../../core/design-system/index.js");
const useCopyClipboard_js_1 = require("../hooks/useCopyClipboard.js");
const basic_js_1 = require("./basic.js");
const buttons_js_1 = require("./buttons.js");
const Tooltip_js_1 = require("./Tooltip.js");
/**
 * @internal
 */
const CopyIcon = (props) => {
    const { hasCopied, onCopy } = (0, useCopyClipboard_js_1.useClipboard)(props.text);
    const showCheckIcon = props.hasCopied || hasCopied;
    return ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: onCopy, variant: "ghost-solid", style: {
            alignItems: "center",
            display: "flex",
            padding: 2,
            justifyContent: "center",
            borderRadius: index_js_1.radius.sm,
        }, children: (0, jsx_runtime_1.jsx)(Tooltip_js_1.ToolTip, { align: props.align, side: props.side, tip: props.tip, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", color: showCheckIcon ? "success" : "secondaryText", flex: "row", children: showCheckIcon ? ((0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { className: "tw-check-icon", width: props.iconSize || 16, height: props.iconSize || 16 })) : ((0, jsx_runtime_1.jsx)(react_icons_1.CopyIcon, { className: "tw-copy-icon", width: props.iconSize || 16, height: props.iconSize || 16 })) }) }) }) }));
};
exports.CopyIcon = CopyIcon;
//# sourceMappingURL=CopyIcon.js.map
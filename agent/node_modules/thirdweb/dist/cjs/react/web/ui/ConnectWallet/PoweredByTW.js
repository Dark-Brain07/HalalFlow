"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoweredByThirdweb = PoweredByThirdweb;
const jsx_runtime_1 = require("react/jsx-runtime");
const basic_js_1 = require("../components/basic.js");
const text_js_1 = require("../components/text.js");
const ThirdwebTextIcon_js_1 = require("./icons/ThirdwebTextIcon.js");
/**
 * @internal
 */
function PoweredByThirdweb(props) {
    const link = props.link ||
        "https://playground.thirdweb.com/connect/sign-in/button?utm_source=cw_text";
    return ((0, jsx_runtime_1.jsx)(text_js_1.Link, { color: "secondaryText", hoverColor: "primaryText", href: link, target: "_blank", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", flex: "row", style: {
                color: "currentColor",
                gap: 4,
            }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", style: {
                        color: "currentColor",
                    }, weight: 600, children: "Powered by" }), (0, jsx_runtime_1.jsx)(ThirdwebTextIcon_js_1.ThirdwebTextIcon, { height: 11 })] }) }));
}
//# sourceMappingURL=PoweredByTW.js.map
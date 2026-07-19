"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOS = TOS;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const text_js_1 = require("../../components/text.js");
/**
 * @internal
 */
function TOS(props) {
    const { termsOfServiceUrl, privacyPolicyUrl, locale, requireApproval } = props;
    if (!termsOfServiceUrl && !privacyPolicyUrl && !requireApproval) {
        return null;
    }
    const bothGiven = termsOfServiceUrl && privacyPolicyUrl;
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", children: (0, jsx_runtime_1.jsxs)(text_js_1.Text, { balance: true, center: true, inline: true, multiline: true, size: "xs", style: {
                maxWidth: "250px",
            }, children: [requireApproval && ((0, jsx_runtime_1.jsx)("input", { checked: props.isApproved, disabled: !requireApproval, onChange: props.onApprove, style: {
                        marginRight: index_js_1.spacing["3xs"],
                        transform: "translateY(3px)",
                    }, type: "checkbox" })), locale.prefix, " ", termsOfServiceUrl && ((0, jsx_runtime_1.jsxs)(text_js_1.Link, { href: termsOfServiceUrl, inline: true, size: "xs", style: {
                        whiteSpace: "nowrap",
                    }, target: "_blank", children: [" ", locale.termsOfService, " "] })), bothGiven && `${locale.and} `, privacyPolicyUrl && ((0, jsx_runtime_1.jsx)(text_js_1.Link, { href: privacyPolicyUrl, inline: true, size: "xs", target: "_blank", children: locale.privacyPolicy })), !privacyPolicyUrl && !termsOfServiceUrl && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { inline: true, size: "xs", children: "Terms of Service and Privacy Policy" }))] }) }));
}
//# sourceMappingURL=TOS.js.map
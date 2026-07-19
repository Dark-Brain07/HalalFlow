"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { spacing } from "../../../../core/design-system/index.js";
import { Container } from "../../components/basic.js";
import { Link, Text } from "../../components/text.js";
/**
 * @internal
 */
export function TOS(props) {
    const { termsOfServiceUrl, privacyPolicyUrl, locale, requireApproval } = props;
    if (!termsOfServiceUrl && !privacyPolicyUrl && !requireApproval) {
        return null;
    }
    const bothGiven = termsOfServiceUrl && privacyPolicyUrl;
    return (_jsx(Container, { center: "x", flex: "row", children: _jsxs(Text, { balance: true, center: true, inline: true, multiline: true, size: "xs", style: {
                maxWidth: "250px",
            }, children: [requireApproval && (_jsx("input", { checked: props.isApproved, disabled: !requireApproval, onChange: props.onApprove, style: {
                        marginRight: spacing["3xs"],
                        transform: "translateY(3px)",
                    }, type: "checkbox" })), locale.prefix, " ", termsOfServiceUrl && (_jsxs(Link, { href: termsOfServiceUrl, inline: true, size: "xs", style: {
                        whiteSpace: "nowrap",
                    }, target: "_blank", children: [" ", locale.termsOfService, " "] })), bothGiven && `${locale.and} `, privacyPolicyUrl && (_jsx(Link, { href: privacyPolicyUrl, inline: true, size: "xs", target: "_blank", children: locale.privacyPolicy })), !privacyPolicyUrl && !termsOfServiceUrl && (_jsx(Text, { inline: true, size: "xs", children: "Terms of Service and Privacy Policy" }))] }) }));
}
//# sourceMappingURL=TOS.js.map
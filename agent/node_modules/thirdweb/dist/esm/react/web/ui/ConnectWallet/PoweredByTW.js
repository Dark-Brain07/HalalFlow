import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from "../components/basic.js";
import { Link, Text } from "../components/text.js";
import { ThirdwebTextIcon } from "./icons/ThirdwebTextIcon.js";
/**
 * @internal
 */
export function PoweredByThirdweb(props) {
    const link = props.link ||
        "https://playground.thirdweb.com/connect/sign-in/button?utm_source=cw_text";
    return (_jsx(Link, { color: "secondaryText", hoverColor: "primaryText", href: link, target: "_blank", children: _jsxs(Container, { center: "both", flex: "row", style: {
                color: "currentColor",
                gap: 4,
            }, children: [_jsx(Text, { size: "xs", style: {
                        color: "currentColor",
                    }, weight: 600, children: "Powered by" }), _jsx(ThirdwebTextIcon, { height: 11 })] }) }));
}
//# sourceMappingURL=PoweredByTW.js.map
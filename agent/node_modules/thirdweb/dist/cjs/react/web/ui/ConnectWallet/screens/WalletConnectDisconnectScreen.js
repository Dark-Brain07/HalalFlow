"use strict";
/** biome-ignore-all lint/nursery/useUniqueElementIds: "id" is not a html attribute here - TODO: stop using 'id' as a prop on JSX elements */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnectDisconnectScreen = WalletConnectDisconnectScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const WalletLogoSpinner_js_1 = require("./WalletLogoSpinner.js");
/**
 * @internal
 */
function WalletConnectDisconnectScreen(props) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Connect an App" }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "lg", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { py: "lg", style: { position: "relative" }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { py: "md", children: (0, jsx_runtime_1.jsx)(WalletLogoSpinner_js_1.WalletLogoSpinner, { client: props.client, error: !!props.error, hideSpinner: true, id: "walletConnect" }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", style: {
                                animationDuration: "200ms",
                            }, children: !props.error ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(text_js_1.Text, { balance: true, center: true, multiline: true, size: "md", children: ["Connected to ", props.session.origin ?? "another app."] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: () => {
                                            props.disconnect();
                                        }, variant: "accent", children: "Disconnect" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, size: "sm", children: props.error }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "x", flex: "row", children: (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { fullWidth: true, onClick: () => props.disconnect(), style: {
                                                alignItems: "center",
                                                gap: index_js_1.spacing.xs,
                                            }, variant: "accent", children: [(0, jsx_runtime_1.jsx)(react_icons_1.ReloadIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }), "Retry"] }) })] })) })] }) })] }));
}
//# sourceMappingURL=WalletConnectDisconnectScreen.js.map
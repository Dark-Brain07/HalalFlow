"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingState = LoadingState;
const jsx_runtime_1 = require("react/jsx-runtime");
const basic_js_1 = require("../../ui/components/basic.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const Spinner_js_1 = require("../../ui/components/Spinner.js");
const text_js_1 = require("../../ui/components/text.js");
function LoadingState(props) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "x", flex: "row", style: {
                    position: "relative",
                }, children: [(0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "4xl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { color: "accentText", style: {
                            left: "50%",
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }, children: props.icon })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", children: props.title }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, multiline: true, children: props.subtitle }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" })] }));
}
//# sourceMappingURL=LoadingState.js.map
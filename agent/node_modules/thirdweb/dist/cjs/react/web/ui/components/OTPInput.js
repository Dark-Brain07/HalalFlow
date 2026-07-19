"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPInput = OTPInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const input_otp_1 = require("input-otp");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
const basic_js_1 = require("./basic.js");
/**
 * @internal
 */
function OTPInput(props) {
    return ((0, jsx_runtime_1.jsx)(OTPInputContainer, { className: "tw-otp-input-container", children: (0, jsx_runtime_1.jsx)(input_otp_1.OTPInput, { maxLength: 6, onChange: (newValue) => {
                props.setValue(newValue);
            }, onComplete: () => {
                props.onEnter();
            }, render: ({ slots }) => ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", gap: "xs", children: slots.map((slot, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index is the only valid key here
                (0, jsx_runtime_1.jsx)(Slot, { ...slot, isInvalid: props.isInvalid }, idx))) })), value: props.value }) }));
}
const OTPInputContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)({
    "& input": {
        maxWidth: "100%",
    },
});
function Slot(props) {
    return ((0, jsx_runtime_1.jsxs)(OTPInputBox, { "data-active": props.isActive, "data-error": props.isInvalid, children: [props.char !== null && (0, jsx_runtime_1.jsx)("div", { children: props.char }), props.hasFakeCaret && (0, jsx_runtime_1.jsx)(FakeCaret, {})] }));
}
const caretBlink = (0, react_1.keyframes) `
  0%, 100% {
    opacity: 0;
  },
  50% {
    opacity: 1;
  }
  `;
const FakeCaret = (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&::before": {
            backgroundColor: theme.colors.primaryText,
            content: "''",
            display: "block",
            height: "1em",
            width: "1.5px",
        },
        alignItems: "center",
        animation: `${caretBlink} 1s infinite`,
        display: "flex",
        inset: 0,
        justifyContent: "center",
        pointerEvents: "none",
        position: "absolute",
    };
});
const OTPInputBox = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&[data-active='true']": {
            borderColor: theme.colors.accentText,
        },
        "&[data-error='true']": {
            borderColor: theme.colors.danger,
        },
        alignItems: "center",
        border: `2px solid ${theme.colors.borderColor}`,
        borderRadius: index_js_1.radius.lg,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        display: "flex",
        fontSize: index_js_1.fontSize.md,
        height: "40px",
        justifyContent: "center",
        padding: index_js_1.spacing.xs,
        position: "relative",
        textAlign: "center",
        transition: "color 200ms ease",
        width: "40px",
    };
});
//# sourceMappingURL=OTPInput.js.map
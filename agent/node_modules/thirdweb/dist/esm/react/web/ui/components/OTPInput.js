"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from "@emotion/react";
import { OTPInput as InputOTP } from "input-otp";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, radius, spacing, } from "../../../core/design-system/index.js";
import { StyledDiv } from "../design-system/elements.js";
import { Container } from "./basic.js";
/**
 * @internal
 */
export function OTPInput(props) {
    return (_jsx(OTPInputContainer, { className: "tw-otp-input-container", children: _jsx(InputOTP, { maxLength: 6, onChange: (newValue) => {
                props.setValue(newValue);
            }, onComplete: () => {
                props.onEnter();
            }, render: ({ slots }) => (_jsx(Container, { center: "both", flex: "row", gap: "xs", children: slots.map((slot, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index is the only valid key here
                _jsx(Slot, { ...slot, isInvalid: props.isInvalid }, idx))) })), value: props.value }) }));
}
const OTPInputContainer = /* @__PURE__ */ StyledDiv({
    "& input": {
        maxWidth: "100%",
    },
});
function Slot(props) {
    return (_jsxs(OTPInputBox, { "data-active": props.isActive, "data-error": props.isInvalid, children: [props.char !== null && _jsx("div", { children: props.char }), props.hasFakeCaret && _jsx(FakeCaret, {})] }));
}
const caretBlink = keyframes `
  0%, 100% {
    opacity: 0;
  },
  50% {
    opacity: 1;
  }
  `;
const FakeCaret = StyledDiv((_) => {
    const theme = useCustomTheme();
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
const OTPInputBox = /* @__PURE__ */ StyledDiv((_) => {
    const theme = useCustomTheme();
    return {
        "&[data-active='true']": {
            borderColor: theme.colors.accentText,
        },
        "&[data-error='true']": {
            borderColor: theme.colors.danger,
        },
        alignItems: "center",
        border: `2px solid ${theme.colors.borderColor}`,
        borderRadius: radius.lg,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        display: "flex",
        fontSize: fontSize.md,
        height: "40px",
        justifyContent: "center",
        padding: spacing.xs,
        position: "relative",
        textAlign: "center",
        transition: "color 200ms ease",
        width: "40px",
    };
});
//# sourceMappingURL=OTPInput.js.map
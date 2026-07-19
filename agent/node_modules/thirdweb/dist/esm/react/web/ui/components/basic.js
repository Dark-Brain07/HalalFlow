"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { spacing } from "../../../core/design-system/index.js";
import { cls } from "../../utils/cls.js";
import { fadeInAnimation, floatDownAnimation, floatUpAnimation, } from "../design-system/animations.js";
import { StyledDiv } from "../design-system/elements.js";
import { BackButton, ModalTitle } from "./modalElements.js";
export const ScreenBottomContainer = /* @__PURE__ */ StyledDiv((_) => {
    const theme = useCustomTheme();
    return {
        borderTop: `1px solid ${theme.colors.separatorLine}`,
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
        padding: spacing.lg,
    };
});
export const noScrollBar = /* @__PURE__ */ {
    "&::-webkit-scrollbar": {
        display: "none",
        width: 0,
    },
    scrollbarWidth: "none",
};
/**
 * @internal
 */
export function ModalHeader(props) {
    const { onBack, title } = props;
    return (_jsxs("div", { className: cls("tw-header", props.className), style: {
            alignItems: "center",
            display: "flex",
            justifyContent: props.leftAligned ? "flex-start" : "center",
            position: "relative",
        }, children: [onBack && (_jsx(BackButton, { onClick: onBack, style: {
                    left: 0,
                    position: "absolute",
                    top: 0,
                } })), _jsx(Container, { center: "both", flex: "row", gap: "xs", children: typeof title === "string" ? _jsx(ModalTitle, { children: title }) : title })] }));
}
export const Line = /* @__PURE__ */ StyledDiv((props) => {
    const theme = useCustomTheme();
    return {
        borderTop: `1px ${props.dashed ? "dashed" : "solid"} ${theme.colors.separatorLine}`,
    };
});
/**
 * @internal
 */
export function Container(props) {
    const styles = {};
    if (props.relative) {
        styles.position = "relative";
    }
    if (props.fullHeight) {
        styles.height = "100%";
    }
    if (props.expand) {
        styles.flex = "1 1 0%";
    }
    if (props.flex) {
        styles.display = "flex";
        styles.flexDirection = props.flex;
        if (props.flex === "row") {
            styles.flexWrap = "wrap";
        }
        if (props.gap) {
            styles.gap = spacing[props.gap];
        }
        if (props.center) {
            if (props.center === "both") {
                styles.justifyContent = "center";
                styles.alignItems = "center";
            }
            if ((props.center === "x" && props.flex === "row") ||
                (props.center === "y" && props.flex === "column")) {
                styles.justifyContent = "center";
            }
            if ((props.center === "x" && props.flex === "column") ||
                (props.center === "y" && props.flex === "row")) {
                styles.alignItems = "center";
            }
        }
    }
    if (props.p) {
        styles.padding = spacing[props.p];
    }
    if (props.px) {
        styles.paddingLeft = spacing[props.px];
        styles.paddingRight = spacing[props.px];
    }
    if (props.py) {
        styles.paddingTop = spacing[props.py];
        styles.paddingBottom = spacing[props.py];
    }
    if (props.pb) {
        styles.paddingBottom = spacing[props.pb];
    }
    if (props.pt) {
        styles.paddingTop = spacing[props.pt];
    }
    if (props.debug) {
        styles.outline = "1px solid red";
        styles.outlineOffset = "-1px";
    }
    return (_jsx(Box, { bg: props.bg, borderColor: props.borderColor, color: props.color, "data-animate": props.animate, "data-scrolly": props.scrollY, className: props.className, style: {
            ...styles,
            ...props.style,
        }, children: props.children }));
}
const Box = /* @__PURE__ */ StyledDiv((props) => {
    const theme = useCustomTheme();
    return {
        "&[data-animate='fadein']": {
            animation: `${fadeInAnimation} 350ms ease forwards`,
            opacity: 0,
        },
        "&[data-animate='floatdown']": {
            animation: `${floatDownAnimation} 350ms ease forwards`,
            opacity: 0,
        },
        "&[data-animate='floatup']": {
            animation: `${floatUpAnimation} 350ms ease forwards`,
            opacity: 0,
        },
        "&[data-scrolly='true']": {
            overflowY: "auto",
            ...noScrollBar,
        },
        background: props.bg ? theme.colors[props.bg] : undefined,
        borderColor: props.borderColor
            ? theme.colors[props.borderColor]
            : undefined,
        color: props.color ? theme.colors[props.color] : "inherit",
    };
});
//# sourceMappingURL=basic.js.map
"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.noScrollBar = exports.ScreenBottomContainer = void 0;
exports.ModalHeader = ModalHeader;
exports.Container = Container;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const cls_js_1 = require("../../utils/cls.js");
const animations_js_1 = require("../design-system/animations.js");
const elements_js_1 = require("../design-system/elements.js");
const modalElements_js_1 = require("./modalElements.js");
exports.ScreenBottomContainer = (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        borderTop: `1px solid ${theme.colors.separatorLine}`,
        display: "flex",
        flexDirection: "column",
        gap: index_js_1.spacing.md,
        padding: index_js_1.spacing.lg,
    };
});
exports.noScrollBar = {
    "&::-webkit-scrollbar": {
        display: "none",
        width: 0,
    },
    scrollbarWidth: "none",
};
/**
 * @internal
 */
function ModalHeader(props) {
    const { onBack, title } = props;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cls_js_1.cls)("tw-header", props.className), style: {
            alignItems: "center",
            display: "flex",
            justifyContent: props.leftAligned ? "flex-start" : "center",
            position: "relative",
        }, children: [onBack && ((0, jsx_runtime_1.jsx)(modalElements_js_1.BackButton, { onClick: onBack, style: {
                    left: 0,
                    position: "absolute",
                    top: 0,
                } })), (0, jsx_runtime_1.jsx)(Container, { center: "both", flex: "row", gap: "xs", children: typeof title === "string" ? (0, jsx_runtime_1.jsx)(modalElements_js_1.ModalTitle, { children: title }) : title })] }));
}
exports.Line = (0, elements_js_1.StyledDiv)((props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        borderTop: `1px ${props.dashed ? "dashed" : "solid"} ${theme.colors.separatorLine}`,
    };
});
/**
 * @internal
 */
function Container(props) {
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
            styles.gap = index_js_1.spacing[props.gap];
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
        styles.padding = index_js_1.spacing[props.p];
    }
    if (props.px) {
        styles.paddingLeft = index_js_1.spacing[props.px];
        styles.paddingRight = index_js_1.spacing[props.px];
    }
    if (props.py) {
        styles.paddingTop = index_js_1.spacing[props.py];
        styles.paddingBottom = index_js_1.spacing[props.py];
    }
    if (props.pb) {
        styles.paddingBottom = index_js_1.spacing[props.pb];
    }
    if (props.pt) {
        styles.paddingTop = index_js_1.spacing[props.pt];
    }
    if (props.debug) {
        styles.outline = "1px solid red";
        styles.outlineOffset = "-1px";
    }
    return ((0, jsx_runtime_1.jsx)(Box, { bg: props.bg, borderColor: props.borderColor, color: props.color, "data-animate": props.animate, "data-scrolly": props.scrollY, className: props.className, style: {
            ...styles,
            ...props.style,
        }, children: props.children }));
}
const Box = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&[data-animate='fadein']": {
            animation: `${animations_js_1.fadeInAnimation} 350ms ease forwards`,
            opacity: 0,
        },
        "&[data-animate='floatdown']": {
            animation: `${animations_js_1.floatDownAnimation} 350ms ease forwards`,
            opacity: 0,
        },
        "&[data-animate='floatup']": {
            animation: `${animations_js_1.floatUpAnimation} 350ms ease forwards`,
            opacity: 0,
        },
        "&[data-scrolly='true']": {
            overflowY: "auto",
            ...exports.noScrollBar,
        },
        background: props.bg ? theme.colors[props.bg] : undefined,
        borderColor: props.borderColor
            ? theme.colors[props.borderColor]
            : undefined,
        color: props.color ? theme.colors[props.color] : "inherit",
    };
});
//# sourceMappingURL=basic.js.map
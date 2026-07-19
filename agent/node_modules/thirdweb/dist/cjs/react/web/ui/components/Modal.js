"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const Dialog = require("@radix-ui/react-dialog");
const react_focus_scope_1 = require("@radix-ui/react-focus-scope");
const react_icons_1 = require("@radix-ui/react-icons");
const react_2 = require("react");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const cls_js_1 = require("../../utils/cls.js");
const constants_js_1 = require("../ConnectWallet/constants.js");
const elements_js_1 = require("../design-system/elements.js");
const basic_js_1 = require("./basic.js");
const buttons_js_1 = require("./buttons.js");
const DynamicHeight_js_1 = require("./DynamicHeight.js");
const Overlay_js_1 = require("./Overlay.js");
/**
 * @internal
 */
const Modal = (props) => {
    const [open, setOpen] = (0, react_2.useState)(props.open);
    const contentRef = (0, react_2.useRef)(null);
    const overlayRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        if (!props.open) {
            if (contentRef.current) {
                const animationConfig = {
                    duration: constants_js_1.modalCloseFadeOutDuration,
                    easing: "ease",
                    fill: "forwards",
                };
                contentRef.current.animate([{ opacity: 0 }], {
                    ...animationConfig,
                }).onfinish = () => {
                    setOpen(false);
                };
                overlayRef.current?.animate([{ opacity: 0 }], {
                    ...animationConfig,
                    duration: constants_js_1.modalCloseFadeOutDuration + 100,
                });
            }
            else {
                setOpen(props.open);
            }
        }
        else {
            setOpen(props.open);
        }
    }, [props.open]);
    return ((0, jsx_runtime_1.jsxs)(Dialog.Root, { onOpenChange: props.setOpen, open: open, children: [props.trigger && ((0, jsx_runtime_1.jsx)(Dialog.Trigger, { asChild: true, children: props.trigger })), (0, jsx_runtime_1.jsxs)(Dialog.Portal, { children: [!props.hide && ((0, jsx_runtime_1.jsx)(Dialog.Overlay, { asChild: true, children: (0, jsx_runtime_1.jsx)(Overlay_js_1.Overlay, { ref: overlayRef }) })), (0, jsx_runtime_1.jsx)(react_focus_scope_1.FocusScope, { trapped: !props.hide, children: (0, jsx_runtime_1.jsx)(Dialog.Content, { "aria-describedby": undefined, asChild: true, children: (0, jsx_runtime_1.jsxs)(DialogContent, { className: (0, cls_js_1.cls)("tw-modal", props.className), ref: contentRef, style: props.hide
                                    ? { height: 0, opacity: 0, overflow: "hidden", width: 0 }
                                    : {
                                        height: props.size === "compact" ? "auto" : constants_js_1.wideModalMaxHeight,
                                        maxWidth: props.size === "compact"
                                            ? constants_js_1.modalMaxWidthCompact
                                            : constants_js_1.modalMaxWidthWide,
                                    }, children: [(0, jsx_runtime_1.jsx)(Dialog.Title, { style: {
                                            borderWidth: 0,
                                            clip: "rect(0, 0, 0, 0)",
                                            height: "1px",
                                            margin: "-1px",
                                            overflow: "hidden",
                                            padding: 0,
                                            position: "absolute",
                                            whiteSpace: "nowrap",
                                            width: "1px",
                                        }, children: props.title }), props.size === "compact" ? ((0, jsx_runtime_1.jsx)(DynamicHeight_js_1.DynamicHeight, { maxHeight: constants_js_1.compactModalMaxHeight, children: props.children })) : (props.children), !props.hideCloseIcon && ((0, jsx_runtime_1.jsx)("div", { style: {
                                            position: "absolute",
                                            right: index_js_1.spacing.lg,
                                            top: index_js_1.spacing.lg,
                                            transform: "translateX(6px)",
                                            ...props.crossContainerStyles,
                                        }, children: (0, jsx_runtime_1.jsx)(Dialog.Close, { asChild: true, children: (0, jsx_runtime_1.jsx)(buttons_js_1.IconButton, { "aria-label": "Close", autoFocus: props.autoFocusCrossIcon === undefined
                                                    ? true
                                                    : props.autoFocusCrossIcon, type: "button", children: (0, jsx_runtime_1.jsx)(react_icons_1.Cross2Icon, { height: index_js_1.iconSize.md, style: {
                                                        color: "inherit",
                                                    }, width: index_js_1.iconSize.md }) }) }) }))] }) }) })] })] }));
};
exports.Modal = Modal;
const modalAnimationDesktop = (0, react_1.keyframes) `
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;
const modalAnimationMobile = (0, react_1.keyframes) `
  from {
    opacity: 0;
    transform: translate(0, 50%);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
`;
const DialogContent = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "--bg": theme.colors.modalBg,
        "& *": {
            boxSizing: "border-box",
        },
        animation: `${modalAnimationDesktop} 300ms ease`,
        background: theme.colors.modalBg,
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: index_js_1.radius.xl,
        boxShadow: index_js_1.shadow.lg,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        fontFamily: theme.fontFamily,
        left: "50%",
        lineHeight: "normal",
        outline: "none",
        overflow: "hidden",
        position: "fixed",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100vw - 40px)",
        zIndex: 10000,
        [index_js_1.media.mobile]: {
            animation: `${modalAnimationMobile} 0.35s cubic-bezier(0.15, 1.15, 0.6, 1)`,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            bottom: 0,
            left: 0,
            maxWidth: "none !important",
            right: 0,
            top: "auto",
            transform: "none",
            width: "100vw",
        },
        "& *::selection": {
            backgroundColor: theme.colors.selectedTextBg,
            color: theme.colors.selectedTextColor,
        },
        ...basic_js_1.noScrollBar,
    };
});
//# sourceMappingURL=Modal.js.map
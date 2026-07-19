"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ipfs_js_1 = require("../../../../utils/ipfs.js");
const index_js_1 = require("../../../core/design-system/index.js");
const basic_js_1 = require("./basic.js");
const Skeleton_js_1 = require("./Skeleton.js");
/**
 * @internal
 */
const Img = (props) => {
    const [_status, setStatus] = (0, react_1.useState)("pending");
    const imgRef = (0, react_1.useRef)(null);
    const propSrc = props.src;
    const widthPx = `${props.width}px`;
    const heightPx = `${props.height || props.width}px`;
    const getSrc = () => {
        if (propSrc === undefined) {
            return undefined;
        }
        try {
            return (0, ipfs_js_1.resolveScheme)({
                client: props.client,
                uri: propSrc,
            });
        }
        catch {
            return props.src;
        }
    };
    const src = getSrc();
    const status = src === undefined ? "pending" : src === "" ? "fallback" : _status;
    const isLoaded = status === "loaded";
    (0, react_1.useEffect)(() => {
        const imgEl = imgRef.current;
        if (!imgEl) {
            return;
        }
        if (imgEl.complete) {
            setStatus("loaded");
        }
        else {
            function handleLoad() {
                setStatus("loaded");
            }
            imgEl.addEventListener("load", handleLoad);
            return () => {
                imgEl.removeEventListener("load", handleLoad);
            };
        }
        return;
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            alignItems: "center",
            display: "inline-flex",
            flexShrink: 0,
            justifyItems: "center",
            position: "relative",
        }, children: [status === "pending" && ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: heightPx, width: widthPx, color: props.skeletonColor, style: props.style })), status === "fallback" &&
                (props.fallback || ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "tertiaryBg", borderColor: "borderColor", style: {
                        height: heightPx,
                        width: widthPx,
                        borderRadius: index_js_1.radius.md,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        ...props.style,
                    }, children: (0, jsx_runtime_1.jsx)("div", {}) }))), (0, jsx_runtime_1.jsx)("img", { alt: props.alt || "", className: props.className, decoding: "async", draggable: false, height: props.height, loading: props.loading, onError: (e) => {
                    if (props.fallbackImage &&
                        e.currentTarget.src !== props.fallbackImage) {
                        e.currentTarget.src = props.fallbackImage;
                    }
                    else {
                        setStatus("fallback");
                    }
                }, onLoad: () => {
                    setStatus("loaded");
                }, src: src || undefined, style: {
                    height: !isLoaded
                        ? 0
                        : props.height
                            ? `${props.height}px`
                            : undefined,
                    objectFit: "contain",
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    userSelect: "none",
                    visibility: isLoaded ? "visible" : "hidden",
                    width: !isLoaded ? 0 : props.width ? `${props.width}px` : undefined,
                    ...props.style,
                }, width: props.width }, src)] }));
};
exports.Img = Img;
//# sourceMappingURL=Img.js.map
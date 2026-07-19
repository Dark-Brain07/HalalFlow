"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicHeight = DynamicHeight;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * @internal
 */
function DynamicHeight(props) {
    const { height, elementRef } = useHeightObserver();
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            boxSizing: "border-box",
            height: height ? `${height}px` : "auto",
            overflow: "hidden",
            transition: "height 210ms ease",
        }, children: (0, jsx_runtime_1.jsx)("div", { ref: elementRef, style: {
                maxHeight: props.maxHeight,
            }, children: props.children }) }));
}
/**
 * @internal
 */
function useHeightObserver() {
    const elementRef = (0, react_1.useRef)(null);
    const [height, setHeight] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const element = elementRef.current;
        if (!element) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            setHeight(element.scrollHeight);
        });
        resizeObserver.observe(element);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    return { elementRef: elementRef, height };
}
//# sourceMappingURL=DynamicHeight.js.map
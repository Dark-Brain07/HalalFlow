"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
/**
 * @internal
 */
export function DynamicHeight(props) {
    const { height, elementRef } = useHeightObserver();
    return (_jsx("div", { style: {
            boxSizing: "border-box",
            height: height ? `${height}px` : "auto",
            overflow: "hidden",
            transition: "height 210ms ease",
        }, children: _jsx("div", { ref: elementRef, style: {
                maxHeight: props.maxHeight,
            }, children: props.children }) }));
}
/**
 * @internal
 */
function useHeightObserver() {
    const elementRef = useRef(null);
    const [height, setHeight] = useState();
    useEffect(() => {
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
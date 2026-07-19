import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
export const CADIcon = (props) => {
    const id = useId();
    return (_jsxs("svg", { "aria-hidden": "true", height: props.size, viewBox: "0 0 512 512", width: props.size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("mask", { id: id, children: _jsx("circle", { cx: "256", cy: "256", fill: "#fff", r: "256" }) }), _jsxs("g", { mask: `url(#${id})`, children: [_jsx("path", { d: "M0 0v512h144l112-64 112 64h144V0H368L256 64 144 0Z", fill: "#d80027" }), _jsx("path", { d: "M144 0h224v512H144Z", fill: "#eee" }), _jsx("path", { d: "m301 289 44-22-22-11v-22l-45 22 23-44h-23l-22-34-22 33h-23l23 45-45-22v22l-22 11 45 22-12 23h45v33h22v-33h45z", fill: "#d80027" })] })] }));
};
//# sourceMappingURL=CADIcon.js.map
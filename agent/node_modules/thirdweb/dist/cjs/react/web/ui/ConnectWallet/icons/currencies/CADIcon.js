"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CADIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CADIcon = (props) => {
    const id = (0, react_1.useId)();
    return ((0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", height: props.size, viewBox: "0 0 512 512", width: props.size, xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("mask", { id: id, children: (0, jsx_runtime_1.jsx)("circle", { cx: "256", cy: "256", fill: "#fff", r: "256" }) }), (0, jsx_runtime_1.jsxs)("g", { mask: `url(#${id})`, children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0v512h144l112-64 112 64h144V0H368L256 64 144 0Z", fill: "#d80027" }), (0, jsx_runtime_1.jsx)("path", { d: "M144 0h224v512H144Z", fill: "#eee" }), (0, jsx_runtime_1.jsx)("path", { d: "m301 289 44-22-22-11v-22l-45 22 23-44h-23l-22-34-22 33h-23l23 45-45-22v22l-22 11 45 22-12 23h45v33h22v-33h45z", fill: "#d80027" })] })] }));
};
exports.CADIcon = CADIcon;
//# sourceMappingURL=CADIcon.js.map
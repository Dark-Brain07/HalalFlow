"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = SearchInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const formElements_js_1 = require("../../components/formElements.js");
function SearchInput(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            position: "relative",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { color: "secondaryText", children: (0, jsx_runtime_1.jsx)(react_icons_1.MagnifyingGlassIcon, { width: index_js_1.iconSize.md, height: index_js_1.iconSize.md, style: {
                        position: "absolute",
                        left: index_js_1.spacing.sm,
                        top: "50%",
                        borderRadius: index_js_1.radius.lg,
                        transform: "translateY(-50%)",
                    } }) }), (0, jsx_runtime_1.jsx)(formElements_js_1.Input, { variant: "outline", placeholder: props.placeholder, value: props.value, sm: true, style: {
                    paddingLeft: "44px",
                }, onChange: (e) => props.onChange(e.target.value), autoFocus: props.autoFocus })] }));
}
//# sourceMappingURL=SearchInput.js.map
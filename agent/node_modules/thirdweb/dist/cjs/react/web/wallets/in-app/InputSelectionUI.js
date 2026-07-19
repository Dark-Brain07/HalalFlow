"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSelectionUI = InputSelectionUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const index_js_1 = require("../../../core/design-system/index.js");
const badge_js_1 = require("../../ui/components/badge.js");
const buttons_js_1 = require("../../ui/components/buttons.js");
const formElements_js_1 = require("../../ui/components/formElements.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const text_js_1 = require("../../ui/components/text.js");
const CountrySelector_js_1 = require("./CountrySelector.js");
function InputSelectionUI(props) {
    const [countryCodeInfo, setCountryCodeInfo] = (0, react_1.useState)(props.defaultSmsCountryCode
        ? (0, CountrySelector_js_1.getCountrySelector)(props.defaultSmsCountryCode)
        : props.allowedSmsCountryCodes &&
            props.allowedSmsCountryCodes.length > 0 &&
            props.allowedSmsCountryCodes[0]
            ? (0, CountrySelector_js_1.getCountrySelector)(props.allowedSmsCountryCodes[0])
            : "US +1");
    const [input, setInput] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)();
    const [showError, setShowError] = (0, react_1.useState)(false);
    const handleSelect = () => {
        setShowError(true);
        if (!input || !!error) {
            return;
        }
        props.onSelect(props.format === "phone"
            ? `+${countryCodeInfo.split("+")[1]}${input}`
            : input);
    };
    const renderingError = (showError && !!error) ||
        (!input && !!props.emptyErrorMessage && showError);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: "100%",
        }, children: [(0, jsx_runtime_1.jsxs)(formElements_js_1.InputContainer, { className: props.className, "data-error": renderingError, style: {
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                }, children: [props.lastUsedBadge && (0, jsx_runtime_1.jsx)(badge_js_1.LastUsedBadge, {}), props.format === "phone" && ((0, jsx_runtime_1.jsx)(CountrySelector_js_1.CountrySelector, { allowedCountryCodes: props.allowedSmsCountryCodes, countryCode: countryCodeInfo, setCountryCode: setCountryCodeInfo })), (0, jsx_runtime_1.jsx)(formElements_js_1.Input, { disabled: props.disabled, name: props.name, onChange: (e) => {
                            setInput(e.target.value);
                            if (props.errorMessage) {
                                setError(props.errorMessage(e.target.value));
                            }
                            else {
                                setError(undefined);
                            }
                        }, onKeyDown: (e) => {
                            if (e.key === "Enter") {
                                handleSelect();
                            }
                        }, placeholder: props.placeholder, style: {
                            flexGrow: 1,
                            padding: `${index_js_1.spacing.sm} ${props.format === "phone" ? 0 : index_js_1.spacing.sm}`,
                        }, tabIndex: -1, type: props.type, value: input, variant: "transparent" }), (0, jsx_runtime_1.jsx)(buttons_js_1.IconButton, { disabled: props.disabled, onClick: handleSelect, style: {
                            borderRadius: `0 ${index_js_1.radius.md} ${index_js_1.radius.md} 0`,
                            padding: index_js_1.spacing.sm,
                        }, children: (0, jsx_runtime_1.jsx)(react_icons_1.ArrowRightIcon, { height: index_js_1.iconSize.md, width: index_js_1.iconSize.md }) })] }), showError && error && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "danger", size: "sm", children: error })] })), !(showError && error) &&
                !input &&
                props.emptyErrorMessage &&
                showError && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "danger", size: "sm", children: props.emptyErrorMessage })] }))] }));
}
//# sourceMappingURL=InputSelectionUI.js.map
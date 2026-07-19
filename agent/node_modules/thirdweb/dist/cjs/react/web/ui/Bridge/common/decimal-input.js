"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalInput = DecimalInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const formElements_js_1 = require("../../components/formElements.js");
function DecimalInput(props) {
    const handleAmountChange = (inputValue) => {
        let processedValue = inputValue;
        // Replace comma with period if it exists
        processedValue = processedValue.replace(",", ".");
        if (processedValue.startsWith(".")) {
            processedValue = `0${processedValue}`;
        }
        const numValue = Number(processedValue);
        if (Number.isNaN(numValue)) {
            return;
        }
        if (processedValue.length > 1 &&
            processedValue.startsWith("0") &&
            !processedValue.startsWith("0.")) {
            props.setValue(processedValue.slice(1));
        }
        else {
            props.setValue(processedValue);
        }
    };
    return ((0, jsx_runtime_1.jsx)(formElements_js_1.Input, { ...props, inputMode: "decimal", onChange: (e) => {
            handleAmountChange(e.target.value);
        }, onClick: (e) => {
            // put cursor at the end of the input
            if (props.value === "") {
                e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
            }
        }, pattern: "^[0-9]*[.,]?[0-9]*$", placeholder: "0.0", type: "text", variant: "transparent" }));
}
//# sourceMappingURL=decimal-input.js.map
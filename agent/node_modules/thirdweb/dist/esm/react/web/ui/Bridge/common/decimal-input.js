import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from "../../components/formElements.js";
export function DecimalInput(props) {
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
    return (_jsx(Input, { ...props, inputMode: "decimal", onChange: (e) => {
            handleAmountChange(e.target.value);
        }, onClick: (e) => {
            // put cursor at the end of the input
            if (props.value === "") {
                e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
            }
        }, pattern: "^[0-9]*[.,]?[0-9]*$", placeholder: "0.0", type: "text", variant: "transparent" }));
}
//# sourceMappingURL=decimal-input.js.map
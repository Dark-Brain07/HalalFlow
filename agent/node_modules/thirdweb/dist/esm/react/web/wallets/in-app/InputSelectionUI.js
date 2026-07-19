"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { LastUsedBadge } from "../../ui/components/badge.js";
import { IconButton } from "../../ui/components/buttons.js";
import { Input, InputContainer } from "../../ui/components/formElements.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Text } from "../../ui/components/text.js";
import { CountrySelector, getCountrySelector } from "./CountrySelector.js";
export function InputSelectionUI(props) {
    const [countryCodeInfo, setCountryCodeInfo] = useState(props.defaultSmsCountryCode
        ? getCountrySelector(props.defaultSmsCountryCode)
        : props.allowedSmsCountryCodes &&
            props.allowedSmsCountryCodes.length > 0 &&
            props.allowedSmsCountryCodes[0]
            ? getCountrySelector(props.allowedSmsCountryCodes[0])
            : "US +1");
    const [input, setInput] = useState("");
    const [error, setError] = useState();
    const [showError, setShowError] = useState(false);
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
    return (_jsxs("div", { style: {
            width: "100%",
        }, children: [_jsxs(InputContainer, { className: props.className, "data-error": renderingError, style: {
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                }, children: [props.lastUsedBadge && _jsx(LastUsedBadge, {}), props.format === "phone" && (_jsx(CountrySelector, { allowedCountryCodes: props.allowedSmsCountryCodes, countryCode: countryCodeInfo, setCountryCode: setCountryCodeInfo })), _jsx(Input, { disabled: props.disabled, name: props.name, onChange: (e) => {
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
                            padding: `${spacing.sm} ${props.format === "phone" ? 0 : spacing.sm}`,
                        }, tabIndex: -1, type: props.type, value: input, variant: "transparent" }), _jsx(IconButton, { disabled: props.disabled, onClick: handleSelect, style: {
                            borderRadius: `0 ${radius.md} ${radius.md} 0`,
                            padding: spacing.sm,
                        }, children: _jsx(ArrowRightIcon, { height: iconSize.md, width: iconSize.md }) })] }), showError && error && (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "xs" }), _jsx(Text, { color: "danger", size: "sm", children: error })] })), !(showError && error) &&
                !input &&
                props.emptyErrorMessage &&
                showError && (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "xs" }), _jsx(Text, { color: "danger", size: "sm", children: props.emptyErrorMessage })] }))] }));
}
//# sourceMappingURL=InputSelectionUI.js.map
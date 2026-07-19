"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { radius, spacing } from "../../../core/design-system/index.js";
import { StyledOption, StyledSelect } from "../../ui/design-system/elements.js";
import { supportedSmsCountries, } from "./supported-sms-countries.js";
export function getCountrySelector(countryIsoCode) {
    const country = supportedSmsCountries.find((country) => country.countryIsoCode === countryIsoCode);
    if (!country) {
        return "US +1";
    }
    return `${country.countryIsoCode} +${country.phoneNumberCode}`;
}
export function CountrySelector({ countryCode, setCountryCode, allowedCountryCodes, }) {
    const selectRef = useRef(null);
    const supportedCountriesForSms = allowedCountryCodes && allowedCountryCodes.length > 0
        ? supportedSmsCountries.filter((c) => allowedCountryCodes.includes(c.countryIsoCode))
        : (supportedSmsCountries ?? [
            {
                countryIsoCode: "US",
                countryName: "United States",
                phoneNumberCode: 1,
            },
        ]);
    return (_jsxs(Select, { name: "countries", onChange: (e) => {
            setCountryCode(e.target.value);
        }, ref: selectRef, style: {
            padding: `${spacing.sm} ${spacing.md}`,
        }, value: countryCode, children: [_jsx(Option, { style: {
                    display: "none",
                }, value: countryCode, children: countryCode }), supportedCountriesForSms.map((country) => {
                return (_jsxs(Option, { value: getCountrySelector(country.countryIsoCode), children: [country.countryName, " +", country.phoneNumberCode] }, country.countryIsoCode));
            })] }));
}
const Option = /* @__PURE__ */ StyledOption(() => {
    const theme = useCustomTheme();
    return {
        "&:hover": {
            background: theme.colors.tertiaryBg,
        },
        background: theme.colors.modalBg,
        color: theme.colors.primaryText,
        transition: "background 0.3s ease",
    };
});
const Select = /* @__PURE__ */ StyledSelect((_) => {
    const theme = useCustomTheme();
    return {
        "&::placeholder": {
            color: theme.colors.secondaryText,
        },
        "&[disabled]": {
            cursor: "not-allowed",
        },
        appearance: "none",
        background: "transparent",
        border: "none",
        borderRadius: radius.lg,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        cursor: "pointer",
        display: "block",
        maxWidth: "90px",
        minWidth: "0px",
        outline: "none",
        overflow: "hidden",
        padding: spacing.sm,
        textOverflow: "ellipsis",
        WebkitAppearance: "none",
        whiteSpace: "nowrap",
    };
});
//# sourceMappingURL=CountrySelector.js.map
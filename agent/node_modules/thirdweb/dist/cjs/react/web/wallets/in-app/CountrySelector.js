"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountrySelector = getCountrySelector;
exports.CountrySelector = CountrySelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../../ui/design-system/elements.js");
const supported_sms_countries_js_1 = require("./supported-sms-countries.js");
function getCountrySelector(countryIsoCode) {
    const country = supported_sms_countries_js_1.supportedSmsCountries.find((country) => country.countryIsoCode === countryIsoCode);
    if (!country) {
        return "US +1";
    }
    return `${country.countryIsoCode} +${country.phoneNumberCode}`;
}
function CountrySelector({ countryCode, setCountryCode, allowedCountryCodes, }) {
    const selectRef = (0, react_1.useRef)(null);
    const supportedCountriesForSms = allowedCountryCodes && allowedCountryCodes.length > 0
        ? supported_sms_countries_js_1.supportedSmsCountries.filter((c) => allowedCountryCodes.includes(c.countryIsoCode))
        : (supported_sms_countries_js_1.supportedSmsCountries ?? [
            {
                countryIsoCode: "US",
                countryName: "United States",
                phoneNumberCode: 1,
            },
        ]);
    return ((0, jsx_runtime_1.jsxs)(Select, { name: "countries", onChange: (e) => {
            setCountryCode(e.target.value);
        }, ref: selectRef, style: {
            padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.md}`,
        }, value: countryCode, children: [(0, jsx_runtime_1.jsx)(Option, { style: {
                    display: "none",
                }, value: countryCode, children: countryCode }), supportedCountriesForSms.map((country) => {
                return ((0, jsx_runtime_1.jsxs)(Option, { value: getCountrySelector(country.countryIsoCode), children: [country.countryName, " +", country.phoneNumberCode] }, country.countryIsoCode));
            })] }));
}
const Option = /* @__PURE__ */ (0, elements_js_1.StyledOption)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:hover": {
            background: theme.colors.tertiaryBg,
        },
        background: theme.colors.modalBg,
        color: theme.colors.primaryText,
        transition: "background 0.3s ease",
    };
});
const Select = /* @__PURE__ */ (0, elements_js_1.StyledSelect)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
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
        borderRadius: index_js_1.radius.lg,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        cursor: "pointer",
        display: "block",
        maxWidth: "90px",
        minWidth: "0px",
        outline: "none",
        overflow: "hidden",
        padding: index_js_1.spacing.sm,
        textOverflow: "ellipsis",
        WebkitAppearance: "none",
        whiteSpace: "nowrap",
    };
});
//# sourceMappingURL=CountrySelector.js.map
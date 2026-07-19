"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencies = exports.usdCurrency = void 0;
exports.getCurrencyMeta = getCurrencyMeta;
exports.getFiatCurrencyIcon = getFiatCurrencyIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const index_js_1 = require("../../../../../../core/design-system/index.js");
const CADIcon_js_1 = require("../../../icons/currencies/CADIcon.js");
const EURIcon_js_1 = require("../../../icons/currencies/EURIcon.js");
const GBPIcon_js_1 = require("../../../icons/currencies/GBPIcon.js");
const JPYIcon_js_1 = require("../../../icons/currencies/JPYIcon.js");
const USDIcon_js_1 = require("../../../icons/currencies/USDIcon.js");
exports.usdCurrency = {
    countryCode: "US",
    icon: USDIcon_js_1.USDIcon,
    name: "US Dollar",
    shorthand: "USD",
    symbol: "$",
};
exports.currencies = [
    exports.usdCurrency,
    {
        countryCode: "CA",
        icon: CADIcon_js_1.CADIcon,
        name: "Canadian Dollar",
        shorthand: "CAD",
        symbol: "$",
    },
    {
        countryCode: "GB",
        icon: GBPIcon_js_1.GBPIcon,
        name: "British Pound",
        shorthand: "GBP",
        symbol: "£",
    },
    {
        countryCode: "EU",
        icon: EURIcon_js_1.EURIcon,
        name: "Euro",
        shorthand: "EUR",
        symbol: "€",
    },
    {
        countryCode: "JP",
        icon: JPYIcon_js_1.JPYIcon,
        name: "Japanese Yen",
        shorthand: "JPY",
        symbol: "¥",
    },
    {
        countryCode: "AU",
        name: "Australian Dollar",
        shorthand: "AUD",
        symbol: "$",
    },
    {
        countryCode: "NZ",
        name: "New Zealand Dollar",
        shorthand: "NZD",
        symbol: "$",
    },
];
function getCurrencyMeta(shorthand) {
    return (exports.currencies.find((currency) => currency.shorthand.toLowerCase() === shorthand.toLowerCase()) ?? {
        countryCode: "US",
        // This should never happen
        icon: UnknownCurrencyIcon,
        name: shorthand,
        shorthand: shorthand,
        symbol: "$",
    });
}
function getFiatIcon(currency, size) {
    return currency.icon ? ((0, jsx_runtime_1.jsx)(currency.icon, { size: index_js_1.iconSize[size] })) : ((0, jsx_runtime_1.jsx)("img", { alt: currency.shorthand, height: index_js_1.iconSize[size], src: `https://flagsapi.com/${currency.countryCode.toUpperCase()}/flat/64.png`, width: index_js_1.iconSize[size] }));
}
function getFiatCurrencyIcon(props) {
    return getFiatIcon(getCurrencyMeta(props.currency), props.size);
}
const UnknownCurrencyIcon = (props) => {
    return (0, jsx_runtime_1.jsx)(react_icons_1.RadiobuttonIcon, { height: props.size, width: props.size });
};
//# sourceMappingURL=currencies.js.map
import { jsx as _jsx } from "react/jsx-runtime";
import { RadiobuttonIcon } from "@radix-ui/react-icons";
import { iconSize } from "../../../../../../core/design-system/index.js";
import { CADIcon } from "../../../icons/currencies/CADIcon.js";
import { EURIcon } from "../../../icons/currencies/EURIcon.js";
import { GBPIcon } from "../../../icons/currencies/GBPIcon.js";
import { JPYIcon } from "../../../icons/currencies/JPYIcon.js";
import { USDIcon } from "../../../icons/currencies/USDIcon.js";
export const usdCurrency = {
    countryCode: "US",
    icon: USDIcon,
    name: "US Dollar",
    shorthand: "USD",
    symbol: "$",
};
export const currencies = [
    usdCurrency,
    {
        countryCode: "CA",
        icon: CADIcon,
        name: "Canadian Dollar",
        shorthand: "CAD",
        symbol: "$",
    },
    {
        countryCode: "GB",
        icon: GBPIcon,
        name: "British Pound",
        shorthand: "GBP",
        symbol: "£",
    },
    {
        countryCode: "EU",
        icon: EURIcon,
        name: "Euro",
        shorthand: "EUR",
        symbol: "€",
    },
    {
        countryCode: "JP",
        icon: JPYIcon,
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
export function getCurrencyMeta(shorthand) {
    return (currencies.find((currency) => currency.shorthand.toLowerCase() === shorthand.toLowerCase()) ?? {
        countryCode: "US",
        // This should never happen
        icon: UnknownCurrencyIcon,
        name: shorthand,
        shorthand: shorthand,
        symbol: "$",
    });
}
function getFiatIcon(currency, size) {
    return currency.icon ? (_jsx(currency.icon, { size: iconSize[size] })) : (_jsx("img", { alt: currency.shorthand, height: iconSize[size], src: `https://flagsapi.com/${currency.countryCode.toUpperCase()}/flat/64.png`, width: iconSize[size] }));
}
export function getFiatCurrencyIcon(props) {
    return getFiatIcon(getCurrencyMeta(props.currency), props.size);
}
const UnknownCurrencyIcon = (props) => {
    return _jsx(RadiobuttonIcon, { height: props.size, width: props.size });
};
//# sourceMappingURL=currencies.js.map
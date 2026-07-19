import { type SupportedSmsCountry } from "./supported-sms-countries.js";
export declare function getCountrySelector(countryIsoCode: SupportedSmsCountry): string;
export declare function CountrySelector({ countryCode, setCountryCode, allowedCountryCodes, }: {
    countryCode: string;
    setCountryCode: React.Dispatch<React.SetStateAction<string>>;
    allowedCountryCodes?: SupportedSmsCountry[];
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CountrySelector.d.ts.map
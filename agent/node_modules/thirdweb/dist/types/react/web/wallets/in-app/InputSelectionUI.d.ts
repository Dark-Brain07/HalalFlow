import type { SupportedSmsCountry } from "./supported-sms-countries.js";
export declare function InputSelectionUI(props: {
    className?: string;
    onSelect: (data: string) => void;
    placeholder: string;
    name: string;
    type: string;
    errorMessage?: (input: string) => string | undefined;
    emptyErrorMessage?: string;
    submitButtonText: string;
    format?: "phone";
    disabled?: boolean;
    defaultSmsCountryCode?: SupportedSmsCountry;
    allowedSmsCountryCodes?: SupportedSmsCountry[];
    lastUsedBadge: boolean;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InputSelectionUI.d.ts.map
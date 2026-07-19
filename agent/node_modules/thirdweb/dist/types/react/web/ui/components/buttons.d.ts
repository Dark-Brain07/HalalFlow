import { spacing, type Theme } from "../../../core/design-system/index.js";
type ButtonProps = {
    variant: "primary" | "secondary" | "link" | "accent" | "outline" | "ghost" | "ghost-solid";
    unstyled?: boolean;
    fullWidth?: boolean;
    gap?: keyof typeof spacing;
    bg?: keyof Theme["colors"];
    hoverBg?: keyof Theme["colors"];
};
export declare const Button: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & ButtonProps, import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {}>;
export declare const ButtonLink: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & ButtonProps, import("react").DetailedHTMLProps<import("react").AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, {}>;
export declare const IconButton: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {}>;
export {};
//# sourceMappingURL=buttons.d.ts.map
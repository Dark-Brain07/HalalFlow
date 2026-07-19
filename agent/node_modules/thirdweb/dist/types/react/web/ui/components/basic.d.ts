import { spacing, type Theme } from "../../../core/design-system/index.js";
export declare const ScreenBottomContainer: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const noScrollBar: {
    "&::-webkit-scrollbar": {
        display: "none";
        width: number;
    };
    scrollbarWidth: "none";
};
/**
 * @internal
 */
export declare function ModalHeader(props: {
    onBack?: () => void;
    title: React.ReactNode;
    leftAligned?: boolean;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare const Line: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & {
    dashed?: boolean;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
/**
 * @internal
 */
export declare function Container(props: {
    animate?: "fadein" | "floatup" | "floatdown";
    fullHeight?: boolean;
    flex?: "row" | "column";
    expand?: boolean;
    center?: "x" | "y" | "both";
    gap?: keyof typeof spacing;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    p?: keyof typeof spacing;
    px?: keyof typeof spacing;
    py?: keyof typeof spacing;
    pb?: keyof typeof spacing;
    pt?: keyof typeof spacing;
    relative?: boolean;
    scrollY?: boolean;
    color?: keyof Theme["colors"];
    debug?: boolean;
    bg?: keyof Theme["colors"];
    borderColor?: keyof Theme["colors"];
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=basic.d.ts.map
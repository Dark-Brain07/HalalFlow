import type { Theme } from "../../../core/design-system/index.js";
type SignInRequiredModalProps = {
    theme: Theme | "light" | "dark";
    onSignIn: () => void;
    onCancel: () => void;
    title?: string;
    description?: string;
    buttonLabel?: string;
};
/**
 * @internal
 */
export declare function SignInRequiredModal(props: SignInRequiredModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SignInRequiredModal.d.ts.map
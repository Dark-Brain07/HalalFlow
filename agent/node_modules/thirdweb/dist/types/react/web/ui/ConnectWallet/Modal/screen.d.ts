import type { Wallet } from "../../../../../wallets/interfaces/wallet.js";
import type { WelcomeScreen } from "../screens/types.js";
type Screen = string | Wallet;
export type ScreenSetup = {
    screen: Screen;
    setScreen: (newSreen: Screen) => void;
    initialScreen: Screen;
};
export declare const ScreenSetupContext: import("react").Context<ScreenSetup | undefined>;
/**
 * @internal
 */
export declare function useSetupScreen(props: {
    wallets: Wallet[];
    size: "compact" | "wide";
    welcomeScreen: WelcomeScreen | undefined;
}): {
    initialScreen: Screen;
    screen: string | Wallet;
    setScreen: import("react").Dispatch<import("react").SetStateAction<string | Wallet>>;
};
/**
 * @internal
 */
export declare function useScreenContext(): ScreenSetup;
export {};
//# sourceMappingURL=screen.d.ts.map
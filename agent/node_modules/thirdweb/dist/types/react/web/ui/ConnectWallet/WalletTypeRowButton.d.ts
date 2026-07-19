import type { ThirdwebClient } from "../../../../client/client.js";
import type { IconFC } from "./icons/types.js";
type WalletTypeRowProps = {
    client: ThirdwebClient;
    onClick: () => void;
    title: string;
    icon: IconFC;
    disabled?: boolean;
    className?: string;
    lastUsedBadge: boolean;
};
export declare function WalletTypeRowButton(props: WalletTypeRowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=WalletTypeRowButton.d.ts.map
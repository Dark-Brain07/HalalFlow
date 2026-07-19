import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import type { Wallet } from "../../../../../wallets/interfaces/wallet.js";
import type { Theme } from "../../../../core/design-system/index.js";
import type { CompletedStatusResult } from "../../../../core/hooks/useStepExecutor.js";
import type { SwapPreparedQuote, SwapWidgetConnectOptions } from "./types.js";
export type SwapWidgetProps = {
    /**
     * A client is the entry point to the thirdweb SDK.
     * It is required for all other actions.
     * You can create a client using the `createThirdwebClient` function. Refer to the [Creating a Client](https://portal.thirdweb.com/typescript/v5/client) documentation for more information.
     *
     * You must provide a `clientId` or `secretKey` in order to initialize a client. Pass `clientId` if you want for client-side usage and `secretKey` for server-side usage.
     *
     * ```tsx
     * import { createThirdwebClient } from "thirdweb";
     *
     * const client = createThirdwebClient({
     *  clientId: "<your_client_id>",
     * })
     * ```
     */
    client: ThirdwebClient;
    /**
     * Prefill Buy and/or Sell tokens for the swap widget. If `tokenAddress` is not provided, the native token will be used
     *
     * @example
     *
     * ### Set an ERC20 token as the buy token
     * ```ts
     * <SwapWidget client={client} prefill={{
     *  buyToken: {
     *    chainId: 8453,
     *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
     *  },
     * }} />
     * ```
     *
     * ### Set a native token as the sell token
     *
     * ```ts
     * <SwapWidget client={client} prefill={{
     *  sellToken: {
     *    chainId: 8453,
     *  },
     * }} />
     * ```
     *
     * ### Set 0.1 Base USDC as the buy token
     * ```ts
     * <SwapWidget client={client} prefill={{
     *  buyToken: {
     *    chainId: 8453,
     *    amount: "0.1",
     *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
     *  },
     * }} />
     * ```
     *
     * ### Set Base USDC as the buy token and Base native token as the sell token
     * ```ts
     * <SwapWidget client={client} prefill={{
     *  buyToken: {
     *    chainId: 8453,
     *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
     *  },
     *  sellToken: {
     *    chainId: 8453,
     *  },
     * }} />
     * ```
     */
    prefill?: {
        buyToken?: {
            tokenAddress?: string;
            chainId: number;
            amount?: string;
        };
        sellToken?: {
            tokenAddress?: string;
            chainId: number;
            amount?: string;
        };
    };
    /**
     * Set the theme for the `SwapWidget` component. By default it is set to `"dark"`
     *
     * theme can be set to either `"dark"`, `"light"` or a custom theme object.
     * You can also import [`lightTheme`](https://portal.thirdweb.com/references/typescript/v5/lightTheme)
     * or [`darkTheme`](https://portal.thirdweb.com/references/typescript/v5/darkTheme)
     * functions from `thirdweb/react` to use the default themes as base and overrides parts of it.
     * @example
     * ```ts
     * import { lightTheme } from "thirdweb/react";
     *
     * const customTheme = lightTheme({
     *  colors: {
     *    modalBg: 'red'
     *  }
     * })
     *
     * function Example() {
     *  return <SwapWidget client={client} theme={customTheme} />
     * }
     * ```
     */
    theme?: "light" | "dark" | Theme;
    /**
     * The currency to use for the payment.
     * @default "USD"
     */
    currency?: SupportedFiatCurrency;
    connectOptions?: SwapWidgetConnectOptions;
    /**
     * Whether to show thirdweb branding in the widget.
     * @default true
     */
    showThirdwebBranding?: boolean;
    /**
     * Callback to be called when the swap is successful.
     */
    onSuccess?: (data: {
        quote: SwapPreparedQuote;
        statuses: CompletedStatusResult[];
    }) => void;
    /**
     * Callback to be called when user encounters an error when swapping.
     */
    onError?: (error: Error, quote: SwapPreparedQuote) => void;
    /**
     * Callback to be called when the user cancels the purchase.
     */
    onCancel?: (quote: SwapPreparedQuote) => void;
    style?: React.CSSProperties;
    className?: string;
    /**
     * Whether to persist the token selections to localStorage so that if the user revisits the widget, the last used tokens are pre-selected.
     * The last used tokens do not override the tokens specified in the `prefill` prop
     *
     * @default true
     */
    persistTokenSelections?: boolean;
    /**
     * Called when the user disconnects the active wallet
     */
    onDisconnect?: () => void;
    /**
     * The wallet that should be pre-selected in the SwapWidget UI.
     */
    activeWallet?: Wallet;
};
/**
 * A widget for swapping tokens with cross-chain support
 *
 * @param props - Props of type [`SwapWidgetProps`](https://portal.thirdweb.com/references/typescript/v5/SwapWidgetProps) to configure the SwapWidget component.
 *
 * @example
 * ### Basic usage
 *
 * By default, no tokens are selected in the widget UI.
 *
 * You can set specific tokens to buy or sell by default by passing the `prefill` prop. User can change these selections in the widget UI.
 *
 * ```tsx
 * <SwapWidget client={client} />
 * ```
 *
 * ### Set an ERC20 token to Buy by default
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  buyToken: {
 *    // Base USDC
 *    chainId: 8453,
 *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *  },
 * }} />
 * ```
 *
 * ### Set a native token to Sell by default
 *
 * By not specifying a `tokenAddress`, the native token will be used.
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  // Base native token (ETH)
 *  sellToken: {
 *    chainId: 8453,
 *  },
 * }} />
 * ```
 *
 * ### Set amount and token to Buy by default
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  buyToken: {
 *    // 0.1 Base USDC
 *    chainId: 8453,
 *    amount: "0.1",
 *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *  },
 * }} />
 * ```
 *
 * ### Set both buy and sell tokens by default
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  buyToken: {
 *    // Base USDC
 *    chainId: 8453,
 *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *  },
 *  sellToken: {
 *    // Polygon native token (MATIC)
 *    chainId: 137,
 *  },
 * }} />
 * ```
 *
 * @bridge
 */
export declare function SwapWidget(props: SwapWidgetProps): import("react/jsx-runtime").JSX.Element;
/**
 * @internal
 */
export declare function SwapWidgetContainer(props: {
    theme: SwapWidgetProps["theme"];
    className: string | undefined;
    style?: React.CSSProperties | undefined;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SwapWidget.d.ts.map
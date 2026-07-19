"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionButton = TransactionButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const transaction_button_utils_js_1 = require("../../../core/hooks/transaction/transaction-button-utils.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useSendTransaction_js_1 = require("../../hooks/transaction/useSendTransaction.js");
const buttons_js_1 = require("../components/buttons.js");
const Spinner_js_1 = require("../components/Spinner.js");
/**
 * TransactionButton component is used to render a button that triggers a transaction.
 * It shows a "Switch Network" button if the connected wallet is on a different chain than the transaction.
 * @param props - The props for this component.
 * Refer to [TransactionButtonProps](https://portal.thirdweb.com/references/typescript/v5/TransactionButtonProps) for details.
 * @example
 *
 * ### Basic usage
 * ```tsx
 * <TransactionButton
 *   transaction={() => {}}
 *   onTransactionConfirmed={handleSuccess}
 *   onError={handleError}
 * >
 *   Confirm Transaction
 * </TransactionButton>
 * ```
 *
 * ### Customize the styling by passing the `unstyled` prop and your inline styles and/or classes:
 * ```tsx
 * <TransactionButton
 *   transaction={() => {}}
 *   unstyled
 *   className="bg-white text-black rounded-md p-4 flex items-center justify-center"
 * >
 *   Confirm Transaction
 * </TransactionButton>
 * ```
 *
 * ### Handle errors
 * ```tsx
 * <TransactionButton
 *   transaction={() => ...}
 *   onError={(err) => {
 *     alert(err.message);
 *     // Add your own logic here
 *   }}
 * >
 *   Confirm Transaction
 * </TransactionButton>
 * ```
 *
 * ### Alert when a transaction is sent
 * ```tsx
 * <TransactionButton
 *   transaction={() => ...}
 *   onTransactionSent={(tx) => {
 *     alert("transaction sent!");
 *     // Add your own logic here. For example, a toast
 *   }}
 * >
 *   Confirm Transaction
 * </TransactionButton>
 * ```
 *
 * ### Alert when a transaction is completed
 * ```tsx
 * <TransactionButton
 *   transaction={() => ...}
 *   onTransactionConfirmed={(tx) => {
 *     alert("transaction sent!");
 *     console.log(tx);
 *     // Add your own logic here. For example, a toast
 *   }}
 * >
 *   Confirm Transaction
 * </TransactionButton>
 * ```
 *
 * ### The onClick prop, if provided, will be called before the transaction is sent.
 * ```tsx
 * <TransactionButton
 *   onClick={() => alert("Transaction is about to be sent")}
 *   transaction={...}
 * >
 *   ...
 * </TransactionButton>
 * ```
 *
 * ### Attach custom Pay metadata
 * ```tsx
 * <TransactionButton
 *   payModal={{
 *     // This image & title will show up in the Pay modal
 *     metadata: {
 *       name: "Van Gogh Starry Night",
 *       image: "https://unsplash.com/starry-night.png"
 *     }
 *   }}
 * >
 *   ...
 * </TransactionButton>
 * ```
 *
 * ### Gasless usage with [thirdweb Engine](https://portal.thirdweb.com/engine)
 * ```tsx
 * <TransactionButton
 *   gasless={{
 *     provider: "engine",
 *     relayerUrl: "https://thirdweb.engine-***.thirdweb.com/relayer/***",
 *     relayerForwarderAddress: "0x...",
 *   }}
 * >
 *   ...
 * </TransactionButton>
 * ```
 *
 * ### Gasless usage with OpenZeppelin
 * ```tsx
 * <TransactionButton
 *   gasless={{
 *     provider: "openzeppelin",
 *     relayerUrl: "https://...",
 *     relayerForwarderAddress: "0x...",
 *   }}
 * >
 *   ...
 * </TransactionButton>
 * ```
 * @component
 * @transaction
 */
function TransactionButton(props) {
    const { children, 
    // biome-ignore lint/correctness/noUnusedVariables: TODO
    transaction, 
    // biome-ignore lint/correctness/noUnusedVariables: TODO
    onTransactionSent, 
    // biome-ignore lint/correctness/noUnusedVariables: TODO
    onTransactionConfirmed, 
    // biome-ignore lint/correctness/noUnusedVariables: TODO
    onError, 
    // biome-ignore lint/correctness/noUnusedVariables: TODO
    onClick, gasless, payModal, disabled, unstyled, ...buttonProps } = props;
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const sendTransaction = (0, useSendTransaction_js_1.useSendTransaction)({ gasless, payModal });
    const { mutate: handleClick, isPending } = (0, transaction_button_utils_js_1.useTransactionButtonMutation)(props, sendTransaction.mutateAsync);
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme, children: (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { "data-is-loading": isPending, disabled: !account || disabled || isPending, gap: "xs", onClick: () => handleClick(), unstyled: unstyled, variant: "primary", ...buttonProps, style: !unstyled
                ? {
                    minWidth: "165px",
                    opacity: !account || disabled ? 0.5 : 1,
                    position: "relative",
                    ...buttonProps.style,
                }
                : {
                    position: "relative",
                    ...buttonProps.style,
                }, children: [(0, jsx_runtime_1.jsx)("span", { style: { visibility: isPending ? "hidden" : "visible" }, children: children }), isPending && ((0, jsx_runtime_1.jsx)("div", { style: {
                        alignItems: "center",
                        bottom: 0,
                        display: "flex",
                        height: "100%",
                        margin: "auto",
                        position: "absolute",
                        top: 0,
                    }, children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "primaryButtonText", size: "md" }) }))] }) }));
}
//# sourceMappingURL=index.js.map
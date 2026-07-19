"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionButton = TransactionButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const transaction_button_utils_js_1 = require("../../../core/hooks/transaction/transaction-button-utils.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useSendTransaction_js_1 = require("../../hooks/transaction/useSendTransaction.js");
const button_js_1 = require("../components/button.js");
const spinner_js_1 = require("../components/spinner.js");
/**
 * TransactionButton component is used to render a button that triggers a transaction.
 * It shows a "Switch Network" button if the connected wallet is on a different chain than the transaction.
 * @param props - The props for this component.
 * Refer to [TransactionButtonProps](https://portal.thirdweb.com/references/typescript/v5/TransactionButtonProps) for details.
 * @example
 * ```tsx
 * <TransactionButton
 *   transaction={() => {}}
 *   onTransactionConfirmed={handleSuccess}
 *   onError={handleError}
 * >
 *   Confirm Transaction
 * </TransactionButton>
 * ```
 * @component
 * @transaction
 */
function TransactionButton(props) {
    const { children, gasless, payModal, disabled, ...buttonProps } = props;
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const sendTransaction = (0, useSendTransaction_js_1.useSendTransaction)({ gasless, payModal });
    const { mutate: handleClick, isPending } = (0, transaction_button_utils_js_1.useTransactionButtonMutation)(props, sendTransaction.mutateAsync);
    const theme = (0, CustomThemeProvider_js_1.parseTheme)(buttonProps.theme);
    return ((0, jsx_runtime_1.jsxs)(button_js_1.ThemedButton, { disabled: !account || disabled || isPending, onPress: () => handleClick(), style: buttonProps.style, theme: theme, variant: "primary", children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { opacity: isPending ? 0 : 1 }, children: children }), isPending && ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignItems: "center",
                    bottom: 0,
                    flex: 1,
                    justifyContent: "center",
                    margin: "auto",
                    position: "absolute",
                    top: 0,
                }, children: (0, jsx_runtime_1.jsx)(spinner_js_1.ThemedSpinner, { color: theme.colors.primaryButtonText }) }))] }));
}
//# sourceMappingURL=TransactionButton.js.map
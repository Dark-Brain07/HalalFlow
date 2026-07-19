import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from "react-native";
import { parseTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { useTransactionButtonMutation, } from "../../../core/hooks/transaction/transaction-button-utils.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useSendTransaction } from "../../hooks/transaction/useSendTransaction.js";
import { ThemedButton } from "../components/button.js";
import { ThemedSpinner } from "../components/spinner.js";
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
export function TransactionButton(props) {
    const { children, gasless, payModal, disabled, ...buttonProps } = props;
    const account = useActiveAccount();
    const sendTransaction = useSendTransaction({ gasless, payModal });
    const { mutate: handleClick, isPending } = useTransactionButtonMutation(props, sendTransaction.mutateAsync);
    const theme = parseTheme(buttonProps.theme);
    return (_jsxs(ThemedButton, { disabled: !account || disabled || isPending, onPress: () => handleClick(), style: buttonProps.style, theme: theme, variant: "primary", children: [_jsx(View, { style: { opacity: isPending ? 0 : 1 }, children: children }), isPending && (_jsx(View, { style: {
                    alignItems: "center",
                    bottom: 0,
                    flex: 1,
                    justifyContent: "center",
                    margin: "auto",
                    position: "absolute",
                    top: 0,
                }, children: _jsx(ThemedSpinner, { color: theme.colors.primaryButtonText }) }))] }));
}
//# sourceMappingURL=TransactionButton.js.map
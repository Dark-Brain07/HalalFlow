import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { shortenString } from "../../../../core/utils/addresses.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { CopyIcon } from "../../components/CopyIcon.js";
import { QRCode } from "../../components/QRCode.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { WalletImage } from "../../components/WalletImage.js";
import { StyledButton } from "../../design-system/elements.js";
import { useClipboard } from "../../hooks/useCopyClipboard.js";
/**
 *
 * @internal
 */
export function ReceiveFunds(props) {
    const account = useActiveAccount();
    const address = account?.address;
    const { hasCopied, onCopy } = useClipboard(address || "");
    const { connectLocale, client } = props;
    const locale = connectLocale.receiveFundsScreen;
    return (_jsxs(Container, { p: "lg", className: "tw-receive-funds-screen", children: [_jsx(ModalHeader, { onBack: props.onBack, title: locale.title }), _jsx(Spacer, { y: "xl" }), _jsx(Container, { center: "x", flex: "row", children: _jsx(QRCode, { QRIcon: props.walletId && (_jsx(WalletImage, { client: client, id: props.walletId, size: iconSize.xxl })), qrCodeUri: address, size: 350 }) }), _jsx(Spacer, { y: "xl" }), _jsxs(WalletAddressContainer, { onClick: onCopy, className: "tw-copy-address-button", children: [_jsx(Text, { color: "primaryText", size: "md", children: shortenString(address || "", false) }), _jsx(CopyIcon, { hasCopied: hasCopied, text: address || "", tip: "Copy address" })] }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { balance: true, center: true, size: "sm", className: "receive_fund_screen_instruction", multiline: true, children: locale.instruction })] }));
}
const WalletAddressContainer = /* @__PURE__ */ StyledButton((_) => {
    const theme = useCustomTheme();
    return {
        all: "unset",
        "&:hover": {
            borderColor: theme.colors.accentText,
        },
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: radius.md,
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        padding: spacing.md,
        transition: "border-color 200ms ease",
        width: "100%",
    };
});
//# sourceMappingURL=ReceiveFunds.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveFunds = ReceiveFunds;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const addresses_js_1 = require("../../../../core/utils/addresses.js");
const basic_js_1 = require("../../components/basic.js");
const CopyIcon_js_1 = require("../../components/CopyIcon.js");
const QRCode_js_1 = require("../../components/QRCode.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const WalletImage_js_1 = require("../../components/WalletImage.js");
const elements_js_1 = require("../../design-system/elements.js");
const useCopyClipboard_js_1 = require("../../hooks/useCopyClipboard.js");
/**
 *
 * @internal
 */
function ReceiveFunds(props) {
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const address = account?.address;
    const { hasCopied, onCopy } = (0, useCopyClipboard_js_1.useClipboard)(address || "");
    const { connectLocale, client } = props;
    const locale = connectLocale.receiveFundsScreen;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "lg", className: "tw-receive-funds-screen", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: locale.title }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", children: (0, jsx_runtime_1.jsx)(QRCode_js_1.QRCode, { QRIcon: props.walletId && ((0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: client, id: props.walletId, size: index_js_1.iconSize.xxl })), qrCodeUri: address, size: 350 }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)(WalletAddressContainer, { onClick: onCopy, className: "tw-copy-address-button", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "md", children: (0, addresses_js_1.shortenString)(address || "", false) }), (0, jsx_runtime_1.jsx)(CopyIcon_js_1.CopyIcon, { hasCopied: hasCopied, text: address || "", tip: "Copy address" })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, size: "sm", className: "receive_fund_screen_instruction", multiline: true, children: locale.instruction })] }));
}
const WalletAddressContainer = /* @__PURE__ */ (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            borderColor: theme.colors.accentText,
        },
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: index_js_1.radius.md,
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        padding: index_js_1.spacing.md,
        transition: "border-color 200ms ease",
        width: "100%",
    };
});
//# sourceMappingURL=ReceiveFunds.js.map
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { shortenAddress } from "../../../../utils/address.js";
import { spacing } from "../../design-system/index.js";
import { Address } from "../components/Address.js";
import { Header } from "../components/Header.js";
import { Spacer } from "../components/spacer.js";
import { ThemedText } from "../components/text.js";
import { WalletImage } from "../components/WalletImage.js";
export const ReceiveScreen = (props) => {
    const { wallet, account, theme, onClose, onBack, containerType, client } = props;
    return (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: onBack, onClose: onClose, theme: theme, title: "Receive Funds" }), _jsxs(View, { style: styles.container, children: [_jsx(WalletImage, { client: client, size: 80, theme: theme, wallet: wallet }), _jsx(Spacer, { size: "lg" }), _jsx(View, { style: [
                            styles.addressContainer,
                            { borderColor: theme.colors.borderColor },
                        ], children: _jsx(Address, { account: account, addressOrENS: shortenAddress(account?.address, 8), theme: theme }) }), _jsx(ThemedText, { style: { textAlign: "center" }, theme: theme, type: "subtext", children: "Copy your address to send funds to this wallet" })] })] }));
};
const styles = StyleSheet.create({
    addressContainer: {
        alignItems: "center",
        borderRadius: spacing.lg,
        borderWidth: 1,
        flexDirection: "row",
        gap: spacing.sm,
        justifyContent: "center",
        padding: spacing.md,
        width: "100%",
    },
    container: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        gap: spacing.md,
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xxl,
    },
});
//# sourceMappingURL=ReceiveScreen.js.map
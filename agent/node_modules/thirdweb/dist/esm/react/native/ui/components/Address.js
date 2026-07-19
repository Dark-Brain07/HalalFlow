import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Clipboard, StyleSheet, TouchableOpacity } from "react-native";
import { spacing } from "../../design-system/index.js";
import { CHECK, COPY_ICON } from "../icons/svgs.js";
import { RNImage } from "./RNImage.js";
import { ThemedText } from "./text.js";
export const Address = ({ account, theme, addressOrENS }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    return (_jsxs(TouchableOpacity, { onPress: () => {
            Clipboard.setString(account.address);
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
            }, 2500);
        }, style: styles.addressContainer, children: [_jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: addressOrENS }), _jsx(RNImage, { color: copySuccess ? theme.colors.success : theme.colors.secondaryIconColor, data: copySuccess ? CHECK : COPY_ICON, size: 15, theme: theme })] }));
};
const styles = StyleSheet.create({
    addressContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.sm,
    },
});
//# sourceMappingURL=Address.js.map
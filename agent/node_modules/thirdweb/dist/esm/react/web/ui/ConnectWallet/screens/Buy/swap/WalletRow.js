import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { shortenAddress } from "../../../../../../../utils/address.js";
import { isEcosystemWallet } from "../../../../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { isSmartWallet } from "../../../../../../../wallets/smart/index.js";
import { fontSize, iconSize, radius, } from "../../../../../../core/design-system/index.js";
import { useConnectedWallets } from "../../../../../../core/hooks/wallets/useConnectedWallets.js";
import { useEnsName, useWalletInfo, } from "../../../../../../core/utils/wallet.js";
import { useProfiles } from "../../../../../hooks/wallets/useProfiles.js";
import { Container } from "../../../../components/basic.js";
import { Skeleton } from "../../../../components/Skeleton.js";
import { Text } from "../../../../components/text.js";
import { WalletImage } from "../../../../components/WalletImage.js";
import { OutlineWalletIcon } from "../../../icons/OutlineWalletIcon.js";
export function WalletRow(props) {
    const { client, address } = props;
    const connectedWallets = useConnectedWallets();
    const profile = useProfiles({ client });
    const wallet = connectedWallets.find((w) => w.getAccount()?.address?.toLowerCase() === address.toLowerCase());
    const email = wallet &&
        (wallet.id === "inApp" ||
            isEcosystemWallet(wallet) ||
            isSmartWallet(wallet))
        ? profile.data?.find((p) => !!p.details.email)?.details.email
        : undefined;
    const walletInfo = useWalletInfo(wallet?.id);
    const ensNameQuery = useEnsName({
        address,
        client,
    });
    const addressOrENS = address
        ? ensNameQuery.data || shortenAddress(address)
        : "";
    const iconSizeValue = iconSize[props.iconSize || "md"];
    return (_jsx(Container, { flex: "row", style: { justifyContent: "space-between" }, children: _jsxs(Container, { center: "y", color: "secondaryText", flex: "row", gap: "sm", children: [wallet ? (_jsx(WalletImage, { client: props.client, id: wallet.id, size: iconSizeValue })) : (_jsx(Container, { borderColor: "borderColor", bg: "modalBg", flex: "row", center: "both", style: {
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: radius.full,
                        width: `${iconSizeValue}px`,
                        height: `${iconSizeValue}px`,
                        position: "relative",
                    }, children: _jsx(OutlineWalletIcon, { style: {
                            position: "absolute",
                            inset: "25%",
                        } }) })), _jsxs(Container, { flex: "column", gap: "3xs", children: [props.label ? (_jsx(Text, { color: "secondaryText", size: "xs", children: props.label })) : null, _jsx(Text, { color: "primaryText", size: props.textSize || "xs", children: addressOrENS || shortenAddress(props.address) }), profile.isLoading ? (_jsx(Skeleton, { height: fontSize.sm, width: "100px" })) : email || walletInfo?.data?.name ? (_jsx(Text, { color: "secondaryText", size: "xs", children: email || walletInfo?.data?.name })) : null] })] }) }));
}
//# sourceMappingURL=WalletRow.js.map
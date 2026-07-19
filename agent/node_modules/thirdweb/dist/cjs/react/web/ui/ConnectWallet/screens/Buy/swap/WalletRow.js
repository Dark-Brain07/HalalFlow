"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRow = WalletRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const address_js_1 = require("../../../../../../../utils/address.js");
const is_ecosystem_wallet_js_1 = require("../../../../../../../wallets/ecosystem/is-ecosystem-wallet.js");
const index_js_1 = require("../../../../../../../wallets/smart/index.js");
const index_js_2 = require("../../../../../../core/design-system/index.js");
const useConnectedWallets_js_1 = require("../../../../../../core/hooks/wallets/useConnectedWallets.js");
const wallet_js_1 = require("../../../../../../core/utils/wallet.js");
const useProfiles_js_1 = require("../../../../../hooks/wallets/useProfiles.js");
const basic_js_1 = require("../../../../components/basic.js");
const Skeleton_js_1 = require("../../../../components/Skeleton.js");
const text_js_1 = require("../../../../components/text.js");
const WalletImage_js_1 = require("../../../../components/WalletImage.js");
const OutlineWalletIcon_js_1 = require("../../../icons/OutlineWalletIcon.js");
function WalletRow(props) {
    const { client, address } = props;
    const connectedWallets = (0, useConnectedWallets_js_1.useConnectedWallets)();
    const profile = (0, useProfiles_js_1.useProfiles)({ client });
    const wallet = connectedWallets.find((w) => w.getAccount()?.address?.toLowerCase() === address.toLowerCase());
    const email = wallet &&
        (wallet.id === "inApp" ||
            (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(wallet) ||
            (0, index_js_1.isSmartWallet)(wallet))
        ? profile.data?.find((p) => !!p.details.email)?.details.email
        : undefined;
    const walletInfo = (0, wallet_js_1.useWalletInfo)(wallet?.id);
    const ensNameQuery = (0, wallet_js_1.useEnsName)({
        address,
        client,
    });
    const addressOrENS = address
        ? ensNameQuery.data || (0, address_js_1.shortenAddress)(address)
        : "";
    const iconSizeValue = index_js_2.iconSize[props.iconSize || "md"];
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", style: { justifyContent: "space-between" }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", color: "secondaryText", flex: "row", gap: "sm", children: [wallet ? ((0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: wallet.id, size: iconSizeValue })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { borderColor: "borderColor", bg: "modalBg", flex: "row", center: "both", style: {
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderRadius: index_js_2.radius.full,
                        width: `${iconSizeValue}px`,
                        height: `${iconSizeValue}px`,
                        position: "relative",
                    }, children: (0, jsx_runtime_1.jsx)(OutlineWalletIcon_js_1.OutlineWalletIcon, { style: {
                            position: "absolute",
                            inset: "25%",
                        } }) })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", children: [props.label ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: props.label })) : null, (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: props.textSize || "xs", children: addressOrENS || (0, address_js_1.shortenAddress)(props.address) }), profile.isLoading ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_2.fontSize.sm, width: "100px" })) : email || walletInfo?.data?.name ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: email || walletInfo?.data?.name })) : null] })] }) }));
}
//# sourceMappingURL=WalletRow.js.map
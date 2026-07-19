"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { iconSize, radius } from "../../../core/design-system/index.js";
import { useWalletInfo } from "../../../core/utils/wallet.js";
import { ModalHeader } from "../../ui/components/basic.js";
import { Img } from "../../ui/components/Img.js";
import { ModalTitle } from "../../ui/components/modalElements.js";
import { Skeleton } from "../../ui/components/Skeleton.js";
/**
 * @internal
 */
export function EcosystemWalletHeader(props) {
    const walletInfo = useWalletInfo(props.wallet.id);
    return (_jsx(ModalHeader, { leftAligned: true, onBack: props.onBack, title: walletInfo.isLoading ? (_jsx(Skeleton, { height: "24px", width: "200px" })) : (_jsxs(_Fragment, { children: [!walletInfo.data?.image_id ? null : (_jsx(Img, { client: props.client, height: iconSize.md, src: walletInfo.data?.image_id, style: {
                        borderRadius: radius.sm,
                    }, width: iconSize.md })), _jsx(ModalTitle, { children: walletInfo.data?.name })] })) }));
}
//# sourceMappingURL=EcosystemWalletHeader.js.map
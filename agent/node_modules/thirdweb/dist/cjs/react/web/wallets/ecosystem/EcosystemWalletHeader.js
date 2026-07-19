"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcosystemWalletHeader = EcosystemWalletHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../core/design-system/index.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const basic_js_1 = require("../../ui/components/basic.js");
const Img_js_1 = require("../../ui/components/Img.js");
const modalElements_js_1 = require("../../ui/components/modalElements.js");
const Skeleton_js_1 = require("../../ui/components/Skeleton.js");
/**
 * @internal
 */
function EcosystemWalletHeader(props) {
    const walletInfo = (0, wallet_js_1.useWalletInfo)(props.wallet.id);
    return ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { leftAligned: true, onBack: props.onBack, title: walletInfo.isLoading ? ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "24px", width: "200px" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!walletInfo.data?.image_id ? null : ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, height: index_js_1.iconSize.md, src: walletInfo.data?.image_id, style: {
                        borderRadius: index_js_1.radius.sm,
                    }, width: index_js_1.iconSize.md })), (0, jsx_runtime_1.jsx)(modalElements_js_1.ModalTitle, { children: walletInfo.data?.name })] })) }));
}
//# sourceMappingURL=EcosystemWalletHeader.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { iconSize } from "../../../../core/design-system/index.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Spacer } from "../../components/Spacer.js";
import Tabs from "../../components/Tabs.js";
import { CoinsIcon } from "../icons/CoinsIcon.js";
import { ImageIcon } from "../icons/ImageIcon.js";
import { ViewNFTsContent } from "./ViewNFTs.js";
import { ViewTokensContent } from "./ViewTokens.js";
const TokenTab = {
    label: (_jsxs("span", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [_jsx(CoinsIcon, { size: iconSize.sm }), " Tokens"] })),
    value: "Tokens",
};
const NftTab = {
    label: (_jsxs("span", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [_jsx(ImageIcon, { size: iconSize.sm }), " NFTs"] })),
    value: "NFTs",
};
/**
 * @internal
 */
export function ViewAssets(props) {
    const { connectLocale } = props;
    const options = useMemo(() => {
        if (!props.assetTabs) {
            return [TokenTab, NftTab];
        }
        if (!props.assetTabs.length) {
            return [];
        }
        const tabs = [];
        for (const item of props.assetTabs) {
            if (item === "token") {
                tabs.push(TokenTab);
            }
            else if (item === "nft") {
                tabs.push(NftTab);
            }
        }
        return tabs;
    }, [props.assetTabs]);
    // Since `options` is now a dynamic value, the default active tab is set to the value of the first tab in `options`
    const [activeTab, setActiveTab] = useState(options[0]?.value || "Tokens");
    return (_jsxs(Container, { animate: "fadein", style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: connectLocale.viewFunds.viewAssets }) }), _jsx(Line, {}), _jsxs(Container, { px: "lg", scrollY: true, style: {
                    minHeight: "330px",
                }, children: [_jsx(Spacer, { y: "md" }), _jsx(Tabs, { onSelect: setActiveTab, options: options, selected: activeTab, children: _jsxs(Container, { scrollY: true, style: {
                                maxHeight: "300px",
                            }, children: [activeTab === "Tokens" && (_jsx(ViewTokensContent, { client: props.client, connectLocale: connectLocale, supportedTokens: props.supportedTokens })), activeTab === "NFTs" && (_jsx(ViewNFTsContent, { client: props.client, connectLocale: connectLocale, supportedNFTs: props.supportedNFTs, theme: props.theme }))] }) }), _jsx(Spacer, { y: "lg" })] })] }));
}
//# sourceMappingURL=ViewAssets.js.map
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { resolveScheme } from "../../../../utils/ipfs.js";
import { useChainIconUrl } from "../../../core/hooks/others/useChainQuery.js";
import { CHAIN_ICON } from "../icons/svgs.js";
import { RNImage } from "./RNImage.js";
export const ChainIcon = (props) => {
    const { url } = useChainIconUrl(props.chain);
    const data = useMemo(() => {
        if (!url) {
            return CHAIN_ICON;
        }
        try {
            return resolveScheme({
                client: props.client,
                uri: url,
            });
        }
        catch {
            return CHAIN_ICON;
        }
    }, [props, url]);
    return (_jsx(RNImage, { color: props.theme.colors.secondaryIconColor, data: data, placeholder: CHAIN_ICON, size: props.size, theme: props.theme }));
};
//# sourceMappingURL=ChainIcon.js.map
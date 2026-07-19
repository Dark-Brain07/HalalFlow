"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { genericTokenIcon } from "../../../core/utils/walletIcon.js";
import { ChainIcon } from "./ChainIcon.js";
import { RNImage } from "./RNImage.js";
/**
 * @internal
 */
export function TokenIcon(props) {
    return props.token ? (_jsx(RNImage, { data: props.token?.icon || genericTokenIcon, size: props.size, theme: props.theme })) : (_jsx(ChainIcon, { ...props }));
}
//# sourceMappingURL=TokenIcon.js.map
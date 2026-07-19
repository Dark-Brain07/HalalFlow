"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { CheckIcon, CopyIcon as CopyIconSVG } from "@radix-ui/react-icons";
import { radius } from "../../../core/design-system/index.js";
import { useClipboard } from "../hooks/useCopyClipboard.js";
import { Container } from "./basic.js";
import { Button } from "./buttons.js";
import { ToolTip } from "./Tooltip.js";
/**
 * @internal
 */
export const CopyIcon = (props) => {
    const { hasCopied, onCopy } = useClipboard(props.text);
    const showCheckIcon = props.hasCopied || hasCopied;
    return (_jsx(Button, { onClick: onCopy, variant: "ghost-solid", style: {
            alignItems: "center",
            display: "flex",
            padding: 2,
            justifyContent: "center",
            borderRadius: radius.sm,
        }, children: _jsx(ToolTip, { align: props.align, side: props.side, tip: props.tip, children: _jsx("div", { children: _jsx(Container, { center: "both", color: showCheckIcon ? "success" : "secondaryText", flex: "row", children: showCheckIcon ? (_jsx(CheckIcon, { className: "tw-check-icon", width: props.iconSize || 16, height: props.iconSize || 16 })) : (_jsx(CopyIconSVG, { className: "tw-copy-icon", width: props.iconSize || 16, height: props.iconSize || 16 })) }) }) }) }));
};
//# sourceMappingURL=CopyIcon.js.map
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";
import { trackPayEvent } from "../../../../analytics/track/pay.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { iconSize } from "../../../core/design-system/index.js";
import { useBridgeError } from "../../../core/hooks/useBridgeError.js";
import { Container } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { Text } from "../components/text.js";
export function ErrorBanner({ error, onRetry, onCancel, client, }) {
    const theme = useCustomTheme();
    const { userMessage } = useBridgeError({ error });
    const hasFiredErrorEvent = useRef(false);
    useEffect(() => {
        if (hasFiredErrorEvent.current)
            return;
        hasFiredErrorEvent.current = true;
        trackPayEvent({
            client,
            error: error.message,
            event: "ub:ui:error",
        });
    }, [client, error.message]);
    return (_jsx(Container, { flex: "column", fullHeight: true, gap: "md", p: "md", children: _jsxs(Container, { flex: "row", gap: "md", style: { alignItems: "flex-start" }, children: [_jsx(Container, { center: "both", style: {
                        backgroundColor: theme.colors.tertiaryBg,
                        borderRadius: "50%",
                        flexShrink: 0,
                        height: "24px",
                        width: "24px",
                    }, children: _jsx(CrossCircledIcon, { color: theme.colors.danger, height: iconSize.md, width: iconSize.md }) }), _jsxs(Container, { flex: "column", fullHeight: true, gap: "sm", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "lg", children: "Error" }), _jsx(Container, { flex: "column", gap: "sm", style: {
                                minHeight: "100px",
                            }, children: _jsx(Container, { flex: "column", gap: "sm", style: { flex: 1 }, children: _jsx(Text, { color: "secondaryText", size: "sm", children: userMessage }) }) }), _jsxs(Container, { flex: "row", gap: "sm", style: { justifyContent: "flex-end" }, children: [_jsx(Button, { onClick: onRetry, variant: "primary", children: "Try Again" }), onCancel && (_jsx(Button, { onClick: onCancel, variant: "secondary", children: "Cancel" }))] })] })] }) }));
}
//# sourceMappingURL=ErrorBanner.js.map
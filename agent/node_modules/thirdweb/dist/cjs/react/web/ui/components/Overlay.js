"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = void 0;
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const animations_js_1 = require("../design-system/animations.js");
const elements_js_1 = require("../design-system/elements.js");
exports.Overlay = (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        animation: `${animations_js_1.fadeInAnimation} 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
        backdropFilter: "blur(10px)",
        backgroundColor: theme.colors.modalOverlayBg,
        inset: 0,
        position: "fixed",
        zIndex: 9999,
    };
});
//# sourceMappingURL=Overlay.js.map
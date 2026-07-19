"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalCloseFadeOutDuration = exports.compactModalMaxHeight = exports.wideModalMaxHeight = exports.wideModalScreenThreshold = exports.modalMaxWidthWide = exports.modalMaxWidthCompact = exports.reservedScreens = void 0;
exports.onModalUnmount = onModalUnmount;
exports.reservedScreens = {
    getStarted: "getStarted",
    main: "main",
    showAll: "showAll",
    signIn: "signIn",
};
exports.modalMaxWidthCompact = "400px";
const wideModalWidth = 730;
exports.modalMaxWidthWide = `${wideModalWidth}px`;
exports.wideModalScreenThreshold = wideModalWidth + 40;
exports.wideModalMaxHeight = "570px";
exports.compactModalMaxHeight = "660px";
exports.modalCloseFadeOutDuration = 250;
/**
 * @internal
 */
function onModalUnmount(cb) {
    setTimeout(cb, exports.modalCloseFadeOutDuration + 200);
}
//# sourceMappingURL=constants.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
const injectedWalletLocaleEs = (walletName) => ({
    connectionScreen: {
        failed: "Conexión fallida",
        inProgress: "Esperando confirmación",
        instruction: `Acepta la solicitud de conexión en tu cartera ${walletName}`,
        retry: "Intentar de nuevo",
    },
    download: {
        android: "Descargar en Google Play",
        chrome: "Descargar extensión para Chrome",
        iOS: "Descargar en App Store",
    },
    getStartedLink: `¿No tienes la cartera ${walletName}?`,
    getStartedScreen: {
        instruction: `Escanea el código QR para descargar la aplicación ${walletName}`,
    },
    scanScreen: {
        instruction: `Escanea el código QR con la aplicación de cartera ${walletName} para conectarte`,
    },
});
exports.default = injectedWalletLocaleEs;
//# sourceMappingURL=es.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
const injectedWalletLocalePtBr = (wallet) => ({
    connectionScreen: {
        failed: "Falha na conexão",
        inProgress: "Aguardando Confirmação",
        instruction: `Aceite a solicitação de conexão no ${wallet}`,
        retry: "Tentar novamente",
    },
    download: {
        android: "Baixar no Google Play",
        chrome: "Baixar extensão para Chrome",
        iOS: "Baixar na App Store",
    },
    getStartedLink: `Não tem o ${wallet}?`,
    getStartedScreen: {
        instruction: `Escaneie o código QR para baixar o aplicativo ${wallet}`,
    },
    scanScreen: {
        instruction: `Escaneie o código QR com o aplicativo ${wallet} para conectar`,
    },
});
exports.default = injectedWalletLocalePtBr;
//# sourceMappingURL=br.js.map
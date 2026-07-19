"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoConnectCore = useAutoConnectCore;
const react_query_1 = require("@tanstack/react-query");
const autoConnectCore_js_1 = require("../../../../wallets/connection/autoConnectCore.js");
const connection_manager_js_1 = require("../../providers/connection-manager.js");
const storage_js_1 = require("../../utils/storage.js");
const useConnect_js_1 = require("./useConnect.js");
function useAutoConnectCore(storage, props, createWalletFn) {
    const manager = (0, connection_manager_js_1.useConnectionManagerCtx)("useAutoConnect");
    const { connect } = (0, useConnect_js_1.useConnect)({
        accountAbstraction: props.accountAbstraction,
        client: props.client,
    });
    // trigger the auto connect on first mount only
    const query = (0, react_query_1.useQuery)({
        queryFn: () => (0, autoConnectCore_js_1.autoConnectCore)({
            connectOverride: connect,
            createWalletFn,
            manager,
            props,
            setLastAuthProvider: storage_js_1.setLastAuthProvider,
            storage,
        }),
        queryKey: ["autoConnect", props.client.clientId],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    return query;
}
//# sourceMappingURL=useAutoConnect.js.map
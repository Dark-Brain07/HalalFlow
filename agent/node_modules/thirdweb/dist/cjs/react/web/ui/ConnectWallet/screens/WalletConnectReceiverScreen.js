"use strict";
/** biome-ignore-all lint/nursery/useUniqueElementIds: "id" is not a html attribute here - TODO: stop using 'id' as a prop on JSX elements */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnectReceiverScreen = WalletConnectReceiverScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const index_js_1 = require("../../../../../wallets/wallet-connect/receiver/index.js");
const index_js_2 = require("../../../../core/design-system/index.js");
const useActiveWallet_js_1 = require("../../../../core/hooks/wallets/useActiveWallet.js");
const InputSelectionUI_js_1 = require("../../../wallets/in-app/InputSelectionUI.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const WalletConnectDisconnectScreen_js_1 = require("./WalletConnectDisconnectScreen.js");
const WalletLogoSpinner_js_1 = require("./WalletLogoSpinner.js");
/**
 * @internal
 */
function WalletConnectReceiverScreen(props) {
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [errorConnecting, setErrorConnecting] = (0, react_1.useState)(false);
    const queryClient = (0, react_query_1.useQueryClient)();
    const { data: walletConnectClient } = (0, react_query_1.useQuery)({
        enabled: !!activeWallet,
        queryFn: async () => {
            if (!activeWallet)
                return;
            try {
                const client = await (0, index_js_1.createWalletConnectClient)({
                    chains: props.chains,
                    client: props.client,
                    onConnect: () => {
                        setLoading(false);
                        queryClient.invalidateQueries({
                            queryKey: ["walletConnectSession"],
                        });
                    },
                    onDisconnect: () => {
                        setLoading(false);
                        queryClient.invalidateQueries({
                            queryKey: ["walletConnectSession"],
                        });
                    },
                    onError: (error) => {
                        setErrorConnecting(error.message);
                        setLoading(false);
                    },
                    wallet: activeWallet,
                });
                return client;
            }
            catch {
                setErrorConnecting("Failed to establish WalletConnect connection");
                return;
            }
        },
        queryKey: ["walletConnectClient"],
        retry: false,
    });
    const { data: session, refetch: refetchSession } = (0, react_query_1.useQuery)({
        enabled: !!walletConnectClient,
        queryFn: async () => {
            if (!walletConnectClient)
                return null;
            const sessions = await (0, index_js_1.getActiveWalletConnectSessions)();
            return sessions[0] || null;
        },
        queryKey: ["walletConnectSession"],
    });
    const { mutateAsync: disconnect } = (0, react_query_1.useMutation)({
        mutationFn: async () => {
            if (!walletConnectClient || !session)
                throw new Error("No session");
            await (0, index_js_1.disconnectWalletConnectSession)({
                session: session,
                walletConnectClient: walletConnectClient,
            });
        },
        onError: (error) => {
            console.error(error);
            setErrorConnecting(error.message);
        },
        onSuccess: () => {
            setErrorConnecting(false);
            queryClient.invalidateQueries({
                queryKey: ["walletConnectSession"],
            });
            refetchSession();
        },
    });
    if (session) {
        return ((0, jsx_runtime_1.jsx)(WalletConnectDisconnectScreen_js_1.WalletConnectDisconnectScreen, { disconnect: disconnect, error: errorConnecting, ...props, session: session }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Connect an App" }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "lg", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { py: "sm", style: { position: "relative" }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { py: "md", children: (0, jsx_runtime_1.jsx)(WalletLogoSpinner_js_1.WalletLogoSpinner, { client: props.client, error: !!errorConnecting, hideSpinner: !loading, id: "walletConnect" }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", style: {
                                animationDuration: "200ms",
                            }, children: !errorConnecting ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, size: "sm", children: "Copy your connection URI from the external app." }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(InputSelectionUI_js_1.InputSelectionUI, { lastUsedBadge: false, disabled: loading || !!errorConnecting || !walletConnectClient, emptyErrorMessage: "Please enter a valid URI", name: "wcUri", onSelect: async (value) => {
                                            setLoading(true);
                                            if (!walletConnectClient) {
                                                setErrorConnecting("No WalletConnect client found");
                                            }
                                            else {
                                                try {
                                                    (0, index_js_1.createWalletConnectSession)({
                                                        uri: value,
                                                        walletConnectClient,
                                                    });
                                                }
                                                catch {
                                                    setErrorConnecting("Error creating WalletConnect session");
                                                }
                                            }
                                        }, placeholder: "WalletConnect URI", submitButtonText: "Connect", type: "text" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, size: "sm", children: errorConnecting }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "x", flex: "row", children: (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { fullWidth: true, onClick: () => setErrorConnecting(false), style: {
                                                alignItems: "center",
                                                gap: index_js_2.spacing.xs,
                                            }, variant: "accent", children: [(0, jsx_runtime_1.jsx)(react_icons_1.ReloadIcon, { height: index_js_2.iconSize.sm, width: index_js_2.iconSize.sm }), "Retry"] }) })] })) })] }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", p: "lg", children: (0, jsx_runtime_1.jsx)("a", { href: "https://blog.thirdweb.com/p/a62c0ef4-1d8f-424d-95b9-a006e5239849/", children: (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: () => { }, variant: "link", children: "Where do I find the URI?" }) }) })] })] }));
}
//# sourceMappingURL=WalletConnectReceiverScreen.js.map
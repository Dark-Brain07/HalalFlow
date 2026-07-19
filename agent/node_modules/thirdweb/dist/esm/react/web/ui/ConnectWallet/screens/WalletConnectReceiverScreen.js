/** biome-ignore-all lint/nursery/useUniqueElementIds: "id" is not a html attribute here - TODO: stop using 'id' as a prop on JSX elements */
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createWalletConnectClient, createWalletConnectSession, disconnectWalletConnectSession, getActiveWalletConnectSessions, } from "../../../../../wallets/wallet-connect/receiver/index.js";
import { iconSize, spacing } from "../../../../core/design-system/index.js";
import { useActiveWallet } from "../../../../core/hooks/wallets/useActiveWallet.js";
import { InputSelectionUI } from "../../../wallets/in-app/InputSelectionUI.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { WalletConnectDisconnectScreen } from "./WalletConnectDisconnectScreen.js";
import { WalletLogoSpinner } from "./WalletLogoSpinner.js";
/**
 * @internal
 */
export function WalletConnectReceiverScreen(props) {
    const activeWallet = useActiveWallet();
    const [loading, setLoading] = useState(false);
    const [errorConnecting, setErrorConnecting] = useState(false);
    const queryClient = useQueryClient();
    const { data: walletConnectClient } = useQuery({
        enabled: !!activeWallet,
        queryFn: async () => {
            if (!activeWallet)
                return;
            try {
                const client = await createWalletConnectClient({
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
    const { data: session, refetch: refetchSession } = useQuery({
        enabled: !!walletConnectClient,
        queryFn: async () => {
            if (!walletConnectClient)
                return null;
            const sessions = await getActiveWalletConnectSessions();
            return sessions[0] || null;
        },
        queryKey: ["walletConnectSession"],
    });
    const { mutateAsync: disconnect } = useMutation({
        mutationFn: async () => {
            if (!walletConnectClient || !session)
                throw new Error("No session");
            await disconnectWalletConnectSession({
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
        return (_jsx(WalletConnectDisconnectScreen, { disconnect: disconnect, error: errorConnecting, ...props, session: session }));
    }
    return (_jsxs(Container, { style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: "Connect an App" }) }), _jsx(Line, {}), _jsx(Container, { px: "lg", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: _jsxs(Container, { py: "sm", style: { position: "relative" }, children: [_jsx(Container, { py: "md", children: _jsx(WalletLogoSpinner, { client: props.client, error: !!errorConnecting, hideSpinner: !loading, id: "walletConnect" }) }), _jsx(Container, { animate: "fadein", style: {
                                animationDuration: "200ms",
                            }, children: !errorConnecting ? (_jsxs(_Fragment, { children: [_jsx(Text, { balance: true, center: true, multiline: true, size: "sm", children: "Copy your connection URI from the external app." }), _jsx(Spacer, { y: "xl" }), _jsx(InputSelectionUI, { lastUsedBadge: false, disabled: loading || !!errorConnecting || !walletConnectClient, emptyErrorMessage: "Please enter a valid URI", name: "wcUri", onSelect: async (value) => {
                                            setLoading(true);
                                            if (!walletConnectClient) {
                                                setErrorConnecting("No WalletConnect client found");
                                            }
                                            else {
                                                try {
                                                    createWalletConnectSession({
                                                        uri: value,
                                                        walletConnectClient,
                                                    });
                                                }
                                                catch {
                                                    setErrorConnecting("Error creating WalletConnect session");
                                                }
                                            }
                                        }, placeholder: "WalletConnect URI", submitButtonText: "Connect", type: "text" })] })) : (_jsxs(_Fragment, { children: [_jsx(Text, { balance: true, center: true, multiline: true, size: "sm", children: errorConnecting }), _jsx(Spacer, { y: "md" }), _jsx(Container, { animate: "fadein", center: "x", flex: "row", children: _jsxs(Button, { fullWidth: true, onClick: () => setErrorConnecting(false), style: {
                                                alignItems: "center",
                                                gap: spacing.xs,
                                            }, variant: "accent", children: [_jsx(ReloadIcon, { height: iconSize.sm, width: iconSize.sm }), "Retry"] }) })] })) })] }) }), _jsxs(Container, { children: [_jsx(Spacer, { y: "lg" }), _jsx(Line, {}), _jsx(Container, { center: "x", flex: "row", p: "lg", children: _jsx("a", { href: "https://blog.thirdweb.com/p/a62c0ef4-1d8f-424d-95b9-a006e5239849/", children: _jsx(Button, { onClick: () => { }, variant: "link", children: "Where do I find the URI?" }) }) })] })] }));
}
//# sourceMappingURL=WalletConnectReceiverScreen.js.map
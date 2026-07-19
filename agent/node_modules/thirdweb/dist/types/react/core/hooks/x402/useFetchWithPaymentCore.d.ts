import type { ThirdwebClient } from "../../../../client/client.js";
import type { AsyncStorage } from "../../../../utils/storage/AsyncStorage.js";
import type { Wallet } from "../../../../wallets/interfaces/wallet.js";
import type { RequestedPaymentRequirements } from "../../../../x402/schemas.js";
import type { PaymentRequiredResult } from "../../../../x402/types.js";
export type UseFetchWithPaymentOptions = {
    maxValue?: bigint;
    paymentRequirementsSelector?: (paymentRequirements: RequestedPaymentRequirements[]) => RequestedPaymentRequirements | undefined;
    parseAs?: "json" | "text" | "raw";
    /**
     * Storage for caching permit signatures (for "upto" scheme).
     * When provided, permit signatures will be cached and reused if the on-chain allowance is sufficient.
     */
    storage?: AsyncStorage;
};
type ShowErrorModalCallback = (data: {
    errorData: PaymentRequiredResult["responseBody"];
    onRetry: () => void;
    onCancel: () => void;
}) => void;
type ShowConnectModalCallback = (data: {
    onConnect: (wallet: Wallet) => void;
    onCancel: () => void;
}) => void;
/**
 * Core hook for fetch with payment functionality.
 * This is the platform-agnostic implementation used by both web and native versions.
 * @internal
 */
export declare function useFetchWithPaymentCore(client: ThirdwebClient, options?: UseFetchWithPaymentOptions, showErrorModal?: ShowErrorModalCallback, showConnectModal?: ShowConnectModalCallback): {
    data: undefined;
    variables: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isPending: false;
    isSuccess: false;
    status: "idle";
    mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
    mutateAsync: import("@tanstack/react-query").UseMutateAsyncFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    fetchWithPayment: (input: RequestInfo, init?: RequestInit) => Promise<unknown>;
} | {
    data: undefined;
    variables: {
        input: RequestInfo;
        init?: RequestInit;
    };
    error: null;
    isError: false;
    isIdle: false;
    isPending: true;
    isSuccess: false;
    status: "pending";
    mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
    mutateAsync: import("@tanstack/react-query").UseMutateAsyncFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    fetchWithPayment: (input: RequestInfo, init?: RequestInit) => Promise<unknown>;
} | {
    data: undefined;
    error: Error;
    variables: {
        input: RequestInfo;
        init?: RequestInit;
    };
    isError: true;
    isIdle: false;
    isPending: false;
    isSuccess: false;
    status: "error";
    mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
    mutateAsync: import("@tanstack/react-query").UseMutateAsyncFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    fetchWithPayment: (input: RequestInfo, init?: RequestInit) => Promise<unknown>;
} | {
    data: unknown;
    error: null;
    variables: {
        input: RequestInfo;
        init?: RequestInit;
    };
    isError: false;
    isIdle: false;
    isPending: false;
    isSuccess: true;
    status: "success";
    mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
    mutateAsync: import("@tanstack/react-query").UseMutateAsyncFunction<unknown, Error, {
        input: RequestInfo;
        init?: RequestInit;
    }, unknown>;
    fetchWithPayment: (input: RequestInfo, init?: RequestInit) => Promise<unknown>;
};
export {};
//# sourceMappingURL=useFetchWithPaymentCore.d.ts.map
const TIMEOUT = "timeout";
export function getTimeoutSignal(timeoutMs) {
    const controller = new AbortController();
    const abortId = setTimeout(() => controller.abort(TIMEOUT), timeoutMs);
    return { signal: controller.signal, abortId };
}
export function anySignal(...args) {
    const signals = (args.length === 1 && Array.isArray(args[0]) ? args[0] : args);
    const controller = new AbortController();
    for (const signal of signals) {
        if (signal.aborted) {
            controller.abort(signal?.reason);
            break;
        }
        signal.addEventListener("abort", () => controller.abort(signal?.reason), {
            signal: controller.signal,
        });
    }
    return controller.signal;
}
//# sourceMappingURL=signals.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceKey = exports.setServiceKey = exports.getThirdwebBaseUrl = exports.getThirdwebDomains = exports.setThirdwebDomains = exports.DEFAULT_RPC_URL = void 0;
exports.DEFAULT_RPC_URL = "rpc.thirdweb.com";
const DEFAULT_SOCIAL_URL = "social.thirdweb.com";
const DEFAULT_IN_APP_WALLET_URL = "embedded-wallet.thirdweb.com";
const DEFAULT_PAY_URL = "pay.thirdweb.com";
const DEFAULT_STORAGE_URL = "storage.thirdweb.com";
const DEFAULT_BUNDLER_URL = "bundler.thirdweb.com";
const DEFAULT_ANALYTICS_URL = "c.thirdweb.com";
const DEFAULT_INSIGHT_URL = "insight.thirdweb.com";
const DEFAULT_ENGINE_CLOUD_URL = "engine.thirdweb.com";
const DEFAULT_BRIDGE_URL = "bridge.thirdweb.com";
let domains = {
    analytics: DEFAULT_ANALYTICS_URL,
    bridge: DEFAULT_BRIDGE_URL,
    bundler: DEFAULT_BUNDLER_URL,
    engineCloud: DEFAULT_ENGINE_CLOUD_URL,
    inAppWallet: DEFAULT_IN_APP_WALLET_URL,
    insight: DEFAULT_INSIGHT_URL,
    pay: DEFAULT_PAY_URL,
    rpc: exports.DEFAULT_RPC_URL,
    social: DEFAULT_SOCIAL_URL,
    storage: DEFAULT_STORAGE_URL,
};
const setThirdwebDomains = (DomainOverrides) => {
    domains = {
        analytics: DomainOverrides.analytics ?? DEFAULT_ANALYTICS_URL,
        bridge: DomainOverrides.bridge ?? DEFAULT_BRIDGE_URL,
        bundler: DomainOverrides.bundler ?? DEFAULT_BUNDLER_URL,
        engineCloud: DomainOverrides.engineCloud ?? DEFAULT_ENGINE_CLOUD_URL,
        inAppWallet: DomainOverrides.inAppWallet ?? DEFAULT_IN_APP_WALLET_URL,
        insight: DomainOverrides.insight ?? DEFAULT_INSIGHT_URL,
        pay: DomainOverrides.pay ?? DEFAULT_PAY_URL,
        rpc: DomainOverrides.rpc ?? exports.DEFAULT_RPC_URL,
        social: DomainOverrides.social ?? DEFAULT_SOCIAL_URL,
        storage: DomainOverrides.storage ?? DEFAULT_STORAGE_URL,
    };
};
exports.setThirdwebDomains = setThirdwebDomains;
/**
 * @internal
 */
const getThirdwebDomains = () => {
    return domains;
};
exports.getThirdwebDomains = getThirdwebDomains;
/**
 * @internal
 */
const getThirdwebBaseUrl = (service) => {
    const origin = domains[service];
    if (origin.startsWith("localhost")) {
        return `http://${origin}`;
    }
    return `https://${origin}`;
};
exports.getThirdwebBaseUrl = getThirdwebBaseUrl;
let serviceKey = null;
const setServiceKey = (key) => {
    serviceKey = key;
};
exports.setServiceKey = setServiceKey;
const getServiceKey = () => {
    return serviceKey;
};
exports.getServiceKey = getServiceKey;
//# sourceMappingURL=domains.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayBuyHistoryEndpoint = exports.getPayBuyWithCryptoHistoryEndpoint = exports.getPayBuyWithFiatHistoryEndpoint = void 0;
const domains_js_1 = require("../../utils/domains.js");
const getPayBaseUrl = () => {
    const payDomain = (0, domains_js_1.getThirdwebDomains)().pay;
    return payDomain.startsWith("localhost")
        ? `http://${payDomain}`
        : `https://${payDomain}`;
};
/**
 * Endpoint to get history of "Buy with Fiat" transactions for given wallet address.
 * @internal
 */
const getPayBuyWithFiatHistoryEndpoint = () => `${getPayBaseUrl()}/buy-with-fiat/history/v1`;
exports.getPayBuyWithFiatHistoryEndpoint = getPayBuyWithFiatHistoryEndpoint;
/**
 * Endpoint to get a "Buy with Crypto" transaction history for a given wallet address.
 * @internal
 */
const getPayBuyWithCryptoHistoryEndpoint = () => `${getPayBaseUrl()}/buy-with-crypto/history/v1`;
exports.getPayBuyWithCryptoHistoryEndpoint = getPayBuyWithCryptoHistoryEndpoint;
/**
 * Endpoint to get buy history for a given wallet address.
 * This includes both "Buy with Crypto" and "Buy with Fiat" transactions.
 * @internal
 */
const getPayBuyHistoryEndpoint = () => `${getPayBaseUrl()}/wallet/history/v1`;
exports.getPayBuyHistoryEndpoint = getPayBuyHistoryEndpoint;
//# sourceMappingURL=definitions.js.map
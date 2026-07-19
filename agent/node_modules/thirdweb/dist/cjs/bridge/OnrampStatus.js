"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = status;
const domains_js_1 = require("../utils/domains.js");
const fetch_js_1 = require("../utils/fetch.js");
const Errors_js_1 = require("./types/Errors.js");
/**
 * Retrieves the status of an Onramp session created via {@link Bridge.Onramp.prepare}. The
 * status will include any on-chain transactions that have occurred as a result of the onramp
 * as well as any arbitrary `purchaseData` that was supplied when the onramp was
 * prepared.
 *
 * @example
 * ```typescript
 * import { Bridge } from "thirdweb";
 *
 * const onrampStatus = await Bridge.Onramp.status({
 *   id: "022218cc-96af-4291-b90c-dadcb47571ec",
 *   client: thirdwebClient,
 * });
 *
 * // Possible results:
 * // {
 * //   status: "CREATED",
 * //   transactions: [],
 * //   purchaseData: {
 * //     orderId: "abc-123",
 * //   },
 * // }
 * //
 * // or
 * // {
 * //   status: "PENDING",
 * //   transactions: [],
 * //   purchaseData: {
 * //     orderId: "abc-123",
 * //   },
 * // }
 * //
 * // or
 * // {
 * //   status: "COMPLETED",
 * //   transactions: [
 * //     {
 * //       chainId: 1,
 * //       transactionHash:
 * //         "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
 * //     },
 * //   ],
 * //   purchaseData: {
 * //     orderId: "abc-123",
 * //   },
 * // }
 * ```
 *
 * @param options - The options for fetching the onramp status.
 * @param options.id - The UUID returned from {@link Bridge.Onramp.prepare}.
 * @param options.client - Your thirdweb client instance.
 *
 * @returns A promise that resolves to the status of the onramp session.
 *
 * @throws Will throw an error if there is an issue fetching the status.
 * @bridge Onramp
 * @beta
 */
async function status(options) {
    const { id, client } = options;
    const clientFetch = (0, fetch_js_1.getClientFetch)(client);
    const url = new URL(`${(0, domains_js_1.getThirdwebBaseUrl)("bridge")}/v1/onramp/status`);
    url.searchParams.set("id", id);
    const response = await clientFetch(url.toString());
    if (!response.ok) {
        const errorJson = await response.json();
        throw new Errors_js_1.ApiError({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status,
        });
    }
    const { data } = await response.json();
    return data;
}
//# sourceMappingURL=OnrampStatus.js.map
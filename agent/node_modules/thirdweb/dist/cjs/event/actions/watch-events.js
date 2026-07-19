"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchContractEvents = watchContractEvents;
const watchBlockNumber_js_1 = require("../../rpc/watchBlockNumber.js");
const retry_js_1 = require("../../utils/retry.js");
const get_events_js_1 = require("./get-events.js");
/**
 * Listens for  contract events from the blockchain.
 * @param options - The options for retrieving contract events.
 * @returns The unwatch function.
 * @example
 * ### Listen to all events for a contract
 * ```ts
 * import { watchContractEvents } from "thirdweb";
 * const unwatch = watchContractEvents({
 *  contract: myContract,
 *  onEvents: (events) => {
 *   // do something with the events
 *  },
 * });
 * ```
 *
 * ### Listen to specific events for a contract
 * ```ts
 * import { prepareEvent, watchContractEvents } from "thirdweb";
 * const myEvent = prepareEvent({
 *  event: "event MyEvent(uint256 myArg)",
 * });
 * const events = await watchContractEvents({
 *  contract: myContract,
 *  events: [myEvent],
 *  onEvents: (events) => {
 *   // do something with the events
 *  },
 * });
 * ```
 * @contract
 */
function watchContractEvents(options) {
    // returning this returns the underlying "unwatch" function
    return (0, watchBlockNumber_js_1.watchBlockNumber)({
        ...options.contract,
        latestBlockNumber: options.latestBlockNumber,
        /**
         * This function is called every time a new block is mined.
         * @param blockNumber - The block number of the new block.
         * @returns A promise that resolves when the function is finished.
         * @internal
         */
        onNewBlockNumber: async (blockNumber) => {
            const logs = await (0, retry_js_1.retry)(async () => (0, get_events_js_1.getContractEvents)({
                ...options,
                // fromBlock is inclusive
                fromBlock: blockNumber,
                // toBlock is inclusive
                toBlock: blockNumber,
                useIndexer: false,
            }), {
                delay: 500,
                retries: 3,
            });
            // if there were any logs associated with our event(s)
            if (logs.length) {
                options.onEvents(logs);
            }
        },
    });
}
//# sourceMappingURL=watch-events.js.map
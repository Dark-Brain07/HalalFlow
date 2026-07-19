import type { ThirdwebClient } from "../client/client.js";
import type { AsyncStorage } from "../utils/storage/AsyncStorage.js";
import type { Account } from "../wallets/interfaces/wallet.js";
import { type RequestedPaymentRequirements } from "./schemas.js";
/**
 * Creates and encodes a payment header for the given client and payment requirements.
 *
 * @param client - The signer wallet instance used to create the payment header
 * @param x402Version - The version of the X402 protocol to use
 * @param paymentRequirements - The payment requirements containing scheme and network information
 * @param storage - Optional storage for caching permit signatures (for "upto" scheme)
 * @returns A promise that resolves to the encoded payment header string
 */
export declare function createPaymentHeader(client: ThirdwebClient, account: Account, paymentRequirements: RequestedPaymentRequirements, x402Version: number, storage?: AsyncStorage): Promise<string>;
//# sourceMappingURL=sign.d.ts.map
import type { Address } from "../../../utils/address.js";
import type { EIP712SerializedTransaction, EIP712TransactionOptions } from "../../prepare-transaction.js";
import type { SerializableTransaction } from "../../serialize-transaction.js";
export type EIP721TransactionSerializable = SerializableTransaction & {
    from: Address;
} & EIP712TransactionOptions;
export declare const gasPerPubdataDefault = 50000n;
export declare const getEip712Domain: (transaction: EIP721TransactionSerializable) => {
    domain: {
        chainId: number | undefined;
        name: string;
        version: string;
    };
    message: EIP712SerializedTransaction;
    primaryType: string;
    types: {
        Transaction: {
            name: string;
            type: string;
        }[];
    };
};
//# sourceMappingURL=getEip721Domain.d.ts.map
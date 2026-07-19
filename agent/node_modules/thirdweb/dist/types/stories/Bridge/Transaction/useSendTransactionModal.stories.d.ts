import type { Meta } from "@storybook/react";
import { type PreparedTransaction } from "../../../transaction/prepare-transaction.js";
declare const meta: Meta<typeof Variant>;
export default meta;
export declare const BuyAndExecuteTx: {
    args: {
        transaction: PreparedTransaction<[], import("abitype").AbiFunction, import("../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
    };
};
export declare const DepositAndExecuteTx: {
    args: {
        transaction: PreparedTransaction<[], import("abitype").AbiFunction, import("../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
    };
};
declare function Variant(props: {
    transaction: PreparedTransaction;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=useSendTransactionModal.stories.d.ts.map
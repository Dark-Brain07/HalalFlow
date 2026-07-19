"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUsage = BasicUsage;
exports.BasicUsageWithMetadata = BasicUsageWithMetadata;
exports.FundWallet = FundWallet;
exports.FundWalletWithMetadata = FundWalletWithMetadata;
exports.FundWalletWithOptions = FundWalletWithOptions;
exports.FundWalletERC20 = FundWalletERC20;
exports.DirectPayment = DirectPayment;
exports.DirectPaymentERC20 = DirectPaymentERC20;
exports.DirectPaymentWithMetadata = DirectPaymentWithMetadata;
exports.Transaction = Transaction;
exports.TransactionWithMetadata = TransactionWithMetadata;
exports.LightMode = LightMode;
exports.CustomLightTheme = CustomLightTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const base_js_1 = require("../chains/chain-definitions/base.js");
const polygon_js_1 = require("../chains/chain-definitions/polygon.js");
const index_js_1 = require("../react/core/design-system/index.js");
const PayEmbed_js_1 = require("../react/web/ui/PayEmbed.js");
const prepare_transaction_js_1 = require("../transaction/prepare-transaction.js");
const units_js_1 = require("../utils/units.js");
const utils_js_1 = require("./utils.js");
const meta = {
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Connect/PayEmbed",
};
function BasicUsage() {
    return (0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient });
}
function BasicUsageWithMetadata() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            metadata: {
                name: "this is a title",
                // This is not shown in UI - TODO fix this
                description: "this is a description",
            },
        } }));
}
function FundWallet() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "fund_wallet",
        } }));
}
function FundWalletWithMetadata() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "fund_wallet",
            metadata: {
                name: "this is a title",
                // This is not shown in UI - TODO fix this
                description: "this is a description",
            },
        } }));
}
function FundWalletWithOptions() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "fund_wallet",
            prefillBuy: {
                amount: "0.123",
                chain: polygon_js_1.polygon,
            },
        } }));
}
function FundWalletERC20() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "fund_wallet",
            prefillBuy: {
                amount: "0.123",
                chain: base_js_1.base,
                token: {
                    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                    name: "USDC",
                    // This icon is not being used - TODO fix this, either remove this prop or use it
                    icon: "https://picsum.photos/200/200",
                },
            },
        } }));
}
function DirectPayment() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "direct_payment",
            paymentInfo: {
                amount: "0.123",
                chain: polygon_js_1.polygon,
                sellerAddress: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
            },
        } }));
}
function DirectPaymentERC20() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "direct_payment",
            paymentInfo: {
                amount: "0.123",
                chain: base_js_1.base,
                sellerAddress: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
                token: {
                    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                    name: "USDC",
                    // This icon is not being used - TODO fix this, either remove this prop or use it
                    icon: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png",
                },
            },
        } }));
}
function DirectPaymentWithMetadata() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "direct_payment",
            paymentInfo: {
                amount: "0.123",
                chain: polygon_js_1.polygon,
                sellerAddress: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
            },
            metadata: {
                name: "this is a title",
                description: "this is a description",
            },
        } }));
}
function Transaction() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            mode: "transaction",
            transaction: (0, prepare_transaction_js_1.prepareTransaction)({
                to: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
                chain: polygon_js_1.polygon,
                client: utils_js_1.storyClient,
                value: (0, units_js_1.toWei)("0.123"),
            }),
        } }));
}
function TransactionWithMetadata() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, payOptions: {
            metadata: {
                name: "this is a title",
                description: "this is a description",
            },
            mode: "transaction",
            transaction: (0, prepare_transaction_js_1.prepareTransaction)({
                to: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
                chain: polygon_js_1.polygon,
                client: utils_js_1.storyClient,
                value: (0, units_js_1.toWei)("0.123"),
            }),
        } }));
}
function LightMode() {
    return (0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, theme: "light" });
}
function CustomLightTheme() {
    return ((0, jsx_runtime_1.jsx)(PayEmbed_js_1.PayEmbed, { client: utils_js_1.storyClient, theme: (0, index_js_1.lightTheme)({
            colors: {
                modalBg: "#FFFFF0",
                tertiaryBg: "#DBE4C9",
                borderColor: "#8AA624",
                secondaryText: "#3E3F29",
                accentText: "#E43636",
            },
        }) }));
}
exports.default = meta;
//# sourceMappingURL=PayEmbed.stories.js.map
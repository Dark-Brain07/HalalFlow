"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const WindowAdapter_js_1 = require("../../react/web/adapters/WindowAdapter.js");
const StepRunner_js_1 = require("../../react/web/ui/Bridge/StepRunner.js");
const utils_js_1 = require("../utils.js");
const fixtures_js_1 = require("./fixtures.js");
const meta = {
    args: {
        client: utils_js_1.storyClient,
        onCancel: () => { },
        onComplete: (_completedStatuses) => { },
        wallet: fixtures_js_1.STORY_MOCK_WALLET,
        windowAdapter: WindowAdapter_js_1.webWindowAdapter,
        title: undefined,
        autoStart: true,
        onBack: undefined,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
    },
    component: StepRunner_js_1.StepRunner,
    decorators: [
        (Story) => ((0, jsx_runtime_1.jsx)(utils_js_1.ModalThemeWrapper, { children: (0, jsx_runtime_1.jsx)(Story, {}) })),
    ],
    parameters: {
        layout: "centered",
    },
    title: "Bridge/screens/StepRunner",
};
exports.default = meta;
exports.Basic = {
    args: {
        request: fixtures_js_1.simpleBuyRequest,
    },
};
//# sourceMappingURL=StepRunner.stories.js.map
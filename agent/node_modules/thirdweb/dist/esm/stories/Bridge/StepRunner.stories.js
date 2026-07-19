import { jsx as _jsx } from "react/jsx-runtime";
import { webWindowAdapter } from "../../react/web/adapters/WindowAdapter.js";
import { StepRunner } from "../../react/web/ui/Bridge/StepRunner.js";
import { ModalThemeWrapper, storyClient } from "../utils.js";
import { STORY_MOCK_WALLET, simpleBuyQuote, simpleBuyRequest, } from "./fixtures.js";
const meta = {
    args: {
        client: storyClient,
        onCancel: () => { },
        onComplete: (_completedStatuses) => { },
        wallet: STORY_MOCK_WALLET,
        windowAdapter: webWindowAdapter,
        title: undefined,
        autoStart: true,
        onBack: undefined,
        preparedQuote: simpleBuyQuote,
    },
    component: StepRunner,
    decorators: [
        (Story) => (_jsx(ModalThemeWrapper, { children: _jsx(Story, {}) })),
    ],
    parameters: {
        layout: "centered",
    },
    title: "Bridge/screens/StepRunner",
};
export default meta;
export const Basic = {
    args: {
        request: simpleBuyRequest,
    },
};
//# sourceMappingURL=StepRunner.stories.js.map
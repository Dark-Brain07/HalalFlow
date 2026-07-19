"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrerequisites = checkPrerequisites;
const node_child_process_1 = require("node:child_process");
function checkPrerequisites(spinner, cmd, args = ["--version"], name = cmd) {
    try {
        const res = (0, node_child_process_1.spawnSync)(cmd, args, { encoding: "utf-8" });
        if (res.error && res.error.code === "ENOENT") {
            spinner.fail(`Error: ${name} is not installed or not in PATH.\n` +
                `Install it and try again.`);
            process.exit(1);
        }
        if (res.status !== 0) {
            spinner.fail(`Error: ${name} returned a non-zero exit code (${res.status}).`);
            process.exit(1);
        }
        const ver = res.stdout.trim().split("\n")[0];
        spinner.succeed(`${name} detected (${ver}).`);
    }
    catch (err) {
        spinner.fail(`Error while checking ${name}: ${err}`);
        process.exit(1);
    }
}
//# sourceMappingURL=check-prerequisites.js.map
import { agenticWalletMonitor } from './monitor';
import { executeX402Settlement } from './x402-client';

// Entry point for the Node.js Agent
async function runAgentLoop() {
    console.log("=========================================");
    console.log("=== HalalFlow Agent Service Started ===");
    console.log("=========================================\n");
    
    // 1. The Autonomous Cron Job (Monitoring Phase)
    // In production, this would use 'node-cron' for daily execution.
    // For this MVP, we use setInterval to run every 10 seconds to demonstrate the loop.
    console.log("[Cron] Scheduling wallet monitor to run periodically...");
    
    // Initial run immediately
    await agenticWalletMonitor("0xABC123");

    // The Cron Loop
    setInterval(async () => {
        await agenticWalletMonitor("0xABC123");
    }, 10000); // 10 seconds for demo purposes


    // 2. The Execution Phase (After Human Approval)
    // Simulate the user approving the proposal from the frontend after 5 seconds.
    setTimeout(async () => {
        const userApproved = true;
        if (userApproved) {
            console.log("\n[API Webhook] Received human approval (Niyyah). Handing off to Agent Executor.");
            // The "Act" part of the loop
            await executeX402Settlement("0xABC123", "0x1234567890abcdef1234567890abcdef12345678", 30.00);
        }
    }, 5000);
}

runAgentLoop();

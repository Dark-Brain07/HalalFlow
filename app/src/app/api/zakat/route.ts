import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userAddress, recipientAddress, amount } = body;
        
        console.log("\n=========================================");
        console.log(`[Agent Webhook] Human Approval (Niyyah) Received!`);
        console.log(`[Agent] User: ${userAddress}`);
        console.log("=========================================\n");

        console.log(`[x402 Client] Agent taking control. Initiating autonomous settlement...`);
        console.log(`[x402 Client] Routing ${amount} USDm to ${recipientAddress} via x402.celo.org`);
        
        // Simulate network delay for the x402 facilitator API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log(`[x402 Client] SUCCESS! Transaction settled on Celo via x402 facilitator.`);
        
        return NextResponse.json({ success: true, txHash: "0xMockTxHash123456789" });
    } catch (e) {
        return NextResponse.json({ success: false, error: "x402 settlement failed" }, { status: 500 });
    }
}

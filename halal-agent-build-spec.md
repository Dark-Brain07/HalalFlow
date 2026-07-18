# BUILD PROMPT — HalalFlow: Agentic Halal Remittance & Zakat Protocol on Celo

> Paste this entire document into Antigravity (or any coding agent) as the build spec.
> It is written to be self-contained: architecture, contracts, agent logic, frontend, integrations, and submission steps for the **Celo Agentic Payments & DeFAI Hackathon**.

---

## 0. One-line pitch

An autonomous agent that lets users save, remit, and give charitably on Celo **without riba (interest), gharar (excessive uncertainty), or haram sectors** — and automatically calculates and settles Zakat/Sadaqah on-chain via x402 micropayments.

## 1. Why this project (context for the agent building it)

- Hackathon runs Jul 7 – Aug 3, 2026 on **Celo** (Ethereum L2, fast/low-cost, 16M+ MiniPay users).
- Three prize tracks we are targeting:
  - **Track 1 — Most Revenue Generated ($3,000):** win by generating the most on-chain volume tagged with our Attribution Tag.
  - **Track 2 — Most x402 Payments ($1,000):** win by settling the most x402 micropayments (raw count).
  - (Track 3 Askbots and Track 4 Aigora are optional stretch goals, not core scope.)
- Differentiation: existing leaderboard projects (bill-pay agents, generic remittance agents, stablecoin swap agents) do not address Sharia-compliant finance. MiniPay's core user base overlaps heavily with Muslim-majority markets, so this is a real, underserved niche — not just a hackathon gimmick.
- Registration is mandatory day one: `npx skills add https://celobuilders.xyz`, get the ERC-8021 attribution tag, and use it on every transaction from day one (Track 1 leaderboard only counts tagged transactions).

## 2. Product scope (MVP for hackathon deadline)

Build three integrated modules. Ship in this order so there is always a working, demoable product at every checkpoint.

### Module A — Halal Remittance Router (build first, drives Track 1 volume)
Users send stablecoins (cUSD/USDC/USDT on Celo) cross-border with a **transparent flat fee** (Murabaha-style cost-plus, disclosed upfront) instead of a hidden FX spread that functions like interest.

### Module B — Zakat & Sadaqah Agent (drives Track 2 volume, the standout feature)
Agent tracks a user's Celo wallet balance, compares it against the current Nisab threshold (gold/silver price via oracle), calculates 2.5% Zakat due annually, and — on user approval — settles the payment to a verified charity wallet **via the x402 facilitator**. Also supports recurring micro-Sadaqah (round-up donations on every remittance).

### Module C — Halal Screening Registry (build last, can be a simple allowlist for MVP)
An on-chain/off-chain registry that classifies Celo pools/tokens as halal-compliant (no interest-bearing lending, no leverage/derivatives, no gambling/alcohol-linked assets) and gates which venues Modules A/B can route funds through. MVP version = a hardcoded/admin-curated allowlist contract; stretch goal = LLM-assisted classification pipeline.

### Optional stretch — Qard Hasan Pool
Interest-free community micro-lending: lenders deposit into a pool, borrowers draw interest-free loans, repayment tracked on-chain, optional voluntary Mudarabah profit-sharing instead of interest.

---

## 3. Architecture overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js PWA)                       │
│   MiniPay-compatible web app · Wallet connect (Para / Valora)        │
│   Screens: Remit · Zakat Calculator · Sadaqah · Wallet Dashboard     │
└───────────────┬─────────────────────────────────┬────────────────────┘
                │                                 │
                ▼                                 ▼
┌───────────────────────────┐      ┌─────────────────────────────────┐
│   AGENT SERVICE (Node.js)  │      │   API LAYER (Next.js API routes  │
│   - ERC-8004 registered    │◄────►│   or Fastify backend)           │
│   - Zakat/Nisab calculator │      │   - /remit  /zakat  /sadaqah    │
│   - Wallet monitor (cron)  │      │   - /screen (halal check)        │
│   - Decision + approval    │      │   - Auth via wallet signature    │
│     flow (agent proposes,  │      └───────────────┬───────────────────┘
│     user confirms)         │                      │
└───────────┬────────────────┘                      │
            │                                         ▼
            │                          ┌───────────────────────────────┐
            │                          │   x402 FACILITATOR CLIENT      │
            │                          │   (x402.celo.org)               │
            │                          │   - Settles Zakat/Sadaqah as    │
            │                          │     pay-per-request payments    │
            │                          └───────────────┬───────────────┘
            ▼                                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         CELO L2 (on-chain)                           │
│                                                                       │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐ │
│  │ RemittanceRouter    │  │ ZakatVault         │  │ HalalRegistry     │ │
│  │ .sol                │  │ .sol               │  │ .sol              │ │
│  │ - flat-fee transfer │  │ - nisab check      │  │ - allowlist of    │ │
│  │ - emits Attribution │  │ - 2.5% calc        │  │   halal tokens/   │ │
│  │   Tag (ERC-8021)    │  │ - payout to charity│  │   pools           │ │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘ │
│                                                                       │
│  Stablecoins: cUSD, cEUR, USDC, USDT   ·   ERC-8004 agent identity    │
└─────────────────────────────────────────────────────────────────────┘
```

### Data flow — Zakat payment (the key differentiator)

1. Cron job (or user-triggered) in Agent Service reads wallet balance via Celo RPC.
2. Agent fetches current gold price (oracle/API) → computes Nisab threshold in stablecoin terms.
3. If balance ≥ Nisab and a lunar year has elapsed since last payment (tracked in `ZakatVault`), agent computes `zakatDue = eligibleBalance * 0.025`.
4. Agent presents the calculation to the user in the frontend for one-tap approval (never auto-executes without consent — this matters for trust and for judges).
5. On approval, API layer calls the x402 facilitator to settle payment to a verified charity `payTo` wallet.
6. Every settlement is automatically counted for Track 2 (no tagging needed — the facilitator settles directly).
7. `RemittanceRouter` calls also carry the Attribution Tag for Track 1.

---

## 4. Smart contracts (Solidity, deploy to Celo)

### 4.1 `RemittanceRouter.sol`
- `sendRemittance(address token, address to, uint256 amount, bytes calldata attributionTag)`
- Deducts a transparent flat fee (config'd in basis points, e.g. 50 bps, disclosed in UI before signing — this is the Murabaha-style cost-plus structure, not a hidden spread).
- Emits `RemittanceSent(from, to, token, amount, fee, attributionTag)`.
- Uses `@celo/attribution-tags` SDK's `toDataSuffix(['halalflow', 'ASSIGNED_TAG'])` appended to calldata.

### 4.2 `ZakatVault.sol`
- `recordBalanceSnapshot(address user)` — off-chain agent calls this periodically (or on login) to snapshot balance for Nisab tracking.
- `lastZakatPaid(address user) → uint256 timestamp`
- `calculateZakatDue(address user) → uint256` (view function, mirrors agent's off-chain calc for auditability).
- `payZakat(address user, address recipient, uint256 amount)` — only callable after user signature/approval; forwards to x402 settlement, updates `lastZakatPaid`. Do not add a recipient allowlist check in this contract — recipient legitimacy is the user's responsibility, not enforced on-chain.
- Emits `ZakatPaid(user, recipient, amount, timestamp)`.

### 4.3 `HalalRegistry.sol`
- `isHalal(address tokenOrPool) → bool`
- `addToRegistry(address entity, bool halal)` — admin-gated for MVP (multisig or deployer key); stretch goal: DAO-style voting or agent-curated list with evidence hash.
- `RemittanceRouter` and any yield/lending module check this before routing funds.

### 4.4 (Stretch) `QardHasanPool.sol`
- `deposit(uint256 amount)`, `requestLoan(uint256 amount)`, `repay(uint256 amount)`.
- Zero interest by construction — no interest rate parameter exists in the contract at all (this is the enforcement mechanism, not just a policy).
- Optional voluntary `tip(uint256 amount)` function for lenders who want to donate/profit-share — never mandatory, never advertised as guaranteed return (avoids both riba and gharar).

---

## 5. Agent design (off-chain service)

- **Framework:** any agent framework is allowed per hackathon rules — recommend LangGraph, or a lightweight custom TypeScript agent loop if you want full control and speed.
- **Identity:** register the agent on **ERC-8004** (agent wallet standard) — required for the submission's registry link and for legitimacy/trust signaling to judges.
- **Core responsibilities:**
  1. Wallet balance monitoring (poll Celo RPC on interval, or subscribe to events).
  2. Nisab threshold calculation (fetch gold/silver spot price from a reliable price API, convert to stablecoin terms).
  3. Zakat due calculation, presented for human-in-the-loop approval (do NOT auto-execute financial transfers without explicit user confirmation — this is both a Sharia governance requirement — Zakat intent, "niyyah", should be affirmed by the payer — and good agent-safety practice).
  4. Halal screening lookups against `HalalRegistry` before routing any remittance/lending flow.
  5. x402 payment settlement calls for Zakat/Sadaqah.
  6. Attribution tag injection on every on-chain transaction.
- **Trigger model:** cron (daily check) + user-initiated ("check my Zakat now") + event-based (on large incoming remittance, offer round-up Sadaqah).

---

## 6. x402 integration (Track 2)

- Facilitator endpoint: `x402.celo.org`.
- Flow: agent/backend makes an HTTP 402-gated request (e.g., "settle zakat payment", "settle sadaqah round-up") → facilitator handles the stablecoin settlement transaction directly to the configured `payTo` wallet.
- **Important:** register your agent's `payTo` wallet in your hackathon submission — every settlement to/from it is counted automatically, retroactive to July 1. No tagging needed for x402 settlements (the facilitator, not your contract, sends that transaction).
- Design for volume: make Sadaqah micropayments frequent and small (e.g., round up every remittance to the nearest dollar and donate the difference) — this legitimately and naturally maximizes x402 settlement count rather than gaming it.

---

## 7. Frontend

- **Stack:** Next.js (App Router) + Tailwind, deployed as a MiniPay-compatible PWA (MiniPay opens web apps directly, no native app store dependency).
- **Wallet:** Para (smart wallet infra for agents) or standard Celo wallet connect (Valora/MiniPay injected provider).
- **Key screens:**
  1. **Dashboard** — balance, halal-compliance badge on holdings, upcoming Zakat estimate.
  2. **Remit** — send stablecoins cross-border, flat fee shown transparently before signing.
  3. **Zakat Calculator** — Nisab threshold, eligible balance, 2.5% due, charity selector, one-tap approve.
  4. **Sadaqah** — round-up toggle, recurring micro-donation settings.
  5. **Halal Registry viewer** — shows which tokens/pools are screened as compliant and why.

---

## 8. Repo structure

```
halalflow/
├── contracts/
│   ├── RemittanceRouter.sol
│   ├── ZakatVault.sol
│   ├── HalalRegistry.sol
│   ├── QardHasanPool.sol        (stretch)
│   └── test/                    (Foundry or Hardhat tests)
├── agent/
│   ├── src/
│   │   ├── monitor.ts           (wallet/balance polling)
│   │   ├── nisab.ts             (gold price + threshold calc)
│   │   ├── zakat-engine.ts      (due calculation)
│   │   ├── x402-client.ts       (facilitator integration)
│   │   ├── attribution.ts       (tag injection helper)
│   │   └── erc8004-identity.ts  (agent registration)
│   └── package.json
├── app/                          (Next.js frontend)
│   ├── app/
│   │   ├── dashboard/
│   │   ├── remit/
│   │   ├── zakat/
│   │   ├── sadaqah/
│   │   └── api/
│   │       ├── remit/route.ts
│   │       ├── zakat/route.ts
│   │       └── screen/route.ts
│   └── package.json
├── scripts/
│   ├── deploy.ts
│   └── register-attribution-tag.ts
└── README.md
```

---

## 9. Dependencies / integrations checklist

- [ ] `npx skills add https://celobuilders.xyz` — register project, get ERC-8021 attribution tag (do this on day one).
- [ ] `@celo/attribution-tags` npm package — tag every on-chain tx.
- [ ] Celo RPC (mainnet or Alfajores testnet for dev, mainnet for the leaderboard-counted period).
- [ ] x402 facilitator (`x402.celo.org`) client integration.
- [ ] ERC-8004 agent registry — register agent identity, get registry link for submission.
- [ ] Para SDK (or Valora/MiniPay injected provider) for wallet connect.
- [ ] Gold/silver spot price API for Nisab calculation (any reliable market data provider).
- [ ] Hardhat or Foundry for contract dev/testing/deployment.

---

## 10. Build order / milestones

1. **Day 1:** Register via Celo Builders skill, get attribution tag. Scaffold repo. Deploy bare-bones `RemittanceRouter.sol` to testnet.
2. **Days 2–5:** Finish Module A (Halal Remittance) end-to-end on mainnet, tagged transactions flowing, visible on live leaderboard.
3. **Days 6–10:** Build Module B (Zakat/Sadaqah agent + `ZakatVault.sol` + x402 settlement). This is the standout feature — prioritize polish here.
4. **Days 11–14:** Build `HalalRegistry.sol` as a curated allowlist; wire screening checks into Module A/B.
5. **Remaining time:** Frontend polish, ERC-8004 registration, demo video, stretch goal (Qard Hasan pool) if time allows.
6. **By Aug 3, 09:00 GMT:** Submit via Celo Builders Skill — description, demo, X post tagging @CeloDevs + @Celo, ERC-8004 registry link, and (for Track 2) the agent/payTo wallet address.

---

## 11. Submission checklist (map back to hackathon rules)

- [ ] Attribution tag applied to every `RemittanceRouter` transaction from day one.
- [ ] Agent/payTo wallet address included in submission for Track 2 tracking.
- [ ] ERC-8004 registry link ready.
- [ ] Tweet/quote-tweet posted tagging @CeloDevs + @Celo with agent name, one-line description, and registry link.
- [ ] Project submitted through the Celo Builders Skill flow (choose hackathon → connect → answer questions → review draft → publish).
- [ ] Public GitHub repo linked.
- [ ] Demo showing: a remittance with visible flat fee, a full Zakat calculation + x402-settled payout, and the halal registry check gating a transaction.

---

## 12. Notes on the "halal" claims (be accurate, avoid overclaiming)

This is a hackathon MVP demonstrating Sharia-compliant *design patterns* (no interest rate mechanism in contracts, transparent flat fees instead of spreads, human-approved Zakat payments, curated halal asset allowlist). It is **not** a formal Sharia-board-certified financial product. In the pitch/demo, describe it as "designed around Islamic finance principles" rather than claiming official certification, unless you actually obtain a scholar/board review.

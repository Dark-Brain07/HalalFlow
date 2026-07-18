export function calculateZakatDue(eligibleBalance: number): number {
    // 2.5% obligatory charity
    return eligibleBalance * 0.025;
}

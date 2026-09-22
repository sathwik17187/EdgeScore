export class LocalFinancialAuditor {
  static auditAndScore(parsedLedger, parsedSms, merchantProfile) {
    const matchedTransactions = [];
    const unmatchedLedger = [];
    const unmatchedSms = [...parsedSms.transactions];

    let crossVerifiedVolume = 0;

    for (const lEntry of parsedLedger.entries) {
      const smsMatchIndex = unmatchedSms.findIndex(sms => {
        const amountDiff = Math.abs(sms.amount - lEntry.amount);
        const matchByAmount = amountDiff <= 5;
        const matchByParty = sms.party && lEntry.customerOrParty && 
          (sms.party.toLowerCase().includes(lEntry.customerOrParty.toLowerCase().split(' ')[0]) ||
           lEntry.customerOrParty.toLowerCase().includes(sms.party.toLowerCase().split(' ')[0]));
        return matchByAmount || matchByParty;
      });

      if (smsMatchIndex !== -1) {
        const matchedSms = unmatchedSms.splice(smsMatchIndex, 1)[0];
        matchedTransactions.push({
          ledgerId: lEntry.id,
          smsId: matchedSms.id,
          amount: lEntry.amount,
          party: lEntry.customerOrParty,
          verifiedVia: matchedSms.channel,
          type: lEntry.type
        });
        crossVerifiedVolume += lEntry.amount;
      } else {
        unmatchedLedger.push(lEntry);
      }
    }

    const digitalInflow = parsedSms.totalInflow;
    const ledgerCashInflow = parsedLedger.extractedMetrics.totalJama;
    const totalEstimatedMonthlyTurnover = Math.round((ledgerCashInflow + digitalInflow * 0.8) * 4.2);
    const cashDigitalRatio = digitalInflow > 0 
      ? `${Math.round((ledgerCashInflow / (ledgerCashInflow + digitalInflow)) * 100)}% Cash : ${Math.round((digitalInflow / (ledgerCashInflow + digitalInflow)) * 100)}% UPI`
      : "100% Cash";

    const reconciliationRate = parsedLedger.entries.length > 0 
      ? Math.round((matchedTransactions.length / parsedLedger.entries.length) * 100) 
      : 80;

    let baseScore = 620;
    baseScore += Math.min(120, Math.round(reconciliationRate * 1.2));
    baseScore += Math.min(90, Math.round((totalEstimatedMonthlyTurnover / 50000) * 80));
    baseScore = Math.max(350, Math.min(880, baseScore));

    let underwritingTier = "TIER_3_MICRO";
    let maxPreApprovedLoan = 10000;
    let interestRateMonthly = "1.35%";

    if (baseScore >= 780) {
      underwritingTier = "TIER_1_PRIME_MICRO";
      maxPreApprovedLoan = 35000;
      interestRateMonthly = "0.99%";
    } else if (baseScore >= 680) {
      underwritingTier = "TIER_2_STANDARD_MICRO";
      maxPreApprovedLoan = 20000;
      interestRateMonthly = "1.15%";
    }

    return {
      edgeScore: baseScore,
      underwritingTier,
      maxPreApprovedLoan,
      interestRateMonthly,
      estimatedMonthlyRevenue: totalEstimatedMonthlyTurnover,
      crossVerifiedVolume,
      cashDigitalRatio,
      reconciliationRate: `${reconciliationRate}%`,
      supplierDisciplineScore: "94%",
      matchedCount: matchedTransactions.length,
      unmatchedLedgerCount: unmatchedLedger.length,
      matchedTransactions,
      auditTimestamp: new Date().toISOString()
    };
  }
}

export class LocalSmsParser {
  static parseInbox(smsList) {
    const transactions = [];
    let totalInflow = 0;
    let totalOutflow = 0;

    for (const sms of smsList) {
      const parsed = this.parseMessage(sms);
      if (parsed) {
        transactions.push(parsed);
        if (parsed.type === "CREDIT") totalInflow += parsed.amount;
        if (parsed.type === "DEBIT") totalOutflow += parsed.amount;
      }
    }

    return {
      totalCount: smsList.length,
      parsedCount: transactions.length,
      totalInflow,
      totalOutflow,
      netCashFlow: totalInflow - totalOutflow,
      transactions
    };
  }

  static parseMessage(sms) {
    const text = sms.body || sms.text || "";
    let type = null;
    let amount = null;
    let party = "Unknown Party";
    let channel = "UPI";
    let reference = null;

    const creditMatches = /(?:credited|received|inflow|refund)/i.test(text);
    const debitMatches = /(?:debited|paid|sent|withdrawn)/i.test(text);

    if (creditMatches && !debitMatches) {
      type = "CREDIT";
    } else if (debitMatches) {
      type = "DEBIT";
    } else {
      return null;
    }

    const amountRegex = /(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d{1,2})?)/i;
    const amountMatch = text.match(amountRegex);
    if (amountMatch && amountMatch[1]) {
      amount = parseFloat(amountMatch[1].replace(/,/g, ''));
    } else {
      return null;
    }

    const refMatch = text.match(/(?:ref\s*(?:no)?|txn|UPI\/)\s*([A-Za-z0-9]+)/i);
    if (refMatch && refMatch[1]) {
      reference = refMatch[1];
    }

    const byMatch = text.match(/(?:from|by|to)\s+([A-Za-z0-9\s&]+?)(?:\s+(?:ref|via|on|bal|A\/C|\.))/i);
    if (byMatch && byMatch[1]) {
      party = byMatch[1].trim();
    }

    if (/Soundbox|SmartSpeaker|QR/i.test(text)) {
      channel = "QR_SOUNDBOX";
    } else if (/UPI/i.test(text)) {
      channel = "UPI_P2M";
    } else if (/NEFT|RTGS/i.test(text)) {
      channel = "BANK_TRANSFER";
    }

    return {
      id: `sms_txn_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: sms.timestamp || sms.time || new Date().toISOString(),
      sender: sms.sender,
      type,
      amount,
      party,
      channel,
      reference,
      rawSnippet: text.substring(0, 60) + "..."
    };
  }
}

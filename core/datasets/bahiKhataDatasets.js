export const MERCHANT_PRESETS = {
  sharma_kirana: {
    id: "sharma_kirana_delhi",
    merchantName: "Sharma General Store & Kirana",
    ownerName: "Ramesh Sharma",
    category: "Grocery & FMCG",
    location: "Chawri Bazar, Old Delhi",
    phone: "+91 98765 43210",
    establishedYear: 2018,
    dailyTransactionsCount: 65,
    claimedTurnover: "₹55,000 / month",
    ledgerPages: [
      {
        pageNumber: 1,
        dateRange: "01 Sep 2026 - 07 Sep 2026",
        title: "दैनिक बिक्री एवं उधारी रजिस्टर (Daily Sales & Udhar Khata)",
        entries: [
          { date: "01/09", customer: "Gupta Ji (Makan #4)", type: "UDHAR", item: "Aashirvaad Atta 10kg + Fortune Tel", amount: 1420, hindiText: "गुप्ता जी आटा + तेल बाक़ी", status: "PENDING" },
          { date: "01/09", customer: "Cash Counter (Galla)", type: "ROKAD_JAMA", item: "Morning & Evening Cash Sales", amount: 4850, hindiText: "दिन भर की नक़द गल्ला बिक्री", status: "SETTLED" },
          { date: "02/09", customer: "Sharma Dudh Dairy", type: "SUPPLIER_PAY", item: "Amul Milk 50 Crates", amount: 3200, hindiText: "दूध वाले का भुगतान", status: "SETTLED" },
          { date: "02/09", customer: "Raju Chai (Daily Khata)", type: "UDHAR", item: "Sugar 5kg + Chai Patti", amount: 580, hindiText: "राजू चाय पत्ती + चीनी उधार", status: "PENDING" },
          { date: "03/09", customer: "Mishra Tailor", type: "JAMA", item: "Purana Udhar Wapas", amount: 1200, hindiText: "मिश्रा जी पुराना हिसाब जमा", status: "SETTLED" },
          { date: "03/09", customer: "Cash Counter (Galla)", type: "ROKAD_JAMA", item: "Daily Counter Sales", amount: 5120, hindiText: "नक़द गल्ला", status: "SETTLED" },
          { date: "04/09", customer: "Sunil Electrician", type: "UDHAR", item: "Snacks + Cold Drinks", amount: 450, hindiText: "सुनील उधार", status: "PENDING" },
          { date: "05/09", customer: "Cash Counter (Galla)", type: "ROKAD_JAMA", item: "Daily Counter Sales", amount: 6200, hindiText: "शनिवार गल्ला", status: "SETTLED" },
          { date: "06/09", customer: "Gupta Ji (Makan #4)", type: "JAMA", item: "Udhar Paid via UPI", amount: 1420, hindiText: "गुप्ता जी UPI जमा", status: "SETTLED" },
          { date: "07/09", customer: "Wholesale Mandi Distributor", type: "SUPPLIER_PAY", item: "Dal + Rice Sacks", amount: 8500, hindiText: "मंडी थोक माल नक़द चेक", status: "SETTLED" }
        ],
        pageSummary: {
          totalJama: 18790,
          totalUdhar: 2450,
          totalSupplierPaid: 11700,
          netCashInHand: 7090
        }
      }
    ]
  },
  raju_chai: {
    id: "raju_chai_bengaluru",
    merchantName: "Raju Tea & Quick Bites",
    ownerName: "Rajender Kumar",
    category: "Street Food & Beverage",
    location: "Koramangala 5th Block, Bengaluru",
    phone: "+91 91234 56789",
    establishedYear: 2021,
    dailyTransactionsCount: 140,
    claimedTurnover: "₹38,000 / month",
    ledgerPages: [
      {
        pageNumber: 1,
        dateRange: "01 Sep 2026 - 07 Sep 2026",
        title: "चाय व नाश्ता दैनिक हिसाब (Tea Stall Daily Ledger)",
        entries: [
          { date: "01/09", customer: "Startup Techies Khata", type: "UDHAR", item: "Daily Tea 15 cups + Samosa", amount: 350, hindiText: "ऑफिस वाले चाय नाश्ता", status: "PENDING" },
          { date: "01/09", customer: "Daily Galla (UPI + Cash)", type: "ROKAD_JAMA", item: "Counter Sales", amount: 2400, hindiText: "रोज़ की बिक्री", status: "SETTLED" },
          { date: "02/09", customer: "Nandini Milk Depot", type: "SUPPLIER_PAY", item: "25L Milk Daily", amount: 1150, hindiText: "नंदिनी दूध का भुगतान", status: "SETTLED" },
          { date: "03/09", customer: "Daily Galla (UPI + Cash)", type: "ROKAD_JAMA", item: "Counter Sales", amount: 2850, hindiText: "बिक्री", status: "SETTLED" },
          { date: "04/09", customer: "Startup Techies Khata", type: "JAMA", item: "Weekly Settlement UPI", amount: 1400, hindiText: "ऑफिस चाय पूरा हिसाब जमा", status: "SETTLED" },
          { date: "05/09", customer: "Daily Galla (UPI + Cash)", type: "ROKAD_JAMA", item: "Friday Rush Sales", amount: 3600, hindiText: "शुक्रवार बिक्री", status: "SETTLED" }
        ],
        pageSummary: {
          totalJama: 10250,
          totalUdhar: 350,
          totalSupplierPaid: 2300,
          netCashInHand: 7950
        }
      }
    ]
  }
};

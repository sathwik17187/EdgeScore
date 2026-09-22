export const MERCHANT_DATASETS = {
  sharma_kirana: {
    id: "merchant_delhi_091",
    name: "Sharma General Store & Kirana",
    category: "Retail FMCG & Kirana",
    location: "Chawri Bazar, Delhi",
    phone: "+91 98765 43210",
    claimedTurnover: "₹55,000 / month",
    ledger: {
      title: "दैनिक बिक्री एवं उधारी रजिस्टर (Bahi-Khata Sheet)",
      dateRange: "01 Sep 2026 - 07 Sep 2026",
      entries: [
        { date: "01/09", name: "Gupta Ji (Makan #4)", type: "UDHAR", amount: 1420, hindiText: "गुप्ता जी आटा + तेल बाक़ी", status: "PENDING" },
        { date: "01/09", name: "Cash Galla Counter", type: "JAMA", amount: 4850, hindiText: "नक़द गल्ला रोकड़ जमा", status: "SETTLED" },
        { date: "02/09", name: "Sharma Dudh Dairy", type: "SUPPLIER_PAY", amount: 3200, hindiText: "दूध वाले का थोक भुगतान", status: "SETTLED" },
        { date: "02/09", name: "Raju Chaiwala", type: "UDHAR", amount: 580, hindiText: "राजू चाय पत्ती + चीनी उधार", status: "PENDING" },
        { date: "03/09", name: "Mishra Tailor", type: "JAMA", amount: 1200, hindiText: "मिश्रा जी पुराना हिसाब जमा", status: "SETTLED" },
        { date: "04/09", name: "Daily Galla Counter", type: "JAMA", amount: 5120, hindiText: "दुकान रोकड़ बिक्री", status: "SETTLED" },
        { date: "05/09", name: "Wholesale Mandi Traders", type: "SUPPLIER_PAY", amount: 8500, hindiText: "मंडी थोक माल नक़द", status: "SETTLED" }
      ]
    },
    smsList: [
      { sender: "VK-HDFCBK", time: "01-Sep 10:45 AM", text: "Dear HDFC Bank User, A/C *4012 is credited with Rs.450.00 on 01-Sep-26 by UPI/624912093412/SunilKumar." },
      { sender: "AD-SBIINB", time: "01-Sep 02:15 PM", text: "Rs 1,200.00 credited to SBI A/C ...8821 on 01-09-2026 by UPI ref no 624501928421 (UPI/MishraJi)." },
      { sender: "PAYTM-ALERTS", time: "01-Sep 09:05 PM", text: "Paytm Business: ₹4,850 received in your QR Soundbox on 01 Sep. 42 payments settled to bank A/C *4012." },
      { sender: "VK-HDFCBK", time: "02-Sep 09:10 AM", text: "Debited Rs.3,200.00 from A/C *4012 on 02-Sep-26 to SHARMA DUDH DAIRY via UPI txn 624610992384." },
      { sender: "PHONEPE-ALERT", time: "04-Sep 08:30 PM", text: "PhonePe SmartSpeaker: ₹5,120 received across 38 UPI payments today. Auto-settled to HDFC *4012." }
    ]
  },
  raju_chai: {
    id: "merchant_blr_042",
    name: "Raju Tea & Quick Snacks",
    category: "Street Food & Beverage",
    location: "Koramangala, Bengaluru",
    phone: "+91 91234 56789",
    claimedTurnover: "₹38,000 / month",
    ledger: {
      title: "चाय व नाश्ता दैनिक खाता (Daily Stall Ledger)",
      dateRange: "01 Sep 2026 - 07 Sep 2026",
      entries: [
        { date: "01/09", name: "Startup Techies Khata", type: "UDHAR", amount: 350, hindiText: "ऑफिस वाले चाय नाश्ता बाक़ी", status: "PENDING" },
        { date: "01/09", name: "Daily Galla Counter", type: "JAMA", amount: 2400, hindiText: "नक़द गल्ला रोकड़", status: "SETTLED" },
        { date: "02/09", name: "Nandini Milk Depot", type: "SUPPLIER_PAY", amount: 1150, hindiText: "नंदिनी दूध का भुगतान", status: "SETTLED" },
        { date: "03/09", name: "Daily Galla Counter", type: "JAMA", amount: 2850, hindiText: "रोज़ की बिक्री जमा", status: "SETTLED" },
        { date: "04/09", name: "Startup Techies Khata", type: "JAMA", amount: 1400, hindiText: "ऑफिस चाय पूरा हिसाब जमा", status: "SETTLED" }
      ]
    },
    smsList: [
      { sender: "GPAY-BUSINESS", time: "01-Sep 11:30 AM", text: "Google Pay for Business: ₹2,400.00 received today from 56 customer QR scans." },
      { sender: "AXIS-ALERT", time: "02-Sep 08:00 AM", text: "INR 1,150.00 debited from A/C XX9932 on 02-09-26 to NANDINI MILK DEPOT via UPI." },
      { sender: "GPAY-BUSINESS", time: "03-Sep 08:00 PM", text: "Google Pay for Business: ₹2,850.00 received today from 68 customer QR scans." },
      { sender: "AXIS-ALERT", time: "04-Sep 04:22 PM", text: "INR 1,400.00 credited to A/C XX9932 on 04-09-26 by UPI from ROHIT TECHLABS." }
    ]
  }
};

export const MERCHANT_PRESETS = MERCHANT_DATASETS;

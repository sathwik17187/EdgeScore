# EdgeScore Demo Kit & Presentation Assets

This directory contains printable Bahi-Khata ledger mockups and merchant testing profiles designed for live hackathon judge demonstrations and camera OCR scanning.

---

## 📋 Merchant Archetype Samples

### 1. Sharma General Store & Kirana (Old Delhi)
- **Category**: FMCG & Grocery
- **Ledger Inscription**:
  - *Sharmaji Daily Ledger (Oct 2026)*
  - `Gupta Tea Depot`: ₹12,400 (CR) - Paid via Cash
  - `Amul Distributor`: ₹8,500 (DR) - Cleared
  - `Verma Flour Mills`: ₹6,200 (CR) - Outstanding ₹500
  - `Daily Counter Sales`: ₹48,500 (62% UPI / 38% Cash)
- **Calculated EdgeScore**: **782** (Tier 1 Prime Micro)
- **Pre-Approved Facility**: ₹35,000 @ ₹389/day micro-debit

### 2. Raju Tea & Snacks (Koramangala, Bengaluru)
- **Category**: Food & Beverage
- **Ledger Inscription**:
  - *Raju Chai Corner Register*
  - `Nandini Milk Dairy`: ₹4,200 (Daily Debit)
  - `Karnataka Sugar Mart`: ₹2,800 (Weekly Credit)
  - `QR Counter Collection`: ₹36,200 (75% UPI / 25% Cash)
- **Calculated EdgeScore**: **810** (Tier 1 Prime Micro)
- **Pre-Approved Facility**: ₹25,000 @ ₹278/day micro-debit

### 3. Ananya Tailoring & Boutique (Lajpat Nagar, New Delhi)
- **Category**: Apparel & Alterations
- **Ledger Inscription**:
  - *Ananya Fashion Works*
  - `Surat Silk House`: ₹15,000 (Advance Paid)
  - `Zari & Threads Co`: ₹3,400 (Cleared)
  - `Bridal Order Deposits`: ₹52,000 (80% UPI / 20% Cash)
- **Calculated EdgeScore**: **845** (Tier 1 Prime Micro)
- **Pre-Approved Facility**: ₹50,000 @ ₹556/day micro-debit

---

## 🎯 3-Minute Hackathon Demo Script
1. **The Context (0:00 - 0:45)**: Show that 63M micro-merchants lack audited balance sheets, but hold rich on-device signals in handwritten Bahi-Khatas and UPI SMS.
2. **Airplane Mode Proof (0:45 - 1:30)**: Toggle device to Airplane Mode. Scan the physical paper ledger with EdgeScore on-device vision OCR and parse transactional SMS. Note that 0 bytes leave the phone.
3. **Hardware TEE Attestation (1:30 - 2:15)**: View the Small Language Model synthetic underwriting score (e.g. 782) signed inside Android StrongBox Keystore (`secp256r1`). Watch ephemeral memory zeroing in real-time.
4. **Lender Instant Sanction (2:15 - 3:00)**: Switch to the OCEN 4.0 Lender Gateway (`http://localhost:3000`). Verify the cryptographic signature in 12ms and trigger 1-click UPI disbursement.

# EdgeScore ⚡🛡️
### Zero-Knowledge On-Device Underwriting Engine for OCEN 4.0 & Informal Micro-Merchants

> **Transforming informal physical ledger books (Bahi-Khata) and transactional SMS into cryptographic, bank-grade OCEN 4.0 Verifiable Credentials directly on low-cost smartphones without a single byte of raw customer data ever leaving the device.**

---

## 🌟 Problem & Vision
Over **63 million micro-enterprises** in India (Kirana stores, street vendors, chaiwallas) operate in the informal economy without GST registrations or formal audited bank statements. When applying for loans under **OCEN 4.0 (Open Credit Enablement Network)**, legacy digital lenders require invasive SMS scraping and raw document uploads to cloud servers—violating India's **DPDP Act 2023** and generating massive customer distrust.

**EdgeScore** shifts the paradigm from **"Send Data to the Cloud"** to **"Bring Underwriting to the Device"**:
1. **100% On-Device Execution**: Vision OCR, SMS regex normalization, and Small Language Model (SLM) synthetic credit scoring run locally on smartphone NPU/CPU.
2. **True Airplane Mode Proof**: Verification operates seamlessly with zero internet connectivity.
3. **Hardware-Bound Cryptographic Attestation**: Underwriting metrics are signed inside the device's **Android Keystore / StrongBox TEE** (`secp256r1`).
4. **Zero Cloud Leakage**: Only a ~2 KB signed W3C Verifiable Credential is transmitted to lenders. Raw SMS, customer names, and ledger photo buffers are wiped from RAM using ephemeral byte-zeroing.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EDGE DEVICE (Android / iOS / Expo)                   │
│                                                                         │
│  [Physical Bahi-Khata] ──> [On-Device Vision OCR]                       │
│                                  │                                      │
│  [Transactional SMS]   ──> [SMS Regex Normalizer]                       │
│                                  │                                      │
│                                  ▼                                      │
│                      [SLM Synthetic Underwriter]                        │
│                      (Cash-to-Digital, Turnover,                        │
│                       Repayment Capacity, EdgeScore)                    │
│                                  │                                      │
│                                  ▼                                      │
│                  [Android Keystore / StrongBox TEE]                     │
│                  (Hardware ECDSA secp256r1 Signature)                   │
│                                  │                                      │
│                                  ▼                                      │
│                    [RAM Ephemeral Scrubbing] ──> 0 Bytes Leaked         │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
                    Signed W3C VC (~2.16 KB)
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              OCEN 4.0 LENDER GATEWAY & UNDERWRITING CONSOLE              │
│                                                                         │
│  [ECDSA Public Key Verification] ──> [Cryptographic Attestation Pass]   │
│  [DPDP 2023 Privacy Audit]       ──> [Instant UPI Loan Sanction]        │
│  [Daily Autopay Mandate]         ──> [Disbursement to Merchant]         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 The 6-Phase Atomic Mobile Pipeline

1. **Phase 1: Privacy Sandbox & Hardware Attestation**: Generates device-bound asymmetric keypair in Android StrongBox TEE and validates Airplane Mode capability.
2. **Phase 2: Bahi-Khata Ledger Vision Ingestion**: High-contrast document scanner extracting handwritten Hindi/English customer ledgers (credit/debit, reconciliation consistency).
3. **Phase 3: SMS Transactional Stream Audit**: Categorizes incoming UPI merchant credits, distributor outlays, and utility payments.
4. **Phase 4: SLM Credit Scoring & Synthesis**: Computes EdgeScore (300–900), monthly turnover, cash-to-digital ratio, and pre-approved credit ceiling.
5. **Phase 5: W3C Cryptographic Proof Construction**: Packages claims into standard W3C Verifiable Credential format and signs with TEE private key.
6. **Phase 6: Ephemeral RAM Scrub & OCEN Submission**: Executes memory byte-scrubbing to ensure zero residual PII before transmitting signed proof.

---

## 🚀 Repository Structure

```
iqoo_hackathon2/
├── mobile/                  # Native Expo React Native Mobile Application (Borrower Flow)
│   ├── App.js               # 6-Phase atomic UI/UX with hardware HUD and visualizers
│   ├── android-native/      # Kotlin Keystore TEE & C++ Vulkan/NPU inference bridges
│   └── testPhaseRoadmap.js  # Automated merchant pipeline test suites
├── lender-portal/           # Bank & FIU Underwriting Terminal (Vite + React)
│   └── src/App.jsx          # Live proof inspector, DPDP audit, and 1-click UPI disburse
├── backend/                 # OCEN 4.0 WebSocket & REST Gateway (Express + ws)
│   └── src/server.js        # Real-time relay & DID verification services
├── core/                    # Shared types, cryptographic schemas, and algorithms
└── demo-kit/                # Printable Bahi-Khata ledger sheets & presentation assets
```

---

## 🛠️ Quick Start & Local Execution

### 1. Start the OCEN Gateway Backend
```bash
cd backend
npm install
node src/server.js
# Runs on http://localhost:5005
```

### 2. Launch the Mobile Borrower App
```bash
cd mobile
npm install
npx expo start --web --port 8085
# Runs on http://localhost:8085
```

### 3. Launch the Lender Underwriting Console
```bash
cd lender-portal
npm install
npm run dev -- --port 3000
# Runs on http://localhost:3000
```

---

## 🧪 Automated Testing
Run the comprehensive multi-merchant test suite validating scoring, TEE signature generation, and verification:
```bash
cd mobile
node testPhaseRoadmap.js
node testAllMerchants.js
```

---

## 🛡️ Regulatory & DPDP Act 2023 Compliance
- **Zero Raw Data Transmission**: 0.00 bytes of SMS logs or customer photos ever leave the client.
- **W3C Verifiable Credential Standards**: Conforms to DID specifications (`did:edgescore:<tee-fingerprint>`).
- **RBI OCEN 4.0 Ready**: Standardized API payloads for instant loan sanctioning and recurring UPI AutoPay mandates.

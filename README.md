# EdgeScore — Zero-Knowledge On-Device Underwriting Engine for OCEN 4.0

![OCEN 4.0 Ready](https://img.shields.io/badge/OCEN_4.0-Ready-blue?style=for-the-badge&logo=shield)
![DPDP Act 2023 Compliant](https://img.shields.io/badge/Privacy-DPDP_Act_2023_Compliant-success?style=for-the-badge&logo=security)
![Android StrongBox TEE](https://img.shields.io/badge/Hardware-Android_StrongBox_TEE-orange?style=for-the-badge&logo=android)
![Zero Cloud Data Leakage](https://img.shields.io/badge/Zero_Leakage-0_Bytes_Cloud_Data-emerald?style=for-the-badge)

---

## Table of Contents
- [Abstract & Problem Statement](#abstract)
- [Architecture & 6-Phase Pipeline](#architecture)
- [Two Distinct Dedicated Portals](#portals)
- [Requirements & Tech Stack](#req)
- [How to Use & Execution](#ins)
- [Visual Walkthrough & Live Screenshots](#preview)
- [DPDP Act 2023 & Cryptographic Guarantees](#privacy)

---

<a name="abstract"></a>
## Abstract

Over **63 million micro-enterprises** across India—such as Kirana store owners, tea stall vendors, and local tradespeople—operate primarily within the informal economy. Because they lack GST filings, corporate credit footprints, or formal audited bank statements, traditional financial institutions consider them "thin-file" and unscorable. When these merchants attempt to access credit via **OCEN 4.0 (Open Credit Enablement Network)**, legacy digital lenders rely on invasive SMS scraping and raw document uploads to remote cloud servers. This violates India's **Digital Personal Data Protection (DPDP) Act 2023** and exposes vulnerable merchants to severe data leakage and privacy risks.

**EdgeScore** fundamentally flips this paradigm from *"Send Merchant Data to the Cloud"* to **"Bring Bank-Grade Underwriting to the Edge Device"**.

### Core Technical Pillars
- **On-Device Vision OCR:** Ingests physical, handwritten *Bahi-Khata* credit/debit register sheets without uploading photos to any cloud server.
- **Local Transactional SMS Normalization:** Audits high-frequency UPI merchant credits, distributor outlays, and utility payments directly from device storage.
- **On-Device Small Language Model (SLM):** Synthesizes cash-to-digital ratios, supplier repayment consistency, and turnover velocity into a deterministic **EdgeScore (300–900)**.
- **Hardware-Bound StrongBox TEE Attestation:** Cryptographically signs the underwriting verdict inside the phone's **Android Keystore / StrongBox TEE** using an ECDSA (`secp256r1`) keypair.
- **Ephemeral RAM Scrubbing:** Zeroes out all raw image buffers and SMS strings in memory immediately after scoring, outputting only a canonical **~2.16 KB W3C Verifiable Credential**.

---

<a name="architecture"></a>
## Architecture & 6-Phase On-Device Pipeline

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

### The 6-Phase Atomic Workflow
1. **Phase 1: Privacy Sandbox & Hardware Attestation** — Validates true Airplane Mode execution and derives device-bound asymmetric cryptographic keypair inside Android Keystore / StrongBox TEE.
2. **Phase 2: Bahi-Khata Ledger Vision Ingestion** — Live viewfinder scan of physical handwritten Hindi/English customer registers with real-time bounding box extraction.
3. **Phase 3: SMS Transactional Stream Audit** — Categorizes incoming UPI merchant credits, distributor restock payments, and recurring bills.
4. **Phase 4: SLM Credit Scoring & Synthesis** — Synthesizes cash-to-digital reconciliation and supplier repayment discipline to generate synthetic EdgeScore, loan limit ceiling, and micro-repayment capacity.
5. **Phase 5: W3C Cryptographic Proof Construction** — Assembles the W3C Verifiable Credential payload and signs with hardware TEE private key.
6. **Phase 6: Ephemeral RAM Scrub & OCEN Submission** — Performs real-time memory wipe of PII buffers, presenting final verifiable credential ready for instant lender disbursement.

---

<a name="portals"></a>
## Two Distinct Dedicated Portals

EdgeScore is split into two specialized, purpose-built interfaces tailored to each stakeholder in the OCEN 4.0 ecosystem:

### 1. EdgeScore Merchant Mobile App (Borrower Portal)
* **Target User:** Kirana store owners, tea stall operators, and informal micro-merchants.
* **Purpose:** Empowers thin-file borrowers to generate on-device credit scores from physical handwritten ledgers and transactional SMS in 100% offline Airplane Mode.
* **Key Capabilities:**
  * **Airplane Mode Isolation:** Guarantees no internet calls during ingestion and calculation.
  * **Ledger Camera HUD:** Real-time bounding box optical detection for Hindi/English Bahi-Khata registers.
  * **Transactional SMS Categorizer:** Local regex parser classifying merchant QR credits, distributor outlays, and utility bills.
  * **EdgeScore Hero Gauge:** Dynamic 300–900 credit scoring with pre-approved loan ceilings and risk categorization.
  * **Hardware StrongBox TEE Signature:** ECDSA `secp256r1` signing with cryptographic tamper-proofing.
  * **Live RAM Scrub Visualizer:** Real-time memory zeroing visualizer proving that 0 bytes of raw data remain on the phone.

### 2. OCEN 4.0 Lender Gateway (Bank & Underwriting Console)
* **Target User:** Commercial Banks, NBFC Credit Officers, FIUs (Financial Information Users), and Hackathon Judges.
* **Purpose:** Verifies signed W3C credentials, conducts real-time DPDP Act privacy audits, and triggers instant 1-click UPI loan disbursements.
* **Key Capabilities:**
  * **Real-Time Proof Stream:** WebSocket feed of incoming cryptographic credentials from field merchant devices.
  * **Cryptographic Proof Inspector:** Validates ECDSA signatures against the merchant's hardware DID (`did:edgescore:iqoo-tee-...`) and confirms StrongBox TEE attestation level.
  * **DPDP Act 2023 Privacy Differential:** Live privacy audit showing **0.00 Bytes leaked** compared to legacy scrapers (which leak ~14.8 MB of raw PII).
  * **1-Click Loan Sanction & UPI Disbursement:** Generates instant loan sanction tokens (e.g. ₹35,000 facility with ₹389/day micro-debit) and triggers UPI AutoPay mandates.
  * **Bahi-Khata Demo Kit & Pitch Script:** Embedded printable ledger samples and 3-minute hackathon walkthrough guide.

---

<a name="req"></a>
## Requirements & Tech Stack

* **Node.js:** v18.0.0 or higher
* **Package Manager:** npm v9.0+ or yarn
* **Mobile Runtime:** Expo SDK 51 / React Native (with Expo Web support)
* **Lender Console:** Vite + React 18 + Lucide Icons
* **Backend:** Express + WebSocket (`ws`) Gateway
* **Operating Systems:** Android (with StrongBox TEE support), iOS, Windows, macOS, Linux

---

<a name="ins"></a>
## How to Use & Execution

### 1. Clone the Repository
```bash
git clone https://github.com/sathwik17187/EdgeScore.git
cd EdgeScore
```

### 2. Run the OCEN 4.0 Gateway Backend
```bash
cd backend
npm install
node src/server.js
# Backend runs on http://localhost:5005
```

### 3. Launch the Mobile Borrower App
```bash
cd mobile
npm install
npx expo start --web --port 8085
# Mobile App runs on http://localhost:8085
```

### 4. Launch the Lender Underwriting Console
```bash
cd lender-portal
npm install
npm run dev -- --port 3000
# Lender Gateway runs on http://localhost:3000
```

### 5. Run Multi-Merchant Automated Test Suites
```bash
cd mobile
node testPhaseRoadmap.js
node testAllMerchants.js
```

---

<a name="preview"></a>
## Visual Walkthrough & Live Screenshots

### Portal 1: EdgeScore Merchant Mobile App (6-Phase Pipeline)

#### Phase 1: Hardware StrongBox TEE Attestation & Isolation
![Phase 1 Hardware StrongBox TEE](assets/mobile_step1_hardware.png)

#### Phase 2: Bahi-Khata Ledger Vision OCR Ingestion
![Phase 2 Bahi-Khata OCR](assets/mobile_step2_ocr.png)

#### Phase 3: Transactional SMS Stream Audit
![Phase 3 SMS Audit](assets/mobile_step3_sms.png)

#### Phase 4: Small Language Model (SLM) Credit Score Gauge
![Phase 4 SLM Score](assets/mobile_step4_slm_score.png)

#### Phase 5: W3C Cryptographic Proof Construction & TEE Signing
![Phase 5 W3C Proof](assets/mobile_step5_w3c_proof.png)

#### Phase 6: Ephemeral RAM Scrubbing & Instant Sanction Submission
![Phase 6 RAM Scrub](assets/mobile_step6_ram_scrub.png)

---

### Portal 2: OCEN 4.0 Lender Gateway & Underwriting Console

#### Live Cryptographic Proof Inspector & Privacy Audit Console
![Lender Portal Underwriting Console](assets/lender_portal_console.png)

#### 1-Click Instant Loan Disbursement (UPI AutoPay Mandate)
![Lender Portal Disbursed](assets/lender_portal_disbursed.png)

#### Bahi-Khata Demo Kit & Hackathon Pitch Script
![Bahi-Khata Demo Kit](assets/demo_kit_ledgers.png)

---

### Pre-configured Merchant Archetypes
* **Sharma General Store & Kirana (Old Delhi):** FMCG & Grocery | Calculated EdgeScore: **782** | Sanction: **₹35,000** @ ₹389/day micro-debit.
* **Raju Tea & Quick Snacks (Bengaluru):** Food & Beverage | Calculated EdgeScore: **810** | Sanction: **₹25,000** @ ₹278/day micro-debit.
* **Ananya Tailoring & Boutique (New Delhi):** Apparel & Alterations | Calculated EdgeScore: **845** | Sanction: **₹50,000** @ ₹556/day micro-debit.

---

<a name="privacy"></a>
## DPDP Act 2023 & Cryptographic Guarantees

* **Zero Data Leakage:** 0.00 bytes of raw transactional SMS or handwritten customer ledger images ever touch the network.
* **Differential Privacy Protection:** Legacy scrapers extract up to 14.8 MB of unencrypted personal data per loan application; EdgeScore transmits only a single ~2.16 KB canonical cryptographic proof.
* **Hardware-Rooted Trust:** Tamper-proof Android Keystore StrongBox TEE prevents signature spoofing even on compromised user-space operating systems.
* **DPDP Act 2023 Compliance:** Full adherence to data minimization, purpose limitation, and storage limitation principles under Indian data protection law.

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// In-memory proof storage
const proofs = [];

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('[WebSocket] Client connected to OCEN Gateway');
  
  // Send current proofs on initial connection
  ws.send(JSON.stringify({ type: 'INITIAL_PROOFS', payload: proofs }));

  ws.on('close', () => {
    console.log('[WebSocket] Client disconnected');
  });
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'EdgeScore OCEN 4.0 Gateway',
    timestamp: new Date().toISOString(),
    totalProofsRelayed: proofs.length
  });
});

// Submit a new Verifiable Proof from Edge Device
app.post('/api/proofs', (req, res) => {
  const proof = req.body;
  if (!proof || !proof.verification) {
    return res.status(400).json({ error: 'Invalid W3C proof payload' });
  }

  const enhancedProof = {
    ...proof,
    id: proof.id || `proof_${Date.now()}`,
    receivedAt: new Date().toISOString()
  };

  proofs.unshift(enhancedProof);
  console.log(`[OCEN 4.0] New Proof Verified & Received: ${enhancedProof.id} (${enhancedProof.merchantName})`);

  // Broadcast to all connected lender portals & judge consoles
  broadcast({
    type: 'NEW_PROOF_RECEIVED',
    payload: enhancedProof
  });

  res.status(201).json({
    status: 'SUCCESS',
    message: 'Verifiable Credential accepted and broadcasted',
    proofId: enhancedProof.id
  });
});

// Get all verified proofs
app.get('/api/proofs', (req, res) => {
  res.json({
    count: proofs.length,
    proofs
  });
});

// Disburse Loan (Lender Action)
app.post('/api/proofs/:id/disburse', (req, res) => {
  const { id } = req.params;
  const proof = proofs.find(p => p.id === id);

  if (!proof) {
    return res.status(404).json({ error: 'Proof not found' });
  }

  proof.disbursement = {
    status: 'DISBURSED',
    disbursedAt: new Date().toISOString(),
    txnId: `UPI_DISB_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`,
    autopayMandateId: `MANDATE_NPCI_${Math.floor(Math.random() * 900000 + 100000)}`
  };

  broadcast({
    type: 'PROOF_DISBURSED',
    payload: proof
  });

  res.json({
    status: 'SUCCESS',
    message: 'Loan disbursed via UPI Rail',
    disbursement: proof.disbursement
  });
});

server.listen(PORT, () => {
  console.log(`⚡ EdgeScore OCEN 4.0 Gateway Server running on http://localhost:${PORT}`);
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

// Configuration CORS pour autoriser votre domaine
app.use(cors({
  origin: [
    'https://scorpio74890-alt.github.io',
    'http://localhost',
    'http://127.0.0.1',
    'file://'
  ],
  credentials: true
}));

// Rate limiting pour éviter les abus
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Max 30 requêtes par minute par IP
  message: { error: 'Trop de requêtes, réessayez dans une minute' }
});

app.use('/api', limiter);

// Headers pour simuler un navigateur normal
app.use((req, res, next) => {
  req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  req.headers['accept'] = 'application/json, text/plain, */*';
  req.headers['accept-language'] = 'en-US,en;q=0.9';
  req.headers['cache-control'] = 'no-cache';
  next();
});

// Proxy pour l'API HenrikDev
app.use('/api/valorant', createProxyMiddleware({
  target: 'https://api.henrikdev.xyz',
  changeOrigin: true,
  pathRewrite: {
    '^/api/valorant': '/valorant'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Nettoyer les headers sensibles
    proxyReq.removeHeader('x-forwarded-for');
    proxyReq.removeHeader('x-real-ip');
    
    // Ajouter des délais aléatoires pour éviter la détection
    const delay = Math.random() * 1000 + 500; // 500ms à 1.5s
    setTimeout(() => {}, delay);
  },
  onError: (err, req, res) => {
    console.error('Erreur proxy:', err);
    res.status(500).json({ error: 'Erreur du proxy' });
  }
}));

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    status: 'Proxy Valorant actif',
    usage: '/api/valorant/v3/mmr/eu/pc/PLAYER/TAG',
    time: new Date().toISOString()
  });
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Proxy Valorant démarré sur http://194.164.89.41:${PORT}`);
  console.log(`📡 Usage: http://194.164.89.41:${PORT}/api/valorant/v3/mmr/eu/pc/PLAYER/TAG`);
});

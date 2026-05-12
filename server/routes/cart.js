const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Cart is handled client-side (localStorage) for speed.
// These endpoints are for future server-side persistence.
router.get('/', auth, (req, res) => res.json({ cart: [] }));
router.post('/sync', auth, (req, res) => res.json({ message: 'Cart synced' }));

module.exports = router;
const express = require('express');
const router = express.Router();

// GET /api/menu — returns full menu
router.get('/', (req, res) => {
  res.json({ message: 'Menu served from client-side data', status: 'ok' });
});

module.exports = router;
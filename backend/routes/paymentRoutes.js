const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const { pool } = require('../config/database');

// Get payment by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payments by sale ID
router.get('/sale/:saleId', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments WHERE sale_id = ?', [req.params.saleId]);
    res.json({ data: rows, count: rows.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments (admin/manager)
router.get('/', verifyToken, checkRole(['manager', 'admin']), async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const [rows] = await pool.query(
      'SELECT * FROM payments ORDER BY payment_date DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    res.json({ data: rows, count: rows.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

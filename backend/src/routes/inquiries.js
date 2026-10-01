const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, getInquiry, updateStatus, deleteInquiry, getStats } = require('../controllers/inquiriesController');
const { protect } = require('../middleware/auth');

router.post('/', createInquiry);              // Public: submit inquiry
router.get('/', protect, getInquiries);       // Admin: list
router.get('/stats', protect, getStats);      // Admin: stats
router.get('/:id', protect, getInquiry);      // Admin: single
router.put('/:id/status', protect, updateStatus); // Admin: update status
router.delete('/:id', protect, deleteInquiry); // Admin: delete

module.exports = router;

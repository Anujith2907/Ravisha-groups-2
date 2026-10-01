const express = require('express');
const router = express.Router();
const { getFounder, updateFounder, uploadFounderImage, deleteFounderImage } = require('../controllers/founderController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getFounder);
router.put('/', protect, updateFounder);
router.post('/image', protect, upload.single('image'), uploadFounderImage);
router.delete('/image', protect, deleteFounderImage);

module.exports = router;

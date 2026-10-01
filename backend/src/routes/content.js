const express = require('express');
const router = express.Router();
const { getContent, updateContent, uploadSectionImage } = require('../controllers/contentController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getContent);
router.put('/', protect, updateContent);
router.post('/upload/:section', protect, upload.single('image'), uploadSectionImage);

module.exports = router;

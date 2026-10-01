const express = require('express');
const router = express.Router();
const { getMedia, uploadMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getMedia);
router.post('/', protect, upload.single('image'), uploadMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;

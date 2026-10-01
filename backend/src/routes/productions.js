const express = require('express');
const router = express.Router();
const {
  getProductions, getProduction, createProduction, updateProduction, deleteProduction,
  uploadPoster, uploadMainImage, uploadAdditionalImage, deleteAdditionalImage, toggleFeature,
} = require('../controllers/productionsController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getProductions);
router.get('/:id', getProduction);
router.post('/', protect, createProduction);
router.put('/:id', protect, updateProduction);
router.delete('/:id', protect, deleteProduction);
router.post('/:id/poster', protect, upload.single('image'), uploadPoster);
router.post('/:id/main-image', protect, upload.single('image'), uploadMainImage);
router.post('/:id/images', protect, upload.single('image'), uploadAdditionalImage);
router.delete('/:id/images/:publicId', protect, deleteAdditionalImage);
router.put('/:id/feature', protect, toggleFeature);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getProjects, getProject, createProject, updateProject, deleteProject,
  uploadMainImage, uploadAdditionalImage, deleteAdditionalImage, toggleFeature,
} = require('../controllers/projectsController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/main-image', protect, upload.single('image'), uploadMainImage);
router.post('/:id/images', protect, upload.single('image'), uploadAdditionalImage);
router.delete('/:id/images/:publicId', protect, deleteAdditionalImage);
router.put('/:id/feature', protect, toggleFeature);

module.exports = router;

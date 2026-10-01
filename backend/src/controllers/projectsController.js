const Project = require('../models/Project');
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/projects
const getProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const filter = featured === 'true' ? { featured: true } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: 'Project created.', project });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json({ message: 'Project updated.', project });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    // Delete all images from Cloudinary
    if (project.mainImage?.publicId) await deleteFromCloudinary(project.mainImage.publicId);
    for (const img of project.additionalImages) {
      if (img.publicId) await deleteFromCloudinary(img.publicId);
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted.' });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/:id/main-image
const uploadMainImage = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });

    if (project.mainImage?.publicId) await deleteFromCloudinary(project.mainImage.publicId);

    const result = await uploadToCloudinary(req.file.buffer, 'projects');
    project.mainImage = { url: result.secure_url, publicId: result.public_id };
    await project.save();

    res.json({ message: 'Main image uploaded.', mainImage: project.mainImage });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/:id/images
const uploadAdditionalImage = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });

    const result = await uploadToCloudinary(req.file.buffer, 'projects');
    project.additionalImages.push({
      url: result.secure_url,
      publicId: result.public_id,
      order: project.additionalImages.length,
    });
    await project.save();

    res.json({ message: 'Image added.', additionalImages: project.additionalImages });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id/images/:publicId
const deleteAdditionalImage = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    const publicId = decodeURIComponent(req.params.publicId);
    await deleteFromCloudinary(publicId);
    project.additionalImages = project.additionalImages.filter((img) => img.publicId !== publicId);
    await project.save();

    res.json({ message: 'Image deleted.', additionalImages: project.additionalImages });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id/feature
const toggleFeature = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    project.featured = !project.featured;
    await project.save();
    res.json({ message: `Project ${project.featured ? 'featured' : 'unfeatured'}.`, project });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects, getProject, createProject, updateProject, deleteProject,
  uploadMainImage, uploadAdditionalImage, deleteAdditionalImage, toggleFeature,
};

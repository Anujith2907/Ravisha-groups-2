const Production = require('../models/Production');
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/productions
const getProductions = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const filter = featured === 'true' ? { featured: true } : {};
    const productions = await Production.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(productions);
  } catch (error) {
    next(error);
  }
};

// GET /api/productions/:id
const getProduction = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });
    res.json(production);
  } catch (error) {
    next(error);
  }
};

// POST /api/productions
const createProduction = async (req, res, next) => {
  try {
    const production = await Production.create(req.body);
    res.status(201).json({ message: 'Production created.', production });
  } catch (error) {
    next(error);
  }
};

// PUT /api/productions/:id
const updateProduction = async (req, res, next) => {
  try {
    const production = await Production.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!production) return res.status(404).json({ error: 'Production not found.' });
    res.json({ message: 'Production updated.', production });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/productions/:id
const deleteProduction = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });

    if (production.mainPoster?.publicId) await deleteFromCloudinary(production.mainPoster.publicId);
    if (production.mainImage?.publicId) await deleteFromCloudinary(production.mainImage.publicId);
    for (const img of production.additionalImages) {
      if (img.publicId) await deleteFromCloudinary(img.publicId);
    }

    await production.deleteOne();
    res.json({ message: 'Production deleted.' });
  } catch (error) {
    next(error);
  }
};

// POST /api/productions/:id/poster
const uploadPoster = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });

    if (production.mainPoster?.publicId) await deleteFromCloudinary(production.mainPoster.publicId);
    const result = await uploadToCloudinary(req.file.buffer, 'productions/posters');
    production.mainPoster = { url: result.secure_url, publicId: result.public_id };
    await production.save();

    res.json({ message: 'Poster uploaded.', mainPoster: production.mainPoster });
  } catch (error) {
    next(error);
  }
};

// POST /api/productions/:id/main-image
const uploadMainImage = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });

    if (production.mainImage?.publicId) await deleteFromCloudinary(production.mainImage.publicId);
    const result = await uploadToCloudinary(req.file.buffer, 'productions');
    production.mainImage = { url: result.secure_url, publicId: result.public_id };
    await production.save();

    res.json({ message: 'Main image uploaded.', mainImage: production.mainImage });
  } catch (error) {
    next(error);
  }
};

// POST /api/productions/:id/images
const uploadAdditionalImage = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });

    const result = await uploadToCloudinary(req.file.buffer, 'productions');
    production.additionalImages.push({
      url: result.secure_url,
      publicId: result.public_id,
      order: production.additionalImages.length,
    });
    await production.save();

    res.json({ message: 'Image added.', additionalImages: production.additionalImages });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/productions/:id/images/:publicId
const deleteAdditionalImage = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });

    const publicId = decodeURIComponent(req.params.publicId);
    await deleteFromCloudinary(publicId);
    production.additionalImages = production.additionalImages.filter((img) => img.publicId !== publicId);
    await production.save();

    res.json({ message: 'Image deleted.', additionalImages: production.additionalImages });
  } catch (error) {
    next(error);
  }
};

// PUT /api/productions/:id/feature
const toggleFeature = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ error: 'Production not found.' });
    production.featured = !production.featured;
    await production.save();
    res.json({ message: `Production ${production.featured ? 'featured' : 'unfeatured'}.`, production });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductions, getProduction, createProduction, updateProduction, deleteProduction,
  uploadPoster, uploadMainImage, uploadAdditionalImage, deleteAdditionalImage, toggleFeature,
};

const Media = require('../models/Media');
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/media
const getMedia = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const media = await Media.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(media);
  } catch (error) {
    next(error);
  }
};

// POST /api/media
const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });
    const { category = 'general', alt = '' } = req.body;

    const result = await uploadToCloudinary(req.file.buffer, `gallery/${category}`);
    const media = await Media.create({
      url: result.secure_url,
      publicId: result.public_id,
      category,
      alt,
    });

    res.status(201).json({ message: 'Media uploaded.', media });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/media/:id
const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found.' });

    await deleteFromCloudinary(media.publicId);
    await media.deleteOne();
    res.json({ message: 'Media deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMedia, uploadMedia, deleteMedia };

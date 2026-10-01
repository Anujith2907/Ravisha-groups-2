const SiteContent = require('../models/SiteContent');
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/content
const getContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// PUT /api/content
const updateContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) content = await SiteContent.create({});

    const { hero, about, values } = req.body;
    if (hero) content.hero = { ...content.hero, ...hero };
    if (about) content.about = { ...content.about, ...about };
    if (values) content.values = { ...content.values, ...values };

    await content.save();
    res.json({ message: 'Content updated successfully.', content });
  } catch (error) {
    next(error);
  }
};

// POST /api/content/upload/:section (hero|about)
const uploadSectionImage = async (req, res, next) => {
  try {
    const { section } = req.params;
    if (!['hero', 'about'].includes(section)) {
      return res.status(400).json({ error: 'Invalid section.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    let content = await SiteContent.findOne();
    if (!content) content = await SiteContent.create({});

    // Delete old image
    if (content[section]?.image?.publicId) {
      await deleteFromCloudinary(content[section].image.publicId);
    }

    const result = await uploadToCloudinary(req.file.buffer, `site/${section}`);
    content[section].image = { url: result.secure_url, publicId: result.public_id };
    await content.save();

    res.json({ message: 'Image uploaded.', image: content[section].image });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContent, updateContent, uploadSectionImage };

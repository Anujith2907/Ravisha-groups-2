const Founder = require('../models/Founder');
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/founder
const getFounder = async (req, res, next) => {
  try {
    let founder = await Founder.findOne();
    if (!founder) founder = await Founder.create({});
    res.json(founder);
  } catch (error) {
    next(error);
  }
};

// PUT /api/founder
const updateFounder = async (req, res, next) => {
  try {
    let founder = await Founder.findOne();
    if (!founder) founder = await Founder.create({});

    const { name, designation, biography, vision, quote } = req.body;
    if (name !== undefined) founder.name = name;
    if (designation !== undefined) founder.designation = designation;
    if (biography !== undefined) founder.biography = biography;
    if (vision !== undefined) founder.vision = vision;
    if (quote !== undefined) founder.quote = quote;

    await founder.save();
    res.json({ message: 'Founder updated.', founder });
  } catch (error) {
    next(error);
  }
};

// POST /api/founder/image
const uploadFounderImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });

    let founder = await Founder.findOne();
    if (!founder) founder = await Founder.create({});

    if (founder.image?.publicId) {
      await deleteFromCloudinary(founder.image.publicId);
    }

    const result = await uploadToCloudinary(req.file.buffer, 'founder');
    founder.image = { url: result.secure_url, publicId: result.public_id };
    await founder.save();

    res.json({ message: 'Founder image uploaded.', image: founder.image });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/founder/image
const deleteFounderImage = async (req, res, next) => {
  try {
    let founder = await Founder.findOne();
    if (!founder) return res.status(404).json({ error: 'Founder not found.' });

    if (founder.image?.publicId) {
      await deleteFromCloudinary(founder.image.publicId);
    }
    founder.image = { url: '', publicId: '' };
    await founder.save();

    res.json({ message: 'Founder image deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFounder, updateFounder, uploadFounderImage, deleteFounderImage };

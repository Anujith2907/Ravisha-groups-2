const Settings = require('../models/Settings');

// GET /api/settings
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings (admin)
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});

    const { companyName, email, phone, address, socialMedia, seo } = req.body;
    if (companyName !== undefined) settings.companyName = companyName;
    if (email !== undefined) settings.email = email;
    if (phone !== undefined) settings.phone = phone;
    if (address !== undefined) settings.address = address;
    if (socialMedia) settings.socialMedia = { ...settings.socialMedia.toObject(), ...socialMedia };
    if (seo) settings.seo = { ...settings.seo.toObject(), ...seo };

    await settings.save();
    res.json({ message: 'Settings updated.', settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };

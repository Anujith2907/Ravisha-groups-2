require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const SiteContent = require('./src/models/SiteContent');
const Founder = require('./src/models/Founder');
const Settings = require('./src/models/Settings');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingUser) {
      await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@ravishagroups2.com',
        password: process.env.ADMIN_PASSWORD || 'RavishaAdmin@2024!',
        name: 'Admin',
        role: 'admin',
      });
      console.log('✅ Admin user created:', process.env.ADMIN_EMAIL);
    } else {
      console.log('ℹ️  Admin user already exists.');
    }

    // Initialize site content
    const existingContent = await SiteContent.findOne();
    if (!existingContent) {
      await SiteContent.create({});
      console.log('✅ Default site content initialized.');
    }

    // Initialize founder
    const existingFounder = await Founder.findOne();
    if (!existingFounder) {
      await Founder.create({});
      console.log('✅ Default founder initialized.');
    }

    // Initialize settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({});
      console.log('✅ Default settings initialized.');
    }

    console.log('\n🎉 Seed complete. You can now start the server.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();

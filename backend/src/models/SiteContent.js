const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema(
  {
    hero: {
      heading: { type: String, default: 'RAVISHA GROUPS 2' },
      tagline: { type: String, default: 'BUILDING VISIONS. CREATING STORIES.' },
      description: {
        type: String,
        default: 'A business group bringing together construction and cinematic creativity.',
      },
      image: { url: String, publicId: String },
    },
    about: {
      heading: { type: String, default: 'ABOUT RAVISHA GROUPS 2' },
      description: {
        type: String,
        default:
          'Ravisha Groups 2 brings together Construction and Cinema Production under one growing business group, combining the creation of physical spaces with the art of visual storytelling.',
      },
      image: { url: String, publicId: String },
    },
    values: {
      heading: { type: String, default: 'OUR VALUES' },
      items: {
        type: [
          {
            title: String,
            description: String,
            icon: String,
          },
        ],
        default: [
          { title: 'VISION', description: 'We see beyond the immediate, building for tomorrow.', icon: 'eye' },
          { title: 'QUALITY', description: 'Uncompromising standards in every project we undertake.', icon: 'star' },
          { title: 'CREATIVITY', description: 'Bringing fresh perspectives to construction and cinema.', icon: 'lightbulb' },
          { title: 'TRUST', description: 'Building lasting relationships with integrity and transparency.', icon: 'shield' },
          { title: 'EXECUTION', description: 'Transforming visions into reality with precision.', icon: 'target' },
        ],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', siteContentSchema);

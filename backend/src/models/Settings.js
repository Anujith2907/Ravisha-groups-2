const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'Ravisha Groups 2' },
    email: { type: String, default: 'ravishagroups2@gmail.com' },
    phone: { type: String, default: '90031 44864' },
    address: {
      type: String,
      default: 'No. C2/5, 2nd floor, South Sivan Kovil Street, Puliyur Housing Board, Kodambakkam, Chennai - 600 024.',
    },
    socialMedia: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
    seo: {
      title: { type: String, default: 'Ravisha Groups 2 | Construction & Cinema Production' },
      description: {
        type: String,
        default: 'Ravisha Groups 2 — Construction and Cinema Production / Film Arts.',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);

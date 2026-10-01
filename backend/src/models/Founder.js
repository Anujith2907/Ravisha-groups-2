const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema(
  {
    name: { type: String, default: '[Founder Name]' },
    designation: { type: String, default: '[Designation / Title]' },
    biography: {
      type: String,
      default:
        '[Founder biography to be added. Please update this section from the admin dashboard.]',
    },
    vision: {
      type: String,
      default: '[Founder vision statement to be added.]',
    },
    quote: {
      type: String,
      default: '[Founder quote to be added.]',
    },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Founder', founderSchema);

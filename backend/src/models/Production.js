const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Film title is required'], trim: true },
    year: { type: String, trim: true, default: '' },
    productionRole: { type: String, trim: true, default: '' },
    contribution: { type: String, default: '' },
    filmArtsDetails: { type: String, default: '' },
    description: { type: String, default: '' },
    mainPoster: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    mainImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    additionalImages: [
      {
        url: String,
        publicId: String,
        order: { type: Number, default: 0 },
      },
    ],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productionSchema.index({ featured: 1, createdAt: -1 });

module.exports = mongoose.model('Production', productionSchema);

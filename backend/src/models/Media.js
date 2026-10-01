const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    category: {
      type: String,
      enum: ['construction', 'production', 'founder', 'general'],
      default: 'general',
    },
    alt: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Media', mediaSchema);

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Project name is required'], trim: true },
    type: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    year: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['Completed', 'Ongoing', 'Upcoming', ''],
      default: '',
    },
    description: { type: String, default: '' },
    constructionDetails: { type: String, default: '' },
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

projectSchema.index({ featured: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);

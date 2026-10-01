const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, 'Full name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: { type: String, required: [true, 'Phone number is required'], trim: true },
    inquiryType: {
      type: String,
      enum: ['Construction', 'Cinema Production', 'Business Partnership', 'General Inquiry', 'Other'],
      required: [true, 'Inquiry type is required'],
    },
    message: { type: String, required: [true, 'Message is required'], trim: true },
    status: {
      type: String,
      enum: ['NEW', 'READ', 'CONTACTED', 'CLOSED'],
      default: 'NEW',
    },
  },
  { timestamps: true }
);

inquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);

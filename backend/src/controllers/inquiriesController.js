const Inquiry = require('../models/Inquiry');

// POST /api/inquiries (public)
const createInquiry = async (req, res, next) => {
  try {
    const { fullName, email, phone, inquiryType, message } = req.body;
    const inquiry = await Inquiry.create({ fullName, email, phone, inquiryType, message });
    res.status(201).json({
      message: 'Thank you. Your inquiry has been received. Our team will get back to you.',
      inquiry: { id: inquiry._id, fullName: inquiry.fullName },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiries (admin)
const getInquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { inquiryType: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Inquiry.countDocuments(filter);
    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ inquiries, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiries/:id (admin)
const getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json(inquiry);
  } catch (error) {
    next(error);
  }
};

// PUT /api/inquiries/:id/status (admin)
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['NEW', 'READ', 'CONTACTED', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json({ message: 'Status updated.', inquiry });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/inquiries/:id (admin)
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json({ message: 'Inquiry deleted.' });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiries/stats (admin)
const getStats = async (req, res, next) => {
  try {
    const newCount = await Inquiry.countDocuments({ status: 'NEW' });
    const total = await Inquiry.countDocuments();
    res.json({ new: newCount, total });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, getInquiries, getInquiry, updateStatus, deleteInquiry, getStats };

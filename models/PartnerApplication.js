const mongoose = require('mongoose');

const partnerApplicationSchema = new mongoose.Schema({
  guildId: { type: String, required: true },
  ownerId: String,
  partnerMessage: String,
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: String,   // Onaylayan yetkilinin ID'si
  reviewDate: Date
});

module.exports = mongoose.model('PartnerApplication', partnerApplicationSchema);

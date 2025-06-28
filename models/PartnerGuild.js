const mongoose = require('mongoose');

const partnerGuildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  ownerId: String,
  partnerMessage: String,
  partnerChannelId: String,
  autoApprove: { type: Boolean, default: false },
  partnerCooldown: { type: Number, default: 4 },
  lastPartneredAt: Date
});

module.exports = mongoose.model('PartnerGuild', partnerGuildSchema);

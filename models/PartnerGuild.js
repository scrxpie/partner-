const mongoose = require('mongoose');

const partnerGuildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  ownerId: String,
  partnerMessage: String,
  partnerChannelId: String,
  autoApprove: { type: Boolean, default: false },
  partnerCooldown: { type: Number, default: 4 },
  lastPartneredAt: Date,
  approved: { type: Boolean, default: false },
  reviewed: { type: Boolean, default: false },
  admins: [String],        // Yetkililer userID olarak burada tutulacak
  logChannelId: String     // Başvuruların gönderileceği kanal
});

module.exports = mongoose.model('PartnerGuild', partnerGuildSchema);

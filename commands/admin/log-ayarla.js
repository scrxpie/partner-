const { SlashCommandBuilder, ChannelType } = require('discord.js');
const PartnerGuild = require('../../models/PartnerGuild');
const { BOT_OWNER_ID } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('log-ayarla')
    .setDescription('Partner başvurularının gönderileceği log kanalını ayarlar (sadece bot sahibi kullanabilir).')
    .setDefaultMemberPermissions(0)
    .setDMPermission(false)
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('Başvuruların atılacağı kanal')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction) {
    if (interaction.user.id !== BOT_OWNER_ID) {
      return interaction.reply({ content: '❌ Bu komutu sadece bot sahibi kullanabilir.', ephemeral: true });
    }

    const channel = interaction.options.getChannel('kanal');
    const guildId = interaction.guild.id;

    const guildData = await PartnerGuild.findOne({ guildId });
    if (!guildData) {
      return interaction.reply({ content: '❌ Bu sunucu partner sisteminde değil.', ephemeral: true });
    }

    guildData.logChannelId = channel.id;
    await guildData.save();

    return interaction.reply({ content: `✅ Başvuruların gönderileceği log kanalı <#${channel.id}> olarak ayarlandı!`, ephemeral: true });
  }
};

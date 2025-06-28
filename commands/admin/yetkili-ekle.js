const { SlashCommandBuilder } = require('discord.js');
const PartnerGuild = require('../../models/PartnerGuild');
const { BOT_OWNER_ID } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yetkili-ekle')
    .setDescription('Bir sunucu için partner yetkilisi ekler (sadece bot sahibi kullanabilir).')
    .setDefaultMemberPermissions(0)
    .setDMPermission(false)
    .addUserOption(option =>
      option.setName('kullanıcı')
        .setDescription('Yetkili olarak eklenecek kişi')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sunucu_id')
        .setDescription('Yetkili eklenecek sunucunun ID\'si')
        .setRequired(true)
    ),

  async execute(interaction) {
    if (interaction.user.id !== BOT_OWNER_ID) {
      return interaction.reply({ content: '❌ Bu komutu sadece bot sahibi kullanabilir.', ephemeral: true });
    }

    const user = interaction.options.getUser('kullanıcı');
    const guildId = interaction.options.getString('sunucu_id');

    const guildData = await PartnerGuild.findOne({ guildId });
    if (!guildData) {
      return interaction.reply({ content: '❌ Bu sunucu partner sisteminde değil.', ephemeral: true });
    }

    guildData.admins = guildData.admins || [];
    if (guildData.admins.includes(user.id)) {
      return interaction.reply({ content: '❗ Bu kullanıcı zaten yetkili.', ephemeral: true });
    }

    guildData.admins.push(user.id);
    await guildData.save();

    return interaction.reply({ content: `✅ ${user.tag} kullanıcısı ${guildId} sunucusuna yetkili olarak eklendi!`, ephemeral: true });
  }
};

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// Komutları yükle
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

// Eventleri yükle
const eventFiles = fs.readdirSync('./events');
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB bağlandı.');
    client.login(process.env.TOKEN);
  })
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

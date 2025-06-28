module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Hazır: ${client.user.tag}`);
  }
};

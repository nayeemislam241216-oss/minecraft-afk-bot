const mineflayer = require('mineflayer');

const config = {
  host: 'Xulvex.aternos.me',
  port: 23072,
  username: 'Adreon_9854'
};

function createBot() {
  console.log('[*] Connecting bot to server...');

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: '1.21.4'
  });

  bot.on('spawn', () => {
    console.log(`[+] Bot '${bot.username}' joined successfully!`);

    setInterval(() => {
      if (bot.entity) {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI;
        bot.look(yaw, pitch, true);
      }
    }, 15000);
  });

  bot.on('kicked', (reason) => {
    console.log(`[-] Kicked from server: ${reason}`);
  });

  bot.on('error', (err) => {
    console.error(`[!] Connection error: ${err.message}`);
  });

  bot.on('end', () => {
    console.log('[!] Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });
}

createBot();

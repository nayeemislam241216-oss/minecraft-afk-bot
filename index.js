const mineflayer = require('mineflayer');

const botOptions = {
  host: 'Xulvex.aternos.me',
  port: 23072, // Make sure this matches your current Aternos port
  username: 'Adreon_9854',
  version: '1.21.4'
};

const BOT_PASSWORD = 'YourBotPassword123'; // Change this to whatever password you want

function createBot() {
  console.log('[*] Connecting bot to Aternos...');
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`[+] Bot '${bot.username}' connected successfully!`);
    
    // Send register and login commands immediately after spawning
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 1000);

    // Anti-AFK look rotation every 15 seconds
    setInterval(() => {
      if (bot && bot.entity) {
        const yaw = Math.random() * Math.PI * 2 - Math.PI;
        const pitch = (Math.random() - 0.5) * Math.PI;
        bot.look(yaw, pitch, true);
      }
    }, 15000);
  });

  bot.on('end', () => {
    console.log('[!] Disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.error('[!] Error:', err.message);
  });
}

createBot();

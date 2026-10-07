const mineflayer = require('mineflayer');

const botOptions = {
  host: 'Vynex1.aternos.me',
  port: 47098, // Update this port whenever Aternos restarts
  username: 'Adreon_9854',
  version: '1.26.2' // Updated to match your server version
};

const BOT_PASSWORD = 'Qwaskcv123098_'; // Update if using AuthMe

function createBot() {
  console.log('[*] Connecting bot to Aternos...');
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`[+] Bot '${bot.username}' connected successfully!`);
    
    // Explicitly stop any active block digging immediately upon spawning
    bot.stopDigging();

    // Auto-login / register if server uses AuthMe
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 1000);

    // Active Anti-AFK Routine (Walks, jumps, sneaks, and looks around without breaking blocks)
    setInterval(() => {
      if (!bot || !bot.entity) return;

      // Force disable attacking and block digging state
      bot.setControlState('attack', false);
      bot.stopDigging();

      // 1. Look in a random direction
      const yaw = Math.random() * Math.PI * 2 - Math.PI;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);

      // 2. Perform a random physical movement
      const actions = ['forward', 'back', 'left', 'right'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      bot.setControlState(randomAction, true);
      bot.setControlState('sneak', true); // Sneaking keeps movement controlled

      if (Math.random() > 0.5) bot.setControlState('jump', true);

      // Stop moving after 800 milliseconds
      setTimeout(() => {
        bot.clearControlStates();
      }, 800);

    }, 10000); // Triggers every 10 seconds
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

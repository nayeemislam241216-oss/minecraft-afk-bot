const mineflayer = require('mineflayer');

const botOptions = {
  host: 'Vynex1.aternos.me',
  port: 47098, // Update this port whenever Aternos restarts
  username: 'Adreon_9854',
  version: false // Auto-detect protocol version to fix mismatch errors
};

const BOT_PASSWORD = 'YourBotPassword123'; // Update if using AuthMe

function createBot() {
  console.log('[*] Connecting bot to Aternos...');
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`[+] Bot '${bot.username}' connected successfully!`);
    
    // Stop any active digging
    bot.stopDigging();

    // Auto-login / register if server uses AuthMe
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 1000);

    // Active Anti-AFK Routine (Look, sneak, jump, and safe movement)
    setInterval(() => {
      if (!bot || !bot.entity) return;

      bot.setControlState('attack', false);
      bot.stopDigging();

      // Look in a random direction
      const yaw = Math.random() * Math.PI * 2 - Math.PI;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);

      // Safe movement
      const actions = ['forward', 'back', 'left', 'right'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      bot.setControlState(randomAction, true);
      bot.setControlState('sneak', true);

      if (Math.random() > 0.5) bot.setControlState('jump', true);

      setTimeout(() => {
        bot.clearControlStates();
      }, 800);

    }, 10000);
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

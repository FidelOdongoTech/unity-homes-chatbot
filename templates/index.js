const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the WhatsApp client with session persistence
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate QR code for initial login
client.on('qr', qr => {
    console.log('Scan the QR code below with your WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirm successful connection
client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

// Listen for incoming messages and respond
client.on('message', message => {
    console.log(⁠ Message received: ${message.body} ⁠);

    if (message.body.toLowerCase() === 'hello') {
        message.reply('Hello! How can I assist you today?');
    } else if (message.body.toLowerCase() === 'help') {
        message.reply('You can ask me about our services or request support.');
    } else {
        message.reply('I am a bot! Please type "help" for options.');
    }
});

// Start the client
client.initialize();
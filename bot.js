// Load env
require("dotenv").config();
// Import tmi.js
const tmi = require("tmi.js");
// Import fs
const fs = require("fs");
// Import chalk
const chalk = require("chalk");
// Define options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME, // Twitch bot username
    password: process.env.OAUTH_TOKEN, // Twitch bot OAuth token
  },
  channels: [
    process.env.CHANNEL_NAME, // Twitch main channel
  ],
};
// Set commands map
const commands = new Map();
// Set bots prefix
const prefix = "$";

// Create clients with options
const client = new tmi.client(opts);

// Read files in "/events" folder
fs.readdir("./events", (err, files) => {
  // If error, throw error
  if (err) throw err;
  // For each file in the folder
  files.forEach((file) => {
    // Import file
    const event = require(`./events/${file}`);
    // Register event
    client.on(event.event, (...args) => event.run(client, ...args));
  });
});

// Read files in "/commands" folder
fs.readdir("./commands", (err, files) => {
  // If error, throw error
  if (err) throw err;
  // For each file in the folder
  files.forEach((file) => {
    // Import file
    const command = require(`./commands/${file}`);
    // Register command
    commands.set(command.name, command);
  });
});

// On message handler
client.on("message", (target, context, message, self) => {
  // If the message is from the bot, return
  if (self) return;
  // If the message doesn't start with the prefix, return
  if (!message.startsWith(prefix)) return;
  // Split message into command and args
  const args = message.slice(prefix.length).trim().split(/ +/g);
  // Get command name
  const commandName = args.shift().toLowerCase();
  // Get command
  const command = commands.get(commandName);
  // If command doesn't exist, return
  if (!command) return;
  // Try catch
  try {
    // Run command
    command.run(client, target, context, args);
  } catch (error) {
    // Log error
    console.error(chalk.red(error));
  }
});

// Connect to Twitch
client.connect();

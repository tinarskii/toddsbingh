require("dotenv").config();
const tmi = require("tmi.js");
const fs = require("fs");
const chalk = require("chalk");
const knex = require("./database/connect");

const opts = {
  identity: {
    username: process.env.BOT_USERNAME, // Twitch bot username
    password: process.env.OAUTH_TOKEN, // Twitch bot OAuth token
  },
  channels: [
    process.env.CHANNEL_NAME, // Twitch main channel
  ],
};

const commands = new Map();
const prefix = "!";

const client = new tmi.client(opts);

fs.readdir("./events", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    client.on(event.event, (...args) => event.run(client, ...args));
  });
});

fs.readdir("./commands", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
  });
});

client.on("message", async (target, context, message, self) => {
  if (self) return;

  if (!message.startsWith(prefix)) return;

  const args = message.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = commands.get(commandName);

  if (!command) return;

  if (command.adminOnly) {
    if (!context.mod && !context.badges["broadcaster"]) {
      return client.say(
        target,
        `${context.username}, คำสั่งนี้สำหรับผู้ดูแลเท่านั้น`,
      );
    }
  }

  if (args.length !== command.args.length) {
    return client.say(
      target,
      `${context.username}, Usage: !${command.name} ${command.args.map(args => `[${args}]`).join(" ")}`,
    );
  }

  if (command.requireProfile) {
    const [rows] = await knex("toddsbinUser").where({
      username: context.username,
    });

    if (!rows) {
      return client.say(
        target,
        `${context.username}, โปรไฟล์ของคุณยังไม่ถูกสร้าง โปรดใช้คำสั่ง !create เพื่อสร้างโปรไฟล์ของคุณ`,
      );
    }
  }

  try {
    command.run(client, target, context, args);
  } catch (error) {
    console.error(chalk.red(error));
  }
});

client.connect();

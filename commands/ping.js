module.exports = {
  name: "ping",
  description: "Ping the bot",
  args: [],
  run: (client, target) => {
    client.say(target, "pong-fish.vvx.bar!");
  },
};

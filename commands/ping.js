module.exports = {
  name: "ping",
  description: "Ping the bot",
  args: [],
  run: (client, target) => {
    client.say(target, "พ่อง!");
  },
};

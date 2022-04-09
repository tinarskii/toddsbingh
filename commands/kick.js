const ms = require("ms");
module.exports = {
  name: "kick",
  description: "Kick a user from the chat.",
  args: ["user", "time", "reason"],
  adminOnly: true,
  run: (client, target, context, args) => {
    const [user, time, reason] = args;
    const timeInSeconds = ms(time) / 1000;
    client
      .timeout(target, user, timeInSeconds, reason)
      .then(() => {
        client.say(target, `${user} โดนเตะไปดาวอังคารเรียบร้อย`);
      })
      .catch(console.error);
  },
};

const knex = require("../database/connect");

module.exports = {
  name: "config",
  description: "Set bot's config (For admins)",
  args: ["settings", "value"],
  adminOnly: true,
  run: (client, target, context, args) => {
    const [settingsName, settingsValue] = args;

    knex("toddsbinConfig")
      .where({
        settingsName,
      })
      .update({
        settingsValue,
      })
      .then(() => {
        client.say(target, `${args[0]} ถูกตั้งเป็น ${args[1]}`);
      })
      .catch(() => {
        client.say(target, `ไม่สามารถตั้งค่า ${args[0]} ได้`);
      });
  },
};

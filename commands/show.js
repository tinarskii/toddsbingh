const knex = require("../database/connect");

module.exports = {
  name: "show",
  description: "Show bot's config",
  args: ["settings"],
  run: (client, target, context, args) => {
    const [settingsName] = args;
    
    knex("toddsbinConfig")
      .where({
        settingsName
      })
      .then(([rows]) => {
        if (!rows) {
          return client.say(target, `ไม่พบการตั้งค่า ${settingsName}`);
        }
        client.say(target, `${settingsName} ถูกตั้งไว้เป็น ${rows.settingsValue}`);
      })
      .catch(console.error);
  }
};

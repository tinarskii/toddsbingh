const knex = require("../database/connect");

module.exports = {
  name: "create",
  description: "Create a new profile",
  args: [],
  run: (client, target, context) => {
    knex
      .select("*")
      .from("toddsbinUser")
      .where({
        username: context.username,
      })
      .then(([rows]) => {
        if (!rows) {
          knex("toddsbinUser")
            .insert({
              username: context.username,
              coins: 100,
            })
            .then(() => {
              client.say(target, `${context.username} ถูกสร้าง!`);
            });
        }
      });
  },
};

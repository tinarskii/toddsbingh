const knex = require("../database/connect");

module.exports = {
  name: "coin",
  description: "Check your current balance.",
  args: [],
  requireProfile: true,
  run: (client, target, context) => {
    knex("toddsbinUser")
      .select("coins")
      .where({
        username: context.username
      })
      .then(([rows]) => {
        client.say(target, `${context.username} มี ${rows["coins"]} รอคอยน์`);
      })
      .catch(console.error);
  }
};

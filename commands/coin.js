const knex = require("../database/connect");

module.exports = {
  name: "coin",
  description: "Check your current balance.",
  args: [],
  run: (client, target, context) => {
    knex("toddsbinUser")
      .select("coins")
      .where({
        username: context.username,
      })
      .then(([rows]) => {
        client.say(target, `${context.username} มี ${rows["coins"]} รอคอยน์`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

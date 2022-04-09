const knex = require("../database/connect");

module.exports = {
  name: "add",
  description: "Add money to user (For admins)",
  args: ["user", "amount"],
  run: (client, target, context, args) => {
    const [username, amount] = args;

    knex("toddsbinUser")
      .where({
        username: username || context.username,
      })
      .update({
        coins: knex.raw("coins + ?", amount),
      })
      .then(() => {
        client.say(target, `${username} ได้รับ ${amount} รอคอยน์`);
      })
      .catch(console.error);
  },
};

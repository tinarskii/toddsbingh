const knex = require("../database/connect");

module.exports = {
  name: "set",
  description: "Set money to user (For admins)",
  args: ["user", "amount"],
  adminOnly: true,
  run: (client, target, context, args) => {
    const [username, coins] = args;
    knex("toddsbinUser")
      .where({
        username: username || context.username,
      })
      .update({
        coins,
      })
      .then(() => {
        client.say(
          target,
          `${username || context.username} มีเงิน ${coins} แล้ว`,
        );
      });
  },
};

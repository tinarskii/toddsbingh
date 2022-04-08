const knex = require("../database/connect");

module.exports = {
  name: "farm",
  description: "Farm money",
  args: [],
  run: (client, target, context) => {
    const randomAmount = Math.floor(Math.random() * 100) + 1;
    const [{ farmCooldown: cooldown }] = knex("toddsbinUser")
      .select("farmCooldown")
      .where({
        username: context.username,
      });

    if (Date.now() - cooldown < 25000) {
      return client.say(
        target,
        "You have to wait 25 seconds before you can farm again!",
      );
    }

    knex("toddsbinUser")
      .where("username", context.username)
      .update({
        coins: knex.raw("coins + ?", randomAmount),
        farmCooldown: Date.now(),
      })
      .then(() => {
        client.say(
          target,
          `${context.username} ได้รับ ${randomAmount} รอคอยน์!`,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const knex = require("../database/connect");

module.exports = {
  name: "fuckoff",
  description: "Set everyone's money to amount",
  args: ["amount"],
  adminOnly: true,
  run: (client, target, context, args) => {
    const [coins] = args;
    knex("toddsbinUser")
      .update({
        coins: coins
      })
      .then(() => {
        client.say(
          target,
          `ทุกคนมีเงิน ${coins} แล้ว`
        );
      })
      .catch(console.error);
  }
};

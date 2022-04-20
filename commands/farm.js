const knex = require("../database/connect");
const ms = require("ms");

module.exports = {
  name: "farm",
  description: "Farm money",
  args: [],
  requireProfile: true,
  run: async (client, target, context) => {
    const randomAmount = Math.floor(Math.random() * 100) + 1;
    const [{ farmCooldown: cooldown }] = await knex("toddsbinUser")
      .where({
        username: context.username
      });
    
    if (Date.now() - cooldown < 600 * 1000) {
      return client.say(
        target,
        `คุณต้องรออีก ${ms(600 * 1000, {
          long: true
        })} ก่อนที่จะทำการฟาร์มอีกครั้ง`
      );
    }
    
    knex("toddsbinUser")
      .where("username", context.username)
      .update({
        coins: knex.raw("coins + ?", randomAmount),
        farmCooldown: Date.now()
      })
      .then(() => {
        client.say(
          target,
          `${context.username} ได้รับ ${randomAmount} รอคอยน์!`
        );
      })
      .catch(console.error);
  }
};

const knex = require("../database/connect");

module.exports = {
  name: "airdrop",
  description: "Money drop from the sky",
  args: ["amount"],
  run: (client, target, context, args) => {
    const [coins] = args;
    
    knex("toddsbinUser")
      .update({
        coins: knex.raw("coins + ?", coins)
      })
      .then(() => {
        client.say(target, `สำเร็จ! คุณได้แจกเงินจำนวน ${coins} รอคอยน์`);
      })
      .catch(console.error);
  }
};

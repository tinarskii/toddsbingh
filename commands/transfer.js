const knex = require("../database/connect");

module.exports = {
  name: "transfer",
  description: "Transfer money to another user",
  args: ["user", "amount"],
  requireProfile: true,
  run: async (client, target, context, args) => {
    if (!/^[0-9]+$/.test(args[1])) {
      return client.say(target, "อีเวงใส่เลขดี ๆ ขี้เกียจนั่งแก้บั๊ค");
    }
    
    let [username, coins] = args;
    coins = parseInt(coins);
    
    const [{ settingsValue: transferRate }] = await knex("toddsbinConfig")
      .where({
        settingsName: "transferRate"
      });
    const fee = Math.ceil(coins * ( parseInt(transferRate) / 100 ));
    const moneyWithFee = coins + fee;
    
    try {
      knex("toddsbinUser")
        .where({
          username: context.username
        })
        .then(([rows]) => {
          if (rows.coins < moneyWithFee) {
            return client.say(target, `${context.username}, ตั้งเอ็งไม่พอโว้ย ต้องการ ${moneyWithFee} นะจ๊ะ (คิดค่าธรรมเนียม ${fee} $WAIT)`);
          }
          knex("toddsbinUser")
            .where({
              username
            })
            .then(async ([rows]) => {
              if (!rows) {
                return client.say(
                  target,
                  `${context.username}, เอ็งจะโอนให้ผีหรอ`
                );
              } else {
                knex("toddsbinUser")
                  .where({
                    username: context.username
                  })
                  .update({
                    coins: knex.raw("coins - ?", moneyWithFee)
                  })
                  .then(() => {
                    knex("toddsbinUser")
                      .where({
                        username
                      })
                      .update({
                        coins: knex.raw("coins + ?", coins)
                      })
                      .then(() => {
                        client.say(
                          target,
                          `${context.username}, คุณได้โอน ${coins} เหรียญไปยัง ${username} แล้ว (เสียค่าโอน ${fee} $WAIT)`
                        );
                      });
                  });
              }
            });
        });
    } catch (error) {
      console.log(error);
    }
  }
};

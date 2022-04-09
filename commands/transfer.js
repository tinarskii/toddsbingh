const knex = require("../database/connect");

module.exports = {
  name: "transfer",
  description: "Transfer money to another user",
  args: ["user", "amount"],
  requireProfile: true,
  run: (client, target, context, args) => {
    if (!/^[0-9]+$/.test(args[1])) {
      return client.say(target, "อีเวงใส่เลขดี ๆ ขี้เกียจนั่งแก้บั๊ค");
    }

    let [username, coins] = args;
    coins = parseInt(coins);

    try {
      knex("toddsbinUser")
        .where({
          username: context.username,
        })
        .then(([rows]) => {
          if (rows.coins < coins) {
            return client.say(target, `${context.username}, ตั้งเอ็งไม่พอโว้ย`);
          }
          knex("toddsbinUser")
            .where({
              username,
            })
            .then(([rows]) => {
              if (!rows) {
                return client.say(
                  target,
                  `${context.username}, เอ็งจะโอนให้ผีหรอ`,
                );
              } else {
                knex("toddsbinUser")
                  .where({
                    username: context.username,
                  })
                  .update({
                    coins: knex.raw("coins - ?", args[1]),
                  })
                  .then(() => {
                    knex("toddsbinUser")
                      .where({
                        username,
                      })
                      .update({
                        coins: knex.raw("coins + ?", args[1]),
                      })
                      .then(() => {
                        client.say(
                          target,
                          `${context.username}, คุณได้โอน ${coins} เหรียญไปยัง ${username} แล้ว`,
                        );
                      });
                  });
              }
            });
        });
    } catch (error) {
      console.log(error);
    }
  },
};

const knex = require("../database/connect");

module.exports = {
  name: "invest",
  description: "Bet your money and get more money",
  args: ["amount"],
  run: async (client, target, context, args) => {
    const coins = Math.trunc(parseInt(args[0]));

    if (!/^[0-9]+$/.test(args[0])) {
      return client.say(target, "อีเวงใส่เลขดี ๆ ขี้เกียจนั่งแก้บั๊ค");
    } else if (coins < 1) {
      return client.say(target, "อย่าน้อยกว่า 1 บาทนะครับอีเวง");
    }

    const [{ settingsValue: gachaRate }] = await knex("toddsbinConfig")
      .select("settingsValue")
      .where({
        settingsName: "defaultGachaRate",
      });

    knex("toddsbinUser")
      .where({
        username: context.username,
      })
      .then(([rows]) => {
        if (rows.coins < coins) {
          return client.say(target, "ตังไม่พอโว้ย");
        }

        if (Math.random() < Number(gachaRate) / 100) {
          knex("toddsbinUser")
            .where({
              username: context.username,
            })
            .increment({
              coins: coins * 2,
            })
            .then(() => {
              return client.say(
                target,
                `${context.username} เห้ยยยยยยยยยยยย บ้าไปแล้ว ได้ไปเลย ${
                  coins * 2
                } รอคอยน์`,
              );
            });
        } else {
          knex("toddsbinUser")
            .where({
              username: context.username,
            })
            .decrement({
              coins,
            })
            .then(() => {
              return client.say(
                target,
                `${context.username} ว้าย ๆๆๆ แพ้ไปดิ หายไปเลย ${coins} รอคอยน์`,
              );
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

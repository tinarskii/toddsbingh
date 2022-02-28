// Import knex
const knex = require("../database/connect");

module.exports = {
  name: "gacha",
  description: "Bet your money and get more money",
  args: ["amount"],
  run: (client, target, context, args) => {
    // If no args are provided
    if (!args.length) {
      return client.say(
        target,
        `${context.username}, ไม่ใส่ตังเดี๋ยวจะใส่เดี๋ยวกับเอ็ง`,
      );
    }
    // Get the user's balance
    knex
      .select("coins")
      .from("toddsbinUser")
      .where("username", target.slice(1))
      .then(([rows]) => {
        // If there is no rows
        if (!rows) {
          // Return
          return client.say(target, 'ใช้ "create" เพื่อสร้างโปรไฟล์ก่อนเด้ออ');
        }
        // Check if the user has enough coins
        if (rows.coins < Number(args[0])) {
          // Return
          return client.say(target, "ตังไม่พอโว้ย");
        }
        // Get random number between 1 and 20
        const random = Math.floor(Math.random() * 20) + 1;
        // Generate random number between 1 and 20 as a result
        const result = Math.floor(Math.random() * 20) + 1;
        // Check if random number is equal to result
        if (random === result) {
          // Add coins to the user's balance
          knex("toddsbinUser")
            .where("username", target.slice(1))
            .increment("coins", Number(args[0]))
            .then(() => {
              // Return
              return client.say(
                target,
                `เห้ยยยยยยยยยยยย บ้าไปแล้ว ได้ไปเลย ${args[0] * 1.4} รอคอยน์`,
              );
            });
        } else {
          // Remove coins from the user's balance
          knex("toddsbinUser")
            .where("username", target.slice(1))
            .decrement("coins", Number(args[0]))
            .then(() => {
              // Return
              return client.say(
                target,
                `ว้าย ๆๆๆ แพ้ไปดิ หายไปเลย ${args[0]} รอคอยน์`,
              );
            });
        }
      });
  },
};

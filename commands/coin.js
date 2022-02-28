// Import knex
const knex = require("../database/connect");

module.exports = {
  name: "coin",
  description: "Check your current balance.",
  args: [],
  run: (client, target) => {
    // Get the user's balance
    knex
      .select("coins")
      .from("toddsbinUser")
      .where("username", target.slice(1))
      .then(([rows]) => {
        // If there is no rows
        if (!rows) {
          // Return
          return client.say(
            target,
            "ใช้ \"create\" เพื่อสร้างโปรไฟล์ก่อนเด้ออ",
          );
        }
        // Return the balance
        client.say(target, `${target.slice(1)} มี ${rows["coins"]} รอคอยน์`);
      });
  },
};

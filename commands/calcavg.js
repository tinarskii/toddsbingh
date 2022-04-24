const knex = require("../database/connect");

module.exports = {
  name: "calcavg",
  description: "Calculate average coins and in Thai Baht.",
  args: [],
  run: (client, target) => {
    knex("toddsbinUser")
      .select("coins")
      .then((rows) => {
        let allCoins = rows.map((row) => Number(row.coins));
        let sum = allCoins.reduce((a, b) => a + b, 0);
        let avg = Math.round(sum / allCoins.length);
        console.log(allCoins);
        let avgThai = Math.ceil(avg * 5);
        
        client.say(target,
          `รอคอยน์มีเฉลี่ยที่ ${avg} และค่าเงินต่อหนึ่งบาทอยู่ที่ ${avgThai} รอคอยน์`
        );
      })
      .catch(console.error);
  }
};

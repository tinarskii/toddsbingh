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
            "Use \"create\" command to create a profile.",
          );
        }
        // Return the balance
        client.say(target, `${target.slice(1)} has ${rows["coins"]} coins.`);
      });
  },
};

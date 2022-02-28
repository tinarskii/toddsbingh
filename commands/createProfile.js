// Import knex
const knex = require("../database/connect");

module.exports = {
  name: "create",
  description: "Create a new profile",
  args: [],
  run: (client, target) => {
    // Check if the user is already in the database
    knex
      .select("*")
      .from("toddsbinUser")
      .where("username", target.slice(1))
      .then(([rows]) => {
        // If the user is not in the database, create a new profile
        if (!rows) {
          // Insert the new user into the database
          knex("toddsbinUser")
            .insert({
              username: target.slice(1),
              coins: 0,
            })
            .then(() => {
              // Send a message to the user
              client.say(target, `${target.slice(1)} has been created!`);
            });
        } else {
          // Send a message to the user
          client.say(target, `${target.slice(1)} already exists!`);
        }
      });
  },
};

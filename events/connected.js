// Import chalk
const chalk = require("chalk");

// Export event
module.exports = {
  // Set event name
  event: "connected",
  // Set event function
  run: (client, address, port) => {
    // Log event
    console.log(chalk.green(`Connected to ${address}:${port}`));
    // client.say("tin_sci", "ชวนคุยได้นะ คุยไม่เก่ง");
    // setInterval(() => {
    //   client.say("tin_sci", "ชวนคุยได้นะ คุยไม่เก่ง");
    // }, (5 * 60 * 1000));
  },
};

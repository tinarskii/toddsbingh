const axios = require("axios");

module.exports = {
  name: "giveaway",
  description: "Pick a random users from chat",
  args: [],
  run: (client, target) => {
    axios.get("https://tmi.twitch.tv/group/user/tin_sci/chatters")
      .then((res) => {
        const { data } = res;
        const { viewers } = data['chatters'];
        const randomUser = viewers[Math.floor(Math.random() * viewers.length)];
        client.say(target, `${randomUser} is the winner!`);
      })
  },
};

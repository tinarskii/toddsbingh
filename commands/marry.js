const axios = require("axios");

module.exports = {
  name: "marry",
  description: "Marry someone in the chat",
  args: [],
  run: (client, target, context) => {
    axios
      .get("https://tmi.twitch.tv/group/user/tin_sci/chatters")
      .then((res) => {
        const { viewers } = res.data.chatters;
        const random = Math.floor(Math.random() * viewers.length);
        const tx = viewers[random];

        client.say(target, `${context.username} คุณได้แต่งงานกับ ${tx}! 💑!`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

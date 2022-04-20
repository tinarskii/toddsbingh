const axios = require("axios");

module.exports = {
  name: "marry",
  description: "Marry someone in the chat",
  args: [],
  run: (client, target, context) => {
    axios
      .get("https://tmi.twitch.tv/group/user/tin_sci/chatters")
      .then((res) => {
        const { viewers } = res.data["chatters"];
        const filterUsers = [
          "0ax2",
          "abbottcostello",
          "aliengathering",
          "itsthefrits",
          "itzemmaaaaaaa",
          "kaxips06",
          "soundalerts",
          "anotherttvviewer",
          "toddsbingh"
        ];
        const filterViewers = viewers.filter(
          (viewer) => !filterUsers.includes(viewer.toLowerCase())
        );
        const randomUser =
          filterViewers[Math.floor(Math.random() * filterViewers.length)];
        
        client.say(
          target,
          randomUser
            ? `${context.username} คุณได้แต่งงานกับ ${randomUser}! 💑!`
            : "คุณไม่ได้แม้แต่เพื่อน 😥"
        );
      })
      .catch(console.error);
  }
};

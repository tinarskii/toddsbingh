const axios = require("axios");

module.exports = {
  name: "giveaway",
  description: "Pick a random users from chat",
  args: [],
  adminOnly: true,
  run: (client, target) => {
    axios
      .get("https://tmi.twitch.tv/group/user/tin_sci/chatters")
      .then((res) => {
        const { data } = res;
        const { viewers } = data["chatters"];
        const filterUsers = [
          "0ax2",
          "abbottcostello",
          "aliengathering",
          "itsthefrits",
          "itzemmaaaaaaa",
          "kaxips06",
          "soundalerts",
          "anotherttvviewer",
          "toddsbingh",
        ];
        const filterViewers = viewers.filter(
          (viewer) => !filterUsers.includes(viewer.toLowerCase()),
        );
        const randomUser =
          filterViewers[Math.floor(Math.random() * filterViewers.length)];

        client.say(target, `${randomUser ? randomUser + " " : "ไม่มีใคร"}ชนะ`);
      });
  },
};

module.exports = {
  name: "ban",
  description: "Bans a user from the chat.",
  args: ["user"],
  adminOnly: true,
  run: (client, target, context, args) => {
    const [user] = args;
    client
      .ban(target, user)
      .then(() => {
        client.say(target, `${user} โดนประหารเรียบร้อย`);
      })
      .catch(console.error);
  }
};

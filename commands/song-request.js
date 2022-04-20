const ytdl = require("ytdl-core");
const Speaker = require("speaker");
const speaker = new Speaker({
  channels: 2,
  bitDepth: 16,
  sampleRate: 48000
});
const ffmpeg = require("fluent-ffmpeg");
let currentSong = null;
let latestCooldown = 0;

module.exports = {
  name: "song-request",
  description: "Request a song to be played.",
  args: ["youtube-url"],
  disabled: true,
  run: (client, target, ctx, args) => {
    if (currentSong !== null) {
      return client.say(
        target,
        `โปรดรอเพลง ${currentSong.title} ให้เล่นจบก่อน`
      );
    }
    const youtubeRegex =
      /(?:http(?:s|):\/\/|)(?:www\.|m\.|)youtu(?:be\.com|\.be)\/(?:watch\?v=|)([a-zA-Z0-9_-]{11})(?:[#&?]t(=\d+|)|)/;
    if (!args.length) {
      return client.say(target, "บอกเพลงดิเห้ย");
    }
    if (!youtubeRegex.test(args[0])) {
      return client.say(target, "ใส่เป็นลิ้งค์โว้ย");
    }
    
    ytdl.getInfo(args[0])
      .then((info) => {
        const { videoDetails: details } = info;
        if (details.lengthSeconds > 480) {
          return client.say("เยอะกว่า 8 นาทีไม่เอา");
        }
        client.say(target, `เล่นเพลงแล้ว: ${details.title}`);
        latestCooldown = Date.now();
        
        const audio = ytdl(args[0], {
          filter: "audioonly",
          quality: "highestaudio",
          highWaterMark: 1 << 25
        });
        
        ffmpeg(audio)
          .format("s16le")
          .on("error", (err) => {
            console.log(err);
          })
          .pipe(speaker);
        
        currentSong = {
          title: details.title,
          url: args[0]
        };
        
        setTimeout(() => {
          if (currentSong.title === details.title) {
            currentSong = null;
            speaker.end();
            client.say(target, `หยุดเพลงแล้ว: ${details.title}`);
          }
        }, details.lengthSeconds * 1000);
      });
  }
};

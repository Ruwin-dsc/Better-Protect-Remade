const loadSlashCommands = require("../../handlers/slashcommand");
const { ActivityType, Events } = require("discord.js");

module.exports = {
  name: "ready",
  async execute(bot) {
    await loadSlashCommands(bot);
    console.log(`Connectés à ${bot.user.username}`);
    console.log(`Le bot est utilisé sur ${bot.guilds.cache.size} serveur(s) !`);

    bot.user.setPresence({
      activities: [
        {
          name: "/help",
          type: ActivityType.Listening,
          url: "https://www.twitch.tv/ruwin2007yt",
        },
      ],
      status: "dnd",
    });
  },
};

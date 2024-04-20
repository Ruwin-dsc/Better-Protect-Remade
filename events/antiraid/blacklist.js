const Discord = require("discord.js");
const config = require('../../config.json')

module.exports = {
  name: "guildBanRemove",
  execute(member, bot) {
    bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${member.guild.id}" AND userId = "${member.user.id}"`, async (err, req) => {
        if(req.length < 1) return 
        else member.guild.bans.create(member.user.id, { reason: 'blacklisted by Beter'})
    })
  }
}
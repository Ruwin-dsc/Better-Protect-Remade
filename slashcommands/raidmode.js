const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
  name: "raidmode",
  description: "Bloquer les utilisateurs tentant de rejoindre votre serveur.",
  permission: "Aucune",
  dm: false,
  owner: true,
  async run(bot, message, args) {
    const embed = new Discord.EmbedBuilder()
    .setColor(`#313338`)
    .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`)

    const embed2 = new Discord.EmbedBuilder()
    .setDescription(`<:better_off:1147103040223068250> Vous ne bloquez plus les utilisateurs tentant de rejoindre votre serveur.`)
    .setColor(`#313338`)

    const embed3 = new Discord.EmbedBuilder()
    .setDescription(`<:better_on:1147103042492182590> Vous bloquez maintenant les utilisateurs tentant de rejoindre votre serveur.`)
    .setColor(`#313338`)

    bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.user.id}"`, async (err, req) => {
        if(req.length < 1) {
            if(message.user.id !== message.guild.ownerId) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete() }, 5000))
            else {
                bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) {
                        message.guild.disableInvites(true)
                        bot.db.query(`INSERT INTO guild (guildId, raidmode) VALUES ("${message.guild.id}", "on")`)
                        
                        message.reply({ embeds: [embed3]})
                    } else {
                        if(req[0].raidmode == "off") {
                            message.guild.disableInvites(true)
                            bot.db.query(`UPDATE guild SET raidmode = "on" WHERE guildId = ${message.guild.id}`);
                            message.reply({ embeds: [embed3]})
                        } else {
                            message.guild.disableInvites(false)
                            bot.db.query(`UPDATE guild SET raidmode = "off" WHERE guildId = ${message.guild.id}`);
                            message.reply({ embeds: [embed2]})
                        }
                    }
                })}
        } else {
            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(req.length < 1) {
                    message.guild.disableInvites(true)
                    bot.db.query(`INSERT INTO guild (guildId, raidmode) VALUES ("${message.guild.id}", "on")`)
                    
                    message.reply({ embeds: [embed3]})
                } else {
                    if(req[0].raidmode == "off") {
                        message.guild.disableInvites(true)
                        bot.db.query(`UPDATE guild SET raidmode = "on" WHERE guildId = ${message.guild.id}`);
                        message.reply({ embeds: [embed3]})
                    } else {
                        message.guild.disableInvites(false)
                        bot.db.query(`UPDATE guild SET raidmode = "off" WHERE guildId = ${message.guild.id}`);
                        message.reply({ embeds: [embed2]})
                    }
                }
            })
    }
    })
  }
}
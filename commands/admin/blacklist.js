const Discord = require("discord.js")
const config = require("../../config.json")

exports.help = {
    name: "blacklist",
    category: 'public',
    description: "Gérer la liste noire du serveur.",
    permission: "Admin", 
    aliases: ['bl'], 
    owner: true
  };
  
  exports.run = async (bot, message, args) => {
    const noargs = new Discord.EmbedBuilder()
    .setDescription(`<:better_no:1147096824440705024> Aucun utilisateur indiqué.`)
    

    const user = message.mentions.members.first() || await bot.users.fetch(args[0]).catch(e => { 
        if(args[0]) {
            const nouser = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024>Je n'ai trouvé aucun utilisateur (**${args[0]}**).`)
            return message.reply({ embeds: [nouser] })
        } else {
            return message.reply({ embeds: [noargs]})
        }
     })

    if(message.mentions.members.first()) user.username = user.user.username
    if(user.username !== undefined) {
    const embedAdd = new Discord.EmbedBuilder()
    .setDescription(`<:better_yes:1147114141652369490> Vous venez d'ajouter **${user.username}** dans la liste noire.`)

    const embedRemove = new Discord.EmbedBuilder()
    .setDescription(`<:better_yes:1147114141652369490> Vous venez de supprimer **${user.username}** de la liste noire.`)
    
    bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`, async (err, req) => {
        if(req.length < 1) {
            bot.db.query(`INSERT INTO blacklist (guildId, userId) VALUES (${message.guild.id}, ${user.id})`)
            await message.guild.bans.create(user.id)
            .catch((e) => {
                return console.log(e);
            });
            return message.reply({ embeds: [embedAdd] })
        } else {
            bot.db.query(`DELETE FROM blacklist WHERE guildId = ${message.guild.id} AND userId = ${user.id}`);
            await message.guild.members.unban(user.id).catch(() => {  })
            return message.reply({ embeds: [embedRemove] })
        }
    })


    }

  }

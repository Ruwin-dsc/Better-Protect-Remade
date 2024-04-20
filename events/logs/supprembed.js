const Discord = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch');
const ms = require("ms")

module.exports = {
    name: "messageDelete", 
    async execute(message, bot) {
  
       bot.db.query(`SELECT * FROM supprembed WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if (err || req.length < 1) return;
  
        const { state, logs, punition, permission} = req[0];
        if(message.embeds.length == 0) return

        const checkAction = async () => {
          let msg = ""
          bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${message.guild.id}"`, async (err, req) => {
              if(req.length ? req[0]?.deleteembed : "a" == "msg") msg = req[0].text || ""
             
              const channel = message.guild.channels.cache.get(logs)
              if(channel) { 
                const a = new Discord.ButtonBuilder()
                .setLabel("Renvoyer")
                .setCustomId("renvoyer")
                .setEmoji("<:renvoyer:1230906766842396722>")
                .setStyle(Discord.ButtonStyle.Primary)
                const msg2 = await channel.send({ embeds: message.embeds, content: msg + `\n<:poubelle:1228059993274580992> Un embed viens d'être supprimé dans le salon **${message.channel}**.`, components: [new Discord.ActionRowBuilder().addComponents(a)]})

                 const collector = msg2.createMessageComponentCollector({ time: 120000 });
                
                collector.on("collect", async (interaction) => {
                    if(interaction.customId == "renvoyer") {
                        message.channel.send({ embeds: message.embeds})
                        interaction.reply({ content: "<:better_yes:1147114141652369490>  Renvoie du message avec succès.", ephemeral: true})
                    }
                })
              }
             })
        };

        checkAction()
  
    })
}   
  };
 
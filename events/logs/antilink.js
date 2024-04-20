const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require("ms")
const puni = {
    expul: "Expulsion.",
    banni: "Bannissement.",
    supprrole: "Suppression de ces rôles.",
    excluretempo: "Exclure temporairement.",
    aucun: "Aucune."
}

const links = {
    image: "   ・ Contenant une image.",
    imagediscord: "   ・ Contenant une image.\n   ・ Contenant une invitation discord.",
    discord: "   ・ Contenant une invitation discord.",
    lien: "   ・ Contenant un lien en général.",
    imagelien: "   ・ Contenant un lien en général.\n   ・ Contenant un lien en général.",
    liendiscord: "   ・ Contenant une invitation discord.\n   ・ Contenant un lien en général.",
    imagediscordlien: "   ・ Contenant une image.\n   ・ Contenant une invitation discord.\n   ・ Contenant un lien en général."
}

const regexLink = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;;
const regexImage = /(?:https?:\/\/)?(?:cdn\.discordapp\.com|media\.giphy\.com|i\.imgur\.com|imgur\.com|gyazo\.com|prnt\.sc|tinypic\.com|imgflip\.com|imgbb\.com|giphy\.com|tenor\.com)\/[^\s/$.?#]+\.(?:jpg|jpeg|png|gif|webp)/gi;
const regexDiscord = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;;


module.exports = {
  name: "messageCreate", 
  async execute(message, bot) {
    if(message.author.bot) return
    const combinedRegex = new RegExp(`(${regexImage.source}|${regexLink.source}|${regexDiscord.source})`, 'gi');
    if (!message.content.match(combinedRegex)) return
     bot.db.query(`SELECT * FROM antilink WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste, duree, inclus} = req[0];

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        bot.db.query(`SELECT * FROM antilinkchannel WHERE guildId = "${message.guild.id}" AND channelId = "${message.parentId}"`, async (err, req) => {
        if(req.length > 0) return
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.linkmsg : "a" == "msg") msg = req[0].text
            if(state == "on") {
            if(inclus == "image") if(!message.content.match(regexImage)) return
            else if(inclus == "imagediscord") if(!message.content.match(regexImage) || !message.content.match(regexDiscord)) return
            else if(inclus == "discord") if(!message.content.match(regexDiscord)) return
            else if(inclus == "lien") if(!message.content.match(regexLink)) return
            else if(inclus == "imagelien") if(!message.content.match(regexImage) || !message.content.match(regexLink)) return
            else if(inclus == "liendiscord") if(!message.content.match(regexLink) || !message.content.match(regexDiscord)) return
            else if(inclus == "imagediscord") if(!message.content.match(regexImage) || !message.content.match(regexDiscord)  || !message.content.match(regexLink)) return
        
            if(punition == "expul") message.guild.members.cache.get(message.author.id).kick({ reason: 'AntiLink by beter /uhq'})
            else if(punition == "banni") message.guild.members.cache.get(message.author.id).ban({ reason: 'AntiLink by beter /uhq' })
            else if(punition == "supprrole") message.guild.members.cache.get(message.author.id).roles.set([], `AntiLink by beter /uhq`);
            else if(punition == "excluretempo") message.guild.members.cache.get(message.author.id).timeout(ms(duree))
            message.delete()
            const channel = message.guild.channels.cache.get(message.channel.id)
            if(channel) channel.send(`<:attention:1230206717179203717> ${message.author}, votre message contient des/un lien(s) interdit.`).then(m => setTimeout(() => { m.delete()}, 2000))
          }
            const channel = message.guild.channels.cache.get(logs)
            if(channel) {
              const matches = Array.from(message.content.matchAll(combinedRegex), match => `   ・ ${match[0]}\n`);
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`diff\n+ ${message.author.username} vient d'envoyer un message contenant un lien interdit.\nUtilisateur: ${message.author.username} (ID: ${message.author.id})\nSalon: ${message.channel.name} (ID: ${message.channel.id})\nContient:\n${links[inclus]}\nLien:\n${matches.join(" ")}\nPunition: ${puni[punition]}\`\`\``)
              .setColor("#2c2f33")  

              channel.send({ embeds: [embed], content: msg})
            }
           })
          })
      };

      switch (reste) {
        case "proprioblanche":
          if (await checkuserr("ownerlist") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        case "proprio":
          if (await checkuserr("ownerlist")) return;
          await checkAction();
          break;
        case "blanche":
          if (await checkuserr("whitelist")) return;
          await checkAction();
          break;
        case "independant":
          if (await checkuserr("antimessagecreatelistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antimessagecreatelistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("antimessagecreatelistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antimessagecreatelistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};
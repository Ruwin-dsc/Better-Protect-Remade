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
let arrayAvecLesMessag = [];
let logSent = new Set();
let arrayUser = []
//MERCI sadek.yk <3

module.exports = {
  name: "messageCreate", 
  async execute(messageC, bot) {

    if(messageC.author.bot) return
    const channel = messageC.channel
     bot.db.query(`SELECT * FROM antispam WHERE guildId = "${messageC.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return; 

      const { state, logs, punition, permission, reste, duree, message, intervalle} = req[0];

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${messageC.guild.id}" AND userId = "${messageC.author.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        bot.db.query(`SELECT * FROM antispamchannel WHERE guildId = "${messageC.guild.id}" AND channelId = "${messageC.channel.id}"`, async (err, req) => {
        if(req.length > 0) return
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${messageC.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.spammsg : "a" == "msg") msg = req[0].text
            if(state == "on") {
                let data = arrayAvecLesMessag.find(item => item.authorId === messageC.author.id) || { count: 0, messageIds: [], authorId: messageC.author.id };
                data.count++;
                data.messageIds.push(messageC.id);

                if (!arrayAvecLesMessag.find(item => item.authorId === messageC.author.id)) {
                    arrayAvecLesMessag.push(data);
                  }

                  if (data.count >= message && !logSent.has(messageC.author.id)) {
                    logSent.add(messageC.author.id);
                    if(punition == "expul") messageC.guild.members.cache.get(messageC.author.id).kick({ reason: 'antispam by beter /uhq'})
                    else if(punition == "banni") messageC.guild.members.cache.get(messageC.author.id).ban({ reason: 'antispam by beter /uhq' })
                    else if(punition == "supprrole") messageC.guild.members.cache.get(messageC.author.id).roles.set([], `antispam by beter /uhq`);
                    else if(punition == "excluretempo") messageC.guild.members.cache.get(messageC.author.id).timeout(ms(duree))
                    logSent.delete(messageC.author.id); 
                    try {
                        
                        
                        const deletedCount = data.messageIds.length;
                        await channel.bulkDelete(data.messageIds);
                        if(arrayUser.includes(messageC.author.id)) return
                        messageC.channel.send(`<:attention:1230206717179203717> ${messageC.author}, vous envoyez trop de message rapidement.`).then(m => setTimeout(() => { m.delete()}, 5000))
                        
                        arrayUser.push(messageC.author.id)
                        const channel2 = messageC.guild.channels.cache.get(logs)
                        if(channel2) {
                        const embed = new Discord.EmbedBuilder()
                        .setDescription(`\`\`\`diff\n+ ${messageC.author.username} vient d'envoyer des messages trop rapidement.\nUtilisateur: ${messageC.author.username} (ID: ${messageC.author.id})\nSalon: ${messageC.channel.name} (ID: ${messageC.channel.id})\nMessages: ${data.messageIds.length}\nPunition: ${puni[punition]}\`\`\``)
                        .setColor("#2c2f33")  
        
                        channel2.send({ embeds: [embed], content: msg})
                        //arrayUser = []
                        }
                      } catch (error) {
                        console.log(error)
                        await channel.bulkDelete(arrayAvecLesMessag.filter(messageId => !deletedMessages.has(messageId)))
                      }
                  }

                  setTimeout(() => {
                    arrayAvecLesMessag = arrayAvecLesMessag.filter(item => item.authorId !== messageC.author.id);
                    logSent.delete(messageC.author.id); 
                  }, ms(intervalle));
            
            


           
        }})})
          
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
          if (await checkuserr("antispamlistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antispamlistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("antispamlistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antispamlistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};



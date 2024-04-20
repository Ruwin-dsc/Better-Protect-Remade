const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {

    if(!member.user.bot) return
    bot.db.query(`SELECT * FROM antibot WHERE guildId = "${member.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste } = req[0];

      const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.BotAdd }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === member.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${member.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${member.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.addbot : "a" == "msg") msg = req[0].text
            if(state == "on") {
            member.kick({ reason: 'Antibot by beter /uhq'})
            if(punition == "expul") member.guild.members.cache.get(action.executor.id).kick({ reason: 'Antibot by beter /uhq'})
            else if(punition == "banni") member.guild.members.cache.get(action.executor.id).ban({ reason: 'Antibot by beter /uhq' })
            else if(punition == "supprrole") member.guild.members.cache.get(action.executor.id).roles.set([], `Antibot by beter /uhq}`);

            if(permission == "on") {
              member.guild.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
            const channel = member.guild.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`diff\n+ ${action.executor.username} a ajouté un bot.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nBot: ${member.user.username} (ID: ${member.user.id})\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
              .setColor("#2c2f33")  

              channel.send({ embeds: [embed], content: msg})
            }
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
          if (await checkuserr("antibotlistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antibotlistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("antibotlistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antibotlistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};


// bot.db.query(`SELECT * FROM antibotlistuser WHERE guildId = "${member.guild.id}" AND userId = "${member.user.id}"`, async (err, req) => {
//   if(req.length > 0) return
//   else {
//     bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${member.guild.id}"`, async (err, req) => {
//       if(req[0].addbot == "msg") 
//     })
//   }
// })      
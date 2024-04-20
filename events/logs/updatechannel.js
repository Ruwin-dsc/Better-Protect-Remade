const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

module.exports = {
  name: "channelUpdate",
  async execute(oldRole, newRole, bot) {
    bot.db.query(`SELECT * FROM updatechannel WHERE guildId = "${oldRole.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste } = req[0];

      const action = await oldRole.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.ChannelUpdate }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === oldRole.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${oldRole.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        bot.db.query(`SELECT * FROM updatechannelchannel WHERE guildId = "${oldRole.guild.id}" AND channelId = "${oldRole.id}"`, async (err, req) => {
            if(req.length > 0) return
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${oldRole.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.chanelupdate : "a" == "msg") msg = req[0].text
            if(state == "on") {
            newRole.edit({
                name: oldRole?.name,
                type: oldRole?.type,
                position: oldRole?.position || 0,
                parent: oldRole?.parent,
            });
            if(punition == "expul") oldRole.guild.members.cache.get(action.executor.id).kick({ reason: 'AntiRoleUpdate by beter /uhq'})
            else if(punition == "banni") oldRole.guild.members.cache.get(action.executor.id).ban({ reason: 'AntiRoleUpdate by beter /uhq' })
            else if(punition == "supprrole") oldRole.guild.members.cache.get(action.executor.id).roles.set([], `AntiRoleUpdate by beter /uhq}`);

            if(permission == "on") {
              oldRole.guild.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
            const channel = oldRole.guild.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`md\n# ${action.executor.username} a modifié 1 salon.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
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
          if (await checkuserr("updatechannellistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("updatechannellistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("updatechannellistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("updatechannellistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};
const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

module.exports = {
  name: "channelCreate",
  async execute(channel, bot) {

    bot.db.query(`SELECT * FROM createchannel WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste } = req[0];

      const action = await channel.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.ChannelCreate }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === channel.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${channel.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.channelcreate : "a" == "msg") msg = req[0].text
            if(state == "on") {
            channel.delete()
            if(punition == "expul") channel.guild.members.cache.get(action.executor.id).kick({ reason: 'AntiChannelCreate by beter /uhq'})
            else if(punition == "banni") channel.guild.members.cache.get(action.executor.id).ban({ reason: 'AntiChannelCreate by beter /uhq' })
            else if(punition == "supprrole") channel.guild.members.cache.get(action.executor.id).roles.set([], `AntiChannelCreate by beter /uhq}`);

            if(permission == "on") {
                channel.guild.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
            const channel2 = channel.guild.channels.cache.get(logs)
            if(channel2) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`diff\n+ ${action.executor.username} a créé un salon.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nSalon: ${channel.name} (ID: ${channel.id})\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
              .setColor("#2c2f33")  

              channel2.send({ embeds: [embed], content: msg})
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
          if (await checkuserr("createchannellistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("createchannellistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("createchannellistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("createchannellistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};
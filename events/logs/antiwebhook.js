const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
    expul: "Expulsion.",
    banni: "Bannissement.",
    supprrole: "Suppression de ces rôles.",
    excluretempo: "Exclure temporairement.",
    clonnchannel: "Clonage du salon.",
    supprchannel: "Suppression.",
    aucun: "Aucune."
}

module.exports = {
  name: "webhooksUpdate",
  async execute(channel, bot) {
    bot.db.query(`SELECT * FROM createwebhook WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste, action } = req[0];

      const action2 = await channel.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.WebhookCreate }).then(audit => audit.entries.first());
      if (!action2 || action2.executor.id === bot.user.id || action2.executor.id === channel.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${channel.guild.id}" AND userId = "${action2.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.webhookcreate : "a" == "msg") msg = req[0].text
            if(state == "on") {
            if(action == "clonnchannel") channel.clone(), channel.delete()
            else if(action == "supprchannel") channel.delete()
            if(punition == "expul") channel.guild.members.cache.get(action2.executor.id).kick({ reason: 'AntiChannelCreate by beter /uhq'})
            else if(punition == "banni") channel.guild.members.cache.get(action2.executor.id).ban({ reason: 'AntiChannelCreate by beter /uhq' })
            else if(punition == "supprrole") channel.guild.members.cache.get(action2.executor.id).roles.set([], `AntiChannelCreate by beter /uhq}`);

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
              .setDescription(`\`\`\`diff\n+ ${action2.executor.username} a créé un webhook.\nUtilisateur: ${action2.executor.username} (ID: ${action2.executor.id})\nSalon: ${channel.name} (ID: ${channel.id})\nPunition: ${puni[punition]}\nAction: ${puni[action]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
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
          if (await checkuserr("createwebhooklistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("createwebhooklistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("createwebhooklistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("createwebhooklistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};
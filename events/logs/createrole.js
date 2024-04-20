const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

module.exports = {
  name: "roleCreate",
  async execute(role, bot) {
    bot.db.query(`SELECT * FROM createrole WHERE guildId = "${role.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste } = req[0];

      const action = await role.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === role.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${role.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${role.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.rolecreate : "a" == "msg") msg = req[0].text
            if(state == "on") {
            role.delete()
            if(punition == "expul") role.guild.members.cache.get(action.executor.id).kick({ reason: 'AntiRoleCreate by beter /uhq'})
            else if(punition == "banni") role.guild.members.cache.get(action.executor.id).ban({ reason: 'AntiRoleCreate by beter /uhq' })
            else if(punition == "supprrole") role.guild.members.cache.get(action.executor.id).roles.set([], `AntiRoleCreate by beter /uhq}`);

            if(permission == "on") {
              role.guild.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
            const channel = role.guild.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`diff\n+ ${action.executor.username} a créé un rôle.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nRôle: ${role.name} (ID: ${role.id})\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
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
          if (await checkuserr("createrolelistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("createrolelistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("createrolelistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("createrolelistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};
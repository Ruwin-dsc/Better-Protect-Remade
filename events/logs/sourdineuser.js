const Discord = require('discord.js');
const config = require('../../config.json');
const bans = new Map();
const ms = require("ms")
const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState, bot) {
    if (!oldState.serverDeaf && newState.serverDeaf) {
    bot.db.query(`SELECT * FROM sourdineuser WHERE guildId = "${newState.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste, intervalle, maximum } = req[0];

      const action = await newState.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberDisconnect }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === newState.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${newState.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${newState.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.sourdineuservoc : "a" == "msg") msg = req[0].text
            if(state == "on") {
            const data = bans.get(action.executor.id) || 0
            bans.set(action.executor.id, data + 1);
            if(Number(bans.get(action.executor.id)) == Number(maximum)) {
            if(punition == "expul") newState.guild.members.cache.get(action.executor.id).kick({ reason: 'Antisourdineuser by beter /uhq'})
            else if(punition == "banni") newState.guild.members.cache.get(action.executor.id).ban({ reason: 'Antisourdineuser by beter /uhq' })
            else if(punition == "supprrole") newState.guild.members.cache.get(action.executor.id).roles.set([], `Antisourdineuser by beter /uhq}`);

            if(permission == "on") {
              newState.guild.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
        }
            const channel = newState.guild.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`md\n# ${action.executor.username} a mit en sourdine un utilisateur.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nCible: ${newState.guild.members.cache.get(newState.id).user.username} (ID: ${newState.id}) ${Number(bans.get(action.executor.id)) == Number(maximum) ? "" : "❌"}\nLimite: ${bans.get(action.executor.id)}/${maximum}\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
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
          if (await checkuserr("sourdineuserlistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("sourdineuserlistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("sourdineuserlistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("sourdineuserlistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
      setTimeout(() => {
        bans.delete(action.executor.id);
      }, ms(intervalle))
    });
}
  }
}

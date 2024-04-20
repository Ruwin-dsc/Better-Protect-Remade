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
  name: "guildMemberUpdate",
  async execute(oldState, newState, bot) {
    if (!oldState.isCommunicationDisabled() && newState.isCommunicationDisabled()) {
    bot.db.query(`SELECT * FROM timeout WHERE guildId = "${newState.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste, intervalle, maximum } = req[0];

      const action = await newState.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberUpdate }).then(audit => audit.entries.first());
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
            if(req.length ? req[0]?.temporalyexpulse : "a" == "msg") msg = req[0].text
            if(state == "on") {
            const data = bans.get(action.executor.id) || 0
            bans.set(action.executor.id, data + 1);
            if(Number(bans.get(action.executor.id)) == Number(maximum)) {
            newState.guild.members.cache.get(oldState.id).timeout(null, 'Antitimeout by beter /uhq')
            if(punition == "expul") newState.guild.members.cache.get(action.executor.id).kick({ reason: 'Antitimeout by beter /uhq'})
            else if(punition == "banni") newState.guild.members.cache.get(action.executor.id).ban({ reason: 'Antitimeout by beter /uhq' })
            else if(punition == "supprrole") newState.guild.members.cache.get(action.executor.id).roles.set([], `Antitimeout by beter /uhq}`);

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
              .setDescription(`\`\`\`diff\n- ${action.executor.username} a exclue temporairement un utilisateur.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nPendant: ${calcul(newState.communicationDisabledUntilTimestamp)}\nCible: ${newState.guild.members.cache.get(newState.id).user.username} (ID: ${newState.id}) ${Number(bans.get(action.executor.id)) == Number(maximum) ? "" : "❌"}\nLimite: ${bans.get(action.executor.id)}/${maximum}\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
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
          if (await checkuserr("timeoutlistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("timeoutlistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("timeoutlistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("timeoutlistuser") || await checkuserr("whitelist")) return;
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
};

function calcul(timestamp) {
    const difference = timestamp - Date.now();

    const jour = Math.floor(difference / (1000 * 60 * 60 * 24));
    const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const units = [];

    if (jour > 0) {
        units.push(`${jour + 2}d`);
    }
    if (heures > 0) {
        units.push(`${heures + 2}h`);
    }
    if (minutes > 0) {
        units.push(`${minutes + 2}m`);
    }
    if (seconds > 0) {
        units.push(`${seconds + 2}s`);
    }


    const durationText = units.join(', ');

    return durationText;
}
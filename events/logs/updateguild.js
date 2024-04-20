const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

module.exports = {
  name: "guildUpdate",
  async execute(oldRole, newRole, bot) {
    bot.db.query(`SELECT * FROM updateguild WHERE guildId = "${oldRole.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste } = req[0];

      const action = await oldRole.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.guildUpdate }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === oldRole.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${oldRole.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        let msg = null
        const modif = await guildUpdateLogs(oldRole, newRole)
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${oldRole.id}"`, async (err, req) => {
            if(req.length ? req[0]?.roleupdate : "a" == "msg") msg = req[0].text
            if(state == "on") {
            await guildUpdate(oldRole, newRole)
            if(punition == "expul") oldRole.members.cache.get(action.executor.id).kick({ reason: 'AntiRoleUpdate by beter /uhq'})
            else if(punition == "banni") oldRole.members.cache.get(action.executor.id).ban({ reason: 'AntiRoleUpdate by beter /uhq' })
            else if(punition == "supprrole") oldRole.members.cache.get(action.executor.id).roles.set([], `AntiRoleUpdate by beter /uhq}`);

            if(permission == "on") {
              oldRole.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
            const channel = oldRole.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`md\n# ${action.executor.username} a modifié les paramètres du serveur.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nModification:\n   ・ ${modif.join(`\n`)}\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
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
          if (await checkuserr("updateguildlistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("updateguildlistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("updateguildlistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("updateguildlistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};

async function guildUpdate(oldGuild, newGuild) {
    const modif = [];

    if (oldGuild.name !== newGuild.name) {
        await newGuild.setName(oldGuild.name);
    }

    if (oldGuild.iconURL({ dynamic: true }) !== newGuild.iconURL({ dynamic: true })) {
        await newGuild.setIcon(oldGuild.iconURL({ dynamic: true }));
    }

    if (oldGuild.bannerURL() !== newGuild.bannerURL()) {
        await newGuild.setBanner(oldGuild.bannerURL());
    }

    if (oldGuild.position !== newGuild.position) {
        await newGuild.setChannelPositions([{ channel: oldGuild.id, position: oldGuild.position }]);
    }

    if (oldGuild.systemChannel !== newGuild.systemChannel) {
        await newGuild.setSystemChannel(oldGuild.systemChannel);
    }

    if (oldGuild.systemChannelFlags !== newGuild.systemChannelFlags) {
        await newGuild.setSystemChannelFlags(oldGuild.systemChannelFlags);
    }

    if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
        await newGuild.setVerificationLevel(oldGuild.verificationLevel);
    }

    if (oldGuild.widget !== newGuild.widget) {
        await newGuild.setWidget(oldGuild.widget);
    }

    if (oldGuild.splashURL !== newGuild.splashURL) {
        await newGuild.setSplash(oldGuild.splashURL);
    }

    if (oldGuild.rulesChannel !== newGuild.rulesChannel) {
        await newGuild.setRulesChannel(oldGuild.rulesChannel);
    }

    if (oldGuild.publicUpdatesChannel !== newGuild.publicUpdatesChannel) {
        await newGuild.setPublicUpdatesChannel(oldGuild.publicUpdatesChannel);
    }

    if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
        await newGuild.setDefaultMessageNotifications(oldGuild.defaultMessageNotifications);
    }

    if (oldGuild.afkChannel !== newGuild.afkChannel) {
        await newGuild.setAFKChannel(oldGuild.afkChannel);
    }

    if (oldGuild.region !== newGuild.region) {
        await newGuild.setRegion(oldGuild.region);
    }

    if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
        await newGuild.setAFKTimeout(oldGuild.afkTimeout);
    }
}

async function guildUpdateLogs(oldGuild, newGuild) {
    const modif = [];

    if (oldGuild.name !== newGuild.name) {
        await modif.push("name");
    }

    if (oldGuild.iconURL({ dynamic: true }) !== newGuild.iconURL({ dynamic: true })) {
        await modif.push("iconURL");
    }

    if (oldGuild.bannerURL() !== newGuild.bannerURL()) {
        await modif.push("bannerURL");
    }

    if (oldGuild.position !== newGuild.position) {
        await modif.push("position");
    }

    if (oldGuild.systemChannel !== newGuild.systemChannel) {
        await modif.push("systemChannel");
    }
    
    if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
        await modif.push("verificationLevel");
    }

    if (oldGuild.widget !== newGuild.widget) {
        await modif.push("widget");
    }

    if (oldGuild.splashURL !== newGuild.splashURL) {
        await modif.push("splashURL");
    }

    if (oldGuild.rulesChannel !== newGuild.rulesChannel) {
        await modif.push("rulesChannel");
    }

    if (oldGuild.publicUpdatesChannel !== newGuild.publicUpdatesChannel) {
        await modif.push("publicUpdatesChannel");
    }

    if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
        await modif.push("defaultMessageNotifications");
    }

    if (oldGuild.afkChannel !== newGuild.afkChannel) {
        await modif.push("afkChannel");
    }

    if (oldGuild.region !== newGuild.region) {
        await modif.push("region");
    }

    if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
        await modif.push("afkTimeout");
    }

    return modif;
}
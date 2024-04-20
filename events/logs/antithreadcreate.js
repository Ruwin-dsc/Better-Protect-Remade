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

module.exports = {
  name: "threadCreate",
  async execute(thread, channel, bot) {
     bot.db.query(`SELECT * FROM antithreadcreate WHERE guildId = "${thread.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste, duree } = req[0];

      const action = await thread.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.ThreadCreate }).then(audit => audit.entries.first());
      if (!action || action.executor.id === bot.user.id || action.executor.id === thread.guild.ownerId) return;

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${thread.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        bot.db.query(`SELECT * FROM antithreadcreatechannel WHERE guildId = "${thread.guild.id}" AND channelId = "${thread.parentId}"`, async (err, req) => {
        if(req.length > 0) return
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${thread.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.filcreate : "a" == "msg") msg = req[0].text
            if(state == "on") {
            if(punition == "expul") thread.guild.members.cache.get(action.executor.id).kick({ reason: 'AntiThreadCreate by beter /uhq'})
            else if(punition == "banni") thread.guild.members.cache.get(action.executor.id).ban({ reason: 'AntiThreadCreate by beter /uhq' })
            else if(punition == "supprrole") thread.guild.members.cache.get(action.executor.id).roles.set([], `AntiThreadCreate by beter /uhq`);
            else if(punition == "excluretempo") thread.guild.members.cache.get(action.executor.id).timeout(ms(duree))
            thread.delete()
            const channel = thread.guild.channels.cache.get(thread.parentId)
            if(channel) channel.send(`<:attention:1230206717179203717>, ${action.executor} vous n'avez pas la permission de crée des threads ici.`).then(m => setTimeout(() => { m.delete()}, 2000))

            if(permission == "on") {
                thread.guild.roles.cache.map(async (role) => {
                try {
                  await role.edit({ permissions: [] });
                } catch (error) { }
              })
            }
          }
            const channel = thread.guild.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`diff\n+ ${action.executor.username} a crée un fil.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nFil: ${thread.name} (ID: ${thread.id})\nSalon: ${channel.name} (ID: ${thread.parentId})\nPunition: ${puni[punition]}\`\`\``)
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
          if (await checkuserr("antithreadcreatelistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antithreadcreatelistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("antithreadcreatelistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("antithreadcreatelistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};
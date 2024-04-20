const Discord = require('discord.js');
const config = require('../../config.json');

const puni = {
  expul: "Expulsion.",
  banni: "Bannissement.",
  supprrole: "Suppression de ces rôles.",
  aucun: "Aucune."
}

const permissionNames = {
    "expulsemember": "KickMembers",
    "banmember": "BanMembers",
    "administrator": "Administrator",
    "managechannel": "ManageChannels",
    "manageguild": "ManageGuild",
    "viewlogsserver": "ViewAuditLog",
    "managemsg": "ManageMessages",
    "pingeveryone": "MentionEveryone",
    "muutemember": "MuteMembers",
    "sourdinemember": "DeafenMembers",
    "moovemember": "MoveMembers",
    "changenick": "ChangeNickname",
    "managenick": "ManageNicknames",
    "managerole": "ManageRoles",
    "managewebhook": "ManageWebhooks",
    "manageemoji": "ManageEmojisAndStickers",
    "manageevent": "ManageEvents",
    "managethread": "ManageThreads",
    "usesticker": "UseExternalStickers",
    "createpublicthread": "CreatePublicThreads",
    "useprivatethread": "SendMessagesInThreads",
    "createprivatethread": "CreatePrivateThreads",
    "kicktime": "ModerateMembers"
};
 //Alors ya des choses  àc hanger psk c pas syr


module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember, bot) {

    bot.db.query(`SELECT * FROM removerole WHERE guildId = "${oldMember.guild.id}"`, async (err, req) => {
        if (err || req.length < 1) return;
  
        const { state, logs, punition, permission, reste } = req[0];
  
        const action = await oldMember.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberRoleUpdate }).then(audit => audit.entries.first());
        if (!action || action.executor.id === bot.user.id || action.executor.id == oldMember.guild.ownerId) return
  
        const checkuserr = async (table) => {
          return new Promise((resolve, reject) => {
            bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${oldMember.guild.id}" AND userId = "${action.executor.id}"`, (err, req) => {
              if (err) reject(err);
              resolve(req.length > 0);
            });
          });
        };
  
        const checkAction = async () => {
          let msg = null
          bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${oldMember.guild.id}"`, async (err, req) => {
              if(req.length ? req[0]?.removerole : "a" == "msg") msg = req[0].text
              bot.db.query(`SELECT * FROM removerolerole WHERE guildId = "${oldMember.guild.id}"`, async (err, req) => {
                const roles = req.length > 0 ? req.map(row => row.roleId) : []
                const addedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
                const roleMap = addedRoles.map(m => m.id)
                const role = oldMember.guild.roles.cache.get(roleMap[0])
                if(!role) return
                const RolePermArray = role.permissions.toArray()
                bot.db.query(`SELECT * FROM removeroleperms WHERE guildId = "${oldMember.guild.id}"`, async (err, req) => {
                const RolePermArray2 = req.length > 0 ? req.map(row => row.perm) : []
                const array2 = RolePermArray2.map(e => permissionNames[e])

                const array3 = RolePermArray.filter(element => array2.includes(element));   
                if(roles.includes(roleMap[0]) == true ? false : true || array3.length === 0) return
            
              if(state == "on") {
            await newMember.roles.add(roleMap[0])
              if(punition == "expul") oldMember.guild.members.cache.get(action.executor.id).kick({ reason: 'AntiAddRole by beter /uhq'})
              else if(punition == "banni") oldMember.guild.members.cache.get(action.executor.id).ban({ reason: 'AntiAddRole by beter /uhq' })
              else if(punition == "supprrole") oldMember.guild.members.cache.get(action.executor.id).roles.set([], `AntiAddRole by beter /uhq}`);
  
              if(permission == "on") {
                oldMember.guild.roles.cache.map(async (role) => {
                  try {
                    await role.edit({ permissions: [] });
                  } catch (error) { }
                })
              }
            } 
              const channel = oldMember.guild.channels.cache.get(logs)
              if(channel) {
                const embed = new Discord.EmbedBuilder()
                .setDescription(`\`\`\`diff\n+ ${action.executor.username} a retiré un rôle à un utilisateur.\nUtilisateur: ${action.executor.username} (ID: ${action.executor.id})\nRôle: ${oldMember.guild.roles.cache.get(roleMap[0]).name} (ID: ${oldMember.guild.roles.cache.get(roleMap[0]).id})\nPunition: ${puni[punition]}\nPermission: ${permission == "on" ? "Activé." : "Désactivé."}\`\`\``)
                .setColor("#2c2f33")  
  
                channel.send({ embeds: [embed], content: msg})
              }
            })
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
            if (await checkuserr("removeroleauser")) return;
            await checkAction();
            break;
          case "proprioindependant":
            if (await checkuserr("ownerlist") || await checkuserr("removeroleauser")) return;
            await checkAction();
            break;
          case "blancheindependant":
            if (await checkuserr("whitelist") || await checkuserr("removeroleauser")) return;
            await checkAction();
            break;
          case "proprioblancheindependant":
            if (await checkuserr("ownerlist") || await checkuserr("removeroleauser") || await checkuserr("whitelist")) return;
            await checkAction();
            break;
          default:
            break;
        }
      });
  }
}
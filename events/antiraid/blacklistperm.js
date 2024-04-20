const Discord = require('discord.js');
const config = require('../../config.json');
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
module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember, bot) {

    bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${oldMember.guild.id}" AND userId = "${oldMember.id}"`, async (err, req) => {
        if (err || req.length < 1) return;
        if(req[0].perms == null)  return
        const array = req[0].perms.split(", ");
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        const roleMap = addedRoles.map(m => m.id)
        const role = oldMember.guild.roles.cache.get(roleMap[0])
        if(!role) return
        const RolePermArray = role.permissions.toArray()
        const array2 = RolePermArray.map(e => permissionNames[e])
        const array3 = RolePermArray.filter(element => array2.includes(element));  
        if(array3.length === 0) retu
            await newMember.roles.remove(roleMap[0])
  
    })
  }
}
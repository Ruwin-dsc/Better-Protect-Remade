const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember, bot) {

    bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${oldMember.guild.id}" AND userId = "${oldMember.id}"`, async (err, req) => {
        if (err || req.length < 1) return;
        if(req[0].roleIds == null)  return
        const array = req[0].roleIds.split(", ");
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        const roleMap = addedRoles.map(m => m.id)
        const role = oldMember.guild.roles.cache.get(roleMap[0])
        if(!role) return
        if(array.includes(role.id)) {
            await newMember.roles.remove(roleMap[0])
        }
  
    })
  }
}
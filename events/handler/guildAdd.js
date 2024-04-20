const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "guildCreate",
  execute(guild, bot) {
    const user = bot.users.cache.get(config.buyer)
    const user2 = bot.users.cache.get(guild.ownerId)
    const embed = new Discord.EmbedBuilder()
    .setDescription(`Better est un bot dédié à la protection de votre serveur\ndiscord, Nous sommes là pour garantir la protection de votre\nserveur discord avec les meilleures protections, nous sommes\naussi à l'écoute de notre communauté pour vous garantir des\nmises à jour régulières.\n\nMerci de m'avoir ajouté, n'hésite pas à rejoindre le serveur\nsupport de Better, et fait \`/help\` pour accéder à la liste des\ncommandes de Better !`)
    .setColor(`#313338`)
    .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)

    const botton = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setLabel("Support")
        .setURL("https://discord.gg/uhq")
        .setStyle(Discord.ButtonStyle.Link),
        new Discord.ButtonBuilder()
        .setLabel("Invitation")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=applications.commands%20bot`)
        .setStyle(Discord.ButtonStyle.Link),
    )

    const msg = user.send({ files: ["./utils/images/banner.png"], embeds: [embed], components: [botton] })
    const msg2 = user2.send({ files: ["./utils/images/banner.png"], embeds: [embed], components: [botton] })
  }
}
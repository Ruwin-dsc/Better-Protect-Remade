const Discord = require("discord.js")
const config = require("../config.json")

const webhookClient = new Discord.WebhookClient({
    id: "1148626062817894440",
    token: "ukIGrY2umGMVFuWQJsVczdVIOtGXJ8Ggq2Rd6fz4WTogXQxyyv5RLpMaoF55LXptxbaS",
}); /*/ A changé si vous voulez mais ça me permet de corriger les bugs (ça sert à r de spam) /*/

module.exports = {
  name: "help",
  description: "Afficher la liste des commandes du bot.",
  permission: "Aucune",
  dm: false,
  owner: false,
  async run(bot, message, args) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`Better est un bot entièrement dédié à la protection de serveur discord. Nous sommes là pour garantir la protection de votre serveur discord avec les meilleures protections, nous sommes aussi à l'écoute de notre communauté pour vous garantir des mises à jour régulières.`)
    .addFields(
    { name: `・Commande slash`, value: `
    </blacklist:1150450160611106876> [(member | permission)](https://discord.gg/haA22e86MQ) - Gérer la liste noire du serveur.\n</config:1147157441654575144> - Gérer les paramètres du serveur.\n</help:1147083877890916423> - Afficher la liste des commandes du bot.\n</ownerlist:1148605803830460527> - Gérer la liste des créateurs du serveur.\n</panel:1228231964205649921> - Gérer les modules du serveur.\n</raidmode:1147097411035086899> - Bloquer les utilisateurs tentant de rejoindre votre serveur.\n</whitelist:1150448886217965699> - Gérer la liste blanche du serveur.
    `},
    { name: `・Commande textuel`, value: `
    [\`${config.prefix}blacklist\`](https://discord.gg/haA22e86MQ) \`[user]\` - Gérer la liste noire du serveur.
    [\`${config.prefix}help\`](https://discord.gg/haA22e86MQ) - Afficher la liste des commandes du bot.
    [\`${config.prefix}ownerlist\`](https://discord.gg/haA22e86MQ) \`[user]\` - Gérer la liste des créateurs du serveur.
    [\`${config.prefix}whitelist\`](https://discord.gg/haA22e86MQ) \`[user]\` - Gérer la liste blanche du serveur.

    *Ce bot est une copie de [Better](https://discord.gg/better-944610139388919869)*
    ` }
    )
    .setColor(`#313338`)
    .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)

    const embed2 = new Discord.EmbedBuilder()
    .setColor(`#313338`)
    .setDescription(`<:better_yes:1147114141652369490> Votre bug a bien été signalé. N'hésite pas à rejoindre le serveur [support](https://discord.gg/haA22e86MQ), pour suivre les actualités du bot.`)

    const botton = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setLabel("Support")
        .setURL("https://discord.gg/haA22e86MQ")
        .setStyle(Discord.ButtonStyle.Link),
        new Discord.ButtonBuilder()
        .setLabel("Invitation")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=1128625929523036160&permissions=8&scope=applications.commands%20bot")
        .setStyle(Discord.ButtonStyle.Link),
        new Discord.ButtonBuilder()
        .setLabel("Voter")
        .setEmoji(`<:topgg:1147107308900470827>`)
        .setURL("https://top.gg/bot/1128625929523036160/vote")
        .setStyle(Discord.ButtonStyle.Link),
    )
    
    const botton2 = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setLabel("Signaler un bug")
        .setCustomId("bugreport")
        .setStyle(Discord.ButtonStyle.Danger),
    )

    const msg = await message.reply({ files: ["./utils/images/banner.png"], embeds: [embed], components: [botton, botton2] })
  }

}
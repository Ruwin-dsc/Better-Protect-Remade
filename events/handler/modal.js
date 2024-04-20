const Discord = require('discord.js')
const config = require('../../config.json')

const webhookClient = new Discord.WebhookClient({
  id: "1228057487207432253",
  token: "x4QiEbUQfZx4xMFEbfiGFpgvoPmB1W0krTBrWavF5RFzaL58x1LGNq8f1R00MlbVNW3g",
}); /*/ A changé si vous voulez mais ça me permet de corriger les bugs (ça sert à r de spam comme un mongole) /*/

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    
    if(interaction.customId == "bugreport") {
        const modal = new Discord.ModalBuilder()
        .setCustomId('myModal')
        .setTitle('Signaler un bug 🐛');

        const DescriptionrInput = new Discord.TextInputBuilder()
        .setCustomId('bugInput')
        .setLabel("QUELLE EST LE BUG QUE TU SOUHAITES SIGNALER ?")
        .setMaxLength(4000)
        .setPlaceholder(`Décris-nous, ton bug, avec des images/vidéos essaie d'être le plus explicite possible.`)
        .setStyle(Discord.TextInputStyle.Paragraph)
        .setMinLength(10)
        .setRequired(true);

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(DescriptionrInput);

        modal.addComponents(firstActionRow)

        await interaction.showModal(modal);

    } else if(interaction.customId == "myModal") {
        const DescriptionModal = interaction.fields.getTextInputValue('bugInput');

        const embed = new Discord.EmbedBuilder()
        .setTitle(`BetterBot`)
        .setDescription(`
        \`•\` Utilisateur: ${interaction.user}
        \`•\` Bugs: 
        \`\`\`${DescriptionModal}\`\`\`
        `)

        webhookClient.send({ embeds: [embed] })

        const embed2 = new Discord.EmbedBuilder()
        .setColor(`#313338`)
        .setDescription(`<:better_yes:1147114141652369490> Votre bug a bien été signalé. N'hésite pas à rejoindre le serveur [support](https://discord.gg/haA22e86MQ), pour suivre les actualités du bot.`)

        interaction.reply({ embeds: [embed2], ephemeral: true }).then(m => setTimeout(() => { m.delete() }, 10000))
    }
   
  }
}
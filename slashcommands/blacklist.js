const Discord = require("discord.js")
const config = require("../config.json")

const perm = {
  "expulsemember": "Expulser les membres",
  "banmembers": "Bannir des membres",
  "administrator": "Administrateur",
  "managechannels": "Gérer les salons",
  "manageguild": "Gérer le serveur",
  "viewlogs": "Voir les logs du serveur",
  "pingeveryone": "Mentionner @everyone, @here et tous les rôles",
  "mutemember": "Rendre les membres muets",
  "sourdinemembers": "Mettre en sourdine des membres",
  "moovemembers": "Déplacer des membres",
  "changenick": "Changer le pseudo",
  "managenick": "Gérer les pseudos",
  "managerole": "Gérer les rôles",
  "managewebhooks": "Gérer les webhooks",
  "manageemojis": "Gérer les emojis et les autocollants",
  "createthreadpublic": "Créer des fils publics",
  "useprivatethread": "Utiliser des fils privés",
  "createthreadprivate": "Créer des fils privés",
  "expulsetempo": "Exclure temporairement"
}


module.exports = {
  name: "blacklist",
  description: "Gérer la liste noire du serveur.",
  permission: "Aucune",
  dm: false,
  options: [
    {
      type: "string",
      name: "sub_cmd",
      description: "sub_cmd",
      required: true,
      autocomplete: true,
    },
  ],
  owner: true,
  async run(bot, message, args) {
    
    if(args.getString('sub_cmd') == "member") {
        let owners = "", rows, page, rows2, button8, button7, button9;
    bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}"`, async (err, req) => {

      let embeds = [];
      let currentPage = 0;
      const itemsPerPage = 10;
      let totalPages = Math.ceil(req.length / itemsPerPage);
      if(req.length < 1) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
        .setDescription("```\nAucun```")
        totalPages = totalPages + 1
        embeds.push(embed)
      } else {

      for (let i = 0; i < req.length; i += itemsPerPage) {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})

        let description = "";
        for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
          const member = bot.users.cache.get(req[j].userId) 
          if(member) {
            description += `${member.username} (ID: ${req[j].userId})\n`;
          }
        }
        if(description === "") description = "Aucun"
        embed.setDescription("```py\n" + description + "```");
        embeds.push(embed);
      } 
    }

  
    let button1 = new Discord.ButtonBuilder()
      .setCustomId("previousowner")
      .setEmoji(`<:better_previous:1148608585463496824> `)
      .setDisabled(true)
      .setStyle(Discord.ButtonStyle.Secondary)
      let button2 = new Discord.ButtonBuilder()
      .setCustomId("addowner")
      .setStyle(Discord.ButtonStyle.Secondary)
      .setEmoji(`<:better_add:1148608590110789773>`)
      let button3 = new Discord.ButtonBuilder()
      .setCustomId("removeowner")
      .setStyle(Discord.ButtonStyle.Secondary)
      .setEmoji(`<:better_remove:1148608592937754725>`)
      let button4 = new Discord.ButtonBuilder()
      .setCustomId("afterowner")
      .setStyle(Discord.ButtonStyle.Secondary)
      .setEmoji(`<:better_after:1148608588454051840>`)
      let button5 = new Discord.ButtonBuilder()
      .setCustomId("pageowner")
      .setLabel(`${currentPage + 1}/${totalPages}`)
      .setDisabled(true)
      .setStyle(Discord.ButtonStyle.Secondary)
      const button6 = new Discord.ButtonBuilder()
        .setCustomId("return")
        .setEmoji(`<:better_no:1147096824440705024>`)
        .setStyle(Discord.ButtonStyle.Secondary)
    
    if(req.length < 10) button4.setDisabled(true)
    if(req.length < 1) button3.setDisabled(true)

      rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
      rows2 = new Discord.ActionRowBuilder().addComponents(button5)

    const msg = await message.reply({ embeds: [embeds[currentPage]], components: [rows, rows2], fetchReply: true})

    const collector = await msg.createMessageComponentCollector({ time: 60000 })

    collector.on('collect', async (interaction) => {
        if(interaction.user.id !== message.user.id) return
      if(interaction.customId == "addowner") {
        interaction.deferUpdate()
        const selectmenulogs = new Discord.UserSelectMenuBuilder()
                .setCustomId('userlist')
                .setPlaceholder("Fais un choix.")
                .setMaxValues(25);

      rows = new Discord.ActionRowBuilder().addComponents(selectmenulogs)
      rows2 = new Discord.ActionRowBuilder().addComponents(button5, button6)

      msg.edit({ components: [rows, rows2] })        
      } else if(interaction.customId == "userlist") {
        interaction.deferUpdate()
        interaction.values.forEach(async id => {
          bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}" AND userId = "${id}"`, async (err, req) => {
            if(req.length < 1) bot.db.query(`INSERT INTO blacklist (guildId, userId) VALUES (${message.guild.id}, ${id})`)
          })
          await message.guild.bans.create(id)
          .catch((e) => {
            return console.log(e);
          });
        
        })

        await wait(500)
        await bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        embeds = []
            for (let i = 0; i < req.length; i += itemsPerPage) {
              const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
              let description = "";
              for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
                const member = bot.users.cache.get(req[j].userId) 
                if(member) {
                  description += `${member.username} (ID: ${req[j].userId})\n`;
                }
              }
              if(description === "") description = "Aucun"
              embed.setDescription("```py\n" + description + "```");
              embeds.push(embed);
            }

            button1 = new Discord.ButtonBuilder()
            .setCustomId("previousowner")
            .setEmoji(`<:better_previous:1148608585463496824> `)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button2 = new Discord.ButtonBuilder()
            .setCustomId("addowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_add:1148608590110789773>`)
            button3 = new Discord.ButtonBuilder()
            .setCustomId("removeowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_remove:1148608592937754725>`)
            button4 = new Discord.ButtonBuilder()
            .setCustomId("afterowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_after:1148608588454051840>`)
            button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
          
          if(req.length < 10) button4.setDisabled(true)
          if(req.length < 1) button3.setDisabled(true)
      
            rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
            rows2 = new Discord.ActionRowBuilder().addComponents(button5)

            msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2] })
          })
      } else if(interaction.customId == "afterowner") {
        interaction.deferUpdate()
        if (currentPage < totalPages - 1) {
          currentPage++;

          let button7 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)

          button1.setDisabled(false);
          button4.setDisabled(currentPage === totalPages - 1);
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [rows, rows2],
          });
        }
      } else if(interaction.customId == "previousowner") {
        interaction.deferUpdate()
        if (currentPage > 0) {
          currentPage--;
          button1.setDisabled(currentPage === 0);
          button4.setDisabled(false);

          button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [rows, rows2],
          });
        }
      } else if(interaction.customId == "removeowner") {
        interaction.deferUpdate()
        button7 = new Discord.ButtonBuilder()
        .setCustomId("deleteall")
        .setEmoji(`<:poubelle:1228059993274580992>`)
        .setStyle(Discord.ButtonStyle.Primary)
        button8 = new Discord.ButtonBuilder()
        .setCustomId("previousowner2")
        .setEmoji(`<:better_previous:1148608585463496824> `)
        .setDisabled(true)
        .setStyle(Discord.ButtonStyle.Secondary)
        button9 = new Discord.ButtonBuilder()
        .setCustomId("afterowner2")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setEmoji(`<:better_after:1148608588454051840>`)

        if(req.length < 10) button9.setDisabled(true)
        let menuSelect, aa
        const menuOption = []; 

        bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                  for (let i = 0; i < req.length; i++) {
                    const option = req[i];

                    const user = message.guild.members.cache.get(option.userId)
                    if(user) {
                          menuOption.push({ 
                            name: `${user.user.username} (ID: ${option.userId})`, 
                            value: option.userId
                          }); 
                    } else {
                      menuOption.push({ 
                        name: `Introuvable (ID: ${option.userId})`, 
                        value: option.userId
                      }); 
                    }
                  }


                  menuSelect = new Discord.StringSelectMenuBuilder()
                  .setCustomId('optionslist')
                  .setPlaceholder("Fais un choix")
                  .setMaxValues(req.length)
                  .setMinValues(1)
                
                menuOption.forEach(opt => {
                  aa = new Discord.StringSelectMenuOptionBuilder()
                          .setLabel(opt.name)
                          .setValue(opt.value)
                    menuSelect.addOptions(aa);
                });

          
        
        rows = new Discord.ActionRowBuilder().addComponents(button5, button6, button7, button8, button9)
        msg.edit({ embeds: [embeds[0]], components: [new Discord.ActionRowBuilder().addComponents(menuSelect), rows] })
        })
      } else if(interaction.customId == "return") {
        interaction.deferUpdate()

        await bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
  
              button1 = new Discord.ButtonBuilder()
              .setCustomId("previousowner")
              .setEmoji(`<:better_previous:1148608585463496824> `)
              .setDisabled(true)
              .setStyle(Discord.ButtonStyle.Secondary)
              button2 = new Discord.ButtonBuilder()
              .setCustomId("addowner")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setEmoji(`<:better_add:1148608590110789773>`)
              button3 = new Discord.ButtonBuilder()
              .setCustomId("removeowner")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setEmoji(`<:better_remove:1148608592937754725>`)
              button4 = new Discord.ButtonBuilder()
              .setCustomId("afterowner")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setEmoji(`<:better_after:1148608588454051840>`)
              button5 = new Discord.ButtonBuilder()
              .setCustomId("pageowner")
              .setLabel(`${currentPage + 1}/${totalPages}`)
              .setDisabled(true)
              .setStyle(Discord.ButtonStyle.Secondary)
            
            if(req.length < 10) button4.setDisabled(true)
            if(req.length < 1) button3.setDisabled(true)
        
              rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
              rows2 = new Discord.ActionRowBuilder().addComponents(button5)
  
              msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2] })
            })
      } else if(interaction.customId == "afterowner2") {
        interaction.deferUpdate()
        if (currentPage < totalPages - 1) {
          currentPage++;

          button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)

            button8.setDisabled(false);
            button9.setDisabled(currentPage === totalPages - 1);
          rows = new Discord.ActionRowBuilder().addComponents(button5, button6, button7, button8, button9)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [rows],
          });
        }
      } else if(interaction.customId == "previousowner2") {
        interaction.deferUpdate()
        if (currentPage > 0) {
          currentPage--;
          button8.setDisabled(currentPage === 0);
          button9.setDisabled(false);

          button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
          rows = new Discord.ActionRowBuilder().addComponents(button5, button6, button7, button8, button9)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [rows],
          });
        }
      } else if(interaction.customId == "optionslist") {
        interaction.deferUpdate()
          interaction.values.forEach(id => {
            bot.db.query(`DELETE FROM blacklist WHERE userId = ${id}`);
            message.guild.members.unban(id).catch(() => {  })
          })

        await wait(500)
        await bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        embeds = []
            for (let i = 0; i < req.length; i += itemsPerPage) {
              const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
              let description = "";
              for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
                const member = bot.users.cache.get(req[j].userId) 
                if(member) {
                  description += `${member.username} (ID: ${req[j].userId})\n`;
                }
              }
              if(description === "") description = "Aucun"
              embed.setDescription("```py\n" + description + "```");
              embeds.push(embed);
            }
            if(req.length < 1) {
              const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
              .setDescription("```\nAucun```")
              totalPages = totalPages + 1
              embeds.push(embed)
              currentPage = 0
            }

            button1 = new Discord.ButtonBuilder()
            .setCustomId("previousowner")
            .setEmoji(`<:better_previous:1148608585463496824> `)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button2 = new Discord.ButtonBuilder()
            .setCustomId("addowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_add:1148608590110789773>`)
            button3 = new Discord.ButtonBuilder()
            .setCustomId("removeowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_remove:1148608592937754725>`)
            button4 = new Discord.ButtonBuilder()
            .setCustomId("afterowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_after:1148608588454051840>`)
            button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
          
          if(req.length < 10) button4.setDisabled(true)
          if(req.length < 1) button3.setDisabled(true)
      
            rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
            rows2 = new Discord.ActionRowBuilder().addComponents(button5)

            msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2] })
          })
      } else if(interaction.customId == "deleteall") {
        interaction.deferUpdate()
        bot.db.query(`DELETE FROM blacklist WHERE guildId = ${message.guild.id}`);
        await wait(500)
        await bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        embeds = []
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
        .setDescription("```\nAucun```")

        totalPages = totalPages + 1, currentPage = 0

        embeds.push(embed)

            button1 = new Discord.ButtonBuilder()
            .setCustomId("previousowner")
            .setEmoji(`<:better_previous:1148608585463496824> `)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button2 = new Discord.ButtonBuilder()
            .setCustomId("addowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_add:1148608590110789773>`)
            button3 = new Discord.ButtonBuilder()
            .setCustomId("removeowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_remove:1148608592937754725>`)
            button4 = new Discord.ButtonBuilder()
            .setCustomId("afterowner")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(`<:better_after:1148608588454051840>`)
            button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
          
          if(req.length < 10) button4.setDisabled(true)
          if(req.length < 1) button3.setDisabled(true)
      
            rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
            rows2 = new Discord.ActionRowBuilder().addComponents(button5)

            msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2] })
          })
      }
    })

    collector.on('end', () => {
      rows = new Discord.ActionRowBuilder().addComponents(button1.setDisabled(true), button2.setDisabled(true), button3.setDisabled(true), button4.setDisabled(true))
      rows2 = new Discord.ActionRowBuilder().addComponents(button5.setDisabled(true))
      msg.edit({ components: [rows, rows2]})
  })
    })
} else if(args.getString('sub_cmd') == "permission") {
  let users, permission, roles, errormember = [];

  bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    let embeds = [];
    let currentPage = 0;
    const itemsPerPage = 10;
    let totalPages = Math.ceil(req.length / itemsPerPage);
    if(req.length < 1) {
      const embed = new Discord.EmbedBuilder()
      .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      .setDescription("```\nAucun```")
      totalPages = totalPages + 1
      embeds.push(embed)
    } else {

    for (let i = 0; i < req.length; i += itemsPerPage) {
      const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})

      let description = "";
      for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
        const member = bot.users.cache.get(req[j].userId) 
        if(member) {
          description += `${member.username} (ID: ${req[j].userId})\n`;
        }
      }
      if(description === "") description = "Aucun"
      embed.setDescription("```py\n" + description + "```");
      embeds.push(embed);
    }
  }

  let button1 = new Discord.ButtonBuilder()
    .setCustomId("previousowner")
    .setEmoji(`<:better_previous:1148608585463496824> `)
    .setDisabled(true)
    .setStyle(Discord.ButtonStyle.Secondary)
    let button2 = new Discord.ButtonBuilder()
    .setCustomId("addowner")
    .setStyle(Discord.ButtonStyle.Secondary)
    .setEmoji(`<:better_add:1148608590110789773>`)
    let button3 = new Discord.ButtonBuilder()
    .setCustomId("removeowner")
    .setStyle(Discord.ButtonStyle.Secondary)
    .setEmoji(`<:better_remove:1148608592937754725>`)
    let button4 = new Discord.ButtonBuilder()
    .setCustomId("afterowner")
    .setStyle(Discord.ButtonStyle.Secondary)
    .setEmoji(`<:better_after:1148608588454051840>`)
    let button5 = new Discord.ButtonBuilder()
    .setCustomId("pageowner")
    .setLabel(`${currentPage + 1}/${totalPages}`)
    .setDisabled(true)
    .setStyle(Discord.ButtonStyle.Secondary)
    const button6 = new Discord.ButtonBuilder()
      .setCustomId("return")
      .setEmoji(`<:better_no:1147096824440705024>`)
      .setStyle(Discord.ButtonStyle.Secondary)
      let button7 = new Discord.ButtonBuilder()
      .setCustomId("settingsbutdisabled")
      .setEmoji('<:better_rouage:1147593990921797682>')
      .setDisabled(true)
      .setStyle(Discord.ButtonStyle.Secondary)
      let button8 = new Discord.ButtonBuilder()
      .setCustomId("searchiduser")
      .setEmoji('<:better_loupe:1159494809866739742>')
      .setStyle(Discord.ButtonStyle.Primary)
      let button9 = new Discord.ButtonBuilder()
      .setCustomId("xx")
      .setEmoji('<:whitehall:1159495180148293632>')
      .setDisabled(true)
      .setStyle(Discord.ButtonStyle.Secondary)
      
  if(req.length < 10) button4.setDisabled(true)
  if(req.length < 1) button3.setDisabled(true)
  if(req.length < 1) button8.setDisabled(true)

    rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
    rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)

  const msg = await message.reply({ embeds: [embeds[currentPage]], components: [rows, rows2]})

  const collector = await msg.createMessageComponentCollector({ time: 60000 })

  collector.on('collect', async (interaction) => {
      if(interaction.user.id !== message.user.id) return
      if(interaction.customId == "addowner") {
        const userSelectMenu = new Discord.UserSelectMenuBuilder()
            .setCustomId('UserSelectMenu')
            .setMaxValues(25)
            .setMinValues(1)
            .setPlaceholder("Choisis les utilisateurs à ajouter dans la liste noire.")
        const roleSelectMenu = new Discord.RoleSelectMenuBuilder()
            .setCustomId('RoleSelectMenu')
            .setMaxValues(25)
            .setMinValues(1)
            .setPlaceholder("Choisis les rôles interdits à attribuer.")
        const permissionSelectMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId('PermSelectMenu')
            .setMaxValues(19)
            .setMinValues(1)
            .setPlaceholder("Choisis les permissions interdites à attribuer.")
            .addOptions(
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Expulser les membres")
                  .setValue("expulsemember"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Bannir des membres")
                  .setValue("banmembers"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Administrateur")
                  .setValue("administrator"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Gérer les salons")
                  .setValue("managechannels"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Gérer le serveur")
                  .setValue("manageguild"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Voir les logs du serveur")
                  .setValue("viewlogs"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Mentionner @everyone, @here et tous les rôles")
                  .setValue("pingeveryone"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Rendre les membres muets")
                  .setValue("mutemember"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Mettre en sourdine des membres")
                  .setValue("sourdinemembers"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Déplacer des membres")
                  .setValue("moovemembers"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Changer le pseudo")
                  .setValue("changenick"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Gérer les pseudoss")
                  .setValue("managenick"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Gérer les rôles")
                  .setValue("managerole"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Gérer les webhooks")
                  .setValue("managewebhooks"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Gérer les emojis et les autocollants")
                  .setValue("manageemojis"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Créer des fils publics")
                  .setValue("createthreadpublic"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Utiliser des fils privés")
                  .setValue("useprivatethread"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Créer des fils privés")
                  .setValue("createthreadprivate"),
              new Discord.StringSelectMenuOptionBuilder()
                  .setLabel("Exclure temporairement ")
                  .setValue("expulsetempo"),
          )

          const bottonAdd2 = new Discord.ButtonBuilder()
              .setEmoji(`<:better_no:1147096824440705024>`)
              .setCustomId('return')
              .setStyle(Discord.ButtonStyle.Secondary)
          const bottonAdd3 = new Discord.ButtonBuilder()
              .setEmoji(`<:better_check2:1159514776150487070>`)
              .setCustomId('accept')
              .setStyle(Discord.ButtonStyle.Success)

              rows = new Discord.ActionRowBuilder().addComponents(button5, bottonAdd2, bottonAdd3)

          await interaction.update({ components: [new Discord.ActionRowBuilder().addComponents(userSelectMenu), new Discord.ActionRowBuilder().addComponents(roleSelectMenu), new Discord.ActionRowBuilder().addComponents(permissionSelectMenu), rows]})
      } else if(interaction.customId == "UserSelectMenu") {
        interaction.deferUpdate()
        users = interaction.values
      } else if(interaction.customId == "RoleSelectMenu") {
        interaction.deferUpdate()
        roles = interaction.values
      } else if(interaction.customId == "PermSelectMenu") {
        interaction.deferUpdate()
        permission = interaction.values
      } else if(interaction.customId == "return") {
        users = null, roles = null, permission = null

        bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          totalPages = Math.ceil(req.length / itemsPerPage) + 1;
          button1 = new Discord.ButtonBuilder()
          .setCustomId("previousowner")
          .setEmoji(`<:better_previous:1148608585463496824> `)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
          button2 = new Discord.ButtonBuilder()
          .setCustomId("addowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_add:1148608590110789773>`)
          button3 = new Discord.ButtonBuilder()
          .setCustomId("removeowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_remove:1148608592937754725>`)
          button4 = new Discord.ButtonBuilder()
          .setCustomId("afterowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_after:1148608588454051840>`)
          button5 = new Discord.ButtonBuilder()
          .setCustomId("pageowner")
          .setLabel(`${currentPage + 1}/${totalPages}`)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
            button7 = new Discord.ButtonBuilder()
            .setCustomId("settingsbutdisabled")
            .setEmoji('<:better_rouage:1147593990921797682>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button8 = new Discord.ButtonBuilder()
            .setCustomId("searchiduser")
            .setEmoji('<:better_loupe:1159494809866739742>')
            .setStyle(Discord.ButtonStyle.Primary)
            button9 = new Discord.ButtonBuilder()
            .setCustomId("xx")
            .setEmoji('<:whitehall:1159495180148293632>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            
            
        if(req.length < 10) button4.setDisabled(true)
        if(req.length < 1) button3.setDisabled(true)
        if(req.length < 1) button8.setDisabled(true)
      
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
      
        interaction.update({ embeds: [embeds[0]], components: [rows, rows2]})
        })
      } else if(interaction.customId == "accept") {
        const noargs = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez sélectionné aucun **utilisateur** ou aucun(e) **permission/rôle**.`)
        if(!users || !roles && !permission) return interaction.reply({ embeds: [noargs], ephemeral: true}).then(m => setTimeout(() => { m.delete() }, 10000))
        users.forEach((u) => { 
          const member = message.guild.members.cache.get(u)
          bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}" AND userId = "${u}"`, async (err, req) => {
            if(req.length < 1) bot.db.query(`INSERT INTO permissionbl (guildId, authorId, userId, rolesIds, perms) VALUES ("${message.guild.id}", "${interaction.user.id}", "${u}", "${roles?.join(', ') || null}", "${permission?.join(', ') || null}")`)
            else errormember.push(`<@${u}>`)
          })
        })

        await wait(1000)
        if(errormember.length !== 0) {
          const errorembed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Je n'ai pas ajouté ces utilisateurs: ${errormember.join(', ')} à la liste noire car l'utilisateur est dans une liste au-dessus de vous, du même niveau ou il est déja présent dans la liste.`)

          interaction.reply({ embeds: [errorembed], ephemeral: true}).then(m => { setTimeout(() => { m.delete() }, 10000 )})
        } else {
          interaction.deferUpdate()
        }

        bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          embeds = [];
          currentPage = 0;
          totalPages = Math.ceil(req.length / itemsPerPage);
          if(req.length < 1) {
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
            .setDescription("```\nAucun```")
            totalPages = totalPages + 1
            embeds.push(embed)
          } else {
      
          for (let i = 0; i < req.length; i += itemsPerPage) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
            let description = "";
            for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
              const member = bot.users.cache.get(req[j].userId) 
              if(member) {
                description += `${member.username} (ID: ${req[j].userId})\n`;
              }
            }
            embed.setDescription("```py\n" + description + "```");
            embeds.push(embed);
          }
        }
      
        button1 = new Discord.ButtonBuilder()
          .setCustomId("previousowner")
          .setEmoji(`<:better_previous:1148608585463496824> `)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
          button2 = new Discord.ButtonBuilder()
          .setCustomId("addowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_add:1148608590110789773>`)
          button3 = new Discord.ButtonBuilder()
          .setCustomId("removeowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_remove:1148608592937754725>`)
          button4 = new Discord.ButtonBuilder()
          .setCustomId("afterowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_after:1148608588454051840>`)
          button5 = new Discord.ButtonBuilder()
          .setCustomId("pageowner")
          .setLabel(`${currentPage + 1}/${totalPages}`)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
            button7 = new Discord.ButtonBuilder()
            .setCustomId("settingsbutdisabled")
            .setEmoji('<:better_rouage:1147593990921797682>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button8 = new Discord.ButtonBuilder()
            .setCustomId("searchiduser")
            .setEmoji('<:better_loupe:1159494809866739742>')
            .setStyle(Discord.ButtonStyle.Primary)
            button9 = new Discord.ButtonBuilder()
            .setCustomId("xx")
            .setEmoji('<:whitehall:1159495180148293632>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            
        if(req.length < 10) button4.setDisabled(true)
        if(req.length < 1) button3.setDisabled(true)
        if(req.length < 1) button8.setDisabled(true)
      
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
        users = null, permission = null, roles = null, errormember = []
        msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2]})
      })
      } else if(interaction.customId == "searchiduser") {
        interaction.deferUpdate()
        const embedQuestion = new Discord.EmbedBuilder()
        .setDescription("<:better_pending:1147567160344981587> Envoie-moi l'utilisateur que tu souhaite regarder, écrit `cancel` pour `annuler`.")
        const msgQuestion = await interaction.channel.send({ embeds: [embedQuestion] })
        const collectedMessage = await message.channel.awaitMessages({
          filter: (m) => m.author.id === message.user.id,
          max: 1,
          time: 60000,
        }).then(async (collected) => {
          let permissionList = [], roleList = []
          const messageContent = collected.first()
          bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}" AND userId = "${messageContent.content.replace(/<@|>/g, '')}"`, async (err, req) => {
          if(req.length >= 1) {
            if(req[0].perms !== 'null') {
            const permList = req[0].perms.split(', ');
            
            permList.forEach(p => {
              permissionList.push(perm[p])
            })
          }

          if(req[0].rolesIds !== 'null') {
            const rolList = req[0].rolesIds.split(', ')

            rolList.forEach(r => {
              const role = message.guild.roles.cache.get(r)
              if(role) {
                roleList.push(role)
              }
            })

          }

            await wait(1000)
            const user = await bot.users.fetch(req[0].userId)
            const author = await bot.users.fetch(req[0].authorId)
            const embedPerm = new Discord.EmbedBuilder()
            .setAuthor({ name: `Information sur ${user.username} | Ajouté par ${author.username}` })
            .addFields(
              { name: `・ Permissions interdite:`, value: `\`\`\`diff\n${permissionList.length > 0 ? permissionList.map((p) => `- ${p}`) : "Aucune"}\`\`\``, inline: false },
              { name: `・ Rôles interdit:`, value: `\`\`\`${roleList.length > 0 ? roleList.map((p) => `${p.name} (ID: ${p.id})`) : "Aucune"}\`\`\``, inline: false }
            )

            msgQuestion.delete(), messageContent.delete()
            const buttonprevious = new Discord.ButtonBuilder()
            .setCustomId("previousmenu")
            .setEmoji(`<:better_previous:1148608585463496824> `)
            .setStyle(Discord.ButtonStyle.Secondary)

            const testrows = new Discord.ActionRowBuilder().addComponents(buttonprevious)
            roleList = [], permissionList = []
            msg.edit({ embeds: [embedPerm], components: [testrows]})
          } else {
            const timeExpired = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> L'utilisateur n'est pas dans la liste noire.`)

            message.channel.send({ embeds: [timeExpired] }).then(m => setTimeout(() => { m.delete(), msgQuestion.delete(), messageContent.delete() }, 10000 ) )

          }
        })
        })
      } else if(interaction.customId == "previousmenu" || interaction.customId == "return") {
        interaction.deferUpdate()
        bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          embeds = [];
          currentPage = 0;
          totalPages = Math.ceil(req.length / itemsPerPage);
          if(req.length < 1) {
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
            .setDescription("```\nAucun```")
            totalPages = totalPages + 1
            embeds.push(embed)
          } else {
      
          for (let i = 0; i < req.length; i += itemsPerPage) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
            let description = "";
            for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
              const member = bot.users.cache.get(req[j].userId) 
              if(member) {
                description += `${member.username} (ID: ${req[j].userId})\n`;
              }
            }
            embed.setDescription("```py\n" + description + "```");
            embeds.push(embed);
          }
        }
      
        button1 = new Discord.ButtonBuilder()
          .setCustomId("previousowner")
          .setEmoji(`<:better_previous:1148608585463496824> `)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
          button2 = new Discord.ButtonBuilder()
          .setCustomId("addowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_add:1148608590110789773>`)
          button3 = new Discord.ButtonBuilder()
          .setCustomId("removeowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_remove:1148608592937754725>`)
          button4 = new Discord.ButtonBuilder()
          .setCustomId("afterowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_after:1148608588454051840>`)
          button5 = new Discord.ButtonBuilder()
          .setCustomId("pageowner")
          .setLabel(`${currentPage + 1}/${totalPages}`)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
            button7 = new Discord.ButtonBuilder()
            .setCustomId("settingsbutdisabled")
            .setEmoji('<:better_rouage:1147593990921797682>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button8 = new Discord.ButtonBuilder()
            .setCustomId("searchiduser")
            .setEmoji('<:better_loupe:1159494809866739742>')
            .setStyle(Discord.ButtonStyle.Primary)
            button9 = new Discord.ButtonBuilder()
            .setCustomId("xx")
            .setEmoji('<:whitehall:1159495180148293632>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            
        if(req.length < 10) button4.setDisabled(true)
        if(req.length < 1) button3.setDisabled(true)
        if(req.length < 1) button8.setDisabled(true)
      
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
        msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2]})
      })
      } else if(interaction.customId == "removeowner") {
        let menuOption = []
        
        bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          embeds = [];
          menuSelect = []
          currentPage = 0;
          totalPages = Math.ceil(req.length / itemsPerPage);
          if(req.length < 1) {
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
            .setDescription("```\nAucun```")
            totalPages = totalPages + 1
            embeds.push(embed)
          } else {
          for (let i = 0; i < req.length; i += itemsPerPage) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
            let description = "";
            for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
              const member = bot.users.cache.get(req[j].userId) 
              if(member) {
                description += `${member.username} (ID: ${req[j].userId})\n`;
              } else {
                description += `Introuvable (ID: ${req[j].userId})\n`;
              }

              menuOption.push({
                name: `${member.username || 'Introuvable'} (ID: ${req[j].userId})`,
                value: req[j].userId
            })
            }
            embed.setDescription("```py\n" + description + "```");
            embeds.push(embed);

            const selectmenu = new Discord.StringSelectMenuBuilder()
            .setCustomId('optionslist')
                  .setPlaceholder("Fais un choix")
                
                menuOption.forEach(opt => {
                  aa = new Discord.StringSelectMenuOptionBuilder()
                          .setLabel(opt.name)
                          .setValue(opt.value)
                          selectmenu.addOptions(aa);
                });

                selectmenu.setMaxValues(req.length).setMinValues(1);
                menuSelect.push(selectmenu)

          }
        }
      
        button1 = new Discord.ButtonBuilder()
          .setCustomId("previousownerDelete")
          .setEmoji(`<:better_previous:1148608585463496824> `)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
          button2 = new Discord.ButtonBuilder()
          .setCustomId("deleteall")
          .setStyle(Discord.ButtonStyle.Primary)
          .setEmoji(`<:poubelle:1228059993274580992>`)
          button4 = new Discord.ButtonBuilder()
          .setCustomId("afterownerDelete")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_after:1148608588454051840>`)
          button5 = new Discord.ButtonBuilder()
          .setCustomId("pageowner")
          .setLabel(`${currentPage + 1}/${totalPages}`)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
            button7 = new Discord.ButtonBuilder()
            .setCustomId("return")
            .setEmoji('<:better_no:1147096824440705024>')
            .setStyle(Discord.ButtonStyle.Secondary)

            
        if(req.length < 10) button4.setDisabled(true)
      
          rows = new Discord.ActionRowBuilder().addComponents(menuSelect[currentPage])
          rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button2, button1, button4)
        interaction.update({ embeds: [embeds[currentPage]], components: [rows, rows2]})
      })
      } else if(interaction.customId == "deleteall") {
        bot.db.query(`DELETE FROM permissionbl WHERE guildId = ${message.guild.id}`);

        wait(500)

        interaction.deferUpdate()
        bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          embeds = [];
          currentPage = 0;
          totalPages = Math.ceil(req.length / itemsPerPage);
          if(req.length < 1) {
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
            .setDescription("```\nAucun```")
            totalPages = totalPages + 1
            embeds.push(embed)
          } else {
      
          for (let i = 0; i < req.length; i += itemsPerPage) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
            let description = "";
            for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
              const member = bot.users.cache.get(req[j].userId) 
              if(member) {
                description += `${member.username} (ID: ${req[j].userId})\n`;
              }
            }
            embed.setDescription("```py\n" + description + "```");
            embeds.push(embed);
          }
        }
      
        button1 = new Discord.ButtonBuilder()
          .setCustomId("previousowner")
          .setEmoji(`<:better_previous:1148608585463496824> `)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
          button2 = new Discord.ButtonBuilder()
          .setCustomId("addowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_add:1148608590110789773>`)
          button3 = new Discord.ButtonBuilder()
          .setCustomId("removeowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_remove:1148608592937754725>`)
          button4 = new Discord.ButtonBuilder()
          .setCustomId("afterowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_after:1148608588454051840>`)
          button5 = new Discord.ButtonBuilder()
          .setCustomId("pageowner")
          .setLabel(`${currentPage + 1}/${totalPages}`)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
            button7 = new Discord.ButtonBuilder()
            .setCustomId("settingsbutdisabled")
            .setEmoji('<:better_rouage:1147593990921797682>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button8 = new Discord.ButtonBuilder()
            .setCustomId("searchiduser")
            .setEmoji('<:better_loupe:1159494809866739742>')
            .setStyle(Discord.ButtonStyle.Primary)
            button9 = new Discord.ButtonBuilder()
            .setCustomId("xx")
            .setEmoji('<:whitehall:1159495180148293632>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            
        if(req.length < 10) button4.setDisabled(true)
        if(req.length < 1) button3.setDisabled(true)
        if(req.length < 1) button8.setDisabled(true)
      
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
        msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2]})
      })
      } else if(interaction.customId == "previousownerDelete") { 
        interaction.deferUpdate()
        if (currentPage > 0) {
          currentPage--;
          button1.setDisabled(currentPage === 0);
          button4.setDisabled(false);

          button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            rows = new Discord.ActionRowBuilder().addComponents(menuSelect[currentPage])
            rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button2, button1, button4)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [rows, rows2],
          });
        }
      } else if(interaction.customId == "afterownerDelete") {
        interaction.deferUpdate()
        if (currentPage < totalPages - 1) {
          currentPage++;

          button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)

            rows = new Discord.ActionRowBuilder().addComponents(menuSelect[currentPage])
            rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button2, button1, button4)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [rows, rows2],
          });
        }
      } if(interaction.customId == "optionslist") {
        interaction.values.forEach(id => {
          try { 
            bot.db.query(`DELETE FROM permissionbl WHERE guildId = ${message.guild.id} AND userId = ${id}`);
          } catch (e) { }
        })

        wait(500)

        interaction.deferUpdate()
        bot.db.query(`SELECT * FROM permissionbl WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          embeds = [];
          currentPage = 0;
          totalPages = Math.ceil(req.length / itemsPerPage);
          if(req.length < 1) {
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
            .setDescription("```\nAucun```")
            totalPages = totalPages + 1
            embeds.push(embed)
          } else {
      
          for (let i = 0; i < req.length; i += itemsPerPage) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({ name: `・Voici la liste noire du serveur (${req.length})`})
      
            let description = "";
            for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
              const member = bot.users.cache.get(req[j].userId) 
              if(member) {
                description += `${member.username} (ID: ${req[j].userId})\n`;
              }
            }
            embed.setDescription("```py\n" + description + "```");
            embeds.push(embed);
          }
        }
      
        button1 = new Discord.ButtonBuilder()
          .setCustomId("previousowner")
          .setEmoji(`<:better_previous:1148608585463496824> `)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
          button2 = new Discord.ButtonBuilder()
          .setCustomId("addowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_add:1148608590110789773>`)
          button3 = new Discord.ButtonBuilder()
          .setCustomId("removeowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_remove:1148608592937754725>`)
          button4 = new Discord.ButtonBuilder()
          .setCustomId("afterowner")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji(`<:better_after:1148608588454051840>`)
          button5 = new Discord.ButtonBuilder()
          .setCustomId("pageowner")
          .setLabel(`${currentPage + 1}/${totalPages}`)
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary)
            button7 = new Discord.ButtonBuilder()
            .setCustomId("settingsbutdisabled")
            .setEmoji('<:better_rouage:1147593990921797682>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            button8 = new Discord.ButtonBuilder()
            .setCustomId("searchiduser")
            .setEmoji('<:better_loupe:1159494809866739742>')
            .setStyle(Discord.ButtonStyle.Primary)
            button9 = new Discord.ButtonBuilder()
            .setCustomId("xx")
            .setEmoji('<:whitehall:1159495180148293632>')
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            
        if(req.length < 10) button4.setDisabled(true)
        if(req.length < 1) button3.setDisabled(true)
        if(req.length < 1) button8.setDisabled(true)
      
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
          rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
        msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2]})
      }) 
      } else if(interaction.customId == "previousowner") {
        interaction.deferUpdate()
        if (currentPage > 0) {
          currentPage--;
          button1.setDisabled(currentPage === 0);
          button4.setDisabled(false);

          button5 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)
            rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
            rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
          msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2]})
        }
      } else if(interaction.customId == "afterowner") {
        interaction.deferUpdate()
        if (currentPage < totalPages - 1) {
          currentPage++;

          let button7 = new Discord.ButtonBuilder()
            .setCustomId("pageowner")
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary)

          button1.setDisabled(false);
          button4.setDisabled(currentPage === totalPages - 1);
          rows = new Discord.ActionRowBuilder().addComponents(button1, button2, button3, button4)
            rows2 = new Discord.ActionRowBuilder().addComponents(button5, button7, button8, button9)
          msg.edit({ embeds: [embeds[currentPage]], components: [rows, rows2]})
        }
      }
 

  })

  collector.on('end', async () => { // merci 214339832061624320 (max.vip)
     try {
                    if (msg.components) {
                        msg.components.forEach((row) => {
                            row.components.forEach((component) => {
                                component.data.disabled = true
                            })
                        })
                        await msg.edit({ components: msg.components })
                    }
                } catch (error) {
                    console.error(error)
                }
})

  })
}
    
  }
}


function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


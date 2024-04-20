const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
  name: "ownerlist",
  description: "Gérer la liste des créateurs du serveur.",
  permission: "Aucune",
  dm: false,
  owner: true,
  async run(bot, message, args) {
    let owners = "", rows, page, rows2, button8, button7, button9;
    bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
console.log(req)
      let embeds = [];
      let currentPage = 0;
      const itemsPerPage = 10;
      let totalPages = Math.ceil(req.length / itemsPerPage);
      if(req.length < 1) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `・Voici la liste des créateurs du serveur (${req.length})`})
        .setDescription("```\nAucun```")
        totalPages = totalPages + 1
        embeds.push(embed)
      } else {

      for (let i = 0; i < req.length; i += itemsPerPage) {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({ name: `・Voici la liste des créateurs du serveur (${req.length})`})

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
        interaction.values.forEach(id => {
          bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${id}"`, async (err, req) => {
            if(req.length < 1) bot.db.query(`INSERT INTO ownerlist (guildId, userId) VALUES (${message.guild.id}, ${id})`)
          })
        })

        await wait(500)
        await bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        embeds = []
            for (let i = 0; i < req.length; i += itemsPerPage) {
              const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `・Voici la liste des créateurs du serveur (${req.length})`})
      
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

        bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
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
        msg.edit({ embeds: [embeds[0]], components: [new Discord.ActionRowBuilder().addComponents([menuSelect]), rows] })
        })
      } else if(interaction.customId == "return") {
        interaction.deferUpdate()

        await bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}"`, async (err, req) => {

  
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
            bot.db.query(`DELETE FROM ownerlist WHERE userId = ${id}`);
          })

        await wait(500)
        await bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        embeds = []
            for (let i = 0; i < req.length; i += itemsPerPage) {
              const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `・Voici la liste des créateurs du serveur (${req.length})`})
      
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
              .setAuthor({ name: `・Voici la liste blanche du serveur (${req.length})`})
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
        bot.db.query(`DELETE FROM ownerlist WHERE guildId = ${message.guild.id}`);
        await wait(500)
        await bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        embeds = []
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `・Voici la liste des créateurs du serveur (${req.length})`})
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


function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
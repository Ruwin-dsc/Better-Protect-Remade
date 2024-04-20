const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

       
        if(interaction.commandName === "blacklist") {
            let choices = ["member", "permission"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c}))) 
            }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
      
        let slashCommand = require(`../../slashcommands/${interaction.commandName}`);
        
        bot.db.query(`SELECT * FROM guild WHERE guildId = "${interaction.guild.id}"`, async (err, req) => {

          if(slashCommand.name == "blacklist") {
            const perm = req[0].blacklist

          if(perm == "owner") {
          bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
            if(slashCommand.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`)
            .setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

            startCommand(slashCommand, bot, interaction, interaction.options)
            } 
          })
        } else if(perm == "any") {
          if(slashCommand.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`)
            .setColor("#2b2d31")
            if(config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

            startCommand(slashCommand, bot, interaction, interaction.options)
            }
        } else if(perm == "wl") {
          bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
            if(slashCommand.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

            startCommand(slashCommand, bot, interaction, interaction.options)
            } 
          })
        } else if(perm == "wlowner") {
          bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
            if(slashCommand.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== interaction.user.id) {
              bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
                if(slashCommand.owner == true) {
                const embed = new Discord.EmbedBuilder()
                .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
                if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })
    
                startCommand(slashCommand, bot, interaction, interaction.options)
                } 
              })
            } else {
              startCommand(slashCommand, bot, interaction, interaction.options)
            }
            } 
          })
        }} else if(slashCommand.name == "whitelist") {
          const perm = req[0].whitelistcmd

        if(perm == "owner") {
        bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
          if(slashCommand.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

          startCommand(slashCommand, bot, interaction, interaction.options)
          } 
        })
      } else if(perm == "any") {
        if(slashCommand.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

          startCommand(slashCommand, bot, interaction, interaction.options)
          }
      } else if(perm == "wl") {
        bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
          if(slashCommand.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

          startCommand(slashCommand, bot, interaction, interaction.options)
          } 
        })
      } else if(perm == "wlowner") {
        bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
          if(slashCommand.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(req.length < 1 && config.buyer !== interaction.user.id) {
            bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
              if(slashCommand.owner == true) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
              if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })
  
              startCommand(slashCommand, bot, interaction, interaction.options)
              } 
            })
          } else {
            startCommand(slashCommand, bot, interaction, interaction.options)
          }
          } 
        })
      }} else if(slashCommand.name == "ownerlist") {
        const perm = req[0].ownerlistcmd

      if(perm == "owner") {
      bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
        if(slashCommand.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

        startCommand(slashCommand, bot, interaction, interaction.options)
        } 
      })
    } else if(perm == "any") {
      if(slashCommand.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

        startCommand(slashCommand, bot, interaction, interaction.options)
        }
    } else if(perm == "wl") {
      bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
        if(slashCommand.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

        startCommand(slashCommand, bot, interaction, interaction.options)
        } 
      })
    } else if(perm == "wlowner") {
      bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
        if(slashCommand.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== interaction.user.id) {
          bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
            if(slashCommand.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

            startCommand(slashCommand, bot, interaction, interaction.options)
            } 
          })
        } else {
          startCommand(slashCommand, bot, interaction, interaction.options)
        }
        } 
      })
    }} else if(slashCommand.name == "config") {
      const perm = req[0].configcmd

    if(perm == "owner") {
    bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
      if(slashCommand.owner == true) {
      const embed = new Discord.EmbedBuilder()
      .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
      if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

      startCommand(slashCommand, bot, interaction, interaction.options)
      } 
    })
  } else if(perm == "any") {
    if(slashCommand.owner == true) {
      const embed = new Discord.EmbedBuilder()
      .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
      if(config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

      startCommand(slashCommand, bot, interaction, interaction.options)
      }
  } else if(perm == "wl") {
    bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
      if(slashCommand.owner == true) {
      const embed = new Discord.EmbedBuilder()
      .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
      if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

      startCommand(slashCommand, bot, interaction, interaction.options)
      } 
    })
  } else if(perm == "wlowner") {
    bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
      if(slashCommand.owner == true) {
      const embed = new Discord.EmbedBuilder()
      .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
      if(req.length < 1 && config.buyer !== interaction.user.id) {
        bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
          if(slashCommand.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`)
          if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

          startCommand(slashCommand, bot, interaction, interaction.options)
          } 
        })
      } else {
        startCommand(slashCommand, bot, interaction, interaction.options)
      }
      } 
    })
  }} else if(slashCommand.name == "raidmode") {
    const perm = req[0].raidmodecmd

  if(perm == "owner") {
  bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
    if(slashCommand.owner == true) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
    if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

    startCommand(slashCommand, bot, interaction, interaction.options)
    } 
  })
} else if(perm == "any") {
  if(slashCommand.owner == true) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
    if(config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

    startCommand(slashCommand, bot, interaction, interaction.options)
    }
} else if(perm == "wl") {
  bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
    if(slashCommand.owner == true) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
    if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

    startCommand(slashCommand, bot, interaction, interaction.options)
    } 
  })
} else if(perm == "wlowner") {
  bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
    if(slashCommand.owner == true) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
    if(req.length < 1 && config.buyer !== interaction.user.id) {
      bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
        if(slashCommand.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

        startCommand(slashCommand, bot, interaction, interaction.options)
        } 
      })
    } else {
      startCommand(slashCommand, bot, interaction, interaction.options)
    }
    } 
  })
}} else if(slashCommand.name == "panel") {
  const perm = req[0].panelcmd

if(perm == "owner") {
bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
  if(slashCommand.owner == true) {
  const embed = new Discord.EmbedBuilder()
  .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
  if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

  startCommand(slashCommand, bot, interaction, interaction.options)
  } 
})
} else if(perm == "any") {
if(slashCommand.owner == true) {
  const embed = new Discord.EmbedBuilder()
  .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
  if(config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

  startCommand(slashCommand, bot, interaction, interaction.options)
  }
} else if(perm == "wl") {
bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
  if(slashCommand.owner == true) {
  const embed = new Discord.EmbedBuilder()
  .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
  if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

  startCommand(slashCommand, bot, interaction, interaction.options)
  } 
})
} else if(perm == "wlowner") {
bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
  if(slashCommand.owner == true) {
  const embed = new Discord.EmbedBuilder()
  .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
  if(req.length < 1 && config.buyer !== interaction.user.id) {
    bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${interaction.guild.id}" AND userId = "${interaction.user.id}"`, async (err, req) => {
      if(slashCommand.owner == true) {
      const embed = new Discord.EmbedBuilder()
      .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
      if(req.length < 1 && config.buyer !== interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

      startCommand(slashCommand, bot, interaction, interaction.options)
      } 
    })
  } else {
    startCommand(slashCommand, bot, interaction, interaction.options)
  }
  } 
})
}} else {
      startCommand(slashCommand, bot, interaction, interaction.options)
    }

        })

    }

  }}

  function startCommand(slashCommand, bot, interaction, args) {
    slashCommand.run(bot, interaction, args);
  }
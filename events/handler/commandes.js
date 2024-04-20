const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageCreate",
  execute(message, bot) {
    if(message.author.bot) return
    bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if(req.length < 1) bot.db.query(`INSERT INTO guild (guildId) VALUES (${message.guild.id})`)
    })
    bot.db.query(`SELECT * FROM antibot WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO antibot (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM antiroleadd WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO antiroleadd (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM antiban WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO antiban (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM antithreadcreate WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO antithreadcreate (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM createrole WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO createrole (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM createchannel WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO createchannel (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM createwebhook WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO createwebhook (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM decouser WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO decouser (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM depluser WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO depluser (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM removerole WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO removerole (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM timeout WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO timeout (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM expuluser WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO expuluser (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM antilink WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO antilink (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM antispam WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO antispam (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM toxicite WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO toxicite (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM updaterole WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO updaterole (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM updatechannel WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO updatechannel (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM updateguild WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO updateguild (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM massiverole WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO massiverole (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM muteuser WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO muteuser (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM sourdineuser WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO sourdineuser (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM supprembed WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO supprembed (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM deleterole WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO deleterole (guildId) VALUES (${message.guild.id})`) 
    })
    bot.db.query(`SELECT * FROM deletechannel WHERE guildId = "${message.guild.id}"`, async (err, req) => { 
      if(req.length < 1) bot.db.query(`INSERT INTO deletechannel (guildId) VALUES (${message.guild.id})`) 
    })
        const prefix = config.prefix

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase();
        let args = messageArray.slice(1);

        let slicecmd;
        if (cmd.startsWith(prefix)) slicecmd = cmd.slice(prefix.length);
        let commandfile = bot.commands.get(slicecmd) || bot.aliases.get(slicecmd);
        if (!commandfile) return;
         if (commandfile) {
          bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

          if(commandfile.help.name == "blacklist") {
            const perm = req[0].blacklist

          if(perm == "owner") {
          bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(commandfile.help.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

            startCommand(commandfile, bot, message, args)
            } 
          })
        } else if(perm == "any") {
          if(commandfile.help.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

            startCommand(commandfile, bot, message, args)
            }
        } else if(perm == "wl") {
          bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(commandfile.help.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

            startCommand(commandfile, bot, message, args)
            } 
          })
        } else if(perm == "wlowner") {
          bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(commandfile.help.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== message.author.id) {
              bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                if(commandfile.help.owner == true) {
                const embed = new Discord.EmbedBuilder()
                .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
                if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))
    
                startCommand(commandfile, bot, message, args)
                } 
              })
            } else {
              startCommand(commandfile, bot, message, args)
            }
            } 
          })
        }} else if(commandfile.help.name == "whitelist") {
          const perm = req[0].whitelistcmd

        if(perm == "owner") {
        bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
          if(commandfile.help.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

          startCommand(commandfile, bot, message, args)
          } 
        })
      } else if(perm == "any") {
        if(commandfile.help.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

          startCommand(commandfile, bot, message, args)
          }
      } else if(perm == "wl") {
        bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
          if(commandfile.help.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

          startCommand(commandfile, bot, message, args)
          } 
        })
      } else if(perm == "wlowner") {
        bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
          if(commandfile.help.owner == true) {
          const embed = new Discord.EmbedBuilder()
          .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
          if(req.length < 1 && config.buyer !== message.author.id) {
            bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
              if(commandfile.help.owner == true) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
              if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))
  
              startCommand(commandfile, bot, message, args)
              } 
            })
          } else {
            startCommand(commandfile, bot, message, args)
          }
          } 
        })
      }} else if(commandfile.help.name == "ownerlist") {
        const perm = req[0].ownerlistcmd

      if(perm == "owner") {
      bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(commandfile.help.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

        startCommand(commandfile, bot, message, args)
        } 
      })
    } else if(perm == "any") {
      if(commandfile.help.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

        startCommand(commandfile, bot, message, args)
        }
    } else if(perm == "wl") {
      bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(commandfile.help.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

        startCommand(commandfile, bot, message, args)
        } 
      })
    } else if(perm == "wlowner") {
      bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(commandfile.help.owner == true) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
        if(req.length < 1 && config.buyer !== message.author.id) {
          bot.db.query(`SELECT * FROM ownerlist WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(commandfile.help.owner == true) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`<:better_no:1147096824440705024> Vous n'avez pas l'autorisation d'exécuter cette commande.`).setColor("#2b2d31")
            if(req.length < 1 && config.buyer !== message.author.id) return message.reply({ embeds: [embed], ephemeral: true }).then(m => setTimeout(() => { m.delete()}, 5000))

            startCommand(commandfile, bot, message, args)
            } 
          })
        } else {
          startCommand(commandfile, bot, message, args)
        }
        } 
      })
    }} else {
      startCommand(commandfile, bot, message, args)
    }

        })
        }
     
        }

  }


  function startCommand(commandfile, bot, message, args) {
    commandfile.run(bot, message, args);
  }

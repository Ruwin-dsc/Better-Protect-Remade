//trkl tqt Configurer automatiquement les salons logs.

const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
  name: "config",
  description: "Gérer les paramètres du serveur.",
  permission: "Aucune",
  dm: false,
  owner: true,
  async run(bot, message, args) {
    let filter2 = (m) => m.author.id === message.user.id
    let text1 = "❌", text2 = "❌", text3 = "❌", text4 = "❌", text5 = "❌", text6 = "❌", text7 = "❌", text8 = "❌", category, modulecount = 0, category2, messagelogs = "❌", text11, activatemodule;

    const embed = new Discord.EmbedBuilder()
    .setDescription(`
    Bienvenue dans le panel de configuration du bot, ici, vous\npouvez modifier des paramètres concernant, diverse action\nque robot feras.
    Vous pouvez aussi configurer les permissions pour pouvoir\nutilisé certaine mécanique du bot.    
    
    [Si vous avez des questions sur les systèmes automatisés\ncontactés l'équipe d'assistance.](https://discord.gg/haA22e86MQ)
    
    *Ce bot est une copie de [Better](https://discord.gg/better-944610139388919869)*
    `)
    .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
    .setColor(`#313338`)

    let MenuSelectionCounter = new Discord.StringSelectMenuBuilder()
            .setCustomId('MenuSelectionCounter')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Modifier les permissions des boutons/commandes.")
                        .setValue("editpermissions")
                        .setEmoji("<:better_affiche:1147143448395255829>"),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Modifier le texte au dessus des logs.")
                        .setValue("edittextlogs")
                        .setEmoji("<:better_plume:1147503670720725083>"),
                )

                const botton3 = new Discord.ButtonBuilder()
                    .setCustomId("activateallmodules")
                    .setEmoji(`<:better_rouage:1147593990921797682>`)
                const botton4 = new Discord.ButtonBuilder()
                    .setCustomId("presetslogs")
                    .setEmoji(`<:better_affiche:1147143448395255829>`)
                    .setLabel(`Configurer automatiquement les salons logs.           ‎`)
                    .setStyle(Discord.ButtonStyle.Primary)

    bot.db.query(`SELECT * FROM antibot WHERE guildId = "${message.guild.id}"`, async (err, req) => {

        if(req.length < 1) botton3.setStyle(Discord.ButtonStyle.Success), botton3.setLabel("Activer tous les modules du robot.                    ‎"), activatemodule = true
        else {
        if(req[0].logs !== "off") botton3.setLabel(`Désactiver tous les modules du robot.                 ‎`), botton3.setStyle(Discord.ButtonStyle.Danger), activatemodule = false
        else {
            botton3.setStyle(Discord.ButtonStyle.Success), botton3.setLabel("Activer tous les modules du robot.                    ‎"); activatemodule = true
        }
        }
                    


    const msg = await message.reply({ files: ["./utils/images/banner.png"], embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(botton3), new Discord.ActionRowBuilder().addComponents(botton4)], fetchReply: true})

    const collector = await msg.createMessageComponentCollector({ time: 120000 })

            collector.on('collect', async (interaction) => {
                if(interaction.user.id !== message.user.id) return

                if(interaction.customId == "presetslogs") {
                    let countlogs = 0

                    interaction.guild.channels.create({
                        name: "🔥 BETTER PROTECT",
                        type: Discord.ChannelType.GuildCategory,
                        permissionsOverwrites: [{
                            id: message.guild.id,
                            deny: [Discord.PermissionsBitField.Flags.ViewChannel]
                        }]
                    }).then(async c => {
                        botton4.setDisabled(true)
                        const msg2 = await interaction.reply({ content: `<:better_recharger:1148516539721601114> Configuration des salons log de tous les modules en cours...`, ephemeral: true })
                        msg.edit({ components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(botton3), new Discord.ActionRowBuilder().addComponents(botton4)] })
                        
                        
                        const createLogChannel = async (names, target) => {
                            const logs = await c.guild.channels.create({
                                name: names,
                                type: Discord.ChannelType.GuildText,
                                parent: c.id,
                                permissionOverwrites: [
                                    {
                                        id: message.guild.id,
                                        deny: [Discord.PermissionsBitField.Flags.ViewChannel]
                                    },
                                ],
                            });
                            bot.db.query(`UPDATE ${target} SET logs = '${logs.id}' WHERE guildId = ${message.guild.id}`);
                            countlogs++

                            if(countlogs == 22) msg2.edit({ content: `<:better_yes:1147114141652369490> Vous avez bien configurer tous les salons logs avec succès !` }), botton4.setDisabled(false), msg.edit({ components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(botton3), new Discord.ActionRowBuilder().addComponents(botton4)] })
                        };
        
                        createLogChannel('ß・botadd', 'antibot');
                        createLogChannel('ß・roleadd', 'antiroleadd');
                        createLogChannel('ß・guildban', 'antiban');
                        createLogChannel('ß・threadcreate', 'antithreadcreate');
                        createLogChannel('ß・role', 'createrole');
                        createLogChannel('ß・channel', 'createchannel');
                        createLogChannel('ß・webhookupdate', 'createwebhook');
                        createLogChannel('ß・userdisconnected', 'decouser');
                        createLogChannel('ß・usermoved', 'depluser');
                        createLogChannel('ß・roleremove', 'removerole');
                        createLogChannel('ß・usertimeout', 'timeout');
                        createLogChannel('ß・guildkick', 'expuluser');
                        createLogChannel('ß・messagewithlink', 'antilink');
                        createLogChannel('ß・messagespam', 'antispam');
                        createLogChannel('ß・messagewithtoxicity', 'toxicite');
                        createLogChannel('ß・roleupdate', 'updaterole');
                        createLogChannel('ß・channelupdate', 'updatechannel');
                        createLogChannel('ß・guildupdate', 'updateguild');
                        createLogChannel('ß・roledown', 'massiverole');
                        createLogChannel('ß・usermute', 'muteuser');
                        createLogChannel('ß・userdeafen', 'sourdineuser');
                        createLogChannel('ß・deletemessagewithembed', 'supprembed');
                        createLogChannel('ß・roledelete', 'deleterole');
                        createLogChannel('ß・channeldelete', 'deletechannel');
                        
                    })
                } else if(interaction.customId == "activateallmodules") {
                    interaction.deferUpdate()

                    if(activatemodule == true) {
                    bot.db.query(`UPDATE antibot SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE antiroleadd SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE antiban SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE antithreadcreate SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE createrole SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE createchannel SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE createwebhook SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE decouser SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE depluser SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE removerole SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE timeout SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE expuluser SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE antilink SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE antispam SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE toxicite SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE updaterole SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE updatechannel SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE updateguild SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE massiverole SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE muteuser SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE sourdineuser SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE supprembed SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE deleterole SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);
                    bot.db.query(`UPDATE deletechannel SET logs = 'on', state = 'on' WHERE guildId = ${message.guild.id}`);

                    botton3.setLabel(`Désactiver tous les modules du robot.                 ‎`), botton3.setStyle(Discord.ButtonStyle.Danger), activatemodule = false
                    msg.edit({ components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(botton3), new Discord.ActionRowBuilder().addComponents(botton4)] })
                        activatemodule = false
                    } else {
                        bot.db.query(`UPDATE antibot SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE antiroleadd SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE antiban SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE antithreadcreate SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE createrole SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE createchannel SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE createwebhook SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE decouser SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE depluser SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE removerole SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE timeout SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE expuluser SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE antilink SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE antispam SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE toxicite SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE updaterole SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE updatechannel SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE updateguild SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE massiverole SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE muteuser SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE sourdineuser SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE supprembed SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE deleterole SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);
                        bot.db.query(`UPDATE deletechannel SET logs = 'off', state = 'off' WHERE guildId = ${message.guild.id}`);

                        botton3.setStyle(Discord.ButtonStyle.Success), botton3.setLabel("Activer tous les modules du robot.                    ‎"); activatemodule = true
                        activatemodule == true
                        msg.edit({ components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(botton3), new Discord.ActionRowBuilder().addComponents(botton4)] })
                    }
                } else if(interaction.customId == "configmsg") {
                    interaction.deferUpdate()

                    const embed = new Discord.EmbedBuilder()
                    .setDescription("Envoie-moi le message que tu souhaites définir, écrit `cancel` pour `annuler` ou `delete` pour `supprimer` le message actuel.")
                    .setColor(`#313338`)

                    const msg2 = await message.channel.send({ embeds: [embed] })


                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                      }).then(async (collected) => {
                        if(collected.first().content == "cancel") return msg2.delete(), collected.first().delete()
                        else if(collected.first().content == "delete") {
                            bot.db.query(`UPDATE logstxt SET text = null WHERE guildId = ${message.guild.id}`);
                            collected.first().delete()
                            msg2.delete()
                            messagelogs = "❌";
                            const embed = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34majouter[0m[2;34m un [4;34mtexte[0m[2;34m au-dessus des messages de logs. Vous pouvez donc ainsi mentionner un rôle. Seuls les modules sélectionnés auront le texte intégré dans leur log.[0m\`\`\`
                            \`\`\`ansi\nMessage: ${messagelogs}\nModules: ${text11}\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            
                            msg.edit({ embeds: [embed] })
                        }
                        else {
                            if(collected.first().content.length > 1000) return collected.first().delete(), msg2.delete()
                            else {
                                bot.db.query(`UPDATE logstxt SET text = ? WHERE guildId = ${message.guild.id}`, [collected.first().content]);
                                collected.first().delete()
                                msg2.delete()
                                messagelogs = collected.first().content;
                                const embed = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34majouter[0m[2;34m un [4;34mtexte[0m[2;34m au-dessus des messages de logs. Vous pouvez donc ainsi mentionner un rôle. Seuls les modules sélectionnés auront le texte intégré dans leur log.[0m\`\`\`
                                \`\`\`ansi\nMessage: ${messagelogs}\nModules: ${text11}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                
                                msg.edit({ embeds: [embed] })
                            }
                        }
                        
                      }).catch(collected => {
                        msg2.delete()
                      })
                } else if(interaction.values[0] == "edittextlogs") {
                    interaction.deferUpdate()
                    category2 = "logsedit"

                    bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                        if(req.length < 1) bot.db.query(`INSERT INTO logstxt (guildId) VALUES ("${message.guild.id}")`)
                        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                        const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Ajout de bot")
                            .setValue("addbot");

                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Ajout de rôle")
                            .setValue("addrole");

                        const option3 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Bannissement d'utilisateur")
                            .setValue("banuser");

                        const option4 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Création de fil")
                            .setValue("filcreate");

                        const option5 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Création de rôle")
                            .setValue("rolecreate");

                        const option6 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Création de salon")
                            .setValue("channelcreate");

                        const option7 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Création de webhook")
                            .setValue("webhookcreate");

                        const option8 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Déconnexion d'utilisateur")
                            .setValue("deconnectuser");

                        const option9 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Déplacement d'un utilisateur")
                            .setValue("moovuser");

                        const option10 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Enlever un rôle")
                            .setValue("removerole");

                        const option11 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Exclure temporairement")
                            .setValue("temporalyexpulse");

                        const option12 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Expulsion d'un utilisateur")
                            .setValue("expulsemember");

                        const option13 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Message contenant des liens")
                            .setValue("linkmsg");

                        const option14 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Message contenant du spam")
                            .setValue("spammsg");

                        const option15 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Message contenant un taux de toxicité")
                            .setValue("toxicmsg");

                        const option16 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Mise à jour de rôle")
                            .setValue("roleupdate");

                        const option17 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Mise à jour de salon")
                            .setValue("channelupdate");

                        const option18 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Mise à jour de serveur")
                            .setValue("guildupdate");

                        const option19 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Mise à jour massive de la position des rôles")
                            .setValue("massiveroleupdate");

                        const option20 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Mise en muet d'un utilisateur")
                            .setValue("muteuservoc");

                        const option21 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Mise en sourdine d'un utilisateur")
                            .setValue("sourdineuservoc");

                        const option22 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Suppression de message contenant un embed")
                            .setValue("deleteembed");



                            if (req[0].addbot !== null) {
                                modulecount++;
                                option1.setDefault(true);
                            }
                            if (req[0].addrole !== null) {
                                modulecount++;
                                option2.setDefault(true);
                            }
                            if (req[0].banuser !== null) {
                                modulecount++;
                                option3.setDefault(true);
                            }
                            if (req[0].filcreate !== null) {
                                modulecount++;
                                option4.setDefault(true);
                            }
                            if (req[0].rolecreate !== null) {
                                modulecount++;
                                option5.setDefault(true);
                            }
                            if (req[0].channelcreate !== null) {
                                modulecount++;
                                option6.setDefault(true);
                            }
                            if (req[0].webhookcreate !== null) {
                                modulecount++;
                                option7.setDefault(true);
                            }
                            if (req[0].deconnectuser !== null) {
                                modulecount++;
                                option8.setDefault(true);
                            }
                            if (req[0].moovuser !== null) {
                                modulecount++;
                                option9.setDefault(true);
                            }
                            if (req[0].removerole !== null) {
                                modulecount++;
                                option10.setDefault(true);
                            }
                            if (req[0].temporalyexpulse !== null) {
                                modulecount++;
                                option11.setDefault(true);
                            }
                            if (req[0].expulsemember !== null) {
                                modulecount++;
                                option12.setDefault(true);
                            }
                            if (req[0].linkmsg !== null) {
                                modulecount++;
                                option13.setDefault(true);
                            }
                            if (req[0].spammsg !== null) {
                                modulecount++;
                                option14.setDefault(true);
                            }
                            if (req[0].toxicmsg !== null) {
                                modulecount++;
                                option15.setDefault(true);
                            }
                            if (req[0].roleupdate !== null) {
                                modulecount++;
                                option16.setDefault(true);
                            }
                            if (req[0].channelupdate !== null) {
                                modulecount++;
                                option17.setDefault(true);
                            }
                            if (req[0].guildupdate !== null) {
                                modulecount++;
                                option18.setDefault(true);
                            }
                            if (req[0].massiveroleupdate !== null) {
                                modulecount++;
                                option19.setDefault(true);
                            }
                            if (req[0].muteuservoc !== null) {
                                modulecount++;
                                option20.setDefault(true);
                            }
                            if (req[0].sourdineuservoc !== null) {
                                modulecount++;
                                option21.setDefault(true);
                            }
                            if (req[0].deleteembed !== null) {
                                modulecount++;
                                option22.setDefault(true);
                            }
                            if(req[0].text !== null) (
                                messagelogs = req[0].text
                            )
                    if(modulecount == 0) text11 = "❌"
                    else text11 = `[2;34m${modulecount}[0m sélectionnés.`

                    const embed = new Discord.EmbedBuilder()
                    .setColor(`#313338`)
                    .setDescription(`
                    ・Modifier les permissions des boutons/commandes.
                    \`\`\`ansi\n[2;34mVous pouvez [4;34majouter[0m[2;34m un [4;34mtexte[0m[2;34m au-dessus des messages de logs. Vous pouvez donc ainsi mentionner un rôle. Seuls les modules sélectionnés auront le texte intégré dans leur log.[0m\`\`\`
                    \`\`\`ansi\nMessage: ${messagelogs}\nModules: ${text11}\`\`\`
                    `)
                    .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)

                const selectmenulogs = new Discord.StringSelectMenuBuilder()
                .setCustomId('logstxt')
                .setMaxValues(22)
                .setMinValues(0)
                .setPlaceholder("Choisis le module que tu souhaites ajouter.")
                .addOptions(option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, option19, option20, option21, option22)   

                const botton2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Message")
                    .setCustomId("configmsg")
                    .setEmoji(`<:better_plume:1147503670720725083>`)
                    .setStyle(Discord.ButtonStyle.Secondary),
                )

                    msg.edit({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(selectmenulogs), botton2] })
                        })
                })
                } else if(interaction.values[0] == "editpermissions") {
                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(true),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                        const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].buttonrole == "owner") option2.setDefault(true), text1 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].buttonrole == "wlowner") option2.setDefault(true), option1.setDefault(true), text1 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].buttonrole == "wl") option1.setDefault(true), text1 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Bouton de réattribution des permissions des rôles.\nAutorisé: ${text1}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'buttonrole'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                } else if(interaction.values[0] == "buttonmsgrole") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(true), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].buttonmsg == "owner") option2.setDefault(true), text2 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].buttonmsg == "wlowner") option2.setDefault(true), option1.setDefault(true), text2 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].buttonmsg == "wl") option1.setDefault(true), text2 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Bouton de renvoie de message.\nAutorisé: ${text2}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'buttonmsg'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else if(interaction.values[0] == "blackliist") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(true),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].blacklist == "owner") option2.setDefault(true), text3 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].blacklist == "wlowner") option2.setDefault(true), option1.setDefault(true), text3 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].blacklist == "wl") option1.setDefault(true), text3 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/blacklist)\nAutorisé: ${text3}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'blacklist'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else if(interaction.values[0] == "config") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(true),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].configcmd == "owner") option2.setDefault(true), text4 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].configcmd == "wlowner") option2.setDefault(true), option1.setDefault(true), text4 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].configcmd == "wl") option1.setDefault(true), text4 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/config)\nAutorisé: ${text4}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'config'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else if(interaction.values[0] == "ownerlistcmd") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(true),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].ownerlistcmd == "owner") option2.setDefault(true), text5 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].ownerlistcmd == "wlowner") option2.setDefault(true), option1.setDefault(true), text5 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].ownerlistcmd == "wl") option1.setDefault(true), text5 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/ownerlist)\nAutorisé: ${text5}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'ownerlist'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else if(interaction.values[0] == "panel") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(true), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].panelcmd == "owner") option2.setDefault(true), text6 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].panelcmd == "wlowner") option2.setDefault(true), option1.setDefault(true), text6 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].panelcmd == "wl") option1.setDefault(true), text6 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/panel)\nAutorisé: ${text6}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'panel'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else if(interaction.values[0] == "raidmode") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(true),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(false),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].raidmodecmd == "owner") option2.setDefault(true), text7 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].raidmodecmd == "wlowner") option2.setDefault(true), option1.setDefault(true), text7 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].raidmodecmd == "wl") option1.setDefault(true), text7 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/raidmode)\nAutorisé: ${text7}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'raidmode'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else if(interaction.values[0] == "whitelist") {

                    interaction.deferUpdate()

                    
                    let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                    .setCustomId('parametersettings')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                        .addOptions(
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de réattribution des permissions des rôles.")
                                .setValue("buttonrole")
                                .setDefault(false),
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bouton de renvoie du message.")
                                .setValue("buttonmsgrole")
                                .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/blacklist)")
                                .setValue("blackliist")
                                .setDefault(false),       
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/config)")
                                .setValue("config")
                                .setDefault(false),  
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/ownerlist)")
                                .setValue("ownerlistcmd")
                                .setDefault(false),    
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/panel)")
                                .setValue("panel")
                                .setDefault(false), 
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/raidmode)")
                                .setValue("raidmode")
                                .setDefault(false),     
                            new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Commande (/whitelist)")
                                .setValue("whitelist")
                                .setDefault(true),  
                        )

                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste blanche.")
                            .setValue("wllist")
                        const option2 = new Discord.StringSelectMenuOptionBuilder()
                            .setLabel("Utilisateur dans la liste des propriétaires.")
                            .setValue("ownerlist")

                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                if(req.length < 1) {
                                    bot.db.query(`INSERT INTO guild (guildId) VALUES ("${message.guild.id}")`)
                                    option2.setDefault(true)

                                } else {
                                    if(req[0].whitelistcmd == "owner") option2.setDefault(true), text8 = "\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].whitelistcmd == "wlowner") option2.setDefault(true), option1.setDefault(true), text8 = "\n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires."
                                    if(req[0].whitelistcmd == "wl") option1.setDefault(true), text8 = "\n・ Utilisateur dans la liste blanche."
                                }
                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/whitelist)\nAutorisé: ${text8}\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'whitelist'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })

                } else {
                    if(category2 == "logsedit") {
                        interaction.deferUpdate()
                        modulecount = 0
                        if(interaction.values.includes("addbot")) {
                            bot.db.query(`UPDATE logstxt SET addbot = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET addbot = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("addrole")) {
                            bot.db.query(`UPDATE logstxt SET addrole = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET addrole = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("banuser")) {
                            bot.db.query(`UPDATE logstxt SET banuser = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET banuser = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("filcreate")) {
                            bot.db.query(`UPDATE logstxt SET filcreate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET filcreate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("rolecreate")) {
                            bot.db.query(`UPDATE logstxt SET rolecreate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET rolecreate = null WHERE guildId = ${message.guild.id}`);
                        }
                        
                        if(interaction.values.includes("channelcreate")) {
                            bot.db.query(`UPDATE logstxt SET channelcreate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET channelcreate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("webhookcreate")) {
                            bot.db.query(`UPDATE logstxt SET webhookcreate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET webhookcreate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("deconnectuser")) {
                            bot.db.query(`UPDATE logstxt SET deconnectuser = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET deconnectuser = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("moovuser")) {
                            bot.db.query(`UPDATE logstxt SET moovuser = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET moovuser = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("sourdineuservoc")) {
                            bot.db.query(`UPDATE logstxt SET sourdineuservoc = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET sourdineuservoc = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("removerole")) {
                            bot.db.query(`UPDATE logstxt SET removerole = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET removerole = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("temporalyexpulse")) {
                            bot.db.query(`UPDATE logstxt SET temporalyexpulse = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET temporalyexpulse = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("deleteembed")) {
                            bot.db.query(`UPDATE logstxt SET deleteembed = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET deleteembed = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("expulsemember")) {
                            bot.db.query(`UPDATE logstxt SET expulsemember = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET expulsemember = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("linkmsg")) {
                            bot.db.query(`UPDATE logstxt SET linkmsg = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET linkmsg = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("spammsg")) {
                            bot.db.query(`UPDATE logstxt SET spammsg = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET spammsg = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("toxicmsg")) {
                            bot.db.query(`UPDATE logstxt SET toxicmsg = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET toxicmsg = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("roleupdate")) {
                            bot.db.query(`UPDATE logstxt SET roleupdate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET roleupdate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("channelupdate")) {
                            bot.db.query(`UPDATE logstxt SET channelupdate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET channelupdate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("guildupdate")) {
                            bot.db.query(`UPDATE logstxt SET guildupdate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET guildupdate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("massiveroleupdate")) {
                            bot.db.query(`UPDATE logstxt SET massiveroleupdate = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET massiveroleupdate = null WHERE guildId = ${message.guild.id}`);
                        }

                        if(interaction.values.includes("muteuservoc")) {
                            bot.db.query(`UPDATE logstxt SET muteuservoc = "msg" WHERE guildId = ${message.guild.id}`);
                            modulecount++
                        } else {
                            bot.db.query(`UPDATE logstxt SET muteuservoc = null WHERE guildId = ${message.guild.id}`);
                        }

                        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                            const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Ajout de bot")
                                .setValue("addbot");
    
                            const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Ajout de rôle")
                                .setValue("addrole");
    
                            const option3 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Bannissement d'utilisateur")
                                .setValue("banuser");
    
                            const option4 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Création de fil")
                                .setValue("filcreate");
    
                            const option5 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Création de rôle")
                                .setValue("rolecreate");
    
                            const option6 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Création de salon")
                                .setValue("channelcreate");
    
                            const option7 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Création de webhook")
                                .setValue("webhookcreate");
    
                            const option8 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Déconnexion d'utilisateur")
                                .setValue("deconnectuser");
    
                            const option9 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Déplacement d'un utilisateur")
                                .setValue("moovuser");
    
                            const option10 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Enlever un rôle")
                                .setValue("removerole");
    
                            const option11 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Exclure temporairement")
                                .setValue("temporalyexpulse");
    
                            const option12 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Expulsion d'un utilisateur")
                                .setValue("expulsemember");
    
                            const option13 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Message contenant des liens")
                                .setValue("linkmsg");
    
                            const option14 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Message contenant du spam")
                                .setValue("spammsg");
    
                            const option15 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Message contenant un taux de toxicité")
                                .setValue("toxicmsg");
    
                            const option16 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Mise à jour de rôle")
                                .setValue("roleupdate");
    
                            const option17 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Mise à jour de salon")
                                .setValue("channelupdate");
    
                            const option18 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Mise à jour de serveur")
                                .setValue("guildupdate");
    
                            const option19 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Mise à jour massive de la position des rôles")
                                .setValue("massiveroleupdate");
    
                            const option20 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Mise en muet d'un utilisateur")
                                .setValue("muteuservoc");
    
                            const option21 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Mise en sourdine d'un utilisateur")
                                .setValue("sourdineuservoc");
    
                            const option22 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Suppression de message contenant un embed")
                                .setValue("deleteembed");
    
    
    
                                if (req[0].addbot !== null) {
                                    
                                    option1.setDefault(true);
                                }
                                if (req[0].addrole !== null) {
                                    
                                    option2.setDefault(true);
                                }
                                if (req[0].banuser !== null) {
                                    
                                    option3.setDefault(true);
                                }
                                if (req[0].filcreate !== null) {
                                    
                                    option4.setDefault(true);
                                }
                                if (req[0].rolecreate !== null) {
                                    
                                    option5.setDefault(true);
                                }
                                if (req[0].channelcreate !== null) {
                                    
                                    option6.setDefault(true);
                                }
                                if (req[0].webhookcreate !== null) {
                                    
                                    option7.setDefault(true);
                                }
                                if (req[0].deconnectuser !== null) {
                                    
                                    option8.setDefault(true);
                                }
                                if (req[0].moovuser !== null) {
                                    
                                    option9.setDefault(true);
                                }
                                if (req[0].removerole !== null) {
                                    
                                    option10.setDefault(true);
                                }
                                if (req[0].temporalyexpulse !== null) {
                                    
                                    option11.setDefault(true);
                                }
                                if (req[0].expulsemember !== null) {
                                    
                                    option12.setDefault(true);
                                }
                                if (req[0].linkmsg !== null) {
                                    
                                    option13.setDefault(true);
                                }
                                if (req[0].spammsg !== null) {
                                    
                                    option14.setDefault(true);
                                }
                                if (req[0].toxicmsg !== null) {
                                    
                                    option15.setDefault(true);
                                }
                                if (req[0].roleupdate !== null) {
                                    
                                    option16.setDefault(true);
                                }
                                if (req[0].channelupdate !== null) {
                                    
                                    option17.setDefault(true);
                                }
                                if (req[0].guildupdate !== null) {
                                    
                                    option18.setDefault(true);
                                }
                                if (req[0].massiveroleupdate !== null) {
                                    
                                    option19.setDefault(true);
                                }
                                if (req[0].muteuservoc !== null) {
                                    
                                    option20.setDefault(true);
                                }
                                if (req[0].sourdineuservoc !== null) {
                                    
                                    option21.setDefault(true);
                                }
                                if (req[0].deleteembed !== null) {
                                    
                                    option22.setDefault(true);
                                }
                        if(modulecount == 0) text11 = "❌"
                        else text11 = `[2;34m${modulecount}[0m sélectionnés.`
    
                        const embed = new Discord.EmbedBuilder()
                        .setColor(`#313338`)
                        .setDescription(`
                        ・Modifier les permissions des boutons/commandes.
                        \`\`\`ansi\n[2;34mVous pouvez [4;34majouter[0m[2;34m un [4;34mtexte[0m[2;34m au-dessus des messages de logs. Vous pouvez donc ainsi mentionner un rôle. Seuls les modules sélectionnés auront le texte intégré dans leur log.[0m\`\`\`
                        \`\`\`ansi\nMessage: ${messagelogs}\nModules: ${text11}\`\`\`
                        `)
                        .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
    
                    const selectmenulogs = new Discord.StringSelectMenuBuilder()
                    .setCustomId('logstxt')
                    .setMaxValues(22)
                    .setMinValues(0)
                    .setPlaceholder("Choisis le module que tu souhaites ajouter.")
                    .addOptions(option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, option19, option20, option21, option22)   

                    const botton2 = new Discord.ActionRowBuilder()
                    .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Message")
                    .setCustomId("configmsg")
                    .setEmoji(`<:better_plume:1147503670720725083>`)
                    .setStyle(Discord.ButtonStyle.Secondary),
                    )
    
                        msg.edit({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(selectmenulogs), botton2] })
                            })


                    } else if(category == "buttonrole") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonrole = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(true),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Bouton de réattribution des permissions des rôles.\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'buttonrole'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonrole = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Bouton de réattribution des permissions des rôles.")
                                        .setValue("buttonrole")
                                        .setDefault(true),
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Bouton de renvoie du message.")
                                        .setValue("buttonmsgrole")
                                        .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/blacklist)")
                                        .setValue("blackliist")
                                        .setDefault(false),       
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/config)")
                                        .setValue("config")
                                        .setDefault(false),  
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/ownerlist)")
                                        .setValue("ownerlistcmd")
                                        .setDefault(false),    
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/panel)")
                                        .setValue("panel")
                                        .setDefault(false), 
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/raidmode)")
                                        .setValue("raidmode")
                                        .setDefault(false),     
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/whitelist)")
                                        .setValue("whitelist")
                                        .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Bouton de réattribution des permissions des rôles.\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'buttonrole'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonrole = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Bouton de réattribution des permissions des rôles.")
                                        .setValue("buttonrole")
                                        .setDefault(true),
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Bouton de renvoie du message.")
                                        .setValue("buttonmsgrole")
                                        .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/blacklist)")
                                        .setValue("blackliist")
                                        .setDefault(false),       
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/config)")
                                        .setValue("config")
                                        .setDefault(false),  
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/ownerlist)")
                                        .setValue("ownerlistcmd")
                                        .setDefault(false),    
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/panel)")
                                        .setValue("panel")
                                        .setDefault(false), 
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/raidmode)")
                                        .setValue("raidmode")
                                        .setDefault(false),     
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/whitelist)")
                                        .setValue("whitelist")
                                        .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Bouton de réattribution des permissions des rôles.\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'buttonrole'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonrole = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Bouton de réattribution des permissions des rôles.")
                                        .setValue("buttonrole")
                                        .setDefault(true),
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Bouton de renvoie du message.")
                                        .setValue("buttonmsgrole")
                                        .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/blacklist)")
                                        .setValue("blackliist")
                                        .setDefault(false),       
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/config)")
                                        .setValue("config")
                                        .setDefault(false),  
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/ownerlist)")
                                        .setValue("ownerlistcmd")
                                        .setDefault(false),    
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/panel)")
                                        .setValue("panel")
                                        .setDefault(false), 
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/raidmode)")
                                        .setValue("raidmode")
                                        .setDefault(false),     
                                    new Discord.StringSelectMenuOptionBuilder()
                                        .setLabel("Commande (/whitelist)")
                                        .setValue("whitelist")
                                        .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Bouton de réattribution des permissions des rôles.\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'buttonrole'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "buttonmsg") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonmsg = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(true),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Bouton de renvoie de message.\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'buttonmsg'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonmsg = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(true),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Bouton de renvoie de message.\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'buttonmsg'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonmsg = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(true),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(false),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(false),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(false),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(false),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Bouton de renvoie de message.\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'buttonmsg'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET buttonmsg = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(true),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Bouton de renvoie de message.\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'buttonmsg'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "blacklist") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET blacklist = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(true),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/blacklist)\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'blacklist'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET blacklist = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(true),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/blacklist)\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'blacklist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET blacklist = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(true),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(false),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(false),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(false),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/blacklist)\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'blacklist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET blacklist = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(true),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/blacklist)\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'blacklist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "config") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET configcmd = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(true),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/config)\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'config'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET configcmd = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(true),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/config)\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'config'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET configcmd = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(false),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(true),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(false),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(false),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/config)\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'config'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET configcmd = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(true),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/config)\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'config'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "ownerlist") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET ownerlistcmd = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(true),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/ownerlist)\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'ownerlist'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET ownerlistcmd = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(true),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/ownerlist)\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'ownerlist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET ownerlistcmd = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(false),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(false),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(true),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(false),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/ownerlist)\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'ownerlist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET ownerlistcmd = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(true),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/ownerlist)\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'ownerlist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "panel") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET panelcmd = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(true), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/panel)\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'panel'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET panelcmd = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(true), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/panel)\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'panel'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET panelcmd = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(false),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(false),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(false),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(true), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(false),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/panel)\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'panel'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET panelcmd = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(true), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/panel)\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'panel'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "raidmode") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET raidmodecmd = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(true),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/raidmode)\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'raidmode'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET raidmodecmd = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(true),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/raidmode)\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'raidmode'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET raidmodecmd = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(false),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(false),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(false),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(true),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/raidmode)\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'raidmode'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET raidmodecmd = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(true),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(false),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/raidmode)\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'raidmode'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    } else if(category == "whitelist") {
                        interaction.deferUpdate()
                        if(interaction.values.includes('ownerlist') && interaction.values.includes('wllist')) { 
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET whitelistcmd = "wlowner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                    .setCustomId('parametersettings')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                    .addOptions(
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(true),  
                                    )

                                    const option1 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste blanche.")
                                    .setValue("wllist")
                                    .setDefault(true)
                                    const option2 = new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Utilisateur dans la liste des propriétaires.")
                                    .setValue("ownerlist")
                                    .setDefault(true)

                                    let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('permissionselect')
                                .setMaxValues(2)
                                .setMinValues(0)
                                .setPlaceholder("Choisis les utilisateurs autorisé.")
                                .addOptions(option1, option2)

                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(`#313338`)
                                .setDescription(`
                                ・Modifier les permissions des boutons/commandes.
                                \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                                \`\`\`\nParamètre: Commande (/whitelist)\nAutorisé: \n・ Utilisateur dans la liste blanche.\n・ Utilisateur dans la liste des propriétaires.\`\`\`
                                `)
                                .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                                category = 'whitelist'


                            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                            
                        } else if(interaction.values[0] == "ownerlist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET whitelistcmd = "owner" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(true),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")
                                .setDefault(true)

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/whitelist)\nAutorisé: \n・ Utilisateur dans la liste des propriétaires.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'whitelist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else if(interaction.values[0] == "wllist") {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET whitelistcmd = "wl" WHERE guildId = ${message.guild.id}`);

                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de réattribution des permissions des rôles.")
                                    .setValue("buttonrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Bouton de renvoie du message.")
                                    .setValue("buttonmsgrole")
                                    .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/blacklist)")
                                    .setValue("blackliist")
                                    .setDefault(false),       
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/config)")
                                    .setValue("config")
                                    .setDefault(false),  
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/ownerlist)")
                                    .setValue("ownerlistcmd")
                                    .setDefault(false),    
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/panel)")
                                    .setValue("panel")
                                    .setDefault(false), 
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/raidmode)")
                                    .setValue("raidmode")
                                    .setDefault(false),     
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel("Commande (/whitelist)")
                                    .setValue("whitelist")
                                    .setDefault(true),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                .setDefault(true)
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/whitelist)\nAutorisé: \n・ Utilisateur dans la liste blanche.\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'whitelist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        } else {
                            bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                                bot.db.query(`UPDATE guild SET whitelistcmd = "any" WHERE guildId = ${message.guild.id}`);
                                let MenuSelectionCounter2 = new Discord.StringSelectMenuBuilder()
                                .setCustomId('parametersettings')
                                .setMaxValues(1)
                                .setMinValues(1)
                                .setPlaceholder("Choisis le paramètre que tu souhaites configurer")
                                .addOptions(
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de réattribution des permissions des rôles.")
                                            .setValue("buttonrole")
                                            .setDefault(false),
                                    new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Bouton de renvoie du message.")
                                            .setValue("buttonmsgrole")
                                            .setDefault(false),
                                            new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/blacklist)")
                                            .setValue("blackliist")
                                            .setDefault(false),       
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/config)")
                                            .setValue("config")
                                            .setDefault(false),  
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/ownerlist)")
                                            .setValue("ownerlistcmd")
                                            .setDefault(false),    
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/panel)")
                                            .setValue("panel")
                                            .setDefault(false), 
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/raidmode)")
                                            .setValue("raidmode")
                                            .setDefault(false),     
                                        new Discord.StringSelectMenuOptionBuilder()
                                            .setLabel("Commande (/whitelist)")
                                            .setValue("whitelist")
                                            .setDefault(true),  
                                )

                                const option1 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste blanche.")
                                .setValue("wllist")
                                const option2 = new Discord.StringSelectMenuOptionBuilder()
                                .setLabel("Utilisateur dans la liste des propriétaires.")
                                .setValue("ownerlist")

                                let MenuSelectionCounter3 = new Discord.StringSelectMenuBuilder()
                            .setCustomId('permissionselect')
                            .setMaxValues(2)
                            .setMinValues(0)
                            .setPlaceholder("Choisis les utilisateurs autorisé.")
                            .addOptions(option1, option2)

                            const embed2 = new Discord.EmbedBuilder()
                            .setColor(`#313338`)
                            .setDescription(`
                            ・Modifier les permissions des boutons/commandes.
                            \`\`\`ansi\n[2;34mVous pouvez [4;34mrestreindre[0m[2;34m l'utilisation des commandes ou des boutons.\nSi vous ne sélectionnez aucun type d'utilisateur, seul le propriétaire du serveur sera autorisé.[0m\`\`\`
                            \`\`\`\nParamètre: Commande (/whitelist)\nAutorisé: ❌\`\`\`
                            `)
                            .setImage(`https://cdn.discordapp.com/attachments/1170288145871413318/1228058202348716072/barre.jpg?ex=662aa953&is=66183453&hm=89e2f79023f353d5171f34d1245e74c9d92626b7475a048925c76ef618a2a960&`)
                            category = 'whitelist'


                        msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter2), new Discord.ActionRowBuilder().addComponents(MenuSelectionCounter3)] })

                            })
                        }
                    }
                } 
            })

            collector.on('end', async () => {
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

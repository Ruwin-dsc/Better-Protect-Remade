const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildWebhooks
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent
  ],
});

bot.slashcommand = new Collection()
bot.commands = new Collection();
bot.aliases = new Collection();
bot.emojis = require("./utils/emojis.json")


bot.config = require("./config.json")

const command = require('./handlers/command.js')(bot)
const eventdHandler = require("./handlers/event.js")(bot);
const slashcommandHandler = require("./handlers/loadslashcommand.js")(bot);
const loadDatabase = require("./handlers/loadDatabase");
const DataBase = require("./handlers/loginDatabase");
const config = require("./slashcommands/config.js");
DataBase.connectDatabase(bot);
const anticrashHandler = require('./utils/anticrash')(bot)

if(config.apikey == "") console.log("Veuillez renseignez la clé API à l'aide de la doc: https://developers.perspectiveapi.com/s/docs-get-started?language=en_US ou demandez une clé sur https://discord.gg/uhq"), process.exit()
bot.login(bot.config.token)














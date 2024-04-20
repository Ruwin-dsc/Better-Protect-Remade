const Discord = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch');
const ms = require("ms")
const puni = {
    expul: "Expulsion.",
    banni: "Bannissement.",
    supprrole: "Suppression de ces rôles.",
    excluretempo: "Exclure temporairement.",
    aucun: "Aucune."
}

const langue = {
    "af": "Afrikaans",
    "sq": "Albanais",
    "am": "Amharique",
    "ar": "Arabe",
    "hy": "Arménien",
    "az": "Azerbaïdjanais",
    "eu": "Basque",
    "be": "Biélorusse",
    "bn": "Bengali",
    "bs": "Bosniaque",
    "bg": "Bulgare",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "ny": "Chichewa",
    "zh": "Chinois (simplifié)",
    "zh-TW": "Chinois (traditionnel)",
    "co": "Corse",
    "hr": "Croate",
    "cs": "Tchèque",
    "da": "Danois",
    "nl": "Néerlandais",
    "en": "Anglais",
    "eo": "Espéranto",
    "et": "Estonien",
    "tl": "Filipino",
    "fi": "Finlandais",
    "fr": "Français",
    "fy": "Frison occidental",
    "gl": "Galicien",
    "ka": "Géorgien",
    "de": "Allemand",
    "el": "Grec",
    "gu": "Gujarati",
    "ht": "Créole haïtien",
    "ha": "Haoussa",
    "haw": "Hawaïen",
    "iw": "Hébreu",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hongrois",
    "is": "Islandais",
    "ig": "Igbo",
    "id": "Indonésien",
    "ga": "Irlandais",
    "it": "Italien",
    "ja": "Japonais",
    "jv": "Javanais",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "rw": "Kinyarwanda",
    "ko": "Coréen",
    "ku": "Kurde",
    "ky": "Kirghize",
    "lo": "Laotien",
    "la": "Latin",
    "lv": "Letton",
    "lt": "Lituanien",
    "lb": "Luxembourgeois",
    "mk": "Macédonien",
    "mg": "Malgache",
    "ms": "Malais",
    "ml": "Malayalam",
    "mt": "Maltais",
    "mi": "Maori",
    "mr": "Marathi",
    "mn": "Mongol",
    "my": "Birman",
    "ne": "Népalais",
    "no": "Norvégien",
    "ps": "Pachto",
    "fa": "Persan",
    "pl": "Polonais",
    "pt": "Portugais",
    "pa": "Pendjabi",
    "ro": "Roumain",
    "ru": "Russe",
    "sm": "Samoan",
    "gd": "Écossais-gaélique",
    "sr": "Serbe",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sk": "Slovaque",
    "sl": "Slovène",
    "so": "Somalien",
    "es": "Espagnol",
    "su": "Sundanais",
    "sw": "Swahili",
    "sv": "Suédois",
    "tg": "Tadjik",
    "ta": "Tamoul",
    "te": "Télougou",
    "th": "Thaï",
    "tr": "Turc",
    "uk": "Ukrainien",
    "ur": "Ourdou",
    "ug": "Ouïghour",
    "uz": "Ouzbek",
    "vi": "Vietnamien",
    "cy": "Gallois",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zoulou"
  }
  

module.exports = {
  name: "messageCreate", 
  async execute(message, bot) {
    if(!message.content) return

    if(message.author.bot) return
     bot.db.query(`SELECT * FROM toxicite WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return;

      const { state, logs, punition, permission, reste, duree, pourcentage} = req[0];

      const checkuserr = async (table) => {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM ${table} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, (err, req) => {
            if (err) reject(err);
            resolve(req.length > 0);
          });
        });
      };

      const checkAction = async () => {
        bot.db.query(`SELECT * FROM toxicitechannel WHERE guildId = "${message.guild.id}" AND channelId = "${message.channel.id}"`, async (err, req) => {
        if(req.length > 0) return
        let msg = null
        bot.db.query(`SELECT * FROM logstxt WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            if(req.length ? req[0]?.toxicmsg : "a" == "msg") msg = req[0].text
            const toxiqueJson = JSON.parse(await ToxiqueJ(message.content))
            const pourcentageMessage = Math.round(Number(toxiqueJson.attributeScores.TOXICITY.summaryScore.value) * 100)
            if(state == "on") {

            if(Number(pourcentageMessage) < Number(pourcentage.replace(/%/g, ''))) return 

            if(punition == "expul") message.guild.members.cache.get(message.author.id).kick({ reason: 'toxicite by beter /uhq'})
            else if(punition == "banni") message.guild.members.cache.get(message.author.id).ban({ reason: 'toxicite by beter /uhq' })
            else if(punition == "supprrole") message.guild.members.cache.get(message.author.id).roles.set([], `toxicite by beter /uhq`);
            else if(punition == "excluretempo") message.guild.members.cache.get(message.author.id).timeout(ms(duree))
            message.delete()
            message.channel.send(`<:attention:1230206717179203717> ${message.author}, votre message est trop toxique. (${pourcentageMessage}%)`).then(m => setTimeout(() => { m.delete()}, 2000))
          }
            const channel = message.guild.channels.cache.get(logs)
            if(channel) {
              const embed = new Discord.EmbedBuilder()
              .setDescription(`\`\`\`diff\n+ ${message.author.username} a écrit un message avec un trop grand taux de toxicité.\nUtilisateur: ${message.author.username} (ID: ${message.author.id})\nSalon: ${message.channel.name} (ID: ${message.channel.id})\nMessage:\n${message.content}\nLangues:\n${toxiqueJson.detectedLanguages.map(element => `   ・ ${langue[element] || element}`).join('\n')}\nPourcentage: ${pourcentageMessage}%\nPunition: ${puni[punition]}\`\`\``)
              .setColor("#2c2f33")  

              channel.send({ embeds: [embed], content: msg})
            }
           })
          })
      };

      switch (reste) {
        case "proprioblanche":
          if (await checkuserr("ownerlist") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        case "proprio":
          if (await checkuserr("ownerlist")) return;
          await checkAction();
          break;
        case "blanche":
          if (await checkuserr("whitelist")) return;
          await checkAction();
          break;
        case "independant":
          if (await checkuserr("toxicitelistuser")) return;
          await checkAction();
          break;
        case "proprioindependant":
          if (await checkuserr("ownerlist") || await checkuserr("toxicitelistuser")) return;
          await checkAction();
          break;
        case "blancheindependant":
          if (await checkuserr("whitelist") || await checkuserr("toxicitelistuser")) return;
          await checkAction();
          break;
        case "proprioblancheindependant":
          if (await checkuserr("ownerlist") || await checkuserr("toxicitelistuser") || await checkuserr("whitelist")) return;
          await checkAction();
          break;
        default:
          break;
      }
    });
  }
};

async function ToxiqueJ(text) {

    const API_KEY = config.apikey;
    const API_ENDPOINT = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';

    const analyzeRequest = {
    comment: { text: text },
    requestedAttributes: { TOXICITY: {} },
    languages: ['fr'],
    };

    return fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(analyzeRequest),
    })
    .then(async response => {
    if (!response.ok) {
        console.log("UNE ERREUR EST INTERVENU SUR L'ANTITOXICITE, Pour de l'aide https://discord.gg/uhq")
    }
    const data = await response.json()
    return JSON.stringify(data, null, 2)

    })
    .catch(error => {
    console.error("UNE ERREUR EST INTERVENU SUR L'ANTITOXICITE, Pour de l'aide https://discord.gg/uhq 2", error);
    });
}


const chalk = require('chalk')

const anticrashHandler = (bot) => {
 
    process.on("uncaughtExceptionMonitor", (err, origin) => {
      console.log(err, origin)
    });
  
    process.on("rejectionHandled", (err) => {
      console.log(err)
    });
  
  
    process.on("warning", (warning) => {
      console.log(warning)
    });
  
    process.on("uncaughtException", (error) => {
      
      console.log("Une erreur non-capturée est survenue:", error);
    });
  
    process.on("unhandledRejection", (reason, promise) => {
      if (reason.code == 10062) return;
      if(reason.code == 50013) return console.log(chalk.red("Je n'ai pas les permissions sur le serveur ! Pour plus d'aide https://discord.gg/uhq"))
      if(reason.code == 50074) return console.log(chalk.red("Je n'ai pas pu supprimer le salon ! Pour plus d'aide https://discord.gg/uhq"))
    
      console.log("Une erreur asynchrone non-capturée est survenue:", reason);
    });
  
    bot.on("error", (error) => {
      console.log("Une erreur non-capturée est survenue:", error);
    });
  
    process.on("processTicksAndRejections", (request, reason) => {
      console.log("Une erreur réseau non-capturée est survenue:", reason);
  ;
    });
  
    process.on("exit", (code) => {
      console.log(`Processus terminé avec le code ${code}`);
    });
  };
  
  module.exports = anticrashHandler;
  
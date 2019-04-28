const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
const OwnerID = "265209764965777408";
const superagent = require("superagent");
const prefix = "!"

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Chercher un hébergeur ('!')", {type: "PLAYING"});
});

process.on('unhandledRejection', error => {
    // Won't execute
  });

  new Promise((_, reject) => reject({ test: 'woops!' })).catch(() => {});

  var somevar = false;
var PTest = function () {
return new Promise(function (resolve, reject) {
if (somevar === true)
    resolve();
else
    reject();
});
}
var myfunc = PTest();
myfunc.then(function () {
}).catch(function () {
});

bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'welcome');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField(':bust_in_silhouette: | Pseudo : ', `${member}`)
      .addField(':microphone2: | Welcome!', `Bienvenue, ${member}`)
      .addField(':id: | Utilisateur :', "**[" + `${member.id}` + "]**")
      .addField(':family_mwgb: | Nous sommes grâce à toi ', `${member.guild.memberCount}`)
      .addField("Pseudo", `<@` + `${member.id}` + `>`, true)
      .addField('Server', `${member.guild.name}`, true )
      .setFooter(`**${member.guild.name}**`)
      .setTimestamp()
      member.addRole("572079134478696458")

      channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

  console.log(`${member}`, "est parmis nous !" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find('name', 'leave');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField('Pseudo:', `${member}`)
      .addField('Nous as quittés', ':c')
      .addField('Bye :cry:', 'Tu vas tous nous manquer!')
      .addField('Nous sommes donc actuellement', `${member.guild.memberCount}` + " members")
      .setFooter(`**${member.guild.name}`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
  console.log(`${member}` + "viens de partir c;" + `${member.guild.name}` + "cc")
  console.log("we")
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Je ne trouve pas cet Utilisateur!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la perm");
    if(kUser.hasPermission("MANAGE_MESSAGES", "Bot owner")) return message.channel.send("Je ne peux pas le kick");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Utilisateur kick", `${kUser} avec ID ${kUser.id}`)
    .addField("Kick par", `<@${message.author.id}> avec ID ${message.author.id}`)
    .addField("Kick dans", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Je ne trouve pas de salon : discussion, général, incidents");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Je ne trouve pas cet Utilisateur!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("tu ne possedes pas la perm");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je ne peux pas le ban");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Utilisateur banni", `${bUser} avec ID ${bUser.id}`)
    .addField("Ban par", `<@${message.author.id}> avec ID ${message.author.id}`)
    .addField("Ban dans", message.channel)
    .addField("Ttemps", message.createdAt)
    .addField("Raison", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents", "💬𝖉𝖎𝖘𝖈𝖚𝖘𝖘𝖎𝖔𝖓💬", "général");
    if(!incidentchannel) return message.channel.send("Je ne trouve pas de salon : discussion, général, incidents");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Je ne trouve pas cet Utilisateur !");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Report Utilisateur", `${rUser} avec ID: ${rUser.id}`)
    .addField("Report par", `${message.author} avec ID: ${message.author.id}`)
    .addField("Salon", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", rreason);

    let reportschannel = message.guild.channels.find(`name`, "incidents");
    if(!reportschannel) return message.channel.send("Je ne trouve pas ce channel");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serveurinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Serveur Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Creer le", message.guild.createdAt)
    .addField("Tu as rejoint le serveur", message.member.joinedAt)
    .addField("Membres total", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Information sur le BOT")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nom du bot", bot.user.username)
    .addField("Creer le", bot.user.createdAt);

    return message.channel.send(botembed);
  }

});

bot.on('message', message => {
  let args = message.content.split(" ").slice(1);

  if(message.content.startsWith(prefix + "say"))  {
         message.delete()
         const embed = new Discord.RichEmbed()
         .setDescription(args.join(" "))
         .setColor(0xff0000)
    message.channel.sendEmbed(embed);

     }

});

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la perm'")
        let count = args[1]
        if (!count) return message.channel.send("Combien voulez vous supprimé de message")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 98) return message.channel.send("indiquez un nombre entre 1 et 98")
        message.channel.bulkDelete(parseInt(count) + 1)
       message.reply('Des messages ont été supprimé.').then(d_msg => { d_msg.delete(500);  });
        console.log('des messages ont ete clear');
    }});

    bot.on("message", message => {
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)

        if(message.content.startsWith(prefix + 'id')) {
    if (message.channel.type === "dm") return;
     message.channel.sendMessage(`**${message.author.username} **` + "Voici ton ID: " + `__${message.author.id}__`);
  }
})

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    if (message.content === prefix + "owner")
var embed = new Discord.RichEmbed()
    .setTitle("Le créateur du LAYKO BOT est : @savasava#0463 ")
    .addField("D'ailleurs son instagram est", "darkoudu79 :wink: ", true)
    .setColor("0x00fedb")
   .setFooter("Bonne journée/soirée")
message.channel.sendEmbed(embed);
})

bot.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)


    if (args[0].toLocaleLowerCase() === prefix + '8ball'){
        if (!args[0]) return message.channel.send("Veuillez **poser une question**")
        let rep = ["Eh tu veux pas te taire toi ?", "Bah oui quand meme", "pas trop", "je trouve pas.."];
        let reptaille = Math.floor((Math.random() * rep.length));
        let question = args.slice(0).join(" ");

        let embed = new Discord.RichEmbed()
            .setAuthor('8ball', 'https://findicons.com/files/icons/1700/2d/512/8_ball.png')
            .setColor("RANDOM")
            .addField("Question:", question)
            .addField("Réponse:", rep[reptaille]);
        message.channel.send(embed)
        console.log('des joueurs utilisent le 8ball');
    }
})

bot.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)


    if (args[0].toLocaleLowerCase() === prefix + 'mute'){
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Tu ne possedes pas la permission")
    let member = message.mentions.members.first()
    if (!member) return message.channel.send("Membre introuvable")
    if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
    if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
    let muterole = message.guild.roles.find(role => role.name === 'Muted')
    if (muterole) {
        member.addRole(muterole)
        message.channel.send(member + ' a été mute').then(d_msg => { d_msg.delete(1000);  });
    }
    else {
        message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
            message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                channel.overwritePermissions(role, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  SEND_TTS_MESSAGES: false,
                  ATTACH_FILES: false,
                  SPEAK: false
                })
            })
            member.addRole(role)
            message.channel.send(member + ' a été mute').then(d_msg => { d_msg.delete(1000);  });
            console.log('Unjoueur a été mute');

        })
    }
}
})

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    if (message.content === prefix + "help")
var embed = new Discord.RichEmbed()
    .setTitle("Voici les commandes que vous pouvez utiliser")
    .addField("!kick \n -- \n !ban \n -- \n !mute \n -- \n !owner \n -- \n !8ball \n -- \n !clear \n \n !say \n -- \n !botinfo \n -- \n !report \n -- \n !serveurinfo  ", true)
    .setColor("0x00fedb")
message.channel.sendEmbed(embed);
})


bot.login(process.env.TOKEN);

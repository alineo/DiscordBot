const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Google extends Command {

    static match(message) {
        return message.content.startsWith('!avatar');
    }

    static action(message, bot) {
        const embed = new Discord.RichEmbed()
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .setColor(0xda5d78);

        let args = message.content.split(" ");
        if (args.length === 1) {
            embed.setImage(message.author.avatarURL)
                .setAuthor("Voici votre bel avatar", 'https://i.imgur.com/j7Yiy7u.jpg');
        } else if (args.length === 2) {
            try {
                let user = bot.users.get(args[1].replace('<@', '').replace('>', ''));
                embed.setImage(user.avatarURL)
                    .setAuthor("Voici le bel avatar de " + user.username, 'https://i.imgur.com/j7Yiy7u.jpg');
            }
            catch(error) {
                message.channel.send("Impossible de trouver un avatar.");
            }
        } else {
            message.channel.send("Nombre d'arguments invalide.");
            return;
        }
        message.channel.send(embed);
    }

};
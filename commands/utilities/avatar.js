const { Command, CommandoMessage } = require("discord.js-commando");
const Discord = require('discord.js');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'util',
            aliases: ['a'],
            memberName: 'avatar',
            description: 'Affiche l\'avatar de la personne ciblée',

            args: [
                {
                    key: 'target',
                    prompt: 'Quel avatar dois-ja afficher ?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    /**
     *  
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message, args) {
        //console.log(args);
        //console.log(message.author.displayAvatarURL());
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .setColor(0xda5d78);
        
        if (args.target.length === 0) {
            embed.setImage(message.author.displayAvatarURL())
                .setAuthor("Voici votre bel avatar", 'https://i.imgur.com/j7Yiy7u.jpg');

            message.channel.send(embed);
        } else {
            try {
                // Search the user by its ID
                message.client.users.fetch(args.target.replace('<@!', '').replace('>', '')).then((user) => {
                    embed.setImage(user.displayAvatarURL())
                        .setAuthor("Voici le bel avatar de " + user.username, 'https://i.imgur.com/j7Yiy7u.jpg');
                    
                    message.channel.send(embed);
                }).catch(message.channel.send("Impossible de trouver un avatar."));
            }
            catch (error) {
                message.channel.send("Impossible de trouver un avatar.");
            }
        }
    }
}
const { Command, CommandoMessage } = require("discord.js-commando");

var variables = require('../../variables.js');

module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            group: 'musics',
            memberName: 'loop',
            description: '(Dés)active la lecture en boucle des vidéos'
        });
    }

    /**
     *  
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message, { query }) {
        variables.loop = !variables.loop;
        if (variables.loop)
            message.reply("Lecture en boucle des vidéos activée");
        else
            message.reply("Lecture en boucle des vidéos désactivée");
    }
}
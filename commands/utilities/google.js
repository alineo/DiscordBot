const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class GoogleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'google',
            aliases: ['ggl', 'gl'],
            group: 'util',
            memberName: 'google',
            description: 'Effectue une recherche dans Google',
            args: [
                {
                    key: 'request',
                    prompt: 'Que souhaites-tu trouver ?',
                    type: 'string'
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
        message.reply('https://www.google.fr/search?q=' + args.request.replace(' ', '%20'));
    }
}
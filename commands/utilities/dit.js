const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dit',
            aliases: ['say', 'repete', 'repeate'],
            group: 'util',
            memberName: 'dit',
            description: 'Répète en TTS le texte envoyé',

            args: [
                {
                    key: 'message',
                    prompt: 'Je dois répéter... rien ?',
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
        message.delete();
        message.channel.send(args.message, { tts: true });
    }
}
const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class PathfinderCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pathfinder',
            aliases: ['pf'],
            group: 'games',
            memberName: 'pathfinder',
            description: 'Effectue une recherche dans Pathfinder',
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
        let code = encodeURI(args.request);
        code = code.replace('\'', '');
        
        message.channel.send("http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG." + code + ".ashx");
    }
}
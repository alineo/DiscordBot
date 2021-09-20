const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'util',
            memberName: 'clear',
            description: 'Supprime les [0-100] derniers messages',

            args: [
                {
                    key: 'nombre',
                    prompt: 'Combien de messages dois-je supprimer ?',
                    type: 'integer'
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
        console.log(args);
        if (!isNaN(parseFloat(args.nombre)) && isFinite(args.nombre)) {
            if (args.nombre <= 0 || args.nombre > 100) {
                message.channel.send("Le nombre doit être compris entre 0 et 100.");
                return;
            }
            
            message.channel.bulkDelete(args.nombre + 1)
                .then(message.channel.send("Suppression de " + args.nombre + " messages."))
                .catch(console.error);
        } else {
            message.channel.send(args.nombre + " n'est pas un nombre.");
        }
    }
}
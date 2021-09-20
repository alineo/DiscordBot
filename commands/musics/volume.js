const { Command, CommandoMessage } = require("discord.js-commando");

var musicPlayer = require('../../MusicPlayer');

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            group: 'musics',
            memberName: 'volume',
            aliases: ['vol', 'v'],
            description: 'Change le volume des vidéos jouées',

            args: [
                {
                    key: 'nombre',
                    prompt: 'Quel volume souhaites-tu ? [0-200]',
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
        /*if (args.nombre <= 0 || args.nombre > 100) {
            message.channel.send("Le volume doit être compris entre 0 et 100.");
            return;
        } else {
            variables.volume = args.nombre;
            message.reply("Volume réglé à " + variables.volume);
        }*/
        musicPlayer.volume(message, args.nombre);
    }
}
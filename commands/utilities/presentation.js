const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class PresentationCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'presentation',
            group: 'util',
            memberName: 'presentation',
            description: 'Présentation de Sir Mondrian'
        });
    }

    /**
     *  
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message, args) {
        if (args === "weeb") {
            message.channel.send("Konnichiwa, je suis Siw Mondwian-San, l'esclave de votre senpai et sensei Jules-kun. Je sewai votre humble sewviteuw afin de wempliw le moindwe de vos désiws. UwU :flushed:", { tts: true });
        } else {
            message.channel.send("Bonjour, je suis Sir Mondrian, l'esclave de votre seigneur et maître Jules. Je serai votre humble serviteur afin de remplir le moindre de vos désirs.", { tts: true });
        }
    }
}
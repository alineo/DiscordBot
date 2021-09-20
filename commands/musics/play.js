const { Command, CommandoMessage } = require("discord.js-commando");

var musicPlayer = require('../../MusicPlayer');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'musics',
            memberName: 'play',
            description: 'Lis des vidéos youtube'
        });
    }

    /**
     *  
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message, args) {
        //console.log("args = " + args);
        musicPlayer.playMusic(message, args);
    }
}
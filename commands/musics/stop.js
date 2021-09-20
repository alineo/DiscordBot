const { Command, CommandoMessage } = require("discord.js-commando");

var musicPlayer = require('../../MusicPlayer');

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'musics',
            memberName: 'stop',
            description: 'Stop la lecture de la musique'
        });
    }

    async run(message, args) {
        musicPlayer.stopMusic(message);
    }
}
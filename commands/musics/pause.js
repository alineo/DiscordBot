const { Command, CommandoMessage } = require("discord.js-commando");

var musicPlayer = require('../../MusicPlayer');

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'musics',
            memberName: 'pause',
            description: 'Mets la musique lue en pause'
        });
    }
    
    async run(message, args) {
        musicPlayer.pauseMusic();
    }
}
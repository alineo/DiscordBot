const { Command, CommandoMessage } = require("discord.js-commando");

var musicPlayer = require('../../MusicPlayer');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'musics',
            memberName: 'resume',
            description: 'Reprends la musique en pause'
        });
    }

    async run(message, args) {
        musicPlayer.resumeMusic();
    }
}
const { Command, CommandoMessage } = require("discord.js-commando");

var variables = require('../../variables.js');

module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'musics',
            memberName: 'test',
            description: '(Dés)active la lecture en boucle des vidéos',
            args: [
                {
                    key: 'query',
                    prompt: 'quelle playlist ?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { query }) {
        /*console.log(variables.playlists + "\n\n");
        console.log(variables.playlists[0]);*/
        this.findPlaylist(query);
    }

    async findPlaylist(name) {
        variables.playlists.forEach(function (playlist) {
            if (playlist.playlistName === name) {
                console.log("vidéos 1 = " + playlist.musics[0].musicName + " et URL = " + playlist.musics[0].musicLink);
            }
        });
    }
}
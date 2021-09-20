const { Command, CommandoMessage } = require("discord.js-commando");
const Discord = require('discord.js');

var variables = require('../../variables.js');

module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'playlist',
            aliases: ['pl'],
            group: 'musics',
            memberName: 'playlist',
            description: 'Recherche une playlist enregistrée'
        });
    }

    /**
     *  
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message, args) {
        if (args === "")
            args = "vidéos";

        // search playlist
        let playlist = null;
        for (var i = 0; i < variables.playlists.length; i++) {
            if (variables.playlists[i].playlistName === args) {
                playlist = variables.playlists[i];
            }
        }

        // playlist not found
        if (!playlist) {
            message.reply("Playlist " + args + " non trouvée.");
            return;
        }

        // playlist found
        LoopCommand.displayPlaylist(message, playlist);
    }




    static displayPlaylist(message, playlist) {
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .setAuthor("Voici les vidéos de la playlist '" + playlist.playlistName + "'", 'https://i.imgur.com/j7Yiy7u.jpg')
            .setColor(0x6666ff);

        if (playlist.musics.length === 0) {
            embed.addField("La playlist est vide...", "Ajoutez des vidéos");
            return;
        }

        let index = 0;
        let count = 0;
        let sub = "";
        for (let i = 0; i < playlist.musics.length; i++) {
            count++;
            sub += i + " : **[" + playlist.musics[i].musicName + "](" + playlist.musics[i].musicLink + ")**\n";

            if (count === 10) {
                embed.addField("Vidéos " + index + "0 - " + index + "9", sub);
                count = 0;
                sub = "";
                index++;
            }
        }
        if (count !== 0) {
            embed.addField("Vidéos " + index + "0 - " + index + "" + count, sub);
        }

        message.channel.send({ embed });
    }
}
const { Command, CommandoMessage } = require("discord.js-commando");

var variables = require('../../variables');
var Youtube = require('../../youtube');
var playlist = require('../../playlistManager');

module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'musics',
            memberName: 'add',
            description: 'Ajoute une ou plusieurs vidéos à une playlist'
        });
    }

    async run(message, args) {
        console.log(args);

        var words = args.split(" ");
        console.log(words.length);

        if (words.length === 1 && words[0] === "") {
            console.log("aucun paramètre");
            return;
        }

        // Separe le nom et le lien de la playlist envoyés en paramètres
        var link = words[words.length - 1];
        var playlistName = args.substring(0, args.lastIndexOf(" "));
        if (playlistName === "") playlistName = "vidéos";
        //console.log(link);
        //console.log(playlistName);

        if (link.indexOf("list=") !== -1)
            AddCommand.addPlaylist(message, playlistName, link, false);
        else
            AddCommand.addVideo(message, playlistName, link, false);
    }

    async findPlaylist(name) {
        variables.playlists.forEach(function (playlist) {
            if (playlist.playlistName === name) {
                console.log("vidéo 1 = " + playlist.musics[0].musicName + " et URL = " + playlist.musics[0].musicLink);
            }
        });
    }

    static async addPlaylist(message, playlistName, playlistLink, insertBeginning = false) {
        playlistName = playlistName.trim();
        let indexList = playlistLink.indexOf("list=");
        if (indexList === -1)
            return false;

        let listId = playlistLink.substring(indexList + 5, playlistLink.length);

        let musics = await playlist.searchForPlaylist(listId);

        if (!musics || musics.length === 0) {
            message.reply("Erreur lors de la recherche de la playlist.");
            return false;
        }

        // search the playlist by name
        let playlistIndex = -1;
        for (var i = 0; i < variables.playlists.length; i++) {
            if (variables.playlists[i].playlistName === playlistName) {
                playlistIndex = i;
                break;
            }
        }

        // if the playlist is not found, create it
        if (playlistIndex === -1) {
            let newPlaylist = {
                playlistName: playlistName,
                musics: []
            };
            variables.playlists.push(newPlaylist);
            playlistIndex = variables.playlists.length - 1;

            console.log("Création de la playlist : " + playlistName);
        }

        // Add the musics to the playlist
        if (insertBeginning) { // insert at the beginning
            musics.slice().reverse().forEach(function (music) {
                variables.playlists[playlistIndex].musics.unshift({ musicName: music.musicName, musicLink: music.musicLink });
            });
        } else { // insert at the end
            musics.forEach(function (music) {
                variables.playlists[playlistIndex].musics.push({ musicName: music.musicName, musicLink: music.musicLink });
            });
        }

        message.channel.send("Ajout des vidéos dans la playlist " + playlistName);

        return false;
    }

    static async addVideo(message, playlistName, link, insertBeginning = false) {
        // search the playlist by name
        let playlistIndex = -1;
        for (var i = 0; i < variables.playlists.length; i++) {
            if (variables.playlists[i].playlistName === playlistName) {
                playlistIndex = i;
                break;
            }
        }

        // if the playlist is not found, create it
        if (playlistIndex === -1) {
            let newPlaylist = {
                playlistName: playlistName,
                musics: []
            };
            variables.playlists.push(newPlaylist);
            playlistIndex = variables.playlists.length - 1;

            console.log("Création de la playlist : " + playlistName);
        }

        // Search the title of the music
        let music = await playlist.searchForMusic(message, link);
        // If a music is found, add it
        if (music.length !== 0) {
            // Add the musics to the playlist
            if (insertBeginning) { // insert at the beginning
                variables.playlists[playlistIndex].musics.unshift({ musicName: music[0].musicName, musicLink: music[0].musicLink });
            } else { // insert at the end
                variables.playlists[playlistIndex].musics.push({ musicName: music[0].musicName, musicLink: music[0].musicLink });
            }
        }
    }
}
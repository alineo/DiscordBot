const { CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core-discord');

var variables = require('./variables');
var playlist = require('./playlistManager');
var AddCommand = require('./commands/musics/add');

module.exports = class MusicPlayer {
    static dispatcher = null;
    static musicStopped = false;

    constructor() {

    }

    static async playMusic(message, query) {
        // Playing a youtube link, with only one video, no playlist
        if (query.includes("http") && !query.includes("list=")) {
            console.log("lecture de la musique " + query);

            // Search the title of the music
            let music = await playlist.searchForMusic(message, query);
            // If a music is found, play it
            if (music.length !== 0) {
                await message.member.voice.channel.join().then((connection) => {
                    this.musicStopped = false;
                    this.runMusic(message, connection, music[0].musicLink);
                    message.channel.send("Lecture de \"" + music[0].musicName + "\"");
                });
            }
        } else if (query.includes("http") && query.includes("list=")) { // Add and play a playlist from a link
            //message.reply("Entre une URL stp");
            console.log("début playlist");
        } else if (!isNaN(parseFloat(query)) && isFinite(query)) { // Play the result of a ytSearch (with a number)
            this.playYtSearchResult(message, query);
        }
        else { // Play playlist already added
            // parse the playlist to find an index
            var words = query.split(" ");
            let index = words[words.length - 1];
            if (!isNaN(parseFloat(index)) && isFinite(index)) {
                index--;
                let playlistName = query.substring(0, query.lastIndexOf(" "));
                this.playPlaylist(message, playlistName, index);
            } else {
                this.playPlaylist(message, query);
            }

        }
    }

    static async playYtSearchResult(message, index) {
        if (variables.youtubeSearch.length === 0) {
            message.reply("Vous devez déjà effectuer une recherche youtube avec la commande /youtube avant de pouvoir jouer un résultat.");
            return;
        }
        if (index <= 0 || index > 5) {
            message.reply("Vous devez choisir un numéro entre 1 et 5 pour jouer un résultat d'une recherche youtube.");
            return;
        }

        await message.member.voice.channel.join().then((connection) => {
            this.musicStopped = false;
            this.runMusic(message, connection, variables.youtubeSearch[index-1].musicLink);
        });
    }

    static async addAndPlayPlaylist(message, link) {
        let playlistName = "vidéos";
        let result = await AddCommand.addPlaylist(message, playlistName, link, true);
        if (result)
            this.playPlaylist(message, playlistName);
    }

    static async playPlaylist(message, playlistName, index = 0) {
        // Search playlist by name
        let playlist = null;
        let playlistIndex = -1;
        for (var i = 0; i < variables.playlists.length; i++) {
            if (variables.playlists[i].playlistName === playlistName) {
                playlistIndex = i;
                playlist = variables.playlists[i].musics;
            }
        }
        // Is the playlist found ?
        if (playlist === null) {
            message.reply("Playlist " + playlistName + " non trouvée.");
            return;
        }

        // Check if music exists
        if (playlist.length === 0) {
            message.reply("La playlist " + playlistName + " est vide.");
            return;
        } else if (playlist.length <= index) {
            message.reply("La playlist " + playlistName + " ne contient que " + playlist.length + " vidéos.");
            return;
        }

        // Everything OK, save the playlist playing
        variables.playlistReading = playlistName;
        variables.playlistMusicIndex = index;

        // Start the playlist
        await message.member.voice.channel.join().then((connection) => {
            this.musicStopped = false;
            this.runMusic(message, connection, playlist[index].musicLink);

            // Delete the music from the playlist
            variables.playlists[playlistIndex].musics.splice(index, 1);

            message.channel.send("Lecture de la playlist " + playlistName);
        });
    }

    /**
     * Lit une vidéo youtube
     * @param {CommandoMessage} message
     * @param {VoiceConnection} connection
     * @param {String} video
     */
    static async runMusic(message, connection, video) {
        this.dispatcher = connection.play(await ytdl(video, { filter: 'audioonly' }), { type: 'opus' });

        this.dispatcher.on('finish', () => {
            this.searchNextMusic(message, connection, video);
        });
    }

    static searchNextMusic(message, connection, video) {
        console.log("recherche nouvelle musique");
        // If loop replay the music
        if (variables.loop && !this.musicStopped) {
            this.runMusic(message, connection, video);
            return;
        }

        // Is there a playlist playing ?
        let playlistIndex = -1;
        let playlist = null;
        
        for (var i = 0; i < variables.playlists.length; i++) {
            if (variables.playlists[i].playlistName === variables.playlistReading) {
                playlistIndex = i;
                playlist = variables.playlists[i];
            }
        }

        // Playlist playing found
        if (playlist) {
            console.log("playlist en cours = " + playlist.playlistName);

            // Is the playlist empty ?
            if (playlist.musics.length === 0) {
                this.stopMusic(message);
                return;
            }

            let musicIndex = variables.playlistMusicIndex;
            // Is there a next music ? 
            // If no, return to the first music since it's not empty
            if (playlist.musics.length <= musicIndex) {
                musicIndex = 0;
            }

            // Play the music
            console.log("musique suivante = " + playlist.musics[musicIndex].musicName);
            this.runMusic(message, connection, playlist.musics[musicIndex].musicLink);
            variables.playlists[playlistIndex].musics.splice(musicIndex, 1);

            return;
        }

        // It was just a single music, stop here
        this.stopMusic(message);
    }

    static async pauseMusic() {
        if (this.dispatcher !== null)
            this.dispatcher.pause();
    }

    static async resumeMusic() {
        if (this.dispatcher !== null)
            this.dispatcher.resume();
    }

    static async stopMusic(message) {
        if (this.dispatcher !== null) {
            this.musicStopped = true;
            this.dispatcher.end();
            message.member.voice.channel.leave();

            // Reset the playlist variables
            variables.playlistReading = "";
            variables.playlistMusicIndex = 0;
            variables.playingSingleMusic = false;
        }
    }
    
    static async volume(message, volume) {
        if (!(!isNaN(parseFloat(volume)) && isFinite(volume))) {
            message.reply("Veuillez entrer un nombre pour le volume.");
            return;
        } else {
            if (volume < 0 || volume > 200) {
                message.reply("Le volume doit être compris entre 0 et 200%.");
                return;
            }
        }

        if (this.dispatcher) {
            this.dispatcher.setVolume(volume / 100);
            message.channel.send("Volume reglé à " + volume + "% (0 - 200%).");
        } else {
            message.reply("Impossible de régler le volume.");
        }
    }
};
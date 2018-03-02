const Command = require('./command');
const YoutubeStream = require('ytdl-core');

module.exports = class Play extends Command {

    static match(message) {
        return message.content.startsWith('!play ');
    }

    static action(message, queue) {
        if (!this.isPlaying)
            this.isPlaying = false;

        if (!message.member.voiceChannel) {
            message.reply('Il faut être dans un channel vocal !');
            return;
        }

        // stop l'ancienne musique si il y en a une
        if (this.isPlaying) {
            this.stop();
        }

        let args = message.content.split(' ');
        if (args.length === 1) {
            // joue la première musique de la queue
        } else if (args[1] === parseInt(args[1], 10)) {
            // joue la musique à l'index args[1] de la queue, vérifier qu'elle existe
        } else {
            // joue le lien
            this.voiceChannel = message.member.voiceChannel;
            this.voiceChannel.join()
                .then(function (connection) {
                    let stream = YoutubeStream(args[1]);
                    stream.on('error', function () {
                        message.reply("Je n'ai pas réussi à lire la vidéo :/");
                        connection.disconnect();
                    });
                    connection.playStream(stream).on('end', function () {
                        Play.endMusic();
                    });
                    Play.startMusic();
                    Play.resume();
                })
                .catch(console.error)
        }


    }

    static endMusic() {
        console.log("Fin de musique");
        this.isPlaying = false;
    }

    static startMusic() {
        console.log("Debut de musique");
        this.isPlaying = true;
    }

    static pause() {
        if (this.voiceChannel) {
            this.voiceChannel.connection.player.dispatcher.pause();
        }
    }

    static resume() {
        if (this.voiceChannel) {
            this.voiceChannel.connection.player.dispatcher.resume();
        }
    }

    static stop() {
        if (this.voiceChannel) {
            this.voiceChannel.connection.player.dispatcher.end();
        }
    }

    static leave() {
        if (this.voiceChannel)
            this.voiceChannel.leave();
    }
};
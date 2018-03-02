const Command = require('./command');
const YoutubeStream = require('ytdl-core');

module.exports = class Play extends Command {

    static match(message) {
        return message.content.startsWith('!play ');
    }

    static action(message) {
        if (!message.member.voiceChannel) {
            message.reply('Il faut être dans un channel vocal !');
            return;
        }
        let args = message.content.split(' ');
        this.voiceChannel = message.member.voiceChannel;
        this.voiceChannel.join()
            .then(function (connection) {
                let stream = YoutubeStream(args[1]);
                stream.on('error', function () {
                    message.reply("Je n'ai pas réussi à lire la vidéo :/");
                    connection.disconnect();
                });
                connection.playStream(stream).on('end', function () {
                    connection.disconnect();
                });
            })
            .catch(console.error)
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
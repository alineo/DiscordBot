const Command = require('./command');
const YoutubeStream = require('ytdl-core');

module.exports = class Play extends Command {

    static match(message) {
        return (message.content.startsWith('!play') && !message.content.startsWith('!playlist'))
            || message.content.startsWith('!ytplay');
    }

    static action(message, queue, queueYT) {
        if (!this.isPlaying)
            this.isPlaying = false;
        if (!this.interrupt)
            this.interrupt = false;


        if (!message.member.voiceChannel) {
            message.reply('Il faut être dans un channel vocal !');
            return;
        }

        // stop l'ancienne musique si il y en a une
        if (this.isPlaying) {
            console.log("Stopper la musique précédente");
            this.stop();
        }

        let args = message.content.split(' ');
        if (args[0] === "!play" && args.length === 1) {
            // check if the queue is empty
            let list = queue.getList();
            if (!list || list.length === 0) {
                message.reply('La queue est vide, lol.');
                return;
            }
            // start the first music of the queue
            this.voiceChannel = message.member.voiceChannel;
            this.voiceChannel.join()
                .then(function (connection) {
                    // play the music with the index 0
                    Play.playMusic(message, queue, 0, connection);
                })
                .catch(console.error)

        } else if (args[0] === "!play" && !isNaN(parseFloat(args[1])) && isFinite(args[1])) {
            console.log(args[1] + " est un nombre");
            // joue la musique à l'index args[1] de la queue, vérifier qu'elle existe
            let list = queue.getList();
            if (!list || list.length === 0) {
                message.reply('Ma queue est vide, lol.');
                return;
            }

            // the index does not exist
            if (!list || args[1] >list.length || args[1] < 0) {
                message.reply("ma queue n'est pas aussi grosse, désolé :worried: ");
                return;
            }

            this.voiceChannel = message.member.voiceChannel;
            this.voiceChannel.join()
                .then(function (connection) {
                    // play the music with the index 0
                    Play.playMusic(message, queue, args[1], connection);
                })
                .catch(console.error)

        } else if (args[0] === "!play") {
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
        } else {
            if (queueYT === undefined) {
                message.reply("il faut d'abord faire une requête youtube.");
                return;
            }

            if (!(!isNaN(parseFloat(args[1])) && isFinite(args[1]))) {
                message.reply(args[1] + " n'est pas un chiffre...");
                return;
            }

            if (args[1] > 4 || args[1] < 0) {
                message.reply(args[1] + " n'est pas un ciffre valide, choisis entre la vidéo 0 et la vidéo 4");
                return;
            }

            console.log(queueYT[args[1]].title + " est une musique");
            // joue le lien
            this.voiceChannel = message.member.voiceChannel;
            this.voiceChannel.join()
                .then(function (connection) {
                    let stream = YoutubeStream(queueYT[args[1]].link);
                    stream.on('error', function () {
                        message.reply("Je n'ai pas réussi à lire la vidéo :/");
                        connection.disconnect();
                    });
                    message.channel.send("Lancement de **" + queueYT[args[1]].title + "**");
                    connection.playStream(stream).on('end', function () {
                        Play.endMusic();
                    });
                    Play.startMusic();
                    Play.resume();
                })
                .catch(console.error)
        }

        this.interrupt = false;
    }

    static endMusic() {
        console.log("Fin de musique");
        this.isPlaying = false;
    }

    static startMusic() {
        console.log("Debut de musique");
        this.isPlaying = true;
    }

    static playMusic(message, queue, index, connection) {
        let list = queue.getList();

        if (index > list.length) index = 0;

        console.log("musique : " + list[index].link);
        let stream = YoutubeStream(list[index].link);
        Play.startMusic();
        // read error
        stream.on('error', function () {
            message.channel.send("Je n'ai pas réussi à lire la vidéo :cry: ");
            Play.playNext(message, queue, index, connection);
        });

        // read end
        connection.playStream(stream).on('end', function () {
            console.log("fin de la musique");
            Play.endMusic();
            Play.playNext(message, queue, index, connection);
        });
    }

    static playNext(message, queue, index, connection) {
        if (this.interrupt) return;
        if (queue.deleteMusic(index)) {
            console.log("Musique suivante");
            Play.playMusic(message, queue, index, connection);
        } else {
            console.log("Impossible musique suivante");
            message.channel.send("Ma queue est vidée...");
            connection.disconnect();
        }
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
        this.interrupt = true;
        if (this.voiceChannel) {
            this.endMusic();
            this.voiceChannel.connection.player.dispatcher.end();
        }
    }

    static leave() {
        if (this.voiceChannel)
            this.endMusic();
            this.voiceChannel.leave();
    }
};
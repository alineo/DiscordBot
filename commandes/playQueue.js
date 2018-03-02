const Command = require('./command');
const YoutubeStream = require('ytdl-core');

module.exports = class PlayQueue extends Command {

    static match(message) {
        return message.content.startsWith('!pq');
    }

    static playMusic(message, queue, connection) {
        let list = queue.getList();
        console.log("musique : " + list[0]);
        let stream = YoutubeStream(list[0]);

        // read error
        stream.on('error', function () {
            message.channel.send("Je n'ai pas réussi à lire la vidéo :/");
            if (queue.deleteFirst()) {
                console.log("Musique suivante");
                PlayQueue.playMusic(message, queue, connection);
            } else {
                message.channel.send("Je suis vidé.");
                connection.disconnect();
            }
        });

        // read end
        connection.playStream(stream).on('end', function () {
            console.log("fin de la musique");
            if (queue.deleteFirst()) {
                console.log("Musique suivante");
                PlayQueue.playMusic(message, queue, connection);
            } else {
                message.channel.send("Je suis vidé.");
                connection.disconnect();
        }
        });
    }

    static action(message, queue) {
        if (!message.member.voiceChannel) {
            message.reply('Il faut être dans un channel vocal !');
            return;
        }

        let list = queue.getList();
        if (!list || list.length === 0) {
            message.reply('La queue est vide, lol.');
            return;
        }

        let voiceChannel = message.member.voiceChannel.join()
            .then(function (connection) {
                PlayQueue.playMusic(message, queue, connection);
                /*while ((list = queue.getList()).length !== 0) {
                    message.reply("Joue une musique");
                    console.log("musique : " + list[0]);
                    let stream = YoutubeStream(list[0].toString());
                    stream.on('error', function () {
                        message.reply("Je n'ai pas réussi à lire la vidéo :/");
                        //connection.disconnect();
                    });
                    connection.playStream(stream).on('end', function () {
                        //connection.disconnect();
                    });
                    queue.deleteFirst();
                }*/
                //message.reply("Je suis vidé.");
                //connection.disconnect();

            })
            .catch(console.error)
    }
};
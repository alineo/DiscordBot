const Command = require('./command');
let Youtube = require('./youtube');

module.exports = class Playlist extends Command {

    static match(message) {
        return message.content.startsWith('!add');
    }

    static async action(message) {
        // object which contains the playlist of musics and the name of the queue to put them on
        let objectReturn = {
            playlist: null,
            queue: null
        };

        let msg = message.content;
        // get the name of the queue to put the playlist
        let args = msg.split(' ');
        if (args.length === 1) {
            return null;
        } else if (args.length === 2) {
            objectReturn.queue = "origine";
        } else {
            let queueName = "";
            for(let i = 1; i < args.length -1; i++) {
                queueName += args[i] + " ";
            }
            queueName = queueName.trim();
            objectReturn.queue = queueName;
        }

        let youtube = new Youtube();

        console.log(args[args.length-1]);
        // special playlists already stored in the code
        if (args[args.length-1] === 'witcher') {
            message.channel.send("La playlist de 'The Witcher 3' a été ajoutée à la queue.");
            //objectReturn.playlist = await Playlist.parsePlayList("PLgJZQv8L8x5nl1J0gvkIc5EKIaL_eaF0p", youtube); // disparu
            objectReturn.playlist = await Playlist.parsePlayList("PL7kkhpBjx_7noHR3fWCgwQFg_xs3S0Vgf", youtube);
            return objectReturn;
        }else if (args[args.length-1] === 'automata' || args[args.length-1] === 'nier') {
            message.channel.send("La playlist de 'Nier: Automata' a été ajoutée à la queue.");
            //objectReturn.playlist = await Playlist.parsePlayList("PLKW8Zk74zg-Tg-nJmzd35F8csqI6LANN-", youtube); // disparu
            objectReturn.playlist = await Playlist.parsePlayList("PLc_RJ2laVnkAwYhZ7V8t4n4y-U1zd0fOj", youtube);
            return objectReturn;
        }

        let indexList = msg.indexOf("list=");
        if (indexList === -1) {
            return null;
        }

        let list = [];
        if (indexList === -1) {
            let indexV = msg.indexOf("v=");
            if (indexV === -1) {
                return null;
            }
            let id = msg.substring(indexV+2, msg.length);

            let videos = await youtube.parseVideo(id).catch(console.error);

            let link = message.content.substring(message.content.indexOf("https://"), msg.length);
            list.push({
                link:  link,
                title: videos.items[0].snippet.title
            });

            return list;
        } else {
            let listId = msg.substring(indexList+5, msg.length);
            objectReturn.playlist = await Playlist.parsePlayList(listId, youtube);
            return objectReturn;
        }
    }

    static async parsePlayList(idPlaylist, youtube) {
        let list = [];
        let videos = await youtube.parsePlaylist(idPlaylist).catch(console.error);
        console.log('videos: ' + videos.items);

        for (let i = 0; i < videos.items.length; i++) {
            let link = "https://www.youtube.com/watch?v=" + videos.items[i].contentDetails.videoId;
            list.push({
                link: link,
                title: videos.items[i].snippet.title
            });
        }

        return list;
    }

};
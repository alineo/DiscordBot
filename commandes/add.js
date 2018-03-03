const Command = require('./command');
let Youtube = require('./youtube');

module.exports = class Playlist extends Command {

    static match(message) {
        return message.content.startsWith('!add');
    }

    static async action(message) {
        let youtube = new Youtube();

        if (message.content.startsWith('!add witcher')) {
            message.channel.send("La playlist de 'The Witcher 3' a été ajoutée à la queue.");
            return this.parsePlayList("PLgJZQv8L8x5nl1J0gvkIc5EKIaL_eaF0p", youtube);
        }else if (message.content.startsWith('!add automata') || message.content.startsWith('!add nier')) {
            message.channel.send("La playlist de 'Nier: Automata' a été ajoutée à la queue.");
            return this.parsePlayList("PLKW8Zk74zg-Tg-nJmzd35F8csqI6LANN-", youtube);
        }

        let msg = message.content;
        let indexList = msg.indexOf("list=");

        let list = [];
        if (indexList === -1) {
            let indexV = msg.indexOf("v=");
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

            return this.parsePlayList(listId, youtube);
        }
    }

    static async parsePlayList(idPlaylist, youtube) {
        let list = [];
        let videos = await youtube.parsePlaylist(idPlaylist).catch(console.error);

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
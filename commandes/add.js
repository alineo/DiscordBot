const Command = require('./command');
let Youtube = require('./youtube');

module.exports = class Playlist extends Command {

    static match(message) {
        return message.content.startsWith('!add');
    }

    static async action(message) {
        let msg = message.content;
        let indexList = msg.indexOf("list=");
        let youtube = new Youtube();

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

            let videos = await youtube.parsePlaylist(listId).catch(console.error);

            console.log(videos.items.length);
            for (let i = 0; i < videos.items.length; i++) {
                let link = "https://www.youtube.com/watch?v=" + videos.items[i].contentDetails.videoId;
                list.push({
                    link: link,
                    title: videos.items[i].snippet.title
                });
            }

            return list;
        }
    }

};
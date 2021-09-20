const ytdl = require('ytdl-core-discord');

var variables = require('./variables');
var Youtube = require('./youtube');

module.exports = class PlaylistManager {
    static dispatcher = null;
    static musicStopped = false;

    constructor() {

    }

    static async playMusic(message, link) {
        if (link.includes("http")) {
            console.log("lecture de la musique " + link);
            await message.member.voice.channel.join().then((connection) => {
                this.musicStopped = false;
                this.runMusic(message, connection, link);
            });
        } else {
            message.reply("Entre une URL stp");
        }
    }

    static async searchForMusic(message, link) {
        let youtube = new Youtube();
        let music = [];

        let indexV = link.indexOf("v=");
        if (indexV === -1) {
            return false;
        }

        let id = link.substring(indexV + 2, link.length).replace(' ', '');

        try {
            let video = await youtube.parseVideo(id).catch(console.error);
            console.log(video);

            music.push({
                musicName: video.items[0].snippet.title,
                musicLink: link
            });
        } catch (error) {
            message.reply("Musique non trouvée");
        }
        //this.musics = list;

        return music;
    }


    static async searchForPlaylist(idPlaylist) {
        let youtube = new Youtube();

        let list = [];
        let videos = await youtube.parsePlaylist(idPlaylist).catch(console.error);

        for (let i = 0; i < videos.items.length; i++) {
            let link = "https://www.youtube.com/watch?v=" + videos.items[i].contentDetails.videoId;
            list.push({
                musicLink: link,
                musicName: videos.items[i].snippet.title
            });
        }

        return list;
    }
}
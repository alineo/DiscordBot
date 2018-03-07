const Command = require('./command');
const Discord = require('discord.js');
let Youtube = require('./youtube');

module.exports = class Playlist extends Command {

    static match(message) {
        return message.content.startsWith('!yt') && !message.content.startsWith('!ytplay');
    }

    static async action(message) {
        let youtube = new Youtube();
        let msg = message.content;

        let index = msg.indexOf("!yt ");
        let id = msg.substring(index+4, msg.length);

        let videos = await youtube.searchVideo(id).catch(console.error);


        this.list = [];
        for (let i = 0; i < videos.items.length; i++) {
            let link = "https://www.youtube.com/watch?v=" + videos.items[i].id.videoId;
            this.list.push({
                link: link,
                title: videos.items[i].snippet.title
            });
        }

        const embed = new Discord.RichEmbed()
            .setColor(0x993299)

            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        let queue = "";
        let count = 0;
        let sub = "";
        for (let i = 0; i < this.list.length; i++) {
            count++;
            sub += i + " : **[" + this.list[i].title + "](" + this.list[i].link + ")**\n";
        }

        if (count !== 0) {
            embed.addField("Voici le résultat de la requête youtube pour '" + id + "'", sub);
        }

        message.channel.send({embed});
    }

    static getListYoutube() {
        return this.list;
    }
};
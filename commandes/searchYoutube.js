const Command = require('./command');
let Youtube = require('./youtube');
const Discord = require('discord.js');

module.exports = class Playlist extends Command {

    static match(message) {
        return message.content.startsWith('!youtube');
    }

    static async action(message) {
        let youtube = new Youtube();
        let msg = message.content;

        let list = [];
        let index = msg.indexOf("!youtube ");
        let id = msg.substring(index+9, msg.length);

        let videos = await youtube.searchVideo(id).catch(console.error);


        for (let i = 0; i < videos.items.length; i++) {
            list.push({
                link:  videos.items[i].id.videoId,
                title: videos.items[i].snippet.title
            });
        }

        //console.log(list);
        const embed = new Discord.RichEmbed()
            //.setAuthor("Voici le résultat de la requête youtube pour '" + id + "'", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setColor(0x6666ff)

            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        let queue = "";
        let count = 0;
        let sub = "";
        for (let i = 0; i < list.length; i++) {
            count++;
            sub += i + " : " + list[i].title + "\n";
        }
        if (count !== 0) {
            embed.addField("Voici le résultat de la requête youtube pour '" + id + "'", sub);
        }
        message.channel.send({embed});

        return list;
    }
};
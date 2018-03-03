const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Queue extends Command {

    static match(message) {
        return message.content.startsWith('!queue');
    }

    static action(message) {
        const embed = new Discord.RichEmbed()
            .setAuthor("Voici les musiques de la queue", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setColor(0x6666ff)

            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        let queue = "";
        if (!this.list || this.list.length === 0) {
            embed.addField("Ma queue est vidée...", "Ajoutez des musiques");
        } else {
            let count = 0;
            let sub = "";
            for (let i = 0; i < this.list.length; i++) {
                count++;
                sub += i + " : " + this.list[i].title + "\n";

                if (count === 10) {
                    embed.addField("Musiques", sub);
                    count = 0;
                    sub = "";
                }
            }
            if (count !== 0) {
                embed.addField("Musiques", sub);
            }
        }
        message.channel.send({embed});
    }

    static add(music) {
        if (!this.list)
            this.list = [];

        for (let i = 0; i < music.length; i++) {
            this.list.push({
                link: music[i].link,
                title: music[i].title
            });
        }
    }

    static clear() {
        this.list = [];
    }

    static getList() {
        return this.list;
    }

    static deleteFirst() {
        this.list.shift();
        return this.list.length !== 0;
    }

    static deleteMusic(index) {
        console.log("delete music : " + index);
        this.list.splice(index, 1);
        return this.list.length !== 0;
    }

    static printList() {
        let listString = "";
        for (let i = 0; i < this.list.length; i++) {
            listString += i + " : " + this.list[i].title + "\n";
        }
        return listString;
    }
};
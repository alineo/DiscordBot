const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Swear extends Command {

    static match(message) {
        return true;
    }

    static action(message) {
        if (!this.swearingList) {
            this.swearingList = ['putain', 'merde', 'fdp', 'enculé', 'encule', 'enculer', 'pd', 'ntm', 'salope'];
        }

        let words = message.content.toLowerCase().split(' ');
        for(let i = 0; i < words.length; i++) {
            if (this.swearingList.includes(words[i])) {
                const embed = new Discord.RichEmbed()
                    .setAuthor("No Swearing in this server !", 'https://i.imgur.com/j7Yiy7u.jpg')
                    .setTimestamp()
                    .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                    .setImage("https://i.imgur.com/SLPl8m1.jpg");
                message.channel.send({embed});
                return;
            }
        }
    }

};
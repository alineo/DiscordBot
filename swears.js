const Discord = require('discord.js');

var variables = require('./variables.js');

module.exports = class Swears {
    
    static controleMessage(message) {
        let words = message.content.toLowerCase().split(' ');
        for (let i = 0; i < words.length; i++) {
            if (variables.insultes.includes(words[i])) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor("No Swearing in this server !", 'https://i.imgur.com/j7Yiy7u.jpg')
                    .setTimestamp()
                    .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                    .setImage("https://i.imgur.com/SLPl8m1.jpg");
                message.channel.send({ embed });
                return;
            } else if (variables.insultesAlsace.includes(words[i])) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor("No Swearing in this server !", 'https://i.imgur.com/j7Yiy7u.jpg')
                    .setTimestamp()
                    .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                    .setImage("https://i.imgur.com/Vo8TELP.png");
                message.channel.send({ embed });
                return;
            }
        }
    }

};
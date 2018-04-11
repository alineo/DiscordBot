const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Edt extends Command {

    static match(message) {
        return message.content.startsWith('!edt');
    }

    static action(message, bot) {
        let dt = new Date();
        let tdt = new Date(dt.valueOf());
        let dayn = (dt.getDay() + 6) % 7;
        tdt.setDate(tdt.getDate() - dayn + 3);
        let firstThursday = tdt.valueOf();
        tdt.setMonth(0, 1);
        if (tdt.getDay() !== 4)
        {
            tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
        let number = Math.ceil((firstThursday - tdt) / 604800000)+20;

        /*const embed = new Discord.RichEmbed()
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .setColor(0xda5d78);*/

        let args = message.content.split(" ");
        if (args.length === 2) {
            if (!(!isNaN(parseFloat(args[1])) && isFinite(args[1]))) {
                message.reply(args[1] + " n'est pas un chiffre...");
                return;
            } else {
                number += parseInt(args[1]);
            }
        } else if (args.length > 2) {
            message.channel.send("Nombre d'arguments invalide.");
            return;
        }
        let image = "https://www.emploisdutemps.uha.fr/ade/imageEt?identifier=d052bbf1fdb9d9ac5104b7bf8e624bd5&projectId=24&idPianoWeek=" + number + "&idPianoDay=0%2C1%2C2%2C3%2C4%2C5&idTree=760%2C802%2C603%2C527&width=1529&height=852&lunchName=REPAS&displayMode=1057855&showLoad=false&ttl=1523464732672&displayConfId=8";
        message.channel.send(image);
        //message.channel.send(embed);
    }
};
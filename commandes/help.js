const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Help extends Command {

    static match(message) {
        return message.content.startsWith('!help');
    }

    static action(message) {

        let commandes = "!presentation\n";
        commandes += "!dit\n";
        commandes += "!google\n";
        commandes += "!add\n";
        commandes += "\n";
        commandes += "!play\n";
        commandes += "\n";
        commandes += "\n";
        commandes += "!queue\n";
        commandes += "!pause\n";
        commandes += "!resume\n";
        commandes += "!stop\n";
        commandes += "!leave\n";
        commandes += "!pf\n";

        let parametres = "[]\n";
        parametres += "[texte]\n";
        parametres += "[texte]\n";
        parametres += "[playlist]\n";
        parametres += "[musique]\n";
        parametres += "[musique]\n";
        parametres += "[nombre]\n";
        parametres += "[]\n";
        parametres += "[]\n";
        parametres += "[]\n";
        parametres += "[]\n";
        parametres += "[]\n";
        parametres += "[texte]\n";

        let descriptions = "humble présentation\n";
        descriptions += "faire le perroquet\n";
        descriptions += "rechercher ce que vous voulez\n";
        descriptions += "ajouter la playlist à la queue\n";
        descriptions += "ajouter la musique à la queue\n";
        descriptions += "jouer la musique\n";
        descriptions += "jouer les musique de la queue\n";
        descriptions += "jouer la musique 0 de la queue\n";
        descriptions += "voir les musiques de la queue\n";
        descriptions += "mettre la musique en pause\n";
        descriptions += "reprendre la musique en pause\n";
        descriptions += "arrêter de jouer la musique\n";
        descriptions += "quitter le channel vocal\n";
        descriptions += "rechercher sur pathfinder\n";


        const embed = new Discord.RichEmbed()
            .setAuthor("Yay quelqu'un a besoin de mon aide", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setColor(0x00AE86)

            .setTimestamp()

            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")

            .addField("Commande", commandes, true)
            .addField("Paramètre", parametres, true)
            .addField("Description", descriptions, true);

        message.channel.send({embed});
    }
};
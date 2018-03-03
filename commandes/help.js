const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Help extends Command {

    static match(message) {
        return message.content.startsWith('!help');
    }

    static action(message) {
        //let help = "**Yay quelqu'un a besoin de mon aide** :smile:\n";

        //help += "```Voici les commandes que tu peux essayer sur moi :\n";
        let help = "";
        help += "!presentation : pour que je me présente humblement\n";
        help += "!dit [texte] : pour que je fasse le perroquet\n";
        help += "!google [texte] : pour que je recherche ce que vous souhaitez\n";
        help += "!add [playlist] : pour que j'ajoute la playlist à la queue\n";
        help += "!add [musique] : pour que j'ajoute la musique à la queue\n";
        help += "!play [musique] : pour que je joue la musique que vous me passez\n";
        help += "!play [nombre] : pour que je joue la musique de la queue correspondante\n";
        help += "!play : pour que je joue la première musique de la queue\n";
        help += "!queue : pour visualiser les musiques dans la queue\n";
        help += "!pause : pour mettre la musique en pause\n";
        help += "!resume : pour reprendre la musique mise en pause\n";
        help += "!stop : pour arrêter de jouer la/les musique(s)\n";
        help += "!leave : pour que je quitte le channel vocal\n";
        help += "Il y a également quelques easter eggs cachés...";
        //help += "\t\n";

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
        parametres += "[]\n";

        const embed = new Discord.RichEmbed()
            .setAuthor("Yay quelqu'un a besoin de mon aide", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setColor(0x00AE86)
            .setDescription("")
            //.setThumbnail("https://i.imgur.com/mhE25FZ.png")

            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .addField("Commande", commandes, true)
            .addField("Paramètre", parametres, true)
            .addField("Description", descriptions, true);
            /*
             * Inline fields may not display as inline if the thumbnail and/or image is too big.
             */
            //.addField("Inline Field", "They can also be inline.", true)
            /*
             * Blank field, useful to create some space.
             */
            //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);





        message.channel.send({embed});
        //message.channel.send(help);
    }
};
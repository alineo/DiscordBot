const Command = require('./command');

module.exports = class Help extends Command {

    static match(message) {
        return message.content.startsWith('!help');
    }

    static action(message) {
        let help = "**Yay quelqu'un a besoin de mon aide** :smile:\n";

        help += "```Voici les commandes que tu peux essayer sur moi :\n";
        help += "\t\t!presentation :    pour que je me présente humblement\n";
        help += "\t\t!dit [...]:        pour que je fasse le perroquet\n";
        help += "\t\t!google [...] :    pour que je recherche pour vous ce que vous souhaitez\n";
        help += "\t\t!play [...] :      pour que je joue la vidéo que vous me passez\n";
        help += "\t\t!playlist [...] :  pour que j'ajoute la playlist à la queue\n";
        help += "\t\t!queue :           pour visualiser les vidéos dans la queue\n";
        help += "\t\t!pq :              pour jouer les musiques présentes dans la queue\n";
        help += "\t\t!pause :           pour mettre la musique en pause\n";
        help += "\t\t!resume :          pour reprendre la musique mise en pause\n";
        help += "\t\t!stop :            pour arrêter de jouer la/les musique(s)\n";
        help += "\t\t!leave :           pour que le bot quitte le channel vocal\n";
        help += "\t\tIl y a également quelques easter eggs cachés...```";
        //help += "\t\n";

        message.channel.send(help);
    }
};
const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Help extends Command {

    static match(message) {
        return message.content.startsWith('!help') || message.content.startsWith('!?') || message.content.startsWith('!∞?%nick&ta¶mere') || message.content.startsWith('!tasukete');
    }

    static action(message) {
        let msg = message.content;
        let args = message.content.split(' ');

        const embed = new Discord.RichEmbed()
            .setAuthor("Yay quelqu'un a besoin de mon aide :D", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setTimestamp()

            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        if (args.length === 1) {
            let commandes = "!presentation\n";
            commandes += "!dit\n";
            commandes += "!google\n";
            commandes += "!add\n";
            commandes += "\n";
            commandes += "!shuffle\n";
            commandes += "\n";
            commandes += "!play\n";
            commandes += "\n";
            commandes += "\n";
            commandes += "!queue\n";
            commandes += "\n";
            commandes += "!queuelist\n";
            commandes += "!queueadd\n";
            commandes += "!queueremove\n";
            commandes += "!pause\n";
            commandes += "!resume\n";
            commandes += "!volume\n";
            commandes += "!stop\n";
            commandes += "!leave\n";
            commandes += "!pf\n";
            commandes += "!yt\n";
            commandes += "!ytplay\n";
            commandes += "!avatar\n";
            commandes += "\n";
            commandes += "!delete\n";
            commandes += "!git\n";
            commandes += "!edt\n";

            let parametres = "[]\n";
            parametres += "[texte]\n";
            parametres += "[texte]\n";
            parametres += "<[queue]> [playlist]\n";
            parametres += "<[queue]> [musique]\n";
            parametres += "[queue]\n";
            parametres += "[]\n";
            parametres += "[musique]\n";
            parametres += "<[queue]> [nombre]\n";
            parametres += "<[queue]> []\n";
            parametres += "[texte]\n";
            parametres += "[]\n";
            parametres += "[]\n";
            parametres += "[texte]\n";
            parametres += "[texte]\n";
            parametres += "[]\n";
            parametres += "[]\n";
            parametres += "[nombre]\n";
            parametres += "[]\n";
            parametres += "[]\n";
            parametres += "[texte]\n";
            parametres += "[texte]\n";
            parametres += "[chiffre]\n";
            parametres += "[utilisateur]\n";
            parametres += "[]\n";
            parametres += "[nombre]\n";
            parametres += "[]\n";
            parametres += "[nombre]\n";
            parametres += "[]\n";

            let descriptions = "Humble présentation\n";
            descriptions += "Faire le perroquet\n";
            descriptions += "Rechercher ce que vous voulez\n";
            descriptions += "Ajouter la playlist à la queue\n";
            descriptions += "Ajouter la musique à la queue\n";
            descriptions += "Mélanger les musiques\n";
            descriptions += "Mélanger les musiques \n";
            descriptions += "Jouer la musique\n";
            descriptions += "Jouer les musique de la queue\n";
            descriptions += "Jouer la musique 0 de la queue\n";
            descriptions += "Voir les musiques de la queue\n";
            descriptions += "Voir la liste des queues\n";
            descriptions += "Voir la liste des queues\n";
            descriptions += "Créer une queue\n";
            descriptions += "Supprimer une queue\n";
            descriptions += "Mettre la musique en pause\n";
            descriptions += "Reprendre la musique en pause\n";
            descriptions += "Ajuster le volume de Mondrian\n";
            descriptions += "Arrêter de jouer la musique\n";
            descriptions += "Quitter le channel vocal\n";
            descriptions += "Rechercher sur pathfinder\n";
            descriptions += "Rechercher sur youtube\n";
            descriptions += "Lancer musique cherchée par !yt\n";
            descriptions += "Afficher l'avatar de l'utilisateur\n";
            descriptions += "Afficher son avatar\n";
            descriptions += "Supprimer les derniers messages\n";
            descriptions += "Envoyer le git de Sir Mondrian\n";
            descriptions += "Afficher un edt futur\n";
            descriptions += "Afficher l'edt actuel\n";

            embed.setColor(0x00AE86)
                 .addField("Commande", commandes, true)
                 .addField("Paramètre", parametres, true)
                 .addField("Description", descriptions, true)
                 .addBlankField()
                 .addField("Aide complémentaire", "Pour plus de précisions sur une commande, tapez '!help [commandes]' plusieurs commandes peuvent être mises en même temps, séparées par un espace.", false);
        } else {
            args.shift();
            this.searchHelpForArgs(args, embed);
        }
        message.channel.send({embed});
    }

    static searchHelpForArgs(args, embed) {
        embed.setColor(0xffa500);
        let name, description;
        for(let i = 0; i < args.length; i++) {
            name = "";
            description = "";
            let cmd = args[i].toLowerCase();

            if (cmd === "presentation" || cmd === "présentation") {
                name = "!presentation";
                description = "**Description** : Le bot se présente à vous par une phrase d'introduction\n" +
                    "**Syntaxe** : !presentation\n" +
                    "**Exemple** : !presentation";
            }
            else if (cmd === "dit") {
                name = "!dit";
                description = "**Description** : Le bot répète votre phrase\n" +
                    "**Syntaxe** : !dit [texte]\n" +
                    "**Exemple** : !dit bonjour je suis un bot";
            }
            else if (cmd === "google") {
                name = "!google";
                description = "**Description** : Le bot recherche votre phrase sur google et vous renvoie le lien\n" +
                    "**Syntaxe** : !google [texte]\n" +
                    "**Exemple** : !google comment tuer quelqu'un sans laisser de traces";
            }
            else if (cmd === "add") {
                name = "!add";
                description = "**Description** : Le bot ajoute la musique ou la playlist que vous lui passez à la queue précisée ou 'origine' par défaut\n" +
                    "**Syntaxe** : !add [queue] [playlist] ou !add [playlist] ou !add [queue] [musique] ou !add [musique]\n" +
                    "**Exemple** : !add Musique RPG https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }
            else if (cmd === "shuffle") {
                name = "!shuffle";
                description = "**Description** : Le bot mélange les musiques de la queue précisée ou de la première queue par défaut\n" +
                    "**Syntaxe** : !shuffle [queue] ou !shuffle\n" +
                    "**Exemples** : !shuffle Musique RPG";
            }
            else if (cmd === "play") {
                name = "!play";
                description = "**Description** : Le bot joue soit la musique passée, soit la musique correspondant à l'index ou 0 par défaut dans la queue précisée ou la première par défaut\n" +
                    "**Syntaxe** : !play [musique] ou !play [nombre] ou !play [queue] [nombre] ou !play [queue] ou !play\n" +
                    "**Exemples** : !play https://www.youtube.com/watch?v=dQw4w9WgXcQ\n" +
                    "                     !play Musiques RPG 5";
            }
            else if (cmd === "queue") {
                name = "!queue";
                description = "**Description** : Affiche la liste des queues ou affiche les musiques d'une queue si un nom est précisé\n" +
                    "**Syntaxe** : !queue [texte] ou !queue\n" +
                    "**Exemple** : !queue nom de la queue";
            }
            else if (cmd === "queuelist") {
                name = "!queuelist";
                description = "**Description** : Affiche la liste des queues\n" +
                    "**Syntaxe** : !queuelist\n" +
                    "**Exemple** : !queuelist";
            }
            else if (cmd === "queueadd") {
                name = "!queueadd";
                description = "**Description** : Créer une nouvelle queue avec le nom qui suit la commande\n" +
                    "**Syntaxe** : !queueadd [texte]\n" +
                    "**Exemple** : !queueadd Musiques RPG";
            }
            else if (cmd === "queueremove") {
                name = "!queueremove";
                description = "**Description** : Supprimer la queue dont le nom correspond au texte qui suit la commande\n" +
                    "**Syntaxe** : !queueremove [texte]\n" +
                    "**Exemple** : !queueremove Musiques RPG";
            }
            else if (cmd === "pause") {
                name = "!pause";
                description = "**Description** : Le bot met la musique qu'il est en train de jouer, si il y en a une, en pause\n" +
                    "**Syntaxe** : !pause\n" +
                    "**Exemple** : !pause";
            }
            else if (cmd === "resume") {
                name = "!resume";
                description = "**Description** : Le bot continue la musique mise en pause, si il y en a une\n" +
                    "**Syntaxe** : !resume\n" +
                    "**Exemple** : !resume";
            }
            else if (cmd === "volume") {
                name = "!volume";
                description = "**Description** : Ajuster le volume de Sir Mondrian entre 0 et 200%\n" +
                    "**Syntaxe** : !volume [nombre]\n" +
                    "**Exemple** : !volume 87";
            }
            else if (cmd === "stop") {
                name = "!stop";
                description = "**Description** : Le bot arrête de jouer des musiques, impossible de reprendre où il s'est arrêté\n" +
                    "**Syntaxe** : !stop\n" +
                    "**Exemple** : !stop";
            }
            else if (cmd === "leave") {
                name = "!leave";
                description = "**Description** : Le bot quitte le channel vocal, stop la musique en cours si il y en a une\n" +
                    "**Syntaxe** : !leave\n" +
                    "**Exemple** : !leave";
            }
            else if (cmd === "pf") {
                name = "!pf";
                description = "**Description** : Le bot effectue une recherche sur le site pathfinder\n" +
                    "**Syntaxe** : !pf [texte]\n" +
                    "**Exemple** : !pf boule de feu";
            }
            else if (cmd === "yt") {
                name = "!yt";
                description = "**Description** : Le bot effectue une recherche youtube et retourne les 5 meilleurs résultats\n" +
                    "**Syntaxe** : !yt [texte]\n" +
                    "**Exemple** : !yt joueur du grenier";
            }
            else if (cmd === "ytplay") {
                name = "!ytplay";
                description = "**Description** : Le bot lance la musique correspondant à une recherche '!yt' précédemment effectuée\n" +
                    "**Syntaxe** : !ytplay [chiffre]\n" +
                    "**Exemple** : !ytplay 2";
            }
            else if (cmd === "avatar") {
                name = "!avatar";
                description = "**Description** : Affiche son propre avatar ou celui de la personne désignée\n" +
                    "**Syntaxe** : !avatar [utilisateur] ou !avatar\n" +
                    "**Exemple** : !avatar @Sir Mondrian#0896";
            }
            else if (cmd === "delete") {
                name = "!delete";
                description = "**Description** : Supprime les derniers message du channel\n" +
                    "**Syntaxe** : !delete [nombre]\n" +
                    "**Exemple** : !delete 25";
            }
            else if (cmd === "git") {
                name = "!git";
                description = "**Description** : Renvoie le lien du dépôt Git de Sir Mondrian\n" +
                    "**Syntaxe** : !git\n" +
                    "**Exemple** : !git";
            }
            else if (cmd === "edt") {
                name = "!edt";
                description = "**Description** : Afficher l'emploi du temps de cette semaine ou d'une semaine à venir en choississant le nombre de semaine de décalage\n" +
                    "**Syntaxe** : !edt [nombre] ou !edt\n" +
                    "**Exemple** : !edt 1";
            }
            else {
                name = "!" + cmd;
                description = "**Aucune commande correspondante à " + cmd + " n'a pu être trouvée**";
            }

            embed.addField(name, description, false);
            if (i !== args.length - 1) embed.addBlankField();
        }
    }
};
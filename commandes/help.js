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
            .setAuthor("Yay quelqu'un a besoin de mon aide", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setTimestamp()

            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        if (args.length === 1) {
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
            commandes += "!yt\n";
            commandes += "!ytplay\n";

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
            parametres += "[texte]\n";
            parametres += "[texte]\n";
            parametres += "[chiffre]\n";

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
            descriptions += "rechercher sur youtube\n";
            descriptions += "lancer musique cherchée par !yt\n";

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
                description = "**Description** : Le bot ajoute la musique ou la playlist que vous lui passez à sa queue\n" +
                    "**Syntaxe** : !add [playlist] ou !add [musique]\n" +
                    "**Exemple** : !add https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }
            else if (cmd === "play") {
                name = "!play";
                description = "**Description** : Le bot joue soit la musique passée, soit la musique correspondant à l'index dans la queue, soit la queue en commencant par l'index 0\n" +
                    "**Syntaxe** : !play [musique] ou !play [nombre] ou !play\n" +
                    "**Exemple** : !play https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }
            else if (cmd === "queue") {
                name = "!queue";
                description = "**Description** : Le bot vous envoie sa queue avec l'index correspondant à chaque musique\n" +
                    "**Syntaxe** : !queue\n" +
                    "**Exemple** : !queue";
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
            else {
                name = "!" + cmd;
                description = "**Aucune commande correspondante à " + cmd + " n'a pu être trouvée**";
            }

            embed.addField(name, description, false);
            if (i !== args.length - 1) embed.addBlankField();
        }
    }
};
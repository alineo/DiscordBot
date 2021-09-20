const { Command, CommandoMessage } = require("discord.js-commando");
const Discord = require('discord.js');

var variables = require('../../variables.js');
var Youtube = require('../../youtube');

module.exports = class YtSearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            aliases: ['yt', 'ytsearch'],
            group: 'musics',
            memberName: 'youtube',
            description: 'Effectue une recherche youtube',
            args: [
                {
                    key: 'query',
                    prompt: 'entre une recherche youtube',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { query }) {
        let youtube = new Youtube();

        let videos = await youtube.searchVideo(query).catch(console.error);
        
        var list = [];
        for (let i = 0; i < videos.items.length; i++) {
            let link = "https://www.youtube.com/watch?v=" + videos.items[i].id.videoId;
            list.push({
                musicName: videos.items[i].snippet.title,
                musicLink: link
            });
        }
        variables.youtubeSearch = list;

        const embed = new Discord.MessageEmbed()
            .setColor(0x993299)

            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        let result = "";
        if (list.length > 0) {
            let count = 0;
            for (count = 0; count < list.length; count++) {
                result += (count + 1) + " : **[" + list[count].musicName + "](" + list[count].musicLink + ")**\n";
            }
            result += "\nVous pouvez les jouer en utilisant la commande \"/play\" avec le numéro du résultat souhaité.";
        } else {
            result = "Aucun résultat trouvé";
        }
        embed.addField("Voici les résultats de la requête Youtube pour '" + query + "' :", result);

        message.channel.send({ embed });
    }



    static async action(message) {
    }

    static getListYoutube() {
        return this.list;
    }
}
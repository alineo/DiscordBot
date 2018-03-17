const Command = require('./command');

module.exports = class Delete extends Command {

    static match(message) {
        return message.content.startsWith('!delete');
    }

    static async action(message) {
        let args = message.content.split(' ');
        args.shift();

        if (args.length === 1) {
            if (!isNaN(parseFloat(args[0])) && isFinite(args[0])) {
                if (args[0] <= 0 || args[0] > 100) {
                    message.channel.send("Le nombre doit être compris entre 0 et 100.");
                    return;
                }
                const fetchedMessages = await message.channel.fetchMessages({limit: args[0]});
                message.channel.bulkDelete(fetchedMessages)
                    .then(message.channel.send("Suppression de " + fetchedMessages.size + " messages."))
                    .catch(console.error);
            } else {
                message.channel.send(args[0] + "N'est pas un nombre.");
                //let fetchedMessages = await message.channel.search().catch(console.error);
                /*message.channel.search({
                    author: message.author
                }).then(res => {
                    const hit = res.messages[0].find(m => m.hit).content;
                    console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
                }).catch(console.error);*/
            }
        } else {
            message.channel.send("Nombre d'arguments invalide.")
        }
    }

};
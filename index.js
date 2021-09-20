const { CommandoClient } = require('discord.js-commando');
const path = require('path');

var swears = require('./swears');
var config = require('./config');

const client = new CommandoClient({
    commandPrefix: '!',
    owner: '282267568201400320'
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false
    })
    .registerGroup('musics', 'Musique')
    .registerGroup('util', 'Utilitaire')
    .registerGroup('games', 'Jeux')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
    client.user.setActivity(`Jules <3 | !help`, { type: "WATCHING" });
});

client.on('error', (_error) => console.error(_error));

client.login(config.DiscordAPIKey);

// Contrôle des messages envoyés sans commande : insulte, réponse automatique, etc
client.on('message', async function (message) {
    let mots = message.content.trim().split(" ");
    mots[0] = mots[0].toLowerCase();

    swears.controleMessage(message);

    if ((mots[0] === 'ah' || mots[0] === 'ha') && mots.length === 1) {
        message.channel.send('bé');
    }
    if (mots[0] === 'hein' && mots.length === 1) {
        message.channel.send('deux');
    }
    if (mots[0] === 'quoi' && mots.length === 1) {
        message.channel.send('ffeur');
    }
});
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const Google = require('./commandes/google');
const Play = require('./commandes/play');
const Queue = require('./commandes/queue');
const Help = require('./commandes/help');
const Add = require('./commandes/add');
const Pathfinder = require('./commandes/pathfinder');
const SearchYoutube = require('./commandes/searchYoutube');
const MemeList = require('./commandes/memelist');
const Delete = require('./commandes/delete');
const Avatar = require('./commandes/avatar');

bot.on('ready', function () {
    bot.user.setPresence({ game: { name: 'Jules <3 | !help', type: 'WATCHING' }, status: 'online' })/*.then(console.log)*/.catch(console.error);
    //bot.user.setActivity('!help | servir Maitre Jules').catch(console.error);
});

bot.on('message', async function (message) {
    let mots = message.content.split(" ");
    if (mots[0] === '!suce') {
        //message.reply('ma bite'); envoie un message à l'utilisateur concerné
        message.channel.send('ma bite');
    }
    if ((mots[0] === 'ah' || mots[0] === 'ha') && mots.length === 1) {
        message.channel.send('bé');
    }
    if (mots[0] === 'hein' && mots.length === 1) {
        message.channel.send('deux');
    }
    if (mots[0] === 'quoi' && mots.length === 1) {
        message.channel.send('ffeur');
    }

    if (mots[0] === '!dit') {
        if (mots.length > 1) {
            mots.shift();
            message.delete();
            message.channel.send(mots.join(' '), {tts: true});
        }
    }

    if (mots[0] === '!oklol') {
        if (mots.length > 1) {
            mots.shift();
            message.delete();
            message.channel.send(mots.join(' '), {tts: true});
            const fetchedMessages = await message.channel.fetchMessages({limit: 1});
            message.channel.bulkDelete(fetchedMessages)
                .catch(console.error);
        }
    }

    if (mots[0] === '!presentation') {
        message.channel.send("Bonjour, je suis Sir Mondrian, l'esclave de votre seigneur et maître Jules. Je serais votre humble serviteur afin de remplir le moindre de vos désirs.", {tts: true});
    }

    let CommandeUsed = Google.parse(message) || Help.parse(message) ||
                       Pathfinder.parse(message) || SearchYoutube.parse(message) ||
                       MemeList.parse(message) || Delete.parse(message);

    if (Play.match(message)) {
        Play.action(message, Queue, SearchYoutube.getListYoutube());
    }
    else if (Queue.match(message)) {
        Queue.action(message);
    }
    else if (Add.match(message)) {
        let musics = await Add.action(message).catch(console.error);
        Queue.add(message, musics);
    }
    else if (Avatar.match(message)) {
        Avatar.action(message, bot);
    }


    if (mots[0] === '!pause' && mots.length === 1) {
        Play.pause();
    }
    if (mots[0] === '!resume' && mots.length === 1) {
        Play.resume();
    }
    if (mots[0] === '!stop' && mots.length === 1) {
        Play.stop();
    }
    if (mots[0] === '!leave' && mots.length === 1) {
        Play.leave();
    }
    if (mots[0] === '!clear' && mots.length === 1) {
        Queue.clear();
        message.channel.send("La queue est vidée.");
    }

    if (mots[0] === '!parle' && mots.length === 1) {
        fs.readFile('test.txt', 'utf8', function(err, contents) {
            console.log(contents);
        });
        console.log('after calling readFile');
    }
});

bot.login('NDI0NTQwODcyODY1MjE4NTYw.DY6YAw.mZ0g3lu75yVThAyEkf6WgueigJY');
const KEY_BOT = require('./variables').KEY_BOT;

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
const Edt = require('./commandes/edt');
const Swear = require('./commandes/swear');

bot.on('ready', function () {
    bot.user.setPresence({ game: { name: 'Jules <3 | !help', type: 'WATCHING' }, status: 'online' })/*.then(console.log)*/.catch(console.error);
    console.log("Sir Mondrian prêt");
});


bot.on('message', async function (message) {
    let mots = message.content.split(" ");
    mots[0] = mots[0].toLowerCase();

    Swear.parse(message);

    if (mots[0] === '!git') {
        message.channel.send('https://github.com/alineo/Sir-Mondrian');
    }
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
            message.delete();
            if (mots.length === 2 && (!isNaN(parseFloat(mots[1])) && isFinite(mots[1]))) {
                console.log(mots[1]);
                if (mots[1] === "23")
                    message.channel.send("Est-ce que je vous ai déjà raconté la fois où j'ai eu un coup de soleil ?", {tts: true});
                else {
                    mots.shift();
                    message.channel.send(mots.join(' '), {tts: true});
                }
            } else {
                mots.shift();
                message.channel.send(mots.join(' '), {tts: true});
            }
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
                       MemeList.parse(message) || Delete.parse(message) ||
                       Queue.parse(message) || Edt.parse(message);

    if (Play.match(message)) {
        Play.action(message, Queue, SearchYoutube.getListYoutube());
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

    else if (mots[0] === '!resume' && mots.length === 1) {
        Play.resume();
    }

    else if (mots[0] === '!stop' && mots.length === 1) {
        Play.stop();
    }

    else if (mots[0] === '!volume') {
        if (mots.length === 2)
            Play.volume(message, mots[1]);
        else
            message.channel.send("Veuillez entrez un nombre pour le volume. (exemple : !volume 87)");
    }

    else if (mots[0] === '!leave' && mots.length === 1) {
        Play.leave();
    }

    else if (mots[0] === '!clear' && mots.length >= 2) {
        mots.shift();
        if (Queue.clear(mots.join(' ')))
            message.channel.send("La queue " + mots.join(' ') + " est vidée.");
        else
            message.channel.send("Impossible de vider la queue " + mots.join(' ') + ".");

    }
    else if (mots[0] === "!shuffle") {
        mots.shift();
        Queue.shuffle(message, mots.join(' '));
    }
});

bot.login(KEY_BOT);
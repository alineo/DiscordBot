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


bot.on('ready', function () {
    bot.user.setActivity('!help | servir Maitre Jules').catch(console.error);
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
            message.channel.send(mots.join(' '));
        }
    }

    if (mots[0] === '!presentation') {
        message.channel.send("Bonjour, je suis l'esclave de votre seigneur et maître Jules. Je serais votre humble serviteur afin de remplir le moindre de vos désirs.");
    }

    let CommandeUsed = Google.parse(message) || Help.parse(message) || Pathfinder.parse(message) || SearchYoutube.parse(message) || MemeList.parse(message);

    if (Play.match(message)) {
        Play.action(message, Queue, SearchYoutube.getListYoutube());
    }

    if (Queue.match(message)) {
        Queue.action(message);
    } else if (Add.match(message)) {
        let musics = await Add.action(message).catch(console.error);
        Queue.add(message, musics);
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

    if (mots[0] === '!parle' && mots.length === 1) {
        fs.readFile('test.txt', 'utf8', function(err, contents) {
            console.log(contents);
        });
        console.log('after calling readFile');
    }
});

bot.login('NDE3MDcwNjg0OTY0MTI2NzIw.DXa_Qg.ADQmg0TLeW3OC_q-OyHnjPt6hdw');
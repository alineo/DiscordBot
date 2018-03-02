const Discord = require('discord.js');
const bot = new Discord.Client();
const Google = require('./commandes/google');
const Play = require('./commandes/play');
const Playlist = require('./commandes/playlist');
const Queue = require('./commandes/queue');
const PlayQueue = require('./commandes/playQueue');
const Help = require('./commandes/help');
const fs = require('fs');

bot.on('ready', function () {
    bot.user.setActivity('cirer les chaussures de mon Maitre Jules').catch(console.error);
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
        mots.shift();
        message.channel.send(mots.join(' '));
    }

    if (mots[0] === '!presentation') {
        message.channel.send("Bonjour, je suis l'esclave de votre seigneur et maître Jules. Je serais votre humble serviteur afin de remplir le moindre de vos désirs.");
    }

    let CommandeUsed = Google.parse(message) || Play.parse(message) || Help.parse(message);

    if (Playlist.match(message)) {
        let musics = await Playlist.action(message).catch(console.error);
        let listMusics = [];
        for (let i = 0; i < musics.length; i++) {
            listMusics.push(musics[i].contentDetails.videoId);
        }
        Queue.addList(listMusics);
        console.log(Queue.printList());
        console.log(listMusics.length);
        console.log(listMusics[0]);

    } else if (Queue.match(message)) {
        let queueList = Queue.action(message);
        if (queueList.length > 2000) {
            let length = Math.floor(queueList.length/2000);
            for(let i = 0; i <= length; i++) {
                let sub;
                if (i !== length) sub = queueList.substring(2000*i,2000*(i+1));
                else sub = queueList.substring(2000*i, queueList.length);
                message.channel.send(sub);
            }
        }
    } else if (PlayQueue.match(message)) {
        PlayQueue.action(message, Queue);
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
const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Queue extends Command {

    static match(message) {
        return message.content.startsWith('!queue');
    }

    static action(message) {
        let msg = message.content;
        let args = msg.split(' ');
        const embed = new Discord.RichEmbed()
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed");

        // liste les queues existantes
        if (msg === "!queuelist" || msg === "!queue") {
            embed.setColor(0x6666ff);

            if (!this.queues || this.queues.length === 0) {
                embed.setAuthor("Il n'existe aucune queue pour l'instant", 'https://i.imgur.com/j7Yiy7u.jpg')
                    .addField("Veuillez créer une queue", "Pour avoir de l'aide sur la création de queue, consultez '!help add' ou '!help queue'.");
            } else {
                let count = 0;
                let sub = "";
                for (let i = 0; i < this.queues.length; i++) {
                    count++;
                    sub += "- " + this.queues[i].name + "\n";

                    if (count === 10) {
                        embed.addField("Queues", sub);
                        count = 0;
                        sub = "";
                    }
                }
                if (count !== 0) {
                    embed.addField("Queues", sub);
                }
            }
            message.channel.send({embed});
            return;
        // créer une nouvelle queue
        } else if (message.content.startsWith("!queueadd ")) {
            let indexV = msg.indexOf("!queueadd ");
            let queueName = msg.substring(indexV+10, msg.length);

            let queue = this.findQueue(queueName);
            if (queue == null) {
                this.createQueue(queueName);
                message.channel.send("Création de la queue '" + queueName + "'.");
            } else {
                message.channel.send("La queue '" + queueName + "' existe déjà.");
            }
            return;
        } else if (message.content.startsWith("!queueremove ")) {
            let indexV = msg.indexOf("!queueadd ");
            let queueName = msg.substring(indexV+14, msg.length);

            if (Queue.removeQueue(queueName)) {
                message.channel.send("La queue '" + queueName + "' a été supprimée.");
            } else {
                message.channel.send("La queue '" + queueName + "' n'existe pas ou n'a pas pu être supprimée.");
            }
            return;
        // lister les musiques d'une queue ou de la première queue
        } else if (message.content.startsWith("!queue ")) {
            let queueName;
            // there is no queue
            if (!this.queues || this.queues.length === 0) {
                embed.setAuthor("Il n'existe aucune queue pour l'instant", 'https://i.imgur.com/j7Yiy7u.jpg')
                    .setColor(0x6666ff)
                    .addField("Veuillez créer une queue", "Pour avoir de l'aide sur la création de queue, consultez '!help add' ou '!help queue'.");
            } else {
                // there is at least one queue
                if (args.length === 1) {
                    queueName = this.queues[0].name;
                } else {
                    let indexV = msg.indexOf("!queue ");
                    queueName = msg.substring(indexV+7, msg.length);
                }

                embed.setAuthor("Voici les musiques de la queue " + queueName, 'https://i.imgur.com/j7Yiy7u.jpg')
                    .setColor(0x6666ff);
                Queue.addMusicsToEmbed(queueName, embed);
            }
        } else {
            message.channel.send("Commande invalide, consultez l'aide de la commande que vous souhaitez effectuer.");
            return;
        }
        message.channel.send({embed});
    }

    static add(message, music) {
        if (music === null || music.queue === null || music.playlist === null) {
            message.channel.send("Impossible d'ajouter la playlist à la queue.");
            return;
        }
        Queue.addWithName(message, music.queue, music.playlist);
    }

    static addWithName(message, queueName, music) {
        if (music === undefined) {
            message.channel.send("Impossible d'ajouter la playlist à la queue.");
            return;
        }

        let queue = this.findQueue(queueName);
        if (queue == null) {
            queue = this.createQueue(queueName);
            message.channel.send("Création de la queue '" + queueName + "'.");
        }

        for (let i = 0; i < music.length; i++) {
            queue.musics.push({
                link: music[i].link,
                title: music[i].title
            });
        }
    }

    static findQueue(queueName) {
        if (!this.queues) {
            this.queues = [];
        }
        for (let i = 0; i < this.queues.length; i++) {
            if (this.queues[i].name === queueName) return this.queues[i];
        }
        return null;
    }

    static createQueue(queueName) {
        this.queues.push({
            name: queueName,
            musics: []
        });
        return Queue.findQueue(queueName);
    }

    static removeQueue(queueName) {
        if (!this.queues) {
            return false;
        }
        for (let i = 0; i < this.queues.length; i++) {
            if (this.queues[i].name === queueName) {
                this.queues.splice(i, i+1);
                return true;
            }
        }
        return false;
    }

    static clear(queueName) {
        let queue = Queue.findQueue(queueName);
        if (queue !== null) {
            queue.musics = [];
            return true;
        }
        return false;
    }

    static getList() {
        if (!this.queues) return null;
        if (this.mainList) return this.mainList;
        return this.queues[0].musics;
    }

    static getListName(queueName) {
        if (queueName === "") return this.queues[0].musics;
        let queue = Queue.findQueue(queueName);
        return queue !== null ? queue.musics : null;
    }

    static setMainList(list) {
        this.mainList = list;
    }

    static getQueues() {
        return this.queues;
    }

    static deleteFirst() {
        this.queues[0].musics.shift();
        return this.queues[0].musics.length !== 0;
    }

    static deleteMusic(index) {
        console.log("delete music : " + index);
        this.queues[0].musics.splice(index, 1);
        return this.queues[0].musics.length !== 0;
    }

    static addMusicsToEmbed(queueName, embed) {
        let queue = Queue.findQueue(queueName);
        if (queue === null) {
            embed.addField("Queue introuvable", "La queue " + queueName + " n'existe pas.");
            return;
        }
        if (queue.musics.length === 0) {
            embed.addField("La queue "+ queueName +" est vidée...", "Ajoutez des musiques");
            return;
        }

        let count = 0;
        let sub = "";
        for (let i = 0; i < queue.musics.length; i++) {
            count++;
            sub += i + " : " + queue.musics[i].title + "\n";

            if (count === 10) {
                embed.addField("Musiques", sub);
                count = 0;
                sub = "";
            }
        }
        if (count !== 0) {
            embed.addField("Musiques", sub);
        }
    }
};
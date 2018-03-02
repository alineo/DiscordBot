const Command = require('./command');

module.exports = class Queue extends Command {

    static match(message) {
        return message.content.startsWith('!queue');
    }

    static action(message) {
        return "Voici la queue :\n\n" + this.printList();
    }

    static addList(list) {
        this.list = [];
        for(let i = 0; i < list.length; i++) {
            this.list.push("https://www.youtube.com/watch?v=" + list[i]);
        }
    }

    static getList() {
        return this.list;
    }

    static deleteFirst() {
        this.list.shift();
        return this.list.length !== 0;
    }

    static printList() {
        let listString = "";
        for (let i = 0; i < this.list.length; i++) {
            listString += this.list[i] + "\n";
        }
        return listString;
    }
};
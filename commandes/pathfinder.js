const Command = require('./command');

module.exports = class Google extends Command {

    static match(message) {
        return message.content.startsWith('!pf');
    }

    static action(message) {
        let msg = message.content;
        let index = msg.indexOf("!pf ");
        let code = encodeURI(msg.substring(index+4, msg.length));
        code = code.replace('\'','');

        //console.log();
        message.channel.send("http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG."+ code +".ashx");
    }

};
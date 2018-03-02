const Command = require('./command');
let Youtube = require('./youtube');

module.exports = class Playlist extends Command {

    static match(message) {
        return message.content.startsWith('!playlist');
    }

    static async action(message) {
        let playlist1 = new Youtube();
        let listId = message.content.substring(message.content.indexOf('list=')+5, message.content.length);

        let videos = await playlist1.parsePlaylist(listId).catch(console.error);
        //console.log("length : " + videos.items.length);
        return videos.items;
    }

};
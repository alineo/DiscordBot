const Command = require('./command');
const Discord = require('discord.js');
const https = require('https');
const YOUR_API_KEY = 'AIzaSyCcTEJGefo5XpuJBNacIsqLMSHAQcMw8c8';

module.exports = class Memelist extends Command {

    static match(message) {
        return message.content.startsWith('!memelist');
    }

    static action(message) {
        message.channel.send("In progress...");

        //Memelist.parseMeme();
        /*const embed = new Discord.RichEmbed()
            .setAuthor("Yay quelqu'un a besoin de mon aide", 'https://i.imgur.com/j7Yiy7u.jpg')

            .setColor(0x00AE86)

            .setTimestamp()

            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")

            .addField("Commande", commandes, true)
            .addField("Paramètre", parametres, true)
            .addField("Description", descriptions, true);

        message.channel.send({embed});*/
    }


    /**
     * Builds a query string for making youtube API call
     *
     * @param {any} url
     * @param {any} params
     * @returns queryString
     */
    static buildQueryString(url, params) {
        let queryString = url + '?';

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                queryString += key + '=' + params[key] + '&';
                queryString += (key === 'key') ? '' : '&';
            }
        }

        return queryString;
    }

    /**
     * Makes a get request to url
     *
     * @param {any} apiUrl
     * @returns a promise
     */
    static getRequest(apiUrl) {
        let parsed;
        return new Promise((resolve, reject) => {
            https.get(apiUrl, function(res) {
                let body = ''; // Will contain the final response
                // Received data is a buffer.
                // Adding it to our body
                res.on('data', function(data) {
                    body += data;

                });
                // After the response is completed, parse it and log it to the console
                res.on('end', function() {
                    parsed = JSON.parse(body);
                    resolve(parsed);
                });
            })
            // If any error has occured, log error to console
                .on('error', function(e) {
                    reject(e.message);
                    console.log('Got error: ' + e.message);
                });
        });

    }


    /**
     * Finds number of videos & videos
     * information in the playlist
     *
     * @param {any} id
     * @param {any} [pageToken=null]
     * @returns onject containing playlist information
     */
    static async parseMeme(pageToken = null) {
        let result; //contains list of all vidos in playlist

        let apiUrl = 'https://memegen.link/api/templates';

        let queryString = buildQueryString(apiUrl);
        console.log(queryString);

        let numOfReq = 1;

        let x = await new Promise((resolve, reject) => {
            getRequest(queryString).then((res) => {
                if (numOfReq > 1) {

                    for (let myKey in res.items) {
                        if (res.items.hasOwnProperty(myKey)) {
                            result.items.push(res.items[myKey]);
                        }
                    }
                    numOfReq = numOfReq + 1;

                } else {
                    result = res;
                    resolve(result);
                }
                //till all videos are retrived
                if (res.hasOwnProperty('nextPageToken')) {
                    parseMeme(res.nextPageToken);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
        return x;
    }
};
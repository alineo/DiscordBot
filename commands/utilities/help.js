const { stripIndents, oneLine } = require('common-tags');
const { Command } = require("discord.js-commando");
const { disambiguation } = require('discord.js-commando/src/util');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'util',
            memberName: 'help',
            aliases: ['commands', 'aide', 'commandes'],
            description: 'Affiche la liste des commandes disponible, ou des informations spécifiques sur une commande.',
            details: oneLine`
                La commande peut être sur un nom de commande ou sur un groupe de commandes.
                Si ce n'est pas spécifié, tous les commandes disponibles seront affichées.
			`,
            examples: ['help', 'help prefix'],
            guarded: true,

            args: [
                {
                    key: 'commande',
                    prompt: 'Pour quelle commande veux-tu de l\'aide ?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) { // eslint-disable-line complexity
        const groups = this.client.registry.groups;
        const commands = this.client.registry.findCommands(args.command, false, msg);
        const showAll = args.command && args.command.toLowerCase() === 'all';
        if (args.command && !showAll) {
            if (commands.length === 1) {
                let help = stripIndents`
					${oneLine`
						__Commande **${commands[0].name}**:__ ${commands[0].description}
						${commands[0].guildOnly ? ' (Usable only in servers)' : ''}
						${commands[0].nsfw ? ' (NSFW)' : ''}
					`}

					**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
				`;
                if (commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(', ')}`;
                help += `\n${oneLine`
					**Groupe:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;
                if (commands[0].details) help += `\n**Details:** ${commands[0].details}`;
                if (commands[0].examples) help += `\n**Exemples:**\n${commands[0].examples.join('\n')}`;

                const messages = [];
                try {
                    messages.push(await msg.direct(help));
                    if (msg.channel.type !== 'dm') messages.push(await msg.reply('Message privé envoyé avec les informations.'));
                } catch (err) {
                    messages.push(await msg.reply('Impossible d\'envoyer de l\'aide en message privé. Vous avez probablement les messages privés désactivés.'));
                }
                return messages;
            } else if (commands.length > 15) {
                return msg.reply('Plusieurs commandes trouvées, sois plus précis.');
            } else if (commands.length > 1) {
                return msg.reply(disambiguation(commands, 'commands'));
            } else {
                return msg.reply(
                    `Aucune commande trouvée. Utilise ${msg.usage(
                        null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
                    )} pour voir la liste de toutes les commandes.`
                );
            }
        } else {
            const messages = [];
            try {
                messages.push(await msg.direct(stripIndents`
					${oneLine`
						Pour lancer une commande dans ${msg.guild ? msg.guild.name : 'any server'},
						utilise ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
						Par exemple, ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
					`}
					Pour lancer une commande dans ce message privés, utilise ${Command.usage('command', null, null)} sans préfixe.

					Utilise ${this.usage('<command>', null, null)} Pour voir le détail de la commande spécifiée.
					Utilise ${this.usage('all', null, null)} pour voir la liste de *toutes* les commandes, pas seulement celles disponible.

					__**${showAll ? 'All commands' : `Commandes disponible dans ${msg.guild || 'ce message privé'}`}**__

					${groups.filter(grp => grp.commands.some(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg))))
                        .map(grp => stripIndents`
							__${grp.name}__
							${grp.commands.filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg)))
                                .map(cmd => `**${cmd.name}:** ${cmd.description}${cmd.nsfw ? ' (NSFW)' : ''}`).join('\n')
                            }
						`).join('\n\n')
                    }
				`, { split: true }));
                if (msg.channel.type !== 'dm') messages.push(await msg.reply('Message privé envoyé avec les informations.'));
            } catch (err) {
                messages.push(await msg.reply('Impossible d\'envoyer de l\'aide en message privé. Vous avez probablement les messages privés désactivés.'));
            }
            return messages;
        }
    }
};


const Discord = require("discord.js")
module.exports = {
    name: "help",
    aliases: ["h", "cmd", "command"],
    Description: "\`, h, cmd, command\` : information.",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Ez4-NonStop🇰🇭', 'https://i.imgur.com/YEqpIbl.png')
            .setTitle('Commands   Prefix : " Ez4! "," ? " ')
            .setDescription(client.commands.map(cmd => `\`?${cmd.name}\` ${cmd.Description}
**-------**`))
            .setTimestamp()
            .addField('You can also use Prefix : \`Ez4!\`', '\`Ex:\` Ez4!play songname', true)
            .setColor("RANDOM")
            .setFooter('Created by LavaR | Powered by Ez4-Team.', 'https://i.imgur.com/YEqpIbl.png')
        message.channel.send(embed)
    }
}

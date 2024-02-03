const createEmbed_1 = require("../botconfig/createEmbed.js")
const Discord = require("discord.js")
module.exports = {
    name: "invite",
  aliases: ["invite"],
    Description: " : Click [here](https://discord.com/api/oauth2/authorize?client_id=873606446191874059&permissions=36752704&scope=bot) to invite.",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Ez4-NonStop🇰🇭', 'https://i.imgur.com/YEqpIbl.png')
            .setTitle('*ខ្មែរ ស្រឡាញ់ ខ្មែរ <3*🇰🇭')
            .addField("----------------------","Click [here](https://discord.com/api/oauth2/authorize?client_id=873606446191874059&permissions=36752704&scope=bot) to invite.")
            .setTimestamp()
            .setDescription("*We love Cambodia*")
            .setColor("RANDOM")
            .setThumbnail('https://i.imgur.com/YEqpIbl.png')
            .setFooter('Created by LavaR | Powered by Ez4-Team.', 'https://i.imgur.com/YEqpIbl.png')
        message.channel.send(embed)
    }}

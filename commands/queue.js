const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "queue",
    aliases: ["q"],
    Description: "\`, q\`  : to show playlist.",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | There is nothing playing!`))
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.queue} | **Play list**\n${q}`))
    }
}

const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "filter",
    aliases: ["filters","fl"],
    inVoiceChannel: true,
    Description: ": clear, bassboost, 8D, vaporwave, nightcore, phaser, tremolo,vibrato, reverse, treble, normalizer, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand.",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | There is nothing in the queue right now!`))
        if (args[0] === "off" && queue.filter) client.distube.setFilter(message, queue.filter)
        else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
        else if (args[0]) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | Not a valid filter`))
        message.channel.send(createEmbed_1.createEmbed("info",`Current Queue Filter: \`${queue.filter || "Off"}\``))
    }
}

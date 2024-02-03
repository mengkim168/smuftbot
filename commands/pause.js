const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    Description: "\`, hold\` : to pause the song.",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | There is nothing in the queue right now!`))
        if (queue.pause) {
            client.distube.resume(message)
            return message.channel.send(createEmbed_1.createEmbed("info","Resumed the song for you :)"))
          message.delete({ timeout: 1000 })
        }
        client.distube.pause(message)
        message.channel.send(createEmbed_1.createEmbed("info","Paused the song for you :)"))
      
    }
        
}

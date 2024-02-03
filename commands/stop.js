const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave","stop","s"],
    inVoiceChannel: true,
    Description: "\`, disconnect, leave, stop, s\` : to stop playing.",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | There is nothing in the queue right now!`))
        client.distube.stop(message)
        message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.success} | **Stopped!**`)) 
      .then(m => m.delete({ timeout : 5000})) 
          message.delete({ timeout: 6000 })
    }
}

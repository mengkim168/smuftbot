const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    Description: "\`, v, set, set-volume\` : set volume.",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | There is nothing in the queue right now!`))
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | Please enter a valid number!`))
        client.distube.setVolume(message, volume)
        message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.success} |** Volume set to \`${volume}\`**`)
        
      )
       .then(m => m.delete({ timeout : 5000})) 
          message.delete({ timeout: 6000 })
    }
}

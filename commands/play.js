const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "play",
    aliases: ["p", "play"],
    inVoiceChannel: true,
    sameVoiceChannel: true,
    Description: "\`, p\` : to play the song.",
    run: async (client, message, args) => {
        const string = args.join(" ")
        if (!string) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | Please enter a song url or query to search.`))
        try {
            client.distube.play(message, string)
          message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.success} | **Searching** `))                                        
          .then(m => m.delete({ timeout : 4000})) 
          message.delete({ timeout: 5000 })  
         
        
        } catch (e) 
        {
            message.channel.send(`${client.emotes.error}`)
          
        }
    }
}

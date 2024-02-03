const createEmbed_1 = require("../botconfig/createEmbed.js")
module.exports = {
    name: "skip",
  aliases: ["n","skip"],
    inVoiceChannel: true,
    Description: "\`, n, skip\` : to skip the song.",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.error} | There is nothing in the queue right now!`))
        try {
            client.distube.skip(message)
            
           message.channel.send(createEmbed_1.createEmbed("info",`${client.emotes.success} | **Skipped!** `))                                        
          .then(m => m.delete({ timeout : 5000})) 
          message.delete({ timeout: 6000 })                                       
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
                           
                                
        }
    }

}
    function delay(ms){
    return new Promise(r => setTimeout(r,ms))
  }
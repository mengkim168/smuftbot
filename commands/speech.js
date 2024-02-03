
const Discord = require("discord.js")
const discordTTS = require('discord-tts');
module.exports = {
    name: "speech",
    aliases: ["say"],
      inVoiceChannel: true,
    sameVoiceChannel: true,
    run: async (client, message, args)=> {
        if (!args[0]) return message.reply('oy yey yang mex?')
        const string = args.join(' ');
      if (string.length > 100) return message.channel.send('Yey jrern pek na yey tam os ;)');
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.reply('jo hah neak :)');      
      try{
        voiceChannel.join().then(connection => {
          const strings = args.join(" ")
          const broadcast = client.voice.createBroadcast();
          broadcast.play(discordTTS.getVoiceStream(`:${args.join(" ")}`));
          const dispatcher =  connection.play(broadcast);
          dispatcher.on('finish', () => {
            voiceChannel.leave();
            
          })
        })
      }
      catch(e) {
        message.channel.send('wrong text!');
        console.error(e);
      }      
    }
}

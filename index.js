require("http").createServer((req, res) => res.end("Bot online!")).listen(process.env.PORT || 8080)
const Distube = require("distube");
const Discord = require('discord.js')
const token = process.env['TOKEN']
const client = new Discord.Client({
 // token: process.env['TOKEN'],
prefix: "$getServerVar[prefix]",
  restTimeOffset: 0,
 /* presence: {
    status: "idle",
    
    activity: {
      name: "?P or Ez4!P",
      type: "STREAMING",
      url: "https://twitch.tv/ninja",
    }
  }*/
});
const fs = require("fs")
const createEmbed_1 = require("./botconfig/createEmbed.js")
const config = require('./config.json');


client.config = require("./config.json")
client.emotes = config.emoji
//client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })

client.distube = new Distube(client, {
    searchSongs: 0,
    searchResultCount: 0,
    emitNewSongOnly: true,
    highWaterMark: 1024*1024*64,
    savePreviousSongs: false,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: true,
    //emptyCooldown: 60,
    // youtubeCookie --> prevents ERRORCODE: "429"
    youtubeDL: true,
    updateYouTubeDL: true,
    //customFilters: {"subboost": "asubboost"}
    customFilters: {
        "clear": "dynaudnorm=f=200",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "8D": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "tremolo": "tremolo",
        "vibrato": "vibrato=f=6.5",
        "reverse": "areverse",
        "treble": "treble=g=5",
        "normalizer": "dynaudnorm=f=200",
        "surrounding": "surround",
        "pulsator": "apulsator=hz=1",
        "subboost": "asubboost",
        "karaoke": "stereotools=mlev=0.03",
        "flanger": "flanger",
        "gate": "agate",
        "haas": "haas",
        "mcompand": "mcompand"
        }
});

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on('ready', () => {
    console.log(`${client.user.tag} Now Online and ready to use!`);
  const arrayOfStatus = [
    `music on ${client.guilds.cache.size} servers`,
    `use Ez4!help or ?help : for help`,
    `music on ${client.channels.cache.size} channels`,
    `with ${client.guilds.cache.reduce((a,b) => a + b.memberCount, 0)} users`,
];
let index = 0;
setInterval(() => {
    if(index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index]; 
   // console.log(status);
    
    client.user.setActivity(status, { type: "STREAMING",url: "https://twitch.tv/ninja",}).catch(console.error)
    index++;
    }, 30000);
    client.user.setStatus('STREAMING');
});

client.on("message", async message => {
    const prefix = config.prefix1
   
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    
    const command = args.shift().toLowerCase()
    if (!command) return
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    
    if (!cmd) return message.channel.send("")
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(createEmbed_1.createEmbed("warn", `${client.emotes.error} | Sorry, but you need to be in a voice channel to do that!`))
    //var _a, _b, _c, _d, _e, _f, _g;
        if (!((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.voice.channel))
            return cmd.run(client, message, args)
        const botVoiceChannel = (_e = (_d = (_c = message.guild.queue) === null || _c === void 0 ? void 0 : _c.voiceChannel) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : message.guild.me.voice.channel.id;
        if (((_g = (_f = message.member) === null || _f === void 0 ? void 0 : _f.voice.channel) === null || _g === void 0 ? void 0 : _g.id) !== botVoiceChannel) {
            return message.channel.send(createEmbed_1.createEmbed("warn", "You need to be in the same voice channel as mine"));}
  // if (!cmd.channelID) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    try {
        cmd.run(client, message, args)
    }
  catch (e) {
        console.error(e)
        message.reply()
    }
}); 
  client.on("message", async message => {
    const prefix = config.prefix2
   
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    
    const command = args.shift().toLowerCase()
    if (!command) return
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    
    if (!cmd) return message.channel.send("")
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send("info",`${client.emotes.error} | You must be in a voice channel!`)
    //var _a, _b, _c, _d, _e, _f, _g;
        if (!((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.voice.channel))
            return cmd.run(client, message, args)
        const botVoiceChannel = (_e = (_d = (_c = message.guild.queue) === null || _c === void 0 ? void 0 : _c.voiceChannel) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : message.guild.me.voice.channel.id;
        if (((_g = (_f = message.member) === null || _f === void 0 ? void 0 : _f.voice.channel) === null || _g === void 0 ? void 0 : _g.id) !== botVoiceChannel) {
            return message.channel.send(createEmbed_1.createEmbed("warn", "You need to be in the same voice channel as mine"))
          ;}
  // if (!cmd.channelID) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    try {
        cmd.run(client, message, args)
    }
  catch (e) {
        console.error(e)
        message.reply()
    }
});
/*/commander
client.on("message", (message) => {
  
   if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
 
  const command = args.shift().toLowerCase();
  
    
  
    if(command == "ping") {  message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);}
  
  
        if (command == "p")
          distube.play(message, args.join(" "));
        
        if (command == "s") {
          distube.stop(message);
          message.channel.send(`**Stopped the music!** 
          > If you want me to rejoin, type ?play.`);
        }
        if (command == "n") {
          distube.skip(message);
          message.channel.send(`**The music is SKIPPED!** 
          `);
        }
        if (command == "queue") {
          let queue = distube.getQueue(message);
          message.channel.send(`**Current queue**:
          > ` + queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
          ).slice(0, 10).join("\n"));
        }
  
        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
          let filter = distube.setFilter(message, command);
          message.channel.send(`**Added filter: **
          > ` + (filter || "off"));
        }
    
    
    
    
  })

*/
/*
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
// DisTube event listeners, more in the documentation page
    distube
      .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
                                                                   
                                                                    ))
      .on("addSong", (message, queue, song) => message.channel.send(createEmbed_1.createEmbed("info", `✅ **|** All videos in **[${song.name}](${song.url})** playlist has been added to the queue`)
                    .setThumbnail(song.thumbnailURL)))
      .on("playList", (message, queue, playlist, song) => message.channel.send(`**Playing now:**>` `${song.name}\` - \`${song.formattedDuration}\``))
      .on("addList", (message, queue, playlist) => message.channel.send(createEmbed_1.createEmbed("info", `✅ **|** All videos in **[${song.name}](${song.url})** playlist has been added to the queue`)
                    .setThumbnail(song.thumbnailURL)
                    .setColor('#00ff00')))
      // DisTubeOptions.searchSongs = true
      .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
      })
      // DisTubeOptions.searchSongs = true
      .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
      .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e)});
*/
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (message, queue, song) =>   message.channel.send(createEmbed_1.createEmbed("info", `${((_d = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.queue) === null || _d === void 0 ? void 0 : _d.playing) ? "▶ **|** Now Playing:" : "▶ **|** Now Playing:"} ` +
            `**[${song === null || song === void 0 ? void 0 : song.title}](${song === null || song === void 0 ? void 0 : song.url})** - ${song.formattedDuration}
  \n\Requested by:${song.user}
  \n${status(queue)} `)
            .setThumbnail(song === null || song === void 0 ? void 0 : song.thumbnail)
                                                              
                          )
       .then(m => m.delete(  { timeout: (song.duration + "000")  }                      ) )
       )
          
    .on("addSong", (message, queue, song) => message.channel.send(createEmbed_1.createEmbed("info",
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` 
        to the queue by ${song.user}`
    )  .setThumbnail(song === null || song === void 0 ? void 0 : song.thumbnail)
                                                                 
       ))
    .on("previousSongs", (message, queue, song) => message.channel.send(createEmbed_1.createEmbed("info",
        `${client.emotes.success} | Previous to ${song.name} - \`${song.formattedDuration}\` 
        to the queue by ${song.user}`
    )  .setThumbnail(song === null || song === void 0 ? void 0 : song.thumbnail)
                                                                 
       ))
    .on("skip", (message, queue, song) => message.channel.send(createEmbed_1.createEmbed(`${client.emotes.success} | Next ${song.name} - \`${song.formattedDuration}\` 
        to the queue by ${song.user}`
    )  .setThumbnail(song === null || song === void 0 ? void 0 : song.thumbnail)))
    .on("playList", (message, queue, playlist, song) => message.channel.send(createEmbed_1.createEmbed(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    )  .setThumbnail(song === null || song === void 0 ? void 0 : song.thumbnail)
       ))
    .on("addList", (message, queue, playlist) => message.channel.send(createEmbed_1.createEmbed(
        `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ).setThumbnail(song === null || song === void 0 ? void 0 : song.thumbnail)
       ))
    // DisTubeOptions.searchSongs = true
      .on("searchResult", (message, result) => {
        //let i = 0;
        
        message.channel.send(createEmbed_1.createEmbed("info", `**Choose an option from below**\n${result.map((song, i) => `**${i+1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*\n Please type 1 or 2 or ...`))
})
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(createEmbed_1.createEmbed("info", `${client.emotes.error} | Searching canceled`)))
    .on("error", (message, err) => message.channel.send())
client.login(token);
  
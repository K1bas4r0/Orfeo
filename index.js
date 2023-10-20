const { Client } = require('discord.js');
const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
const play = require('play-dl')
const client = new Client({ intents: [3276799]});

const config = require('./config.json')

client.on('messageCreate', async message => {

    if (message.content.startsWith('-play')) {
        
        if (!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel')
        
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        
        let args = message.content.split('play')[1]
        let yt_info = await play.search(args, {
            limit: 1
        })
        
        let stream = await play.stream(yt_info[0].url)
        
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })

        let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })

        player.play(resource)

        connection.subscribe(player)
    }


    /*if (message.content == 'hola'){
        message.channel.send('Hola!')
    }*/
})

client.login(config.token);
console.log('El bot ya esta listo');
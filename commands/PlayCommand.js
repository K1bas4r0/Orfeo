const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const BaseCommand = require('./BaseCommand');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');
const { EventEmitter } = require('events');

class PlayCommand extends BaseCommand {
    constructor(skiped) {
        const data = new SlashCommandBuilder()
            .setName('play')
            .setDescription('Reproduce un archivo de audio')
            .addStringOption(option =>
                option.setName('query')
                    .setDescription('Texto de búsqueda')
                    .setRequired(true)
            );
        super(data);

        this.skiped = skiped;
        this.resource
        this.queue = [];
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });

        this.connection = null;
        this.currentlyPlaying = false;

    }

    async execute(interaction) {

        interaction.reply('Ejecutando')
          const args = interaction.options.get('query').value;
          const yt_info = await play.search(args, {
              limit: 1
              });

        this.addToQueue(yt_info[0].url);
        try{
            console.log(this.queue.length);
            console.log(this.queue)
            if (this.queue.length === 1) {
                await this.playAudio(interaction);
            } else {
                await interaction.followUp(`Canción añadida a la cola: ${yt_info[0].title}`);
            }
        } catch (error) {
            await interaction.followUp('Error de ejecucion, prueba de nuevo')
            console.error('Error al ejecutar el comando:', error);
        }
    }

    async playAudio(interaction) {
        if (!interaction.member.voice?.channel) {
            return interaction.reply('Conéctate a un canal de voz.');
        }

        this.connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const nextSongUrl = this.queue[0];
        try{
            const stream = await play.stream(nextSongUrl);
            this.resource = createAudioResource(stream.stream, {
                inputType: stream.type
            });

            this.player.play(this.resource);
            this.connection.subscribe(this.player);

        await interaction.followUp('Reproducción exitosa');
        }
        catch{
            this.player.stop(this.resource)
        }
        
        if (this.queue.length === 0 && this.player.stop(true)){
            return interaction.followUp('Detenido'), console.log('terminado');
        }

        this.skiped.on('skip', () =>{
            offPlay.emit('noidle')
        })

        const offPlay = new EventEmitter();
        const intervalTime = 1000;
        const checkEvent = () => {
          console.log(this.player.state.status)
          if (this.player.state.status === 'idle') {
            offPlay.emit('noidle');
          }
          
        };

        const intervalId = setInterval(checkEvent, intervalTime);

        offPlay.on('noidle', () => {
          this.queue.shift();
          clearInterval(intervalId);
          try{
            this.playAudio(interaction);
          }catch{
            interaction.followUp('No hay mas por reporducir')
          }
        });


      }

    async addToQueue(songUrl) {
        this.queue.push(songUrl);
    }
}

module.exports = PlayCommand;

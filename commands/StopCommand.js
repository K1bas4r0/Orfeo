// StopCommand.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const BaseCommand = require('./BaseCommand');

class StopCommand extends BaseCommand {
    constructor(player, resource, queue) {
        const data = new SlashCommandBuilder()
            .setName('stop')
            .setDescription('Detiene la reproducción de audio');
        super(data);

        this.player = player
        this.resource = resource
        this.queue = queue
    }

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        try{
            this.queue = []
            this.player.stop(this.resource)
            interaction.reply('Se detuvo...')
        }catch(error){
            console.error(error);
            interaction.reply('No se pudo detener')
        }
        
    }
}

module.exports = StopCommand;

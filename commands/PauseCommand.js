// PauseCommand.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const BaseCommand = require('./BaseCommand');


class PauseCommand extends BaseCommand {
    constructor(player, resource) {
        const data = new SlashCommandBuilder()
            .setName('pause')
            .setDescription('Pausa la reproducción de audio');
        super(data);
        this.player = player
        this.resource = resource
    }

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        try {

            this.player.pause(this.resource);
            interaction.reply('Pausado')

        }catch(error){
            interaction.reply('No hay nada que pausar')
            console.error(error)
        }
    }
}

module.exports = PauseCommand;

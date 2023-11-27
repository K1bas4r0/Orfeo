// PauseCommand.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const BaseCommand = require('./BaseCommand');


class PauseCommand extends BaseCommand {
    constructor(player, resource) {
        const data = new SlashCommandBuilder()
            .setName('unpause')
            .setDescription('Reanuda la reproducción de audio');
        super(data);
        this.player = player
        this.resource = resource
    }

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        try {

            this.player.unpause(this.resource);
            interaction.reply('Reanudado')

        }catch{
            interaction.reply('No hay nada que Reanudar')
        }
    }
}

module.exports = PauseCommand;

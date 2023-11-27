const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

class BaseCommand {
    constructor(data) {
        this.data = data || new SlashCommandBuilder()
            .setName('base')
            .setDescription('Comando base');
    }

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        return interaction.reply('Este es un comando base, ahi que sobrescribir el método execute en la clase hija.');
    }
}

module.exports = BaseCommand;

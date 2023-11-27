// SkipCommand.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const BaseCommand = require('./BaseCommand');
const { EventEmitter } = require('events');

class SkipCommand extends BaseCommand {
    constructor() {
        const data = new SlashCommandBuilder()
            .setName('skip')
            .setDescription('Salta la canción actual');
        super(data);
        this.skiped = new EventEmitter
        }

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        try{
            this.skiped.emit('skip')
            interaction.reply('Saltando...')
        }catch(error){
            interaction.reply('No se puede saltar')
            console.error(error);
        }
    }
}

module.exports = SkipCommand;

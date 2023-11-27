// Librerias Open source

const { Client, ClientOptions } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
const play = require('play-dl')

// Mis Imports

const { PlayCommand, StopCommand, PauseCommand, SkipCommand, UnPauseCommand } = require('./commands');
const { clientId, guildId, token } = require('./config.json');


//Core Bot
const options = {
    intents: [3276799],
    closeTimeout: 15000
 }

const client = new Client(options);


const skipCmd = new SkipCommand();
const playCmd = new PlayCommand(skipCmd.skiped);
const stopCmd = new StopCommand( playCmd.player,playCmd.resource,playCmd.queue);
const pauseCmd = new PauseCommand(playCmd.player,playCmd.resource);
const unpauseCmd = new UnPauseCommand(playCmd.player,playCmd.resource);

const commands = new Map();

commands.set('play', playCmd);
commands.set('stop', stopCmd);
commands.set('pause', pauseCmd);
commands.set('skip', skipCmd);
commands.set('unpause', unpauseCmd)


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Verifica si el comando existe en la colección
    const command = commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('Hubo un error al ejecutar el comando.');
    }
});


// Registrando comandos
const rest = new REST({ version: '9' }).setToken(token);


(async () => {
    try {
        console.log('Iniciando la actualización de comandos...');

        const commandData = Array.from(commands.values()).map(command => command.data.toJSON());

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandData }
        );

        console.log('Comandos actualizados correctamente.');
    } catch (error) {
        console.error(error);
    }
})();



// Mensaje de que todo procedio sin errores

client.login(token);
console.log('El bot ya esta listo');

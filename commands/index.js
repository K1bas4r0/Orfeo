// commands/index.js

const BaseCommand = require('./BaseCommand')
const PlayCommand = require('./PlayCommand');
const StopCommand = require('./StopCommand');
const PauseCommand = require('./PauseCommand');
const SkipCommand = require('./SkipCommand');
const UnPauseCommand = require('./UnPauseCommand')

module.exports = {
    PlayCommand,
    StopCommand,
    PauseCommand,
    SkipCommand,
    UnPauseCommand
};

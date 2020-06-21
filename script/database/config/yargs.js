const argv = require('yargs')
    .command('reset', 'Crear base de datos y datos por defecto')
    .help()
    .demandCommand()
    .argv

module.exports = {
    argv
}
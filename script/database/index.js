const argv = require('./config/yargs').argv;

const Configurator = require('./Configurator')

const configurator = new Configurator()

const command = argv._[0]

const init = async () => {

    switch (command) {
        case "reset":
            console.log(`Actualizando BD: ${process.env.DATABASE_NAME} ...`)
            await configurator.dropDatabase()
            await configurator.createDatabase()
            await configurator.importSql()
            await configurator.insertDefaultData()
            console.log(`Actualizado!!!`)
            break
        default:
            console.log('Unrecognized command')
            break;
    }

    configurator.close()
}

try {
    init()
} catch (err) {
    console.log("Error", err)
}

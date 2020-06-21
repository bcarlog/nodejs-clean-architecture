const app = require('./app')

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log('Escuchando puerto: ', process.env.PORT)
})
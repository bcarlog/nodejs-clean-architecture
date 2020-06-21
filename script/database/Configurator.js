const mysql = require('mysql')
const util = require('util')
const fs = require('fs')

class Configurator{
    constructor(){
        this.connection = mysql.createConnection({
            multipleStatements: true,
            host: process.env.DATABASE_URL,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        })
        this.query = util.promisify(this.connection.query).bind(this.connection)

        this.connectionWithoutDB = mysql.createConnection({
            multipleStatements: true,
            host: process.env.DATABASE_URL,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
        })
        this.queryWithoutDB = util.promisify(this.connectionWithoutDB.query).bind(this.connectionWithoutDB)
    }

    async dropDatabase(){
        return this.queryWithoutDB(`DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`)
    }

    async createDatabase(){
        return this.queryWithoutDB(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`)
    }

    importSql(){
        const sql = fs.readFileSync('./database.sql', 'utf8')
        return this.query(`${sql}`)
    }

    async insertDefaultData(){
        const {Status} = require('../../server/models')

        const statusData = require('./data/status')

        await statusData.map(async(data, index) => {
            console.log(data)
            await Status.create(data)
        })
    }

    close(){
        this.connection.end()
        this.connectionWithoutDB.end()
    }
}

module.exports = Configurator
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(__filename);

const db = {};

const logging = process.env.logging === "false" ? false : console.log

const ORM = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_URL,
        dialect: 'mysql',
        logging: logging
    }
)

/* await ORM.authenticate()
    .then(() => { console.log('Database connected...\n') })
    .catch(err => { console.log('Error', err) }) */

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = ORM['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.ORM = ORM;
db.sequelize = Sequelize;

module.exports = db;
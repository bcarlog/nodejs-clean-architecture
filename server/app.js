const express = require('express')
const path = require('path')

require('./utils/constants')

const routes = require('./components/routes')

const handleError = require('./utils/handleError')

const app = express()

app.use(express.json()) // body parser json

app.use(async(req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
})

app.use(routes)

app.use(async(err, req, res, next) => {
    const {isOperationalError, httpCode, description} = await handleError(err);
    console.log({isOperationalError, httpCode, description})
    res.status(httpCode).send(description)
})

module.exports = app
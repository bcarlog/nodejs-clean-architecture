const express = require('express')

const authentication = require('../../middlewares/authentication')
const UserValidation = require('./UserValidation')
const UserController = require('./UserController')

const app = express();

app.post('/api/user/',
    UserValidation.validateUser,
    UserController.create
)

app.post('/api/user/login/',
    UserValidation.validateUser,
    UserController.login
)

module.exports = app
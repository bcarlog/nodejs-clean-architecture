const express = require('express')

const authentication = require('../../middlewares/authentication')
const TaskValidation = require('./TaskValidation')
const TaskController = require('./TaskController')

const app = express();

app.post('/api/task/',
    authentication.authenticateUser,
    TaskValidation.validateTask,
    TaskController.create
)

app.get('/api/task/',
    authentication.authenticateUser,
    TaskController.getTasks
)

app.delete('/api/task/:id',
    authentication.authenticateUser,
    TaskValidation.validateTaskId,
    TaskController.delete
)

module.exports = app
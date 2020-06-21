const express = require('express');

const app = express();

app.use(require('./user/UserRoutes'))
app.use(require('./task/TaskRoutes'))

module.exports = app
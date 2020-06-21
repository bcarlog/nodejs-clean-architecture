const { check, param } = require('express-validator')

const {returnError} = require('../../utils/ValidationError')

exports.validateTask = [
    check('title', 'Invalid User').isString(),
    check('description','Invalid Password').isString(),
    returnError
]

exports.validateTaskId = [
    param('id', 'Invalid Task Id').isNumeric(),
    returnError
]
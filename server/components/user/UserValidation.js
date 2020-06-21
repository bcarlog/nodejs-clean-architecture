const { check } = require('express-validator')

const {returnError} = require('../../utils/ValidationError')

exports.validateUser = [
    check('username', 'Invalid Username').isString(),
    check('password','Invalid Password').isString(),
    returnError
]
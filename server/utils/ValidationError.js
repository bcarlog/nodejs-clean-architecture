const {validationResult } = require('express-validator')
const AppError = require('./AppError')

exports.returnError = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMsgs = []
        errors.array().forEach((value, index)=>{
            errorMsgs.push(value.msg)
        })
        throw new AppError("Error validation", 400, errorMsgs[0], true)
    }
    next()
}
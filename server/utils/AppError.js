function AppError(commonType, httpCode, description, isOperational) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.commonType = commonType
    this.description = description
    this.isOperational = isOperational
    this.httpCode = httpCode
    //...other properties assigned here
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports = AppError;
handleError = async (err) => {
    console.log("Registrando el error")
    // await logger.logError(err);
    await sendMailToAdminIfCritical(err);
    // await saveInOpsQueueIfCritical;
    // await determineIfOperationalError;
    console.log(err)
    return {
        isOperationalError: err.isOperational,
        httpCode: err.httpCode || 500,
        description: err.description
    }
}

sendMailToAdminIfCritical = async (err) => {
    console.log("Aquí se envia al administrador")
}

module.exports = handleError
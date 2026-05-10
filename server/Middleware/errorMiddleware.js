const { AppError } = require("../utils/error")

const errorHandlingMiddleware = (error, req, res, next) => {
    console.log('ERROR MIDDLEWARE - ', error)
    if (error instanceof AppError) {
        return res.status(error.status).json({
            success: false,
            statusCode: error.status,
            message: error.message
        })
    }

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: error.message || "Internal Server Error"
    })
}

module.exports = { errorHandlingMiddleware }
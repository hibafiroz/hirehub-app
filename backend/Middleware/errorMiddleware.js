const { AppError } = require("../utils/error")

const errorHandlingMiddleware = (error, req, res, next) => {
    console.log('ERROR MIDDLEWARE - ',error.stack)
    if (error instanceof AppError) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }

    return res.status(500).json({
        status: 500,
        message: 'Server Error'
    })
}

module.exports = { errorHandlingMiddleware }
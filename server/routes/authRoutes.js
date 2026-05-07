const express = require('express')
const { registerPost, logout, getUserDetails, login } = require('../controller/authController')
const { tokenVerify } = require('../utils/auth')
const router = express.Router()


router.post('/register', registerPost)
router.post('/recruiter-Login', login)
router.post('/jobseeker-Login', login)
router.post('/logout', logout)
router.get('/userDetails', tokenVerify, getUserDetails)

module.exports=router
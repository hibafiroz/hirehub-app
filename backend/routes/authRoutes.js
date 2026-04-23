const express = require('express')
const { registerPost, loginPost, logout, getUserDetails } = require('../controller/authController')
const { tokenVerify } = require('../utils/auth')
const router = express.Router()


router.post('/register', registerPost)
router.post('/login', loginPost)
router.post('/logout', logout)
router.get('/userDetails', tokenVerify, getUserDetails)

module.exports=router
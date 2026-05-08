const express = require('express')
const { home, browseJobs, jobDetail, contact } = require('../controller/publicController')
const { tokenVerify, optionalTokenVerify } = require('../utils/auth')
const router = express()

router.get('/', home)
router.get('/browseJobs', optionalTokenVerify ,browseJobs)
router.get('/jobDetail/:id', jobDetail)
router.post('/contact', contact)

module.exports = router

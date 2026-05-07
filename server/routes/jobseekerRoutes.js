const express = require('express')
const { applyNow, applyNowPost, profile, editProfile, application } = require('../controller/jobseekerController')
const { resumeUpload } = require('../Middleware/multer')
const { jobseekerProtected, tokenVerify } = require('../utils/auth')
const router = express.Router()

router.get('/apply/:id',tokenVerify, jobseekerProtected, applyNow)
router.post('/apply/:id',tokenVerify,jobseekerProtected, resumeUpload.single('resume'), applyNowPost)
router.get('/profile', tokenVerify, jobseekerProtected, profile)
router.put('/editProfile', tokenVerify, jobseekerProtected, editProfile)
router.get('/application',tokenVerify, jobseekerProtected, application)

module.exports = router

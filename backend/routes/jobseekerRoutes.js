const express = require('express')
const { jobDetail, contactPost, applyNow, applyNowPost, jobListAll, jobListByTitle, profile, editProfile, application } = require('../controller/jobseekerController')
const { resumeUpload } = require('../utils/multer')
const { jobseekerProtected, tokenVerify } = require('../utils/auth')
const router = express.Router()

router.get('/job-Detail/:id',jobDetail)
router.get('/browseJobs', jobListAll)
router.get('/browseJobs/:title', jobListByTitle)
router.post('/contact', contactPost)
router.get('/apply/:id', jobseekerProtected, applyNow)
router.post('/apply/:id',jobseekerProtected, resumeUpload.single('resume'), applyNowPost)
router.get('/profile',jobseekerProtected ,profile)
router.put('/editProfile',jobseekerProtected ,editProfile)
router.get('/application', jobseekerProtected, application)

module.exports = router

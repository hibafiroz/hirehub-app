const express = require('express')
const { home, dashboard, postJob, postJobPost, jobList, jobDetail, editJob, editJobPost, editProfile, editProfilePost, profile, companyGet, companyPost, applicationGet, applicantStatus, deleteJob } = require('../controller/recruiterController')
const { logoUpload } = require('../utils/multer')
const { recruiterProtected, tokenVerify } = require('../utils/auth')
const router = express.Router()


router.get('/dashboard',tokenVerify, recruiterProtected, dashboard )
router.post('/post-Job', recruiterProtected, postJobPost)
router.get('/job-List', recruiterProtected, jobList)
router.get('/job-Detail/:id', recruiterProtected, jobDetail)
router.post('/edit-Job/:id', recruiterProtected, editJobPost)
router.get('/editProfile', recruiterProtected, editProfile)
router.post('/editProfile', editProfilePost)
router.post('/deleteJob/:id', recruiterProtected, deleteJob)
router.get('/profile', recruiterProtected, profile)
router.post('/company', logoUpload.single('logo'), companyPost)
router.get('/application', recruiterProtected, applicationGet)
router.post('/:id/applicantStatus', recruiterProtected, applicantStatus)


module.exports = router
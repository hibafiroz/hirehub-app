const express = require('express')
const { home, dashboard, postJob, postJobPost, jobList, jobDetail, editJob, editJobPost, editProfile, editProfilePost, profile, companyGet, companyPost, applicationGet, applicantStatus, deleteJob } = require('../controller/recruiterController')
const { logoUpload } = require('../Middleware/multer')
const { recruiterProtected, tokenVerify } = require('../utils/auth')
const router = express.Router()


router.get('/home', tokenVerify, recruiterProtected, home)
router.get('/dashboard',tokenVerify, recruiterProtected, dashboard )
router.post('/postJob',tokenVerify, recruiterProtected, postJobPost)
router.get('/jobList',tokenVerify, recruiterProtected, jobList)
router.get('/jobDetail/:id',tokenVerify, recruiterProtected, jobDetail)
router.post('/editJob/:id',tokenVerify, recruiterProtected, editJobPost)
router.get('/editProfile',tokenVerify, recruiterProtected, editProfile)
router.put('/editProfile',tokenVerify, recruiterProtected, editProfilePost)
router.delete('/deleteJob/:id',tokenVerify, recruiterProtected, deleteJob)
router.get('/profile', tokenVerify, recruiterProtected, profile)
router.post('/company',tokenVerify, logoUpload.single('logo'), companyPost)
router.get('/application',tokenVerify,recruiterProtected, applicationGet)
router.post('/:id/applicantStatus', tokenVerify, recruiterProtected, applicantStatus)


module.exports = router
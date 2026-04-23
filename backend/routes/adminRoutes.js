const express = require('express')
const { adminPanelGet, approve, reject, jobDetail,  } = require('../controller/adminController')
const { adminProtected } = require('../utils/auth')
const router = express.Router()

router.get('/admin-Panel',adminProtected, adminPanelGet)
router.post('/job/:id/approve', adminProtected, approve)
router.post('/job/:id/reject', adminProtected, reject)
router.get('/job-Detail/:id', adminProtected, jobDetail)

module.exports = router
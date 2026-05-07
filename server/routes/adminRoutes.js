const express = require('express')
const { adminPanelGet, approve, reject, jobDetail,  } = require('../controller/adminController')
const { adminProtected, tokenVerify } = require('../utils/auth')
const router = express.Router()

router.get('/panel',tokenVerify,adminProtected, adminPanelGet)
router.post('/job/:id/approve',tokenVerify, adminProtected, approve)
router.post('/job/:id/reject',tokenVerify, adminProtected, reject)
router.get('/jobDetail/:id',tokenVerify, adminProtected, jobDetail)

module.exports = router
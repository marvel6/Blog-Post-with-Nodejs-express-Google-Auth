const express = require('express')
const router = express.Router()

const {login,dashboard} = require('../controller/user')
const {ensureAuth,ensureGuest} = require('../middleware/authMiddleware')


router.get('/',ensureGuest,login)
router.get('/dashboard',ensureAuth,dashboard)


module.exports = router
const express = require('express')
const router = express.Router()
const { registerUser, authUser, getUserProfile, updateUserProfile } = require('../controllers/userControllers.js')
const protect = require('../middlewares/authMiddeware.js')

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const generateToken = require('../utils/generateToken.js')

// @desc  Register a new user
// @route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User with the same email address already exist')
  }
  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201)
    const { _id, name, email, isAdmin } = user
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc  Auth user & get token
// @route  POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc  Get user profile
// @route  GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const { _id, name, email, isAdmin } = req.user
    res.json({
      _id,
      name,
      email,
      isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc  Update user profile
// @route  PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const { name, email } = user
    user.name = req.body.name || name
    user.email = req.body.email || email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(req.user._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = { authUser, getUserProfile, registerUser, updateUserProfile }

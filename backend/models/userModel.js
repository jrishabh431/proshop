const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {timestamps: true})
// The second argument in mongoose Schema - timestamps will automatically add the createdOn
// and other time related updates

const User = mongoose.model('User', userSchema)

module.exports = User
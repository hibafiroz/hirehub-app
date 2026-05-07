const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    location: {
        type: String
    },

    phone: {
        type: String
    },

    skills: [{
        type: String
    }],

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["recruiter", "jobseeker", "admin"],
        required: true
    },

    experience: {
        type: String,
        default: ''
    },

    photo: {
        type: String
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
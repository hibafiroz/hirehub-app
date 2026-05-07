const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    jobLocation: {
        type: String,
        required: true
    },

    jobMode: {
        type: String,
        enum: ['Remote', 'Onsite', 'Hybrid'],
        required: true
    },

    type: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Internship'],
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    salaryRange: {
        type: String,
        required: true
    },

    // comma separated → array
    skills: [{
        type: String,
        required: true
    }],

    describeRole: {
        type: String,
        required: true
    },

    responsibilities: [{
        type: String,
        required: true
    }],

    requirements: [{
        type: String,
        required: true
    }],

    goodToHave: [{
        type: String,
    }],

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job
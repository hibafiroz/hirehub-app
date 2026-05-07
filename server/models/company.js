const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
  },
    location: {
        type: String,
        required: true
  },
    industry: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
  },
    website: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
  }
});

const Company = mongoose.model('Company', companySchema)

module.exports = Company
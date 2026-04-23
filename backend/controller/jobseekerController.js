const Application = require("../models/application")
const Contact = require("../models/contact")
const Job = require("../models/job")
const User = require("../models/user")
const sendEmail = require("../utils/send-Email")


const contactPost = async (req, res) => {
  try {
    const { name, email, message } = req.body
    await Contact.create({ name, email, message })
    res.json({ message: "Message sent successfully" })

  } catch (error) {
    res.status(500).json({ message: "Error sending message" })
  }
}

const jobDetail = async (req, res, next) => {
  try {
    const jobID = req.params.id
    const job = await Job.findById(jobID).populate('company')

    let appliedJob = {}

    const applications = await Application.find({
      applicant: req.user?.id
    }).select('job')

    applications.forEach(app => {
      appliedJob[app.job.toString()] = true
    })

    res.json({ job, appliedJob })

  } catch (err) {
    next(err)
  }
}

const profile = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json({ user })
}

const editProfile = async (req, res, next) => {
  try {
    const { name, phone, location, skills, experience } = req.body
    let data = {}
    if (name) data.name = name
    if (phone) data.phone = phone
    if (location) data.location = location
    if (experience) data.experience = experience
    if (skills) {
      data.skills = skills
    }
    const updatedUser=await User.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      { new: true }
    )
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (err) {
    next(err)
  }
}

const application = async (req, res) => {
  const applications = await Application.find({ applicant: req.user.id })
    .populate({
      path: 'job',
      populate: {
        path: 'company',
        select: 'name'
      }
    })

  res.json({ applications })
}


const jobListByTitle = async (req, res, next) => {
  try {
        const title = req.params.title
    const jobs = await Job.find({ title }).populate('company')
    let appliedJob = {}

      const applications = await Application.find({
        applicant: req.user?.id
      }).select('job')

      applications.forEach(app => {
        appliedJob[app.job.toString()] = true
      })
        res.json({ jobs, query: req.query, appliedJob })
    } catch (err) {
        next(err)
    }
}

const jobListAll = async (req, res, next) => {
  try {

    const { title, location, jobMode, type, department, salary } = req.query

    let query = { status: 'approved' }

    if (title) query.title = { $regex: title, $options: 'i' }
    if (location) query.jobLocation = { $regex: location, $options: 'i' }
    if (jobMode) query.jobMode = { $in: Array.isArray(jobMode) ? jobMode : [jobMode] }
    if (type) query.type = { $in: Array.isArray(type) ? type : [type] }
    if (department) query.department = { $in: Array.isArray(department) ? department : [department] }
    if (salary) query.salaryRange = { $in: Array.isArray(salary) ? salary : [salary] }

    const jobs = await Job.find(query).populate('company')

    let appliedJob = {}

      const applications = await Application.find({
        applicant: req.user?.id
      }).select('job')

      applications.forEach(app => {
        appliedJob[app.job.toString()] = true
      })
    res.json({ jobs,query:req.query, appliedJob })
  } catch (err) {
    next(err)
  }
}

const applyNow = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
    res.json({ job })
  } catch (err) {
    next(err)
  }
}


const applyNowPost = async (req, res, next) => {
    try { 
        const { phone, coverLetter } = req.body
        await Application.create({
            job: req.params.id, applicant: req.user.id, phone, resume: req.file ? req.file.filename : null, status: 'applied', coverLetter
        })
      
        // SEND EMAIL TO JOBSEEKER
        await sendEmail({
        to: req.user.email,
        subject: 'Application Submitted Successfully',
        html: `
          <h2>Application Submitted ✅</h2>
          <p>You have successfully applied for the job.</p>
          <p>We will notify you once the recruiter updates your application.</p>`
        })
        res.json({ message: "Application submitted successfully" })    } catch (err) {
        next(err)
    }
}

module.exports = { contactPost, applyNow, applyNowPost, profile, editProfile, application, jobListAll, jobListByTitle, jobDetail }
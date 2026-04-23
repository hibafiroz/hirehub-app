const mongoose = require("mongoose")
const Application = require("../models/application")
const Company = require("../models/company")
const Job = require("../models/job")
const User = require("../models/user")
const sendEmail = require("../utils/send-Email")



const dashboard = async (req, res) => {
    const recruiterId = req.user.id
   const jobs = await Job.find({ recruiter: recruiterId })
   const jobIds = jobs.map(job => job._id)
    // Applications for those jobs
    const applications = await Application.find({ job: { $in: jobIds } }).populate('job').populate('applicant')

     // JOBS PER DAY (LAST 7 DAYS)
        const jobsPerDay = await Job.aggregate([{
            $match: {
                recruiter: new mongoose.Types.ObjectId(recruiterId),
                createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.date": 1 }
        }
    ])
        // 📊 APPLICATIONS PER DAY
        
      const applicationsPerDay = await Application.aggregate([
      {
        $match: {
          job: { $in: jobIds },
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.date": 1 } }
      ])

    const stats = {
        totalJobs: jobs.length,
        totalApplications: applications.length,
        pending: applications.filter(a => a.status === 'applied').length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length
    }
    res.json({
    stats,
    recentApplications: applications.slice(0, 3),
    jobsPerDay,
    applicationsPerDay
    })
}


const postJobPost = async (req, res) => {
    try {
        const { title, jobLocation, jobMode, type, experience, salaryRange, skills, describeRole, requirements, responsibilities, goodToHave } = req.body
        const company = await Company.findById(req.user.id)
        await Job.create({
            title,
            jobLocation,
            jobMode,
            type,
            experience,
            salaryRange,
            skills: skills.split(',').map(s => s.trim()).filter(item => item !== ""),
            describeRole,
            requirements: requirements.split(',').map(r => r.trim()).filter(item => item !== ""),
            responsibilities: responsibilities.split(',').map(r => r.trim()).filter(item => item !== ""),
            goodToHave: goodToHave ? goodToHave.split(',').map(g => g.trim()).filter(item => item !== "") : [],
            recruiter: req.user.id,
            company: company._id
        })
        res.json({message:'Job Posted succesfully'})
    } catch (err) {
      next(err)
    }
}

const jobDetail = async(req, res) => {
    const jobs = await Job.findById(req.params.id )
    res.json({ jobs })
}

const getJobById = async(req, res) => {
    const job = await Job.findById(req.params.id)
    res.json({ job })
}

const editJobPost = async (req, res, next) => {
    try {
        const { title, jobLocation, jobMode, type, experience, salaryRange, skills, describeRole, requirements, responsibilities, goodToHave } = req.body
        await Job.findByIdAndUpdate({ _id: req.params.id }, {
            title, jobLocation, jobMode, type, experience, salaryRange,
            skills: skills.split(',').map(s => s.trim()),
            describeRole,
            requirements: requirements.split('\n').map(r => r.trim()).filter(item => item !== ""),
            responsibilities: responsibilities.split('\n').map(r => r.trim()).filter(item => item !== ""),
            goodToHave: goodToHave ? goodToHave.split('\n').map(g => g.trim()).filter(item => item !== "") : [],
        })
        res.json({message:'Edited successfully'})
    } catch (err) {
        next(err)
    }
}

const profile = async(req, res) => {
    const user= await User.findById(req.user.id).populate('company')
    res.json({user, company:user.company})
}

const editProfile = async (req, res, next) => {
    try {
        const companyDetails = await Company.findOne({ recruiter: req.user.id })
        res.json({ companyDetails })
    } catch (err) {
        next(err)
    }
}

const editProfilePost = async (req, res, next) => {
    try {
        const { companyname, companyemail, website, description, username, useremail } = req.body
        await Company.findOneAndUpdate({ recruiter: req.user.id }, {
            name: companyname,
            email: companyemail,
            website,
            description
        })
        await User.findOneAndUpdate({ _id: req.user.id }, {
            name: username,
            email: useremail
        })
        res.json({ message: "Profile updated successfully" })
    } catch (err) {
        next(err)
    }
}


const companyPost = async (req, res, next) => {
    try {
        const { name, location, industry, size, website, email, description } = req.body
        const newCompany = await Company.create({
            name, location, industry, size, website, email, logo: req.file.filename, description, recruiter: req.user.id
        })
        await User.findByIdAndUpdate(req.user.id, {
            company: newCompany._id
        })
        res.json({message:'Company added successfully'})
    } catch (err) {
        next(err)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const jobID = req.params.id
        await Job.findByIdAndDelete(jobID)
        res.json({message:'Deleted job successfully'})
    } catch (err) {
        next(err)
    }
}

const applicantStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const applicationId = req.params.id

    // Getting application with applicant details
    const application = await Application.findById(applicationId).populate('applicant', 'email name')
    application.status = status
    await application.save()
    // Send email
    if (status === 'shortlisted') {
      await sendEmail({
        to: application.applicant.email,
        subject: 'Application Shortlisted',
        html: `
          <h2>Congratulations ${application.applicant.name} 🎉</h2>
          <p>Your application has been <b>shortlisted</b>.</p>
          <p>The recruiter will contact you soon.</p>
        `
      })
    }
    if (status === 'rejected') {
      await sendEmail({
        to: application.applicant.email,
        subject: 'Application Update',
        html: `
          <h2>Hello ${application.applicant.name}</h2>
          <p>Thank you for applying.</p>
          <p>Your application has been <b>rejected</b>.</p>
          <p>We encourage you to apply for other opportunities.</p>
        `
      })
    }
    res.json({message:'application status updated'})
  } catch (err) {
    next(err)
  }
}

const jobList = async (req, res, next) => {
  try {
    const { title } = req.query
    let jobQuery = { recruiter: req.user.id }
    if (title) {
      jobQuery.title = { $regex: title, $options: 'i' }
    }
    const jobs = await Job.find(jobQuery)
    res.json({ jobs })
  } catch (err) {
    next(err)
  }
}

const applicationGet = async (req, res, next) => {
  try {
    const { title } = req.query
    let jobQuery = { recruiter: req.user.id }
    if (title) {
      jobQuery.title = { $regex: title, $options: 'i' }
    }
    const jobs = await Job.find(jobQuery).select('_id')
    const jobIds = jobs.map(job => job._id)
    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate('applicant')
      .populate('job')

    res.json({ applications })
  } catch (err) {
    next(err)
  }
}


module.exports = { deleteJob, dashboard, postJobPost, jobList, jobDetail, getJobById, editJobPost, editProfile, editProfilePost, profile, companyPost, applicationGet, applicantStatus }